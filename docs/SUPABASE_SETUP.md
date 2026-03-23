# Supabase — Centelhas Divinas

**Projeto:** `qiwphwptypshrlhxqqzu` (Centelhas Divinas)

## 1. Variáveis de ambiente

### Local (`.env.local` na raiz)

```bash
cp .env.example .env.local
```

Preencha com as credenciais do seu projeto em [supabase.com](https://supabase.com) → Settings → API:

```
VITE_SUPABASE_URL=https://qiwphwptypshrlhxqqzu.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...sua-chave-anon
```

### Deploy externo (Netlify, Vercel)

Configure no painel do host: `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY`

## 2. Migration

Execute no **SQL Editor** do Supabase (projeto qiwphwptypshrlhxqqzu):

**`supabase/migration-simplified.sql`** — mantém apenas a tabela `subscribers` para captura de e-mail. Remove `chapter_views`, `chapter_ratings`, `chapter_comments`.

Se o projeto ainda não tem a tabela `subscribers`, execute primeiro o bloco de criação:

```sql
CREATE TABLE IF NOT EXISTS subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  name TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

Depois execute o restante de `migration-simplified.sql` (RLS).

**`supabase/migration-subscribers-rls.sql`** — remove SELECT público de `subscribers`. Anon não pode mais listar e-mails. O formulário continua gravando via INSERT.

## 3. Fluxo atual

- **Conteúdo:** Markdown em `content/pt/` — capítulos publicados semanalmente
- **E-mail:** formulário no site grava em `subscribers` (nome + e-mail)
- **Newsletter:** ao dar push em `content/pt/*.md`, a GitHub Action envia e-mail via Resend (domínio `onboarding@resend.dev`) para todos os assinantes

## 4. GitHub Actions — Newsletter automático

Para o envio automático, configure em **Settings → Secrets and variables → Actions** do repositório:

| Secret | Descrição |
|--------|-----------|
| `SUPABASE_URL` | URL do projeto (ex: `https://xxx.supabase.co`) |
| `SUPABASE_SERVICE_ROLE_KEY` | Service role key (Supabase → Settings → API). Nunca exponha no frontend. |
| `RESEND_API_KEY` | API key do [resend.com](https://resend.com) |
| `SITE_URL` | URL do site em produção (ex: `https://cosmicsparks.lovable.app`) |

A Action dispara em `push` para `main` quando há alteração em `content/pt/**/*.md`.

**Teste local:** `SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... RESEND_API_KEY=... SITE_URL=... npm run notify-chapter`

## 5. CLI (opcional)

```bash
supabase link --project-ref qiwphwptypshrlhxqqzu
supabase projects api-keys --project-ref qiwphwptypshrlhxqqzu
```
