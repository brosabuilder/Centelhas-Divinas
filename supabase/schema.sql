-- Centelhas Divinas — Schema Supabase
-- Execute no SQL Editor do seu projeto Supabase (supabase.com)

-- Tabela de subscribers (email gate para capítulos)
CREATE TABLE IF NOT EXISTS subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  name TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- RLS subscribers: leitura pública, insert público (sem auth)
ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "subscribers_select" ON subscribers;
DROP POLICY IF EXISTS "subscribers_insert" ON subscribers;
CREATE POLICY "subscribers_select" ON subscribers FOR SELECT USING (true);
CREATE POLICY "subscribers_insert" ON subscribers FOR INSERT WITH CHECK (true);

-- Tabela de ratings por capítulo
CREATE TABLE IF NOT EXISTS chapter_ratings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  chapter_number INTEGER NOT NULL CHECK (chapter_number >= 1 AND chapter_number <= 10),
  stars INTEGER NOT NULL CHECK (stars >= 1 AND stars <= 5),
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, chapter_number)
);

-- Tabela de comentários por capítulo
CREATE TABLE IF NOT EXISTS chapter_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  chapter_number INTEGER NOT NULL CHECK (chapter_number >= 1 AND chapter_number <= 10),
  content TEXT NOT NULL CHECK (char_length(content) <= 2000),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Índices para consultas
CREATE INDEX IF NOT EXISTS idx_chapter_ratings_chapter ON chapter_ratings(chapter_number);
CREATE INDEX IF NOT EXISTS idx_chapter_comments_chapter ON chapter_comments(chapter_number);

-- RLS: leitura pública, escrita apenas autenticados
ALTER TABLE chapter_ratings ENABLE ROW LEVEL SECURITY;
ALTER TABLE chapter_comments ENABLE ROW LEVEL SECURITY;

-- Políticas chapter_ratings (DROP antes de criar para permitir re-execução)
DROP POLICY IF EXISTS "chapter_ratings_select" ON chapter_ratings;
DROP POLICY IF EXISTS "chapter_ratings_insert" ON chapter_ratings;
DROP POLICY IF EXISTS "chapter_ratings_update" ON chapter_ratings;
DROP POLICY IF EXISTS "chapter_ratings_delete" ON chapter_ratings;
CREATE POLICY "chapter_ratings_select" ON chapter_ratings FOR SELECT USING (true);
CREATE POLICY "chapter_ratings_insert" ON chapter_ratings FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "chapter_ratings_update" ON chapter_ratings FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "chapter_ratings_delete" ON chapter_ratings FOR DELETE USING (auth.uid() = user_id);

-- Políticas chapter_comments (DROP antes de criar para permitir re-execução)
DROP POLICY IF EXISTS "chapter_comments_select" ON chapter_comments;
DROP POLICY IF EXISTS "chapter_comments_insert" ON chapter_comments;
DROP POLICY IF EXISTS "chapter_comments_delete" ON chapter_comments;
CREATE POLICY "chapter_comments_select" ON chapter_comments FOR SELECT USING (true);
CREATE POLICY "chapter_comments_insert" ON chapter_comments FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "chapter_comments_delete" ON chapter_comments FOR DELETE USING (auth.uid() = user_id);
