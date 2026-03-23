-- Migração para site simplificado (Markdown + email capture)
-- Mantém apenas subscribers. Remove tabelas de auth/ratings/comments/views.
-- Execute no SQL Editor do Supabase

DROP TABLE IF EXISTS chapter_comments;
DROP TABLE IF EXISTS chapter_ratings;
DROP TABLE IF EXISTS chapter_views;

-- subscribers já existe - garante RLS
ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "subscribers_select" ON subscribers;
DROP POLICY IF EXISTS "subscribers_insert" ON subscribers;
CREATE POLICY "subscribers_select" ON subscribers FOR SELECT USING (true);
CREATE POLICY "subscribers_insert" ON subscribers FOR INSERT WITH CHECK (true);
