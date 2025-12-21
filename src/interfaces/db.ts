export type DbSeriesStatus = "em-andamento" | "completo" | "rascunho";

export type DbSeries = {
  id: string;
  slug: string; // slug completo para a página índice (ex: "tiago/tiago-00-indice")
  slug_prefix: string; // prefixo usado pelos posts da série (ex: "tiago")
  index_slug?: string; // opcional se quiser manter separado o slug da página índice
  title: string;
  description: string;
  cover_image: string;
  status: DbSeriesStatus;
  chapters_count: number;
  updated_at: string;
};

export type DbPost = {
  id: string;
  series_slug: string; // referência à série por slug para simplificar
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  cover_image: string;
  og_image: string;
  date: string;
  author_name: string;
  author_picture: string;
  created_at?: string;
  updated_at?: string;
};
