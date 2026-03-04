import { useEffect, useState, useRef, useCallback } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import { useStore } from "@nanostores/react";
import { $lang } from "@/i18n/store";
import { ui } from "@/i18n/ui";
import {
  supabase,
  getFingerprint,
  detectSpam,
  signInWithGitHub,
  signOut,
  getCurrentUser,
} from "@/lib/supabase";
import type { GitHubUser } from "@/lib/supabase";

/* ─────────── Types ─────────── */
interface Comment {
  id: number;
  page_path: string;
  author_name: string;
  content: string;
  created_at: string;
  github_username?: string;
  github_avatar_url?: string;
}

interface CommentSectionProps {
  pagePath: string;
}

/* ─────────── Component ─────────── */
export default function CommentSection({ pagePath }: CommentSectionProps) {
  const lang = useStore($lang);
  const t = ui.comments;

  // State
  const [comments, setComments] = useState<Comment[]>([]);
  const [content, setContent] = useState("");
  const [honeypot, setHoneypot] = useState(""); // anti-bot
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);

  // GitHub auth state
  const [githubUser, setGithubUser] = useState<GitHubUser | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  // Admin state
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [adminError, setAdminError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const formRef = useRef<HTMLFormElement>(null);

  // ─────────── Auth listener ───────────
  useEffect(() => {
    if (!supabase) {
      setAuthLoading(false);
      return;
    }

    // Check current session
    getCurrentUser().then((user) => {
      setGithubUser(user);
      setAuthLoading(false);
    });

    // Listen for auth changes (e.g., after OAuth redirect)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        const user = await getCurrentUser();
        setGithubUser(user);
      } else {
        setGithubUser(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // ─────────── Load comments ───────────
  const loadComments = useCallback(async () => {
    if (!supabase) return;
    try {
      const { data, error: err } = await supabase
        .from("comments")
        .select(
          "id, page_path, author_name, content, created_at, github_username, github_avatar_url",
        )
        .eq("page_path", pagePath)
        .eq("is_visible", true)
        .order("created_at", { ascending: false });

      if (err) throw err;
      setComments(data || []);
    } catch (err) {
      console.error("Failed to load comments:", err);
    } finally {
      setIsLoading(false);
    }
  }, [pagePath]);

  useEffect(() => {
    loadComments();
    // Restore admin session
    if (sessionStorage.getItem("admin_verified") === "1") {
      setIsAdmin(true);
      setAdminPassword(sessionStorage.getItem("admin_pw") || "");
    }
  }, [loadComments]);

  // ─────────── Client-side rate limit ───────────
  function checkClientRateLimit(): boolean {
    const key = "comment_timestamps";
    const now = Date.now();
    const windowMs = 10 * 60 * 1000; // 10 minutes
    const maxCount = 5;

    let timestamps: number[] = [];
    try {
      timestamps = JSON.parse(localStorage.getItem(key) || "[]");
    } catch {
      /* ignore */
    }

    // Remove old entries
    timestamps = timestamps.filter((ts) => now - ts < windowMs);

    if (timestamps.length >= maxCount) return false;

    timestamps.push(now);
    localStorage.setItem(key, JSON.stringify(timestamps));
    return true;
  }

  // ─────────── GitHub Login/Logout ───────────
  async function handleGitHubLogin() {
    await signInWithGitHub();
  }

  async function handleGitHubLogout() {
    await signOut();
    setGithubUser(null);
  }

  // ─────────── Submit comment ───────────
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!supabase) {
      setError(t.errors.notConfigured[lang]);
      return;
    }

    if (!githubUser) {
      setError(t.errors.notLoggedIn[lang]);
      return;
    }

    // Honeypot check (bots fill hidden fields)
    if (honeypot) {
      // Silently reject — bots won't see the error
      setSuccess(t.submitSuccess[lang]);
      setContent("");
      return;
    }

    const trimmedContent = content.trim();

    if (!trimmedContent) {
      setError(t.errors.contentRequired[lang]);
      return;
    }

    if (trimmedContent.length < 2) {
      setError(t.errors.tooShort[lang]);
      return;
    }

    if (trimmedContent.length > 2000) {
      setError(t.errors.tooLong[lang]);
      return;
    }

    // Client-side spam detection
    const spamResult = detectSpam(trimmedContent);
    if (spamResult) {
      setError(spamResult);
      return;
    }

    // Client-side rate limit
    if (!checkClientRateLimit()) {
      setError(t.errors.rateLimited[lang]);
      return;
    }

    setIsSubmitting(true);

    try {
      const fingerprint = getFingerprint();
      const { data, error: rpcError } = await supabase.rpc("add_comment", {
        p_page_path: pagePath,
        p_author_name: githubUser.username,
        p_content: trimmedContent,
        p_fingerprint: fingerprint,
        p_github_user_id: githubUser.id,
        p_github_username: githubUser.username,
        p_github_avatar_url: githubUser.avatarUrl,
      });

      if (rpcError) throw rpcError;

      const result = data as {
        success: boolean;
        error?: string;
        comment?: Comment;
      };

      if (!result.success) {
        setError(result.error || t.errors.unknown[lang]);
        return;
      }

      // Success
      setSuccess(t.submitSuccess[lang]);
      setContent("");
      await loadComments();

      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      console.error("Submit comment error:", err);
      setError(t.errors.unknown[lang]);
    } finally {
      setIsSubmitting(false);
    }
  }

  // ─────────── Admin login ───────────
  async function handleAdminLogin() {
    if (!supabase || !adminPassword) return;
    setAdminError(null);

    try {
      const { data, error: rpcError } = await supabase.rpc(
        "admin_verify_password",
        { p_password: adminPassword },
      );

      if (rpcError) throw rpcError;

      if (data === true) {
        setIsAdmin(true);
        sessionStorage.setItem("admin_verified", "1");
        sessionStorage.setItem("admin_pw", adminPassword);
        setAdminError(null);
      } else {
        setAdminError(t.admin.wrongPassword[lang]);
      }
    } catch (err) {
      console.error("Admin login error:", err);
      setAdminError(t.admin.loginError[lang]);
    }
  }

  // ─────────── Admin delete ───────────
  async function handleDelete(commentId: number) {
    if (!supabase || !isAdmin) return;
    setDeletingId(commentId);

    try {
      const pw = sessionStorage.getItem("admin_pw") || adminPassword;
      const { data, error: rpcError } = await supabase.rpc(
        "admin_delete_comment",
        { p_comment_id: commentId, p_password: pw },
      );

      if (rpcError) throw rpcError;

      const result = data as { success: boolean; error?: string };
      if (result.success) {
        await loadComments();
      } else {
        alert(result.error || "Delete failed");
      }
    } catch (err) {
      console.error("Delete comment error:", err);
    } finally {
      setDeletingId(null);
    }
  }

  // ─────────── Admin logout ───────────
  function handleAdminLogout() {
    setIsAdmin(false);
    setAdminPassword("");
    sessionStorage.removeItem("admin_verified");
    sessionStorage.removeItem("admin_pw");
  }

  // ─────────── Format date ───────────
  function formatDate(dateStr: string) {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString(lang === "zh" ? "zh-CN" : "en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return dateStr;
    }
  }

  if (!supabase) return null;

  return (
    <section
      className="mt-16 pt-8 border-t"
      style={{ borderColor: "var(--color-border)" }}
    >
      {/* ─── Section Header ─── */}
      <div
        className="flex items-center justify-between mb-8 cursor-pointer group select-none"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <h2
          className="text-2xl font-bold flex items-center gap-2 transition-opacity group-hover:opacity-80"
          style={{ color: "var(--color-text)" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ color: "var(--color-primary)" }}
          >
            <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
          </svg>
          {t.title[lang]}
          <span
            className="text-sm font-normal ml-2"
            style={{ color: "var(--color-text-muted)" }}
          >
            ({comments.length})
          </span>
        </h2>

        {/* Collapse toggle icon */}
        <div
          className="p-2 rounded-full transition-colors duration-200"
          style={{
            color: "var(--color-text-muted)",
            transform: isCollapsed ? "rotate(-90deg)" : "rotate(0deg)",
            transition: "transform 0.2s ease, background-color 0.2s ease",
          }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </div>
      </div>

      <div className={isCollapsed ? "hidden" : "block"}>
        {/* ─── Comment Form ─── */}
        <div
          className="mb-10 rounded-xl p-6 space-y-4"
          style={{
            backgroundColor: "var(--color-bg-secondary)",
            border: "1px solid var(--color-border)",
          }}
        >
          <h3
            className="text-lg font-semibold mb-2"
            style={{ color: "var(--color-text)" }}
          >
            {t.leaveComment[lang]}
          </h3>

          {/* GitHub Auth Area */}
          {authLoading ? (
            <div
              className="flex items-center gap-2 text-sm py-2"
              style={{ color: "var(--color-text-muted)" }}
            >
              <svg
                className="animate-spin"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M21 12a9 9 0 1 1-6.219-8.56" />
              </svg>
              {t.loading[lang]}
            </div>
          ) : githubUser ? (
            /* Logged in — show user info */
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={githubUser.avatarUrl}
                  alt={githubUser.username}
                  className="w-9 h-9 rounded-full ring-2"
                  style={
                    {
                      "--tw-ring-color": "var(--color-primary)",
                    } as React.CSSProperties
                  }
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span
                      className="font-semibold text-sm"
                      style={{ color: "var(--color-text)" }}
                    >
                      {githubUser.username}
                    </span>
                    {/* GitHub badge */}
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      style={{ color: "var(--color-text-muted)" }}
                    >
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  </div>
                  <span
                    className="text-xs"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    {t.loggedInAs[lang]}
                  </span>
                </div>
              </div>
              <button
                onClick={handleGitHubLogout}
                className="text-xs px-3 py-1.5 rounded-lg transition-colors duration-200"
                style={{
                  color: "var(--color-text-muted)",
                  border: "1px solid var(--color-border)",
                }}
              >
                {t.githubLogout[lang]}
              </button>
            </div>
          ) : (
            /* Not logged in — show login prompt */
            <div className="flex flex-col items-start gap-3">
              <p
                className="text-sm"
                style={{ color: "var(--color-text-secondary)" }}
              >
                {t.loginPrompt[lang]}
              </p>
              <button
                onClick={handleGitHubLogin}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium text-white transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                style={{ backgroundColor: "#24292e" }}
              >
                {/* GitHub Logo */}
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                {t.githubLogin[lang]}
              </button>
            </div>
          )}

          {/* Comment form — only show when logged in */}
          {githubUser && (
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
              {/* Honeypot field — invisible to human users */}
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  left: "-9999px",
                  opacity: 0,
                  height: 0,
                  overflow: "hidden",
                }}
              >
                <input
                  type="text"
                  name="website"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  autoComplete="off"
                  tabIndex={-1}
                />
              </div>

              {/* Comment content */}
              <div>
                <label
                  htmlFor="comment-content"
                  className="block text-sm font-medium mb-1"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  {t.content[lang]}
                </label>
                <textarea
                  id="comment-content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  maxLength={2000}
                  rows={4}
                  placeholder={t.contentPlaceholder[lang]}
                  className="w-full px-4 py-2 rounded-lg text-sm transition-colors duration-200 resize-y outline-none focus:ring-2"
                  style={
                    {
                      backgroundColor: "var(--color-bg)",
                      border: "1px solid var(--color-border)",
                      color: "var(--color-text)",
                      minHeight: "100px",
                      "--tw-ring-color": "var(--color-primary)",
                    } as React.CSSProperties
                  }
                />
                <div
                  className="text-xs text-right mt-1"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  {content.length}/2000
                </div>
              </div>

              {/* Error / Success messages */}
              {error && (
                <div
                  className="text-sm px-4 py-2 rounded-lg"
                  style={{
                    backgroundColor: "rgba(239, 68, 68, 0.1)",
                    color: "#ef4444",
                    border: "1px solid rgba(239, 68, 68, 0.2)",
                  }}
                >
                  {error}
                </div>
              )}
              {success && (
                <div
                  className="text-sm px-4 py-2 rounded-lg"
                  style={{
                    backgroundColor: "rgba(34, 197, 94, 0.1)",
                    color: "#22c55e",
                    border: "1px solid rgba(34, 197, 94, 0.2)",
                  }}
                >
                  {success}
                </div>
              )}

              {/* Submit button */}
              <button
                type="submit"
                disabled={isSubmitting || !content.trim()}
                className="px-6 py-2.5 rounded-lg text-sm font-medium text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98]"
                style={{
                  background:
                    "linear-gradient(135deg, var(--color-primary), var(--color-accent))",
                }}
              >
                {isSubmitting ? t.submitting[lang] : t.submit[lang]}
              </button>
            </form>
          )}

          {/* Show error when not logged in */}
          {!authLoading && !githubUser && error && (
            <div
              className="text-sm px-4 py-2 rounded-lg"
              style={{
                backgroundColor: "rgba(239, 68, 68, 0.1)",
                color: "#ef4444",
                border: "1px solid rgba(239, 68, 68, 0.2)",
              }}
            >
              {error}
            </div>
          )}
        </div>

        {/* ─── Comments List ─── */}
        <div className="space-y-4">
          {isLoading ? (
            <div
              className="text-center py-8 text-sm"
              style={{ color: "var(--color-text-muted)" }}
            >
              {t.loading[lang]}
            </div>
          ) : comments.length === 0 ? (
            <div
              className="text-center py-8 text-sm"
              style={{ color: "var(--color-text-muted)" }}
            >
              {t.noComments[lang]}
            </div>
          ) : (
            comments.map((comment) => (
              <div
                key={comment.id}
                className="rounded-xl p-5 transition-all duration-200 hover:shadow-md group"
                style={{
                  backgroundColor: "var(--color-bg-secondary)",
                  border: "1px solid var(--color-border)",
                }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    {/* Comment header */}
                    <div className="flex items-center gap-3 mb-2">
                      {/* Avatar — GitHub avatar or fallback */}
                      {comment.github_avatar_url ? (
                        <img
                          src={comment.github_avatar_url}
                          alt={comment.github_username || comment.author_name}
                          className="w-8 h-8 rounded-full flex-shrink-0"
                        />
                      ) : (
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                          style={{
                            background:
                              "linear-gradient(135deg, var(--color-primary), var(--color-accent))",
                          }}
                        >
                          {(comment.author_name || "?").charAt(0).toUpperCase()}
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        {comment.github_username ? (
                          <a
                            href={`https://github.com/${comment.github_username}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-semibold text-sm hover:underline inline-flex items-center gap-1"
                            style={{ color: "var(--color-text)" }}
                          >
                            {comment.github_username}
                            <svg
                              width="12"
                              height="12"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              style={{ color: "var(--color-text-muted)" }}
                            >
                              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                          </a>
                        ) : (
                          <span
                            className="font-semibold text-sm"
                            style={{ color: "var(--color-text)" }}
                          >
                            {comment.author_name}
                          </span>
                        )}
                        <span
                          className="text-xs"
                          style={{ color: "var(--color-text-muted)" }}
                        >
                          {formatDate(comment.created_at)}
                        </span>
                      </div>
                    </div>

                    {/* Comment content */}
                    <div
                      className="pl-11 text-sm prose prose-sm dark:prose-invert max-w-none break-words [&>p]:mb-2 [&>p:last-child]:mb-0 [&>pre]:bg-zinc-900 [&>pre]:p-2 [&>pre]:rounded-md [&>ul]:list-disc [&>ol]:list-decimal [&>ul]:pl-4 [&>ol]:pl-4"
                      style={{ color: "var(--color-text-secondary)" }}
                    >
                      <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]}>
                        {comment.content}
                      </ReactMarkdown>
                    </div>
                  </div>

                  {/* Admin delete button */}
                  {isAdmin && (
                    <button
                      onClick={() => handleDelete(comment.id)}
                      disabled={deletingId === comment.id}
                      className="flex-shrink-0 p-2 rounded-lg text-xs transition-all duration-200 opacity-0 group-hover:opacity-100 hover:bg-red-500/10"
                      style={{ color: "#ef4444" }}
                      title={t.admin.delete[lang]}
                    >
                      {deletingId === comment.id ? (
                        <svg
                          className="animate-spin"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                        </svg>
                      ) : (
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M3 6h18" />
                          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                          <line x1="10" y1="11" x2="10" y2="17" />
                          <line x1="14" y1="11" x2="14" y2="17" />
                        </svg>
                      )}
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* ─── Admin Panel ─── */}
        <div
          className="mt-8 pt-4 border-t"
          style={{ borderColor: "var(--color-border)" }}
        >
          {isAdmin ? (
            <div className="flex items-center justify-between">
              <span
                className="text-xs flex items-center gap-1.5"
                style={{ color: "var(--color-text-muted)" }}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
                {t.admin.loggedIn[lang]}
              </span>
              <button
                onClick={handleAdminLogout}
                className="text-xs px-3 py-1 rounded-md transition-colors duration-200"
                style={{
                  color: "var(--color-text-muted)",
                  border: "1px solid var(--color-border)",
                }}
              >
                {t.admin.logout[lang]}
              </button>
            </div>
          ) : (
            <div>
              <button
                onClick={() => setShowAdminPanel(!showAdminPanel)}
                className="text-xs transition-colors duration-200 flex items-center gap-1"
                style={{ color: "var(--color-text-muted)" }}
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                {t.admin.title[lang]}
              </button>

              {showAdminPanel && (
                <div className="mt-3 flex items-center gap-2">
                  <input
                    type="password"
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleAdminLogin()}
                    placeholder={t.admin.passwordPlaceholder[lang]}
                    className="px-3 py-1.5 rounded-lg text-xs outline-none focus:ring-2"
                    style={{
                      backgroundColor: "var(--color-bg)",
                      border: "1px solid var(--color-border)",
                      color: "var(--color-text)",
                      // @ts-ignore
                      "--tw-ring-color": "var(--color-primary)",
                    }}
                  />
                  <button
                    onClick={handleAdminLogin}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium text-white transition-all duration-200 hover:scale-[1.02]"
                    style={{
                      background:
                        "linear-gradient(135deg, var(--color-primary), var(--color-accent))",
                    }}
                  >
                    {t.admin.login[lang]}
                  </button>
                  {adminError && (
                    <span className="text-xs" style={{ color: "#ef4444" }}>
                      {adminError}
                    </span>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
