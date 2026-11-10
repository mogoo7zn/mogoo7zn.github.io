import { useStore } from '@nanostores/react';
import { $lang } from '@/i18n/store';
import BlenderAlbumGrid from '@/components/blender/BlenderAlbumGrid';
import type { blogSeries } from '@/data/blogSeries';
interface Props {
  series: typeof blogSeries[number];
  posts: { slug: string; title: string; titleEn?: string; description: string; descriptionEn?: string; date: string; cover?: string; tags: string[] }[];
}
export default function SeriesIndex({ series, posts }: Props) {
  const lang = useStore($lang);
  const zh = lang === 'zh';
  return <main className="editorial-page series-page">
    <a href="/blog" className="text-sm" style={{ color: 'var(--color-primary)' }}>← {zh ? '全部文章' : 'All posts'}</a>
    <header className="editorial-page-header mt-10" style={{ borderColor: 'var(--color-border)' }}>
      <p className="mb-4 text-xs uppercase tracking-widest" style={{ color: 'var(--color-text-muted)' }}>{series.title.en} · {posts.length} {zh ? '篇' : 'posts'}</p>
      <h1 className="text-3xl md:text-4xl font-semibold leading-tight">{series.title[lang]}</h1>
      <p className="mt-6 leading-8" style={{ color: 'var(--color-text-secondary)' }}>{series.description[lang]}</p>
    </header>
    {posts.length === 0 && <p className="series-empty">{zh ? '本系列正在整理，文章发布后将显示在这里。' : 'This series is being prepared. Published notes will appear here.'}</p>}
    {series.layout === 'gallery' ? <BlenderAlbumGrid posts={posts.map(post => ({ slug: post.slug, data: { ...post, pubDate: new Date(post.date) } }))} placeholder={{ emoji: '◇', zh: '视觉笔记', en: 'Visual note' }} /> : <ol>{posts.map((post, index) => <li key={post.slug} className="border-b py-8" style={{ borderColor: 'var(--color-border)' }}>
      <div className="mb-3 text-xs" style={{ color: 'var(--color-text-muted)' }}>{String(index + 1).padStart(2, '0')} · <time dateTime={post.date}>{post.date}</time></div>
      <h2 className="text-xl font-medium"><a href={`/blog/${post.slug}`} className="hover:underline underline-offset-4">{zh ? post.title : post.titleEn || post.title} →</a></h2>
      <p className="mt-3 text-sm leading-7" style={{ color: 'var(--color-text-secondary)' }}>{zh ? post.description : post.descriptionEn || post.description}</p>
    </li>)}</ol>}
  </main>;
}
