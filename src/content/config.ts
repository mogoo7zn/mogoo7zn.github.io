import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    titleEn: z.string().optional(),
    description: z.string(),
    descriptionEn: z.string().optional(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    cover: z.string().optional(),
    series: z.string().optional(),
  }),
});

const publications = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    titleEn: z.string().optional(),
    authors: z.array(z.string()).default([]),
    venue: z.string().optional(),
    venueEn: z.string().optional(),
    year: z.number().optional(),
    pubDate: z.coerce.date().optional(),
    doi: z.string().optional(),
    arxiv: z.string().optional(),
    pdf: z.string().optional(),
    code: z.string().optional(),
    tags: z.array(z.string()).default([]),
    status: z
      .enum(["published", "preprint", "under-review"])
      .default("published"),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog, publications };
