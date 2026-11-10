export interface Publication {
  id: string;
  title: { zh: string; en: string };
  authors: { name: string; isMe?: boolean }[];
  venue: { zh: string; en: string };
  year: number;
  abstract?: { zh: string; en: string };
  doi?: string;
  arxiv?: string;
  pdf?: string;
  code?: string;
  tags: string[];
  status: "published" | "accepted" | "preprint" | "under-review" | "in-preparation";
}
