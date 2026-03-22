#!/usr/bin/env node
// Gera config.js a partir de variáveis de ambiente (para deploy).
// Uso: CENTELHAS_SUPABASE_URL=... CENTELHAS_SUPABASE_ANON_KEY=... node build-config.js
// Em Netlify/Vercel: configure as env vars e adicione "node build-config.js" ao build command.

const fs = require('fs');
const path = require('path');

const url = process.env.CENTELHAS_SUPABASE_URL || '';
const key = process.env.CENTELHAS_SUPABASE_ANON_KEY || '';

const outPath = path.join(__dirname, 'config.js');
const content = `// Centelhas Divinas — Gerado em deploy (não editar)
window.CENTELHAS_SUPABASE_URL = '${url.replace(/'/g, "\\'")}';
window.CENTELHAS_SUPABASE_ANON_KEY = '${key.replace(/'/g, "\\'")}';
`;

fs.writeFileSync(outPath, content);
console.log('[Centelhas] config.js gerado com sucesso');
if (!url || !key) {
  console.warn('[Centelhas] Aviso: URL ou KEY vazios — configure CENTELHAS_SUPABASE_URL e CENTELHAS_SUPABASE_ANON_KEY');
}
