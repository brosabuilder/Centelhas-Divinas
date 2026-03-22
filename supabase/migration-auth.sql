-- Migração para login com Supabase Auth (email + senha)
-- Substitui migration-lovable.sql (session-based)
--
-- Antes de executar:
-- 1. Supabase Dashboard → Authentication → Providers → Email → Enable
-- 2. (Opcional) Desative "Confirm email" para acesso imediato sem verificação
--
-- Execute no SQL Editor do seu projeto Supabase

-- Remover tabelas antigas (session-based)
DROP TABLE IF EXISTS chapter_comments;
DROP TABLE IF EXISTS chapter_ratings;
DROP TABLE IF EXISTS chapter_views;

-- Tabela de visualizações (session_id para contagem de leitores, inclusive anônimos)
CREATE TABLE chapter_views (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  chapter_id INTEGER NOT NULL,
  session_id TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(chapter_id, session_id)
);

-- Tabela de ratings (user_id = auth)
CREATE TABLE chapter_ratings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  chapter_id INTEGER NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(chapter_id, user_id)
);

-- Tabela de comentários (user_id = auth)
CREATE TABLE chapter_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  chapter_id INTEGER NOT NULL,
  content TEXT NOT NULL CHECK (char_length(content) <= 2000),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  author_name TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_chapter_ratings_chapter ON chapter_ratings(chapter_id);
CREATE INDEX idx_chapter_comments_chapter ON chapter_comments(chapter_id);
CREATE INDEX idx_chapter_views_chapter ON chapter_views(chapter_id);

-- RLS
ALTER TABLE chapter_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE chapter_ratings ENABLE ROW LEVEL SECURITY;
ALTER TABLE chapter_comments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "chapter_views_all" ON chapter_views FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "chapter_ratings_select" ON chapter_ratings FOR SELECT USING (true);
CREATE POLICY "chapter_ratings_insert" ON chapter_ratings FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "chapter_ratings_update" ON chapter_ratings FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "chapter_ratings_delete" ON chapter_ratings FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "chapter_comments_select" ON chapter_comments FOR SELECT USING (true);
CREATE POLICY "chapter_comments_insert" ON chapter_comments FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "chapter_comments_delete" ON chapter_comments FOR DELETE USING (auth.uid() = user_id);
