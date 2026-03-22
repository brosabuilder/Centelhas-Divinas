# Supabase — Centelhas Divinas (lovable-site)

**Projeto:** `qiwphwptypshrlhxqqzu` (Centelhas Divinas)

## 1. Variáveis de ambiente

### Local (`lovable-site/.env.local`)

```bash
cp lovable-site/.env.example lovable-site/.env.local
```

Preencha com as credenciais do seu projeto em [supabase.com](https://supabase.com) → Settings → API:

```
VITE_SUPABASE_URL=https://qiwphwptypshrlhxqqzu.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...sua-chave-anon
```

O Lovable pode usar `VITE_SUPABASE_PUBLISHABLE_KEY` — ambos funcionam (são a mesma chave).

### Deploy (Lovable / Vercel / Netlify)

Configure no painel do host:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY` (ou `VITE_SUPABASE_PUBLISHABLE_KEY`)

## 2. Migrations

Execute no **SQL Editor** do Supabase (projeto qiwphwptypshrlhxqqzu):

1. **`supabase/migration-auth.sql`** — tabelas com auth (user_id em ratings e comentários)

Tabelas: `chapter_views`, `chapter_ratings`, `chapter_comments`. A tabela `subscribers` (antigo email gate) não é usada pelo fluxo atual.

## 3. Auth

1. **Authentication** → **Providers** → **Email** → Enable  
2. (Opcional) Desative **Confirm email** para login imediato sem verificação  
3. **URL Configuration** → Redirect URLs: adicione a URL do deploy (ex: `https://seu-app.lovable.app`)

## 4. CLI

```bash
supabase link --project-ref qiwphwptypshrlhxqqzu
supabase projects api-keys --project-ref qiwphwptypshrlhxqqzu
supabase inspect db table-stats --linked
```

## 5. Fluxo atual

- **Login:** Supabase Auth (email + senha) → `auth.users`
- **Ratings/Comentários:** `user_id` referenciando `auth.users`
- **Subscribers:** tabela legada, não utilizada pelo app
