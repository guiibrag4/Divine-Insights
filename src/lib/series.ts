import { type DbSeries } from "@/interfaces/db";
import { type Series } from "@/interfaces/series";
import { getSupabaseAnonClient } from "./supabase";

const isSupabaseConfigured = Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY);

const fallbackSeries: Series[] = [
  {
    title: "1 João",
    description:
      "Estudo completo sobre comunhão, luz e amor. Explore os ensinamentos profundos do apóstolo João sobre como viver em verdadeira comunhão com Deus e com os irmãos.",
    slug: "1joao/1joao-00-indice",
    slugPrefix: "1joao",
    coverImage: "/assets/blog/estudos/1joao-cover.png",
    chaptersCount: 2,
    lastUpdate: "2025-12-20T09:00:00.000Z",
    status: "em-andamento",
  },
  {
    title: "Tiago",
    description:
      "A fé prática e viva. Descubra como aplicar a palavra de Deus no dia a dia através dos ensinamentos diretos e transformadores do apóstolo Tiago.",
    slug: "tiago/tiago-00-indice",
    slugPrefix: "tiago",
    coverImage: "/assets/blog/estudos/tiago-cover.png",
    chaptersCount: 4,
    lastUpdate: "2025-12-21T10:00:00.000Z",
    status: "completo",
  },
];

function mapDbSeriesToSeries(row: DbSeries): Series {
  return {
    title: row.title,
    description: row.description,
    slug: row.index_slug || row.slug,
    slugPrefix: row.slug_prefix,
    coverImage: row.cover_image,
    chaptersCount: row.chapters_count,
    lastUpdate: row.updated_at,
    status: row.status,
  };
}

export async function getAllSeries(): Promise<Series[]> {
  if (!isSupabaseConfigured) return fallbackSeries;

  const supabase = getSupabaseAnonClient();
  const { data, error } = await supabase
    .from("series")
    .select("*")
    .order("updated_at", { ascending: false });

  if (error) {
    console.error("Erro ao buscar séries no Supabase", error);
    return fallbackSeries;
  }

  return (data || []).map(mapDbSeriesToSeries);
}
