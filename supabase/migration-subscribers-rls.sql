-- Remove SELECT público de subscribers (anon não pode mais listar e-mails)
-- Service role continua com acesso total (bypassa RLS)
-- INSERT para anon permanece (formulário do site)
-- Execute no SQL Editor do Supabase

DROP POLICY IF EXISTS "subscribers_select" ON subscribers;
