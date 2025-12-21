export type SeriesStatus = "em-andamento" | "completo" | "rascunho";

export type Series = {
  title: string;
  description: string;
  slug: string;
  slugPrefix?: string;
  coverImage: string;
  chaptersCount: number;
  lastUpdate: string;
  status: SeriesStatus;
};
