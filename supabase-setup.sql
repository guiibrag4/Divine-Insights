-- ============================================
-- Divine Insights - Supabase Database Setup
-- ============================================
-- Execute este script no SQL Editor do Supabase
-- (Dashboard > SQL Editor > New Query)

-- 1. Criar tabela de séries
CREATE TABLE IF NOT EXISTS series (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  slug_prefix TEXT NOT NULL,
  index_slug TEXT,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  cover_image TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('em-andamento', 'completo', 'rascunho')),
  chapters_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Criar tabela de posts (capítulos)
CREATE TABLE IF NOT EXISTS posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  series_slug TEXT NOT NULL,
  slug TEXT NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  cover_image TEXT NOT NULL,
  og_image TEXT NOT NULL,
  date TEXT NOT NULL,
  author_name TEXT NOT NULL,
  author_picture TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(series_slug, slug)
);

-- 3. Criar índices para performance
CREATE INDEX IF NOT EXISTS idx_series_slug ON series(slug);
CREATE INDEX IF NOT EXISTS idx_series_status ON series(status);
CREATE INDEX IF NOT EXISTS idx_posts_series_slug ON posts(series_slug);
CREATE INDEX IF NOT EXISTS idx_posts_slug ON posts(slug);
CREATE INDEX IF NOT EXISTS idx_posts_date ON posts(date DESC);

-- 4. Habilitar Row Level Security (RLS)
ALTER TABLE series ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- 5. Policies - Leitura pública (qualquer pessoa pode ler)
CREATE POLICY "Permitir leitura pública de séries"
  ON series
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Permitir leitura pública de posts"
  ON posts
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- 6. Policies - Escrita somente para autenticados (service role)
-- Nota: Para simplicidade, vamos permitir INSERT/UPDATE/DELETE para authenticated
-- Em produção, você pode adicionar verificações de role específicas

CREATE POLICY "Permitir escrita de séries para autenticados"
  ON series
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Permitir escrita de posts para autenticados"
  ON posts
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- 7. Função para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 8. Triggers para atualizar updated_at
CREATE TRIGGER update_series_updated_at
  BEFORE UPDATE ON series
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_posts_updated_at
  BEFORE UPDATE ON posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- Setup completo! ✅
-- ============================================
