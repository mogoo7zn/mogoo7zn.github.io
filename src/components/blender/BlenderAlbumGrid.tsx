import { useState, useMemo } from "react";
import { useStore } from "@nanostores/react";
import { $lang } from "@/i18n/store";
import { Calendar, Tag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface PostData {
  title: string;
  titleEn?: string;
  description: string;
  descriptionEn?: string;
  pubDate: Date;
  cover?: string;
  tags?: string[];
  series?: string;
}

interface Post {
  slug: string;
  data: PostData;
}

interface BlenderAlbumGridProps {
  posts: Post[];
}

export default function BlenderAlbumGrid({ posts }: BlenderAlbumGridProps) {
  const lang = useStore($lang);
  const isEn = lang === "en";

  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Extract all unique tags
  const tags = useMemo(() => {
    const allTags = posts.flatMap((p) => p.data.tags || []);
    return Array.from(new Set(allTags));
  }, [posts]);

  // Filter posts based on selected tag
  const filteredPosts = useMemo(() => {
    return posts.filter(
      (post) => !selectedTag || (post.data.tags || []).includes(selectedTag),
    );
  }, [posts, selectedTag]);

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Sidebar / Filters (Optional: you can move it to top on mobile) */}
      <aside className="w-full lg:w-48 xl:w-64 shrink-0 space-y-8">
        {tags.length > 0 && (
          <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2 dark:text-gray-200">
              <Tag className="w-5 h-5" />
              {isEn ? "Tags" : "标签筛选"}
            </h3>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedTag(null)}
                className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                  selectedTag === null
                    ? "bg-blue-600 text-white font-medium"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
              >
                {isEn ? "All" : "全部"}
              </button>
              {tags.map((tag) => (
                <button
                  key={tag}
                  onClick={() =>
                    setSelectedTag(tag === selectedTag ? null : tag)
                  }
                  className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                    selectedTag === tag
                      ? "bg-blue-600 text-white font-medium"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}
      </aside>

      {/* Grid Layout for Cards */}
      <div className="flex-1">
        {filteredPosts.length === 0 ? (
          <div className="text-center py-20 text-gray-500 dark:text-gray-400 bg-white/50 dark:bg-gray-800/50 rounded-2xl border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm">
            {isEn ? "No notes found" : "暂无相关笔记"}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredPosts.map((post) => {
                const title = isEn
                  ? post.data.titleEn || post.data.title
                  : post.data.title;
                const date = new Date(post.data.pubDate).toLocaleDateString(
                  isEn ? "en-US" : "zh-CN",
                  { year: "numeric", month: "short", day: "numeric" },
                );

                return (
                  <motion.a
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="group flex flex-col rounded-2xl overflow-hidden shadow-sm transition-all hover:-translate-y-1 block"
                    style={{
                      backgroundColor: "var(--color-bg-card)",
                      border: "1px solid var(--color-border)",
                    }}
                  >
                    {/* Image Cover */}
                    <div
                      className="relative aspect-[4/3] w-full overflow-hidden shrink-0 border-b"
                      style={{
                        backgroundColor: "var(--color-bg-secondary)",
                        borderColor: "var(--color-border)",
                      }}
                    >
                      {post.data.cover ? (
                        <img
                          src={post.data.cover}
                          alt={title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          loading="lazy"
                        />
                      ) : (
                        <div
                          className="w-full h-full flex flex-col items-center justify-center"
                          style={{ color: "var(--color-text-muted)" }}
                        >
                          <span className="text-4xl opacity-40 mb-3 group-hover:scale-110 transition-transform duration-500">
                            🎨
                          </span>
                          <span className="text-sm font-medium opacity-60">
                            {isEn ? "Visual Note" : "视觉笔记"}
                          </span>
                        </div>
                      )}

                      {/* Overlays */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      <div className="absolute top-3 right-3 translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 ease-out">
                        <div className="bg-white/20 backdrop-blur-md p-2 rounded-full text-white shadow-sm">
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div
                      className="p-5 flex flex-col flex-1 relative"
                      style={{ backgroundColor: "var(--color-bg-card)" }}
                    >
                      <h4
                        className="text-lg font-bold mb-3 transition-colors line-clamp-2 leading-snug group-hover:text-primary"
                        style={{ color: "var(--color-text)" }}
                      >
                        {title}
                      </h4>

                      <div
                        className="flex items-center justify-between text-sm mt-auto pt-4 border-t"
                        style={{
                          color: "var(--color-text-secondary)",
                          borderColor: "var(--color-border)",
                        }}
                      >
                        <div className="flex items-center gap-1.5 font-medium">
                          <Calendar className="w-4 h-4 opacity-70" />
                          <span>{date}</span>
                        </div>
                        {post.data.tags && post.data.tags.length > 0 && (
                          <div
                            className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-md font-medium"
                            style={{
                              backgroundColor: "var(--color-bg-secondary)",
                              color: "var(--color-text)",
                            }}
                          >
                            <Tag className="w-3.5 h-3.5 opacity-70" />
                            <span>{post.data.tags[0]}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.a>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
