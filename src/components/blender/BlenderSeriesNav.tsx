import { useStore } from "@nanostores/react";
import { $lang } from "@/i18n/store";
import { ChevronLeft, ChevronRight, Layers } from "lucide-react";

interface PostBrief {
  slug: string;
  title: string;
  titleEn?: string;
}

interface Props {
  currentIndex: number;
  total: number;
  prevPost: PostBrief | null;
  nextPost: PostBrief | null;
}

export default function BlenderSeriesNav({
  currentIndex,
  total,
  prevPost,
  nextPost,
}: Props) {
  const lang = useStore($lang);
  const isEn = lang === "en";

  return (
    <div className="my-8 p-6 rounded-2xl bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200/50 dark:border-blue-800/50 flex flex-col items-center text-center sm:text-left sm:items-start overflow-hidden relative">
      <div className="absolute -top-10 -right-10 opacity-5 dark:opacity-10 pointer-events-none">
        <Layers className="w-48 h-48 text-blue-500" />
      </div>

      <div className="flex items-center gap-2 mb-4 text-blue-700 dark:text-blue-300 relative z-10">
        <Layers className="w-5 h-5" />
        <span className="font-semibold text-sm tracking-wide uppercase">
          {isEn ? "Blender Note Series" : "Blender 笔记专辑"}
        </span>
        <span className="text-xs bg-blue-100 dark:bg-blue-800/50 px-2 py-0.5 rounded-full ml-2">
          {currentIndex} / {total}
        </span>
      </div>

      <div className="flex flex-col sm:flex-row w-full justify-between items-stretch gap-4 relative z-10 mt-2">
        {prevPost ? (
          <a
            href={`/blog/${prevPost.slug}`}
            className="flex-1 p-4 rounded-xl bg-white/60 dark:bg-gray-800/60 hover:bg-white dark:hover:bg-gray-800 transition-colors border border-gray-100 dark:border-gray-700/50 group flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <ChevronLeft className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
              <div className="text-left">
                <div className="text-xs text-gray-500 mb-1">
                  {isEn ? "Previous Note" : "上一篇"}
                </div>
                <div className="font-medium text-gray-800 dark:text-gray-200 line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  {isEn ? prevPost.titleEn || prevPost.title : prevPost.title}
                </div>
              </div>
            </div>
          </a>
        ) : (
          <div className="flex-1 opacity-50" />
        )}

        {nextPost ? (
          <a
            href={`/blog/${nextPost.slug}`}
            className="flex-1 p-4 rounded-xl bg-white/60 dark:bg-gray-800/60 hover:bg-white dark:hover:bg-gray-800 transition-colors border border-gray-100 dark:border-gray-700/50 group flex items-center justify-between text-right"
          >
            <div className="flex items-center gap-3 w-full justify-end">
              <div className="text-right">
                <div className="text-xs text-gray-500 mb-1">
                  {isEn ? "Next Note" : "下一篇"}
                </div>
                <div className="font-medium text-gray-800 dark:text-gray-200 line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  {isEn ? nextPost.titleEn || nextPost.title : nextPost.title}
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
            </div>
          </a>
        ) : (
          <div className="flex-1 opacity-50" />
        )}
      </div>
    </div>
  );
}
