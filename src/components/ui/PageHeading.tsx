import { useStore } from '@nanostores/react';
import { $lang } from '@/i18n/store';
export default function PageHeading({ label, title, description }: { label: string; title: {zh: string; en: string}; description: {zh: string; en: string} }) {
  const lang = useStore($lang);
  return <header className="editorial-page-header"><p className="editorial-label">{label}</p><h1>{title[lang]}</h1><p>{description[lang]}</p></header>;
}
