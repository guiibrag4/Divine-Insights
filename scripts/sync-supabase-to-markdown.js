#!/usr/bin/env node

/**
 * Script para sincronizar posts do Supabase para arquivos Markdown
 * Executado pelo GitHub Actions após inserções/atualizações no Supabase
 * 
 * Uso: node scripts/sync-supabase-to-markdown.js
 */

const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// Configuração do Supabase
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error('❌ Erro: Variáveis SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY são obrigatórias');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

/**
 * Gera o conteúdo de um arquivo markdown com frontmatter
 */
function generatePostMarkdown(post) {
  return `---
title: '${post.title}'
excerpt: '${post.excerpt}'
coverImage: '${post.cover_image}'
date: '${post.date}'
author:
  name: ${post.author_name}
  picture: '${post.author_picture}'
ogImage:
  url: '${post.og_image}'
---

${post.content}
`;
}

/**
 * Gera arquivo markdown de índice da série
 */
function generateSeriesIndexMarkdown(series) {
  return `---
title: '${series.title}'
excerpt: '${series.description}'
coverImage: '${series.cover_image}'
date: '${new Date().toISOString()}'
author:
  name: Guilherme Braga
  picture: '/assets/blog/authors/jj.jpeg'
ogImage:
  url: '${series.cover_image}'
---

# ${series.title}

${series.description}

> Esta é a página índice da série. Os capítulos estão listados abaixo.
`;
}

/**
 * Cria diretório recursivamente se não existir
 */
function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`📁 Criado diretório: ${dirPath}`);
  }
}

/**
 * Sincroniza uma série específica
 */
async function syncSeries(series) {
  const seriesDir = path.join(process.cwd(), '_posts', series.slug_prefix);
  ensureDirectoryExists(seriesDir);

  // Cria arquivo índice
  const indexPath = path.join(seriesDir, `${series.slug_prefix}-00-indice.md`);
  const indexContent = generateSeriesIndexMarkdown(series);
  fs.writeFileSync(indexPath, indexContent, 'utf8');
  console.log(`✅ Série criada: ${indexPath}`);
}

/**
 * Sincroniza um post específico
 */
async function syncPost(post) {
  const seriesDir = path.join(process.cwd(), '_posts', post.series_slug);
  ensureDirectoryExists(seriesDir);

  const postPath = path.join(seriesDir, `${post.slug}.md`);
  const postContent = generatePostMarkdown(post);
  fs.writeFileSync(postPath, postContent, 'utf8');
  console.log(`✅ Post criado: ${postPath}`);
}

/**
 * Sincroniza todas as séries e posts do Supabase
 */
async function syncAll() {
  console.log('🔄 Iniciando sincronização do Supabase...\n');

  try {
    // Busca todas as séries
    const { data: series, error: seriesError } = await supabase
      .from('series')
      .select('*')
      .order('slug_prefix', { ascending: true });

    if (seriesError) throw seriesError;

    console.log(`📚 Encontradas ${series.length} séries\n`);

    // Sincroniza cada série
    for (const s of series) {
      await syncSeries(s);
    }

    console.log('');

    // Busca todos os posts
    const { data: posts, error: postsError } = await supabase
      .from('posts')
      .select('*')
      .order('date', { ascending: false });

    if (postsError) throw postsError;

    console.log(`📝 Encontrados ${posts.length} posts\n`);

    // Sincroniza cada post
    for (const post of posts) {
      await syncPost(post);
    }

    console.log('\n✨ Sincronização concluída com sucesso!');
    console.log(`\n📊 Resumo:`);
    console.log(`   - ${series.length} séries sincronizadas`);
    console.log(`   - ${posts.length} posts sincronizados`);
    
  } catch (error) {
    console.error('❌ Erro durante sincronização:', error.message);
    process.exit(1);
  }
}

// Executa sincronização
syncAll();
