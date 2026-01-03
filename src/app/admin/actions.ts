"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { getSupabaseServiceClient } from "@/lib/supabase";

const seriesSchema = z.object({
  title: z.string().min(3),
  slugPrefix: z.string().min(2),
  description: z.string().min(5),
  coverImage: z.string().min(1),
  status: z.enum(["em-andamento", "completo", "rascunho"]),
});

export async function upsertSeriesAction(formData: FormData): Promise<void> {
  const parsed = seriesSchema.parse({
    title: formData.get("title"),
    slugPrefix: formData.get("slugPrefix"),
    description: formData.get("description"),
    coverImage: formData.get("coverImage"),
    status: formData.get("status"),
  });

  // Gera automaticamente o indexSlug
  const indexSlug = `${parsed.slugPrefix}/${parsed.slugPrefix}-00-indice`;

  const supabase = getSupabaseServiceClient();
  
  // Calcula automaticamente a contagem de capítulos
  const { data: posts } = await supabase
    .from("posts")
    .select("id")
    .eq("series_slug", parsed.slugPrefix);
  const chaptersCount = posts?.length || 0;

  const { error } = await supabase.from("series").upsert({
    title: parsed.title,
    slug: indexSlug,
    slug_prefix: parsed.slugPrefix,
    index_slug: indexSlug,
    description: parsed.description,
    cover_image: parsed.coverImage,
    status: parsed.status,
    chapters_count: chaptersCount,
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
  date: z.string().min(4),
});

// Constantes de autor padrão
const DEFAULT_AUTHOR = {
  name: "Guilherme Braga",
  picture: "/assets/blog/authors/jj.jpeg",
};

export async function upsertPostAction(formData: FormData): Promise<void> {
  try {
    const parsed = postSchema.parse({
      seriesSlug: formData.get("seriesSlug"),
      slug: formData.get("slug"),
      title: formData.get("title"),
      excerpt: formData.get("excerpt"),
      content: formData.get("content"),
      coverImage: formData.get("coverImage"),
      date: formData.get("date"),
    });

    // Converte data de YYYY-MM-DD para ISO 8601
    const isoDate = new Date(parsed.date).toISOString();

  const supabase = getSupabaseServiceClient();
  
  // Salvar o post com valores automáticos
  const { data: savedPost, error } = await supabase.from("posts").upsert({
    series_slug: parsed.seriesSlug,
    slug: parsed.slug,
    title: parsed.title,
    excerpt: parsed.excerpt,
    content: parsed.content,
    cover_image: parsed.coverImage,
    og_image: parsed.coverImage, // OG Image = Cover Image automaticamente
    date: isoDate,
    author_name: DEFAULT_AUTHOR.name,
    author_picture: DEFAULT_AUTHOR.picture,
    updated_at: new Date().toISOString(),
  }).select();

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

  // Disparar webhook para GitHub Actions (regenerar site estático)
  try {
    const githubToken = process.env.GITHUB_WEBHOOK_TOKEN;
    if (!githubToken) {
      console.warn('⚠️ GITHUB_WEBHOOK_TOKEN não configurado - webhook não será disparado');
    } else {
      const webhookResponse = await fetch('https://api.github.com/repos/guiibrag4/Divine-Insights/dispatches', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${githubToken}`,
          'Accept': 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          event_type: 'supabase-post-created',
          client_payload: {
            post_id: savedPost?.[0]?.id || null,
            series_slug: parsed.seriesSlug,
            slug: parsed.slug,
            title: parsed.title,
          }
        })
      });

      if (webhookResponse.ok) {
        console.log('✅ Webhook disparado com sucesso! GitHub Actions iniciará em breve.');
      } else {
        console.error('⚠️ Erro ao disparar webhook:', webhookResponse.status, await webhookResponse.text());
      }
    }
  } catch (webhookError) {
    // Não bloquear o salvamento se o webhook falhar
    console.error('⚠️ Falha ao disparar webhook (post foi salvo):', webhookError);
  }

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
