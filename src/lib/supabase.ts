import { createClient } from "@supabase/supabase-js";
import type { User } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY || "";

export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

/* ─────────── GitHub OAuth ─────────── */

export interface GitHubUser {
  id: string;
  username: string;
  avatarUrl: string;
  email?: string;
}

/**
 * Extract GitHub profile from Supabase user object.
 */
export function extractGitHubUser(user: User): GitHubUser | null {
  const meta = user.user_metadata;
  if (!meta) return null;
  return {
    id: user.id,
    username:
      meta.user_name ||
      meta.preferred_username ||
      meta.full_name ||
      "GitHub User",
    avatarUrl: meta.avatar_url || "",
    email: user.email,
  };
}

/**
 * Sign in with GitHub OAuth (redirect flow).
 * After login, user is redirected back to the current page.
 */
export async function signInWithGitHub(): Promise<void> {
  if (!supabase) return;
  const redirectTo = window.location.href;
  await supabase.auth.signInWithOAuth({
    provider: "github",
    options: { redirectTo },
  });
}

/**
 * Sign out the current user.
 */
export async function signOut(): Promise<void> {
  if (!supabase) return;
  await supabase.auth.signOut();
}

/**
 * Get the currently logged-in user (if any).
 */
export async function getCurrentUser(): Promise<GitHubUser | null> {
  if (!supabase) return null;
  const { data } = await supabase.auth.getUser();
  if (!data.user) return null;
  return extractGitHubUser(data.user);
}

/* ─────────── Fingerprint (for rate limiting) ─────────── */

/**
 * Generate a lightweight browser fingerprint for rate limiting.
 * Not meant for tracking — just enough to throttle abuse.
 */
export function getFingerprint(): string {
  if (typeof window === "undefined") return "ssr";
  const data = [
    navigator.userAgent,
    screen.width + "x" + screen.height,
    Intl.DateTimeFormat().resolvedOptions().timeZone,
    navigator.language,
    new Date().getTimezoneOffset().toString(),
  ].join("|");

  let hash = 0;
  for (let i = 0; i < data.length; i++) {
    const char = data.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit int
  }
  return "fp_" + Math.abs(hash).toString(36);
}

/* ─────────── Spam detection ─────────── */

/**
 * Basic client-side spam detection.
 * Returns an error message if the content looks like spam, or null if clean.
 */
export function detectSpam(content: string): string | null {
  // Check for excessive URLs (more than 3 links)
  const urlPattern = /https?:\/\/[^\s]+/gi;
  const urlCount = (content.match(urlPattern) || []).length;
  if (urlCount > 3) return "评论包含过多链接 / Too many links";

  // Check for repeated characters (e.g., "aaaaaaaaaa")
  if (/(.)\1{9,}/i.test(content))
    return "评论包含过多重复字符 / Too many repeated characters";

  // Check for all-caps (if content is mostly Latin characters)
  const latinChars = content.replace(/[^a-zA-Z]/g, "");
  if (latinChars.length > 20 && latinChars === latinChars.toUpperCase()) {
    return "请不要全部使用大写字母 / Please don't use all caps";
  }

  // Check for common spam keywords
  const spamPatterns = [
    /\b(viagra|casino|lottery|winner|prize|click here|buy now|free money)\b/i,
    /\b(earn \$|make money fast|work from home offer)\b/i,
  ];
  for (const pattern of spamPatterns) {
    if (pattern.test(content))
      return "评论内容疑似垃圾信息 / Content appears to be spam";
  }

  return null;
}
