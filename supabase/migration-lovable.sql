-- Migração para o app React (session-based, sem auth)
-- Execute no SQL Editor se ratings/comments não funcionarem

-- Remover tabelas antigas se existirem (user_id/auth)
DROP TABLE IF EXISTS chapter_comments;
DROP TABLE IF EXISTS chapter_ratings;
DROP TABLE IF EXISTS chapter_views;

-- Tabela de visualizações (leitores por capítulo)
CREATE TABLE chapter_views (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  chapter_id INTEGER NOT NULL,
  session_id TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(chapter_id, session_id)
);

-- Tabela de ratings (session-based, sem auth)
CREATE TABLE chapter_ratings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  chapter_id INTEGER NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  session_id TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(chapter_id, session_id)
);

-- Tabela de comentários (session-based, sem auth)
CREATE TABLE chapter_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  chapter_id INTEGER NOT NULL,
  content TEXT NOT NULL CHECK (char_length(content) <= 2000),
  session_id TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_chapter_ratings_chapter ON chapter_ratings(chapter_id);
CREATE INDEX idx_chapter_comments_chapter ON chapter_comments(chapter_id);
CREATE INDEX idx_chapter_views_chapter ON chapter_views(chapter_id);

-- RLS: permitir tudo (app usa session_id, não auth)
ALTER TABLE chapter_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE chapter_ratings ENABLE ROW LEVEL SECURITY;
ALTER TABLE chapter_comments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "chapter_views_all" ON chapter_views FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "chapter_ratings_all" ON chapter_ratings FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "chapter_comments_all" ON chapter_comments FOR ALL USING (true) WITH CHECK (true);
