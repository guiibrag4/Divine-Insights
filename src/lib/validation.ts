import { z } from "zod";

export const FrontmatterSchema = z.object({
  title: z.string(),
  excerpt: z.string(),
  date: z.string(),
  coverImage: z.string(),
  author: z.object({
    name: z.string(),
    picture: z.string(),
  }),
  ogImage: z
    .object({
      url: z.string(),
    })
    .optional(),
});

export type Frontmatter = z.infer<typeof FrontmatterSchema>;
