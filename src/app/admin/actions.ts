"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { getSupabaseServiceClient } from "@/lib/supabase";

const seriesSchema = z.object({
  title: z.string().min(3),
  slugPrefix: z.string().min(2),
  indexSlug: z.string().min(3).optional(),
  description: z.string().min(5),
  coverImage: z.string().min(1),
  status: z.enum(["em-andamento", "completo", "rascunho"]),
  chaptersCount: z.coerce.number().int().nonnegative(),
});

export async function upsertSeriesAction(formData: FormData): Promise<void> {
  const parsed = seriesSchema.parse({
    title: formData.get("title"),
    slugPrefix: formData.get("slugPrefix"),
    indexSlug: formData.get("indexSlug"),
    description: formData.get("description"),
    coverImage: formData.get("coverImage"),
    status: formData.get("status"),
    chaptersCount: formData.get("chaptersCount"),
  });

  const indexSlug = parsed.indexSlug || `${parsed.slugPrefix}/${parsed.slugPrefix}-00-indice`;

  const supabase = getSupabaseServiceClient();
  const { error } = await supabase.from("series").upsert({
    title: parsed.title,
    slug: indexSlug,
    slug_prefix: parsed.slugPrefix,
    index_slug: indexSlug,
    description: parsed.description,
    cover_image: parsed.coverImage,
    status: parsed.status,
    chapters_count: parsed.chaptersCount,
    updated_at: new Date().toISOString(),
  });

  if (error) {
    console.error("Erro ao salvar série", error);
    throw new Error(error.message);
  }

  revalidatePath("/");
}

const postSchema = z.object({
  seriesSlug: z.string().min(2),
  slug: z.string().min(3),
  title: z.string().min(3),
  excerpt: z.string().min(10),
  content: z.string().min(10),
  coverImage: z.string().min(1),
  ogImage: z.string().min(1).optional(),
  date: z.string().min(4),
  authorName: z.string().min(2),
  authorPicture: z.string().min(1),
});

export async function upsertPostAction(formData: FormData): Promise<void> {
  try {
    const parsed = postSchema.parse({
      seriesSlug: formData.get("seriesSlug"),
      slug: formData.get("slug"),
      title: formData.get("title"),
      excerpt: formData.get("excerpt"),
      content: formData.get("content"),
      coverImage: formData.get("coverImage"),
      ogImage: formData.get("ogImage") || formData.get("coverImage"),
      date: formData.get("date"),
      authorName: formData.get("authorName"),
      authorPicture: formData.get("authorPicture"),
    });

  const supabase = getSupabaseServiceClient();
  
  // Salvar o post
  const { error } = await supabase.from("posts").upsert({
    series_slug: parsed.seriesSlug,
    slug: parsed.slug,
    title: parsed.title,
    excerpt: parsed.excerpt,
    content: parsed.content,
    cover_image: parsed.coverImage,
    og_image: parsed.ogImage ?? parsed.coverImage,
    date: parsed.date,
    author_name: parsed.authorName,
    author_picture: parsed.authorPicture,
    updated_at: new Date().toISOString(),
  });

  if (error) {
    console.error("Erro ao salvar post", error);
    throw new Error(error.message);
  }

  // Atualizar contador de capítulos da série
  const { data: posts } = await supabase
    .from("posts")
    .select("id")
    .eq("series_slug", parsed.seriesSlug);

  const chaptersCount = posts?.length || 0;

  await supabase
    .from("series")
    .update({ chapters_count: chaptersCount, updated_at: new Date().toISOString() })
    .eq("slug_prefix", parsed.seriesSlug);

  // Revalidar todas as páginas relevantes
  revalidatePath("/", "layout");
  revalidatePath(`/posts/${parsed.seriesSlug}/${parsed.slug}`, "page");
  
  } catch (err: any) {
    console.error("Erro ao salvar post:", err);
    throw new Error(err.message || "Erro ao salvar capítulo. Verifique os campos.");
  }
  
  // Redirecionar para home para ver o resultado
  redirect("/");
}
