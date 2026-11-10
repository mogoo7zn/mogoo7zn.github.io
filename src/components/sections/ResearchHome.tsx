import { useStore } from '@nanostores/react';
import { $lang } from '@/i18n/store';
import { profile } from '@/data/profile';
import { homepage } from '@/data/homepage';

type Paper = {
  slug: string; title: string; titleEn?: string; authors: string[];
  year?: number; status: 'published' | 'accepted' | 'preprint' | 'under-review' | 'in-preparation';
  pdf?: string; code?: string; doi?: string; arxiv?: string;
};
const statusLabels = {
  accepted: { zh: '已接收', en: 'Accepted' },
  published: { zh: '已发表', en: 'Published' },
  preprint: { zh: '预印本', en: 'Preprint' },
  'under-review': { zh: '审稿中', en: 'Under review' },
  'in-preparation': { zh: '准备中', en: 'In preparation' },
};
export default function ResearchHome({ papers }: { papers: Paper[] }) {
  const lang = useStore($lang);
  const zh = lang === 'zh';
  return <main className="research-home">
    <header className="research-intro">
      <div>
        <h1>{profile.realName[lang]} <span>{profile.realName[zh ? 'en' : 'zh']}</span></h1>
        <p className="research-affiliation">{profile.title[lang]}</p>
        <p className="research-summary">{homepage.summary[lang]}</p>
        <p className="research-summary secondary">{homepage.perspective[lang]}</p>
        <ul className="research-education" aria-label={zh ? '教育经历' : 'Education'}>
          {[profile.doctorate, profile].map(({ university, major, degree }) => (
            <li key={degree.en}>
              <span className="research-degree">{degree[lang]}</span>{' '}
              <span>{university[lang]} · {major[lang]}</span>
            </li>
          ))}
        </ul>
        <div className="research-links"><a href="/publications">{zh ? '论文与预印本' : 'Publications'} ↗</a><a href="/projects">{zh ? '研究项目' : 'Projects'} ↗</a><a href="/blog">{zh ? '研究笔记' : 'Writing'} ↗</a></div>
      </div>
      <aside className="research-identity">
        <img className="theme-avatar-light" src={profile.avatar} alt={profile.realName[lang]} width="128" height="128" />
        <img className="theme-avatar-dark" src={profile.avatarDark} alt={profile.realName[lang]} width="128" height="128" />
        <a href={`mailto:${profile.email}`}>{profile.email}</a>
        <a href={profile.github} target="_blank" rel="noopener noreferrer">GitHub / {profile.githubHandle} ↗</a>
      </aside>
    </header>

    <section className="research-section" id={homepage.sections[0].id}>
      <div className="research-section-label"><span>{homepage.sections[0].eyebrow}</span><h2>{homepage.sections[0].label[lang]}</h2></div>
      <div className="research-section-body research-topics">{profile.researchInterests.map(area => <article key={area.icon}><h3>{area.title[lang]}</h3><p>{area.description[lang]}</p></article>)}</div>
    </section>

    <section className="research-section" id={homepage.sections[1].id}>
      <div className="research-section-label"><span>{homepage.sections[1].eyebrow}</span><h2>{homepage.sections[1].label[lang]}</h2><a href="/publications">{zh ? '全部论文' : 'All publications'} →</a></div>
      <div className="research-section-body">
        {papers.map(paper => <article className="research-paper" key={paper.slug}>
          <div className="research-paper-meta"><span>{paper.year}</span><span>{statusLabels[paper.status][lang]}</span></div>
          <h3><a href={`/publications/${paper.slug}`}>{lang === 'en' ? paper.titleEn || paper.title : paper.title}</a></h3>
          <p className="research-authors">{paper.authors.map((author, i) => <span key={`${author}-${i}`}>{i > 0 && ', '}{author.includes('Zining Wang') || author.includes('王子宁') ? <strong>{author}</strong> : author}</span>)}</p>
          <div className="research-links"><a href={`/publications/${paper.slug}`}>{zh ? '研究详情' : 'Details'} →</a>{paper.pdf && <a href={paper.pdf} target="_blank" rel="noopener noreferrer">PDF ↗</a>}{paper.doi && <a href={paper.doi.startsWith('http') ? paper.doi : `https://doi.org/${paper.doi}`} target="_blank" rel="noopener noreferrer">{paper.doi.includes('biorxiv') ? 'bioRxiv' : 'DOI'} ↗</a>}{paper.arxiv && <a href={paper.arxiv} target="_blank" rel="noopener noreferrer">arXiv ↗</a>}{paper.code && <a href={paper.code} target="_blank" rel="noopener noreferrer">Code ↗</a>}</div>
        </article>)}
      </div>
    </section>

    <section className="research-section" id={homepage.sections[2].id}>
      <div className="research-section-label"><span>{homepage.sections[2].eyebrow}</span><h2>{homepage.sections[2].label[lang]}</h2></div>
      <div className="research-section-body"><p>{homepage.notes.description[lang]}</p><a className="research-blog-link" href={homepage.notes.href}>{homepage.notes.link[lang]} <span aria-hidden="true">→</span></a></div>
    </section>
  </main>;
}
