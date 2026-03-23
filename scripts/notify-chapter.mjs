/**
 * Notifica assinantes sobre novo capítulo via Resend.
 * Uso: node scripts/notify-chapter.mjs [--chapter N]
 * Env: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, RESEND_API_KEY, SITE_URL
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import matter from "gray-matter";
import { marked } from "marked";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CONTENT = path.join(__dirname, "../content/pt");
const TEMPLATE_PATH = path.join(__dirname, "email-templates/chapter-notify.html");

const PREVIEW_PARAGRAPHS = 6;
const BATCH_SIZE = 50;

marked.setOptions({ gfm: true });

function parseArgs() {
  const args = process.argv.slice(2);
  const chapterArg = args.find((a) => a.startsWith("--chapter="));
  if (chapterArg) {
    const n = parseInt(chapterArg.split("=")[1], 10);
    if (!isNaN(n) && n > 0) return n;
  }
  return null;
}

function getSlugs() {
  return fs.readdirSync(CONTENT).filter((f) => f.endsWith(".md")).sort();
}

function getChapterPath(chapterNum) {
  const slugs = getSlugs();
  if (chapterNum != null) {
    const slug = slugs.find((s) => s.startsWith(String(chapterNum).padStart(2, "0")));
    return slug ? path.join(CONTENT, slug) : null;
  }
  if (slugs.length === 0) return null;
  return path.join(CONTENT, slugs[slugs.length - 1]);
}

function extractPreview(mdPath) {
  const raw = fs.readFileSync(mdPath, "utf8");
  const { data, content } = matter(raw);
  const paragraphs = content.split(/\n\n+/).filter((p) => p.trim());
  const preview = paragraphs.slice(0, PREVIEW_PARAGRAPHS).join("\n\n");
  const rawHtml = marked.parse(preview);
  const html = String(rawHtml).replace(/<p>/g, '<p style="margin: 0 0 1.2em 0;">');
  return { data, html };
}

function loadTemplate() {
  return fs.readFileSync(TEMPLATE_PATH, "utf8");
}

function replacePlaceholders(tpl, { chapterNum, chapterTitle, chapterPreview, siteUrl }) {
  return tpl
    .replace(/\{\{CHAPTER_NUM\}\}/g, chapterNum)
    .replace(/\{\{CHAPTER_TITLE\}\}/g, chapterTitle)
    .replace(/\{\{CHAPTER_PREVIEW\}\}/g, chapterPreview)
    .replace(/\{\{SITE_URL\}\}/g, siteUrl);
}

async function main() {
  const chapterNumArg = parseArgs();

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const resendKey = process.env.RESEND_API_KEY;
  const siteUrl = process.env.SITE_URL;

  if (!supabaseUrl || !supabaseKey || !resendKey || !siteUrl) {
    console.error("Faltam variáveis de ambiente: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, RESEND_API_KEY, SITE_URL");
    process.exit(1);
  }

  const chapterPath = getChapterPath(chapterNumArg);
  if (!chapterPath) {
    console.error("Nenhum capítulo encontrado.");
    process.exit(1);
  }

  const { data: frontmatter, html: chapterPreview } = extractPreview(chapterPath);
  const chapterTitle = frontmatter.title || "Sem título";
  const chapterNum = frontmatter.chapterNum || `Capítulo ${getSlugs().indexOf(path.basename(chapterPath)) + 1}`;

  const tpl = loadTemplate();
  const html = replacePlaceholders(tpl, {
    chapterNum,
    chapterTitle,
    chapterPreview,
    siteUrl,
  });

  const subject = `Centelhas Divinas — ${chapterNum}: ${chapterTitle}`;
  const from = "Centelhas Divinas <onboarding@resend.dev>";

  const supabase = createClient(supabaseUrl, supabaseKey);
  const { data: rows, error } = await supabase.from("subscribers").select("email");

  if (error) {
    console.error("Erro ao buscar assinantes:", error.message);
    process.exit(1);
  }

  const emails = rows.map((r) => r.email).filter(Boolean);
  if (emails.length === 0) {
    console.log("Nenhum assinante para notificar.");
    return;
  }

  const resend = new Resend(resendKey);
  const idempotencyKey = `chapter-${path.basename(chapterPath, ".md")}-${Date.now()}`;

  let sent = 0;
  for (let i = 0; i < emails.length; i += BATCH_SIZE) {
    const batch = emails.slice(i, i + BATCH_SIZE);
    const { data, error: sendError } = await resend.emails.send({
      from,
      to: batch,
      subject,
      html,
      headers: { "Idempotency-Key": `${idempotencyKey}-${i}` },
    });

    if (sendError) {
      console.error("Erro ao enviar:", sendError.message);
      process.exit(1);
    }
    sent += batch.length;
    console.log(`Enviados ${sent}/${emails.length}`);
  }

  console.log(`Concluído. ${sent} e-mails enviados.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
