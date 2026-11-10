import { useStore } from '@nanostores/react';
import { $lang } from '@/i18n/store';
interface PostBrief { slug: string; title: string; titleEn?: string }
interface Props { seriesLabel: {zh: string; en: string}; currentIndex: number; total: number; prevPost: PostBrief | null; nextPost: PostBrief | null }
export default function SeriesNav({ seriesLabel, currentIndex, total, prevPost, nextPost }: Props) {
  const lang = useStore($lang);
  return <nav className="series-navigation not-prose" aria-label={lang === 'zh' ? '系列文章导航' : 'Series navigation'}>
    <div className="series-navigation-title"><span>{seriesLabel[lang]}</span><span>{currentIndex} / {total}</span></div>
    {(prevPost || nextPost) && <div className="series-navigation-links">{[prevPost, nextPost].map((post, index) => post ? <a key={post.slug} href={`/blog/${post.slug}`}><small>{index === 0 ? (lang === 'zh' ? '← 上一篇' : '← Previous') : (lang === 'zh' ? '下一篇 →' : 'Next →')}</small><span>{lang === 'en' ? post.titleEn || post.title : post.title}</span></a> : <span key={index} />)}</div>}
  </nav>;
}
