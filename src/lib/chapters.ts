import { getSupabaseAnonClient } from "./supabase";
import { type Post } from "@/interfaces/post";
import { buildPostHref } from "./slug";

const isSupabaseConfigured = Boolean(
  process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY
);

export async function getSeriesChapters(
  seriesSlug: string
): Promise<Post[]> {
  if (!isSupabaseConfigured) {
    return [];
  }

  const supabase = getSupabaseAnonClient();
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("series_slug", seriesSlug)
    .order("slug", { ascending: true });

  if (error) {
    console.error("Erro ao buscar capítulos da série", error);
    return [];
  }

  return (
    data?.map((row) => ({
      slug: `${row.series_slug}/${row.slug}`,
      href: buildPostHref(`${row.series_slug}/${row.slug}`),
      fileName: row.slug,
      series: row.series_slug,
      title: row.title,
      date: row.date,
      coverImage: row.cover_image,
      author: {
        name: row.author_name,
        picture: row.author_picture,
      },
      excerpt: row.excerpt,
      ogImage: {
        url: row.og_image,
      },
      content: row.content,
    })) || []
  );
}
