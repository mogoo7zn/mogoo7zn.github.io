import { useState, useMemo } from "react";
import { useStore } from "@nanostores/react";
import { $lang } from "@/i18n/store";
import { Layers } from "lucide-react";

interface Props {
  posts: {
    slug: string;
    data: {
      title: string;
      titleEn?: string;
      description: string;
      descriptionEn?: string;
      pubDate: Date;
      tags: string[];
      isAlbum?: boolean;
      folderCount?: number;
    };
  }[];
}

export default function PostList({ posts }: Props) {
  const lang = useStore($lang);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

  // Extract tags and their counts
  const tagsWithCount = useMemo(() => {
    const counts: Record<string, number> = {};
    posts.forEach((post) => {
      post.data.tags.forEach((tag) => {
        counts[tag] = (counts[tag] || 0) + 1;
      });
    });
    return Object.entries(counts).sort((a, b) => b[1] - a[1]);
  }, [posts]);

  // Extract years and their counts
  const yearsWithCount = useMemo(() => {
    const counts: Record<number, number> = {};
    posts.forEach((post) => {
      const year = new Date(post.data.pubDate).getFullYear();
      counts[year] = (counts[year] || 0) + 1;
    });
    return Object.entries(counts)
      .map(([year, count]) => [parseInt(year), count] as const)
      .sort((a, b) => b[0] - a[0]);
  }, [posts]);

  // Filter posts
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const title =
        lang === "en" && post.data.titleEn
          ? post.data.titleEn
          : post.data.title;
      const desc =
        lang === "en" && post.data.descriptionEn
          ? post.data.descriptionEn
          : post.data.description;
      const year = new Date(post.data.pubDate).getFullYear();

      const matchesSearch =
        searchQuery === "" ||
        title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.data.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase()),
        );

      const matchesTag =
        selectedTag === null || post.data.tags.includes(selectedTag);
      const matchesYear = selectedYear === null || year === selectedYear;

      return matchesSearch && matchesTag && matchesYear;
    });
  }, [posts, searchQuery, selectedTag, selectedYear, lang]);

  // Reset page when filters change
  useMemo(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedTag, selectedYear]);

  // Paginate posts
  const paginatedPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * postsPerPage;
    return filteredPosts.slice(startIndex, startIndex + postsPerPage);
  }, [filteredPosts, currentPage]);

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const t = {
    searchPlaceholder: lang === "zh" ? "搜索文章..." : "Search posts...",
    categories: lang === "zh" ? "文章标签" : "Categories",
    timeline: lang === "zh" ? "时间轴" : "Timeline",
    noPosts: lang === "zh" ? "没有匹配的文章" : "No matching posts found",
    clearFilters: lang === "zh" ? "清除筛选" : "Clear filters",
    readMore: lang === "zh" ? "阅读全文" : "Read more",
    all: lang === "zh" ? "全部" : "All",
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Sidebar */}
      <aside className="w-full lg:w-64 shrink-0 space-y-8">
        {/* Search */}
        <div className="relative">
          <input
            type="text"
            placeholder={t.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl text-sm transition-all duration-300 outline-none"
            style={{
              backgroundColor: "var(--color-bg-card)",
              border: "1px solid var(--color-border)",
              color: "var(--color-text)",
            }}
          />
          <svg
            className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-50"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {/* Tags */}
        <div>
          <h3
            className="text-lg font-semibold mb-4 flex items-center gap-2"
            style={{ color: "var(--color-text)" }}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
              />
            </svg>
            {t.categories}
          </h3>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedTag(null)}
              className={`text-xs px-3 py-1.5 rounded-full transition-all duration-300 ${
                selectedTag === null
                  ? "shadow-sm"
                  : "opacity-70 hover:opacity-100"
              }`}
              style={{
                backgroundColor:
                  selectedTag === null
                    ? "var(--color-primary)"
                    : "var(--color-bg-secondary)",
                color: selectedTag === null ? "white" : "var(--color-text)",
              }}
            >
              {t.all}
            </button>
            {tagsWithCount.map(([tag, count]) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`text-xs px-3 py-1.5 rounded-full transition-all duration-300 flex items-center gap-1.5 ${
                  selectedTag === tag
                    ? "shadow-sm"
                    : "opacity-70 hover:opacity-100"
                }`}
                style={{
                  backgroundColor:
                    selectedTag === tag
                      ? "var(--color-primary)"
                      : "var(--color-bg-secondary)",
                  color: selectedTag === tag ? "white" : "var(--color-text)",
                }}
              >
                <span>{tag}</span>
                <span className="opacity-60 text-[10px]">{count}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div>
          <h3
            className="text-lg font-semibold mb-4 flex items-center gap-2"
            style={{ color: "var(--color-text)" }}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            {t.timeline}
          </h3>
          <div className="space-y-2">
            <button
              onClick={() => setSelectedYear(null)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-300 ${
                selectedYear === null
                  ? "font-medium"
                  : "opacity-70 hover:opacity-100 hover:bg-black/5 dark:hover:bg-white/5"
              }`}
              style={{
                backgroundColor:
                  selectedYear === null
                    ? "var(--color-bg-secondary)"
                    : "transparent",
                color: "var(--color-text)",
              }}
            >
              {t.all}
            </button>
            {yearsWithCount.map(([year, count]) => (
              <button
                key={year}
                onClick={() => setSelectedYear(year)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all duration-300 ${
                  selectedYear === year
                    ? "font-medium"
                    : "opacity-70 hover:opacity-100 hover:bg-black/5 dark:hover:bg-white/5"
                }`}
                style={{
                  backgroundColor:
                    selectedYear === year
                      ? "var(--color-bg-secondary)"
                      : "transparent",
                  color: "var(--color-text)",
                }}
              >
                <span>{year}</span>
                <span className="text-xs opacity-60 bg-black/5 dark:bg-white/10 px-2 py-0.5 rounded-full">
                  {count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1">
        {/* Active Filters */}
        {(searchQuery || selectedTag || selectedYear) && (
          <div
            className="flex items-center justify-between mb-6 pb-4 border-b"
            style={{ borderColor: "var(--color-border)" }}
          >
            <div
              className="flex flex-wrap items-center gap-2 text-sm"
              style={{ color: "var(--color-text-secondary)" }}
            >
              <span>
                {filteredPosts.length}{" "}
                {lang === "zh" ? "篇文章" : "posts found"}
              </span>
              {selectedTag && (
                <span
                  className="px-2 py-1 rounded-md text-xs"
                  style={{ backgroundColor: "var(--color-bg-secondary)" }}
                >
                  #{selectedTag}
                </span>
              )}
              {selectedYear && (
                <span
                  className="px-2 py-1 rounded-md text-xs"
                  style={{ backgroundColor: "var(--color-bg-secondary)" }}
                >
                  {selectedYear}
                </span>
              )}
              {searchQuery && (
                <span
                  className="px-2 py-1 rounded-md text-xs"
                  style={{ backgroundColor: "var(--color-bg-secondary)" }}
                >
                  "{searchQuery}"
                </span>
              )}
            </div>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedTag(null);
                setSelectedYear(null);
              }}
              className="text-sm hover:underline opacity-70 hover:opacity-100 transition-opacity"
              style={{ color: "var(--color-primary)" }}
            >
              {t.clearFilters}
            </button>
          </div>
        )}

        {/* Post List */}
        {filteredPosts.length === 0 ? (
          <div
            className="text-center py-20 rounded-2xl border border-dashed"
            style={{ borderColor: "var(--color-border)" }}
          >
            <svg
              className="w-12 h-12 mx-auto mb-4 opacity-20"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
            <p style={{ color: "var(--color-text-muted)" }}>{t.noPosts}</p>
          </div>
        ) : (
          <div className="space-y-6">
            {paginatedPosts.map((post) => {
              if (post.data.isAlbum) {
                return (
                  <article
                    key={post.slug}
                    className="group relative rounded-2xl p-0.5 transition-all duration-500 hover:-translate-y-2 mt-6 mb-8"
                    style={{
                      background:
                        "linear-gradient(135deg, var(--color-border), var(--color-primary), var(--color-border))",
                      boxShadow: "0 10px 30px -5px rgba(0, 0, 0, 0.08)",
                    }}
                  >
                    <a
                      href={`/blog/${post.slug}`}
                      className="absolute inset-0 z-30"
                    >
                      <span className="sr-only">View Album</span>
                    </a>
                    {/* Layer hints to look like a stack of cards */}
                    <div
                      className="absolute -top-3 inset-x-4 h-6 rounded-xl transform -z-20 group-hover:-translate-y-1 transition-transform duration-500"
                      style={{
                        backgroundColor: "var(--color-bg-secondary)",
                        border: "1px solid var(--color-border)",
                        opacity: 0.6,
                      }}
                    ></div>
                    <div
                      className="absolute -top-1.5 inset-x-2 h-6 rounded-xl transform -z-10 group-hover:-translate-y-0.5 transition-transform duration-500"
                      style={{
                        backgroundColor: "var(--color-bg-secondary)",
                        border: "1px solid var(--color-border)",
                        opacity: 0.8,
                      }}
                    ></div>

                    <div
                      className="relative z-10 rounded-[14px] p-6 sm:p-8 h-full backdrop-blur-md overflow-hidden"
                      style={{
                        backgroundColor: "var(--color-bg-card)",
                        border: "1px solid var(--color-border)",
                      }}
                    >
                      <div
                        className="absolute top-0 right-0 p-8 opacity-[0.02] dark:opacity-[0.03] group-hover:scale-110 group-hover:opacity-[0.04] dark:group-hover:opacity-[0.05] transition-all duration-700 pointer-events-none"
                        style={{ color: "var(--color-text)" }}
                      >
                        <Layers className="w-32 h-32" />
                      </div>

                      <div className="flex items-center gap-3 mb-4">
                        <div
                          className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-widest shadow-sm uppercase"
                          style={{
                            backgroundColor: "var(--color-primary)",
                            color: "white",
                          }}
                        >
                          <Layers className="w-3.5 h-3.5" />
                          ALBUM SERIES
                        </div>
                        <time
                          className="text-xs"
                          style={{ color: "var(--color-text-muted)" }}
                        >
                          {lang === "zh" ? "最近更新: " : "Updated: "}
                          {new Date(post.data.pubDate).toLocaleDateString(
                            lang === "zh" ? "zh-CN" : "en-US",
                            { year: "numeric", month: "long", day: "numeric" },
                          )}
                        </time>
                      </div>

                      <h2
                        className="text-2xl md:text-3xl font-bold mb-3 transition-colors group-hover:text-primary"
                        style={{ color: "var(--color-text)" }}
                      >
                        {lang === "en" && post.data.titleEn
                          ? post.data.titleEn
                          : post.data.title}
                      </h2>

                      <p
                        className="text-sm md:text-base mb-6 max-w-2xl"
                        style={{
                          color: "var(--color-text-secondary)",
                          lineHeight: 1.6,
                        }}
                      >
                        {lang === "en" && post.data.descriptionEn
                          ? post.data.descriptionEn
                          : post.data.description}
                      </p>

                      <div
                        className="flex items-center justify-between mt-auto pt-5 border-t"
                        style={{ borderColor: "var(--color-border)" }}
                      >
                        <div className="flex items-center gap-4">
                          <div
                            className="flex items-center gap-2 text-sm font-medium"
                            style={{ color: "var(--color-text-secondary)" }}
                          >
                            <span
                              className="w-6 h-6 rounded-full flex items-center justify-center font-bold"
                              style={{
                                backgroundColor: "var(--color-bg-secondary)",
                                color: "var(--color-text)",
                                border: "1px solid var(--color-border)",
                              }}
                            >
                              {post.data.folderCount || 0}
                            </span>
                            <span>{lang === "zh" ? "篇内容" : "Items"}</span>
                          </div>
                        </div>
                        <span
                          className="text-sm font-semibold flex items-center gap-1.5 group-hover:translate-x-1 transition-all duration-300"
                          style={{ color: "var(--color-primary)" }}
                        >
                          {lang === "zh" ? "浏览专辑" : "Explore Album"}
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2.5}
                              d="M14 5l7 7m0 0l-7 7m7-7H3"
                            />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </article>
                );
              }

              return (
                <article
                  key={post.slug}
                  className="group relative rounded-2xl p-6 transition-all duration-500 hover:-translate-y-1"
                  style={{
                    backgroundColor: "var(--color-bg-card)",
                    border: "1px solid var(--color-border)",
                    boxShadow: "0 4px 20px -2px rgba(0,0,0,0.05)",
                  }}
                >
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  <div className="relative z-10">
                    <div
                      className="flex items-center gap-3 mb-3 text-xs"
                      style={{ color: "var(--color-text-muted)" }}
                    >
                      <time className="flex items-center gap-1.5">
                        <svg
                          className="w-3.5 h-3.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        {new Date(post.data.pubDate).toLocaleDateString(
                          lang === "zh" ? "zh-CN" : "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          },
                        )}
                      </time>
                      <span className="w-1 h-1 rounded-full bg-current opacity-30" />
                      <span className="flex items-center gap-1.5">
                        <svg
                          className="w-3.5 h-3.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                          />
                        </svg>
                        {Math.max(
                          1,
                          Math.ceil(
                            (lang === "en" && post.data.descriptionEn
                              ? post.data.descriptionEn
                              : post.data.description
                            ).length / 200,
                          ),
                        )}{" "}
                        {lang === "zh" ? "分钟阅读" : "min read"}
                      </span>
                    </div>

                    <h2
                      className="text-xl md:text-2xl font-bold mb-3 transition-colors group-hover:text-primary"
                      style={{ color: "var(--color-text)" }}
                    >
                      <a
                        href={`/blog/${post.slug}`}
                        className="focus:outline-none"
                      >
                        <span className="absolute inset-0" aria-hidden="true" />
                        {lang === "en" && post.data.titleEn
                          ? post.data.titleEn
                          : post.data.title}
                      </a>
                    </h2>

                    <p
                      className="text-sm md:text-base mb-5 line-clamp-2"
                      style={{
                        color: "var(--color-text-secondary)",
                        lineHeight: 1.6,
                      }}
                    >
                      {lang === "en" && post.data.descriptionEn
                        ? post.data.descriptionEn
                        : post.data.description}
                    </p>

                    <div
                      className="flex items-center justify-between mt-auto pt-4 border-t"
                      style={{ borderColor: "var(--color-border)" }}
                    >
                      <div className="flex flex-wrap gap-2 relative z-20">
                        {post.data.tags.map((tag) => (
                          <button
                            key={tag}
                            onClick={(e) => {
                              e.preventDefault();
                              setSelectedTag(tag);
                            }}
                            className="text-xs px-2.5 py-1 rounded-md transition-colors hover:bg-primary hover:text-white"
                            style={{
                              backgroundColor: "var(--color-bg-secondary)",
                              color: "var(--color-text-muted)",
                            }}
                          >
                            #{tag}
                          </button>
                        ))}
                      </div>
                      <span
                        className="text-sm font-medium flex items-center gap-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                        style={{ color: "var(--color-primary)" }}
                      >
                        {t.readMore}
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
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                          />
                        </svg>
                      </span>
                    </div>
                  </div>
                </article>
              );
            })}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 pt-8">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:bg-black/5 dark:hover:bg-white/5"
                  style={{ color: "var(--color-text)" }}
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>

                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                          currentPage === page
                            ? "shadow-sm"
                            : "hover:bg-black/5 dark:hover:bg-white/5"
                        }`}
                        style={{
                          backgroundColor:
                            currentPage === page
                              ? "var(--color-primary)"
                              : "transparent",
                          color:
                            currentPage === page
                              ? "white"
                              : "var(--color-text)",
                        }}
                      >
                        {page}
                      </button>
                    ),
                  )}
                </div>

                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:bg-black/5 dark:hover:bg-white/5"
                  style={{ color: "var(--color-text)" }}
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
