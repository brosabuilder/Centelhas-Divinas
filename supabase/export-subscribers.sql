-- Exportar lista completa de assinantes (tabela `subscribers`)
--
-- Como usar:
-- 1. Supabase Dashboard → SQL Editor → cole e execute esta query.
-- 2. Nos resultados, use "Download" / exportar CSV se o painel oferecer.
-- 3. Se você aplicou migration-subscribers-rls.sql (sem SELECT público), o SQL Editor
--    do dashboard ainda costuma rodar com permissão de administrador e funciona.
--
-- Colunas: id, email, nome, data de cadastro (mais antigos primeiro)

SELECT
  id,
  email,
  name AS nome,
  created_at AS cadastrado_em
FROM subscribers
ORDER BY created_at ASC NULLS LAST, email ASC;

-- Versão mínima (só e-mail e nome, bom para colar em planilha):
-- SELECT email, name FROM subscribers ORDER BY created_at ASC;
