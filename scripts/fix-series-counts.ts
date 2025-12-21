/**
 * Script para corrigir dados das séries no Supabase
 * Atualiza chapters_count e status baseado nos posts reais
 */

import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";

config({ path: ".env.local" });

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error("❌ Erro: variáveis de ambiente não encontradas");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

async function fixSeriesData() {
  console.log("🔧 Corrigindo dados das séries...\n");

  // Buscar todas as séries
  const { data: series, error: seriesError } = await supabase
    .from("series")
    .select("*");

  if (seriesError) {
    console.error("❌ Erro ao buscar séries:", seriesError);
    return;
  }

  for (const serie of series || []) {
    console.log(`📦 Processando série: ${serie.title} (${serie.slug_prefix})`);

    // Contar posts reais dessa série (excluindo índice)
    const { data: posts, error: postsError } = await supabase
      .from("posts")
      .select("id, slug")
      .eq("series_slug", serie.slug_prefix);

    if (postsError) {
      console.error(`   ❌ Erro ao buscar posts de ${serie.slug_prefix}:`, postsError);
      continue;
    }

    // Filtrar posts que não são índice
    const realChapters = (posts || []).filter(
      (p) => !p.slug.includes("-00-indice") && !p.slug.includes("indice")
    );

    const actualCount = realChapters.length;
    console.log(`   📊 Capítulos encontrados: ${actualCount}`);
    console.log(`   📊 Contador atual no DB: ${serie.chapters_count}`);
    console.log(`   📊 Status atual: ${serie.status}`);

    // Definir status baseado no progresso
    let newStatus = serie.status;
    if (actualCount === 0) {
      newStatus = "rascunho";
    } else if (serie.slug_prefix === "1joao" && actualCount < 5) {
      newStatus = "em-andamento";
    } else if (serie.slug_prefix === "tiago" && actualCount >= 5) {
      newStatus = "completo";
    }

    // Atualizar se houver diferença
    if (actualCount !== serie.chapters_count || newStatus !== serie.status) {
      console.log(`   🔄 Atualizando para: ${actualCount} capítulos, status: ${newStatus}`);
      
      const { error: updateError } = await supabase
        .from("series")
        .update({
          chapters_count: actualCount,
          status: newStatus,
          updated_at: new Date().toISOString(),
        })
        .eq("id", serie.id);

      if (updateError) {
        console.error(`   ❌ Erro ao atualizar:`, updateError);
      } else {
        console.log(`   ✅ Atualizado com sucesso!`);
      }
    } else {
      console.log(`   ✅ Já está correto, nada a fazer`);
    }
    console.log();
  }

  console.log("🎉 Correção concluída!");
}

fixSeriesData().catch((err) => {
  console.error("❌ Erro fatal:", err);
  process.exit(1);
});
