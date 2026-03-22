# Configuração do Supabase (Centelhas Divinas)

Sem o Supabase configurado, o site funciona em modo aberto: todos os capítulos são acessíveis e as seções de Rating e Comments ficam desabilitadas.

## 1. Criar projeto

1. Acesse [supabase.com](https://supabase.com) e crie uma conta (gratuita).
2. Crie um novo projeto.
3. Anote a **Project URL** e a **anon public** key em Settings > API.

## 2. Executar o schema

1. No painel do Supabase, vá em **SQL Editor**.
2. Para o **app React** (lovable-site), execute `supabase/migration-lovable.sql` — cria tabelas `chapter_views`, `chapter_ratings` e `chapter_comments` com `session_id` (sem auth).
3. Se já tiver rodado `schema.sql` com auth e os ratings não funcionarem, execute a migração — ela recria as tabelas.

## 3. Habilitar Magic Link (OTP)

1. Em **Authentication** > **Providers**, confira que **Email** está habilitado.
2. Em **Authentication** > **URL Configuration**, adicione a URL do seu site em **Redirect URLs** (ex: `https://seudominio.com`, `https://seudominio.com/**` para permitir todas as rotas).

## 4. Configurar o site

1. Copie `config.example.js` para `config.js`:
   ```bash
   cp config.example.js config.js
   ```
2. Edite `config.js` e preencha:
   - `CENTELHAS_SUPABASE_URL`: a Project URL do seu projeto
   - `CENTELHAS_SUPABASE_ANON_KEY`: a chave anon public

O arquivo `config.js` não é commitado (está no `.gitignore`).

## 5. Deploy (GitHub Pages, Netlify, Vercel, etc.)

O `config.js` não vai para o repositório. Em deploys estáticos, é preciso gerá-lo no build:

### Netlify
1. Em **Site settings** > **Environment variables**, adicione:
   - `CENTELHAS_SUPABASE_URL` = sua Project URL
   - `CENTELHAS_SUPABASE_ANON_KEY` = sua anon key
2. Em **Build settings**:
   - Build command: `node build-config.js`
   - Publish directory: `.`

### Vercel
1. Em **Settings** > **Environment Variables**, adicione as mesmas variáveis.
2. Build command: `node build-config.js`
3. Output directory: `.` (ou raiz)

### Outros hosts
Execute antes do deploy: `CENTELHAS_SUPABASE_URL=... CENTELHAS_SUPABASE_ANON_KEY=... node build-config.js` — isso gera o `config.js` que será publicado.
