import { type Author } from "./author";

export type Post = {
  slug: string;
  href: string;
  fileName: string;
  series: string | null;
  title: string;
  date: string;
  coverImage: string;
  author: Author;
  excerpt: string;
  ogImage: {
    url: string;
  };
  content: string;
  preview?: boolean;
};
