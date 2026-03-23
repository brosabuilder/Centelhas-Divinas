/**
 * One-time migration: reads chapters from TS and writes Markdown files.
 * Run: node scripts/migrate-ts-to-md.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SRC = path.join(__dirname, "../src/data");
const CONTENT = path.join(__dirname, "../../content");

const CHAPTERS_META = [
  { slug: "01-oracao-antes-do-salto", titlePt: "A Oração Antes do Salto", titleEn: "The Prayer Before the Jump", titleEs: "La Oración Antes del Salto" },
  { slug: "02-sob-a-selva", titlePt: "Sob a Selva", titleEn: "Under the Jungle", titleEs: "Bajo la Selva" },
  { slug: "03-a-caverna", titlePt: "A Caverna", titleEn: "The Cavern", titleEs: "La Caverna" },
];

function extractBlocks(content, chapterNum) {
  const blocks = [];
  const re = /\{\s*type:\s*'paragraph',\s*html:\s*`((?:[^`\\]|\\.)*)`\s*\}|{\s*type:\s*'scene-break'\s*}/g;
  let m;
  const str = content.replace(/\r\n/g, "\n");
  while ((m = re.exec(str)) !== null) {
    if (m[0].includes("scene-break")) {
      blocks.push({ type: "scene-break" });
    } else {
      blocks.push({ type: "paragraph", html: m[1].replace(/\\`/g, "`") });
    }
  }
  return blocks;
}

function htmlToMarkdown(html) {
  return html.replace(/<em>/g, "*").replace(/<\/em>/g, "*");
}

function blocksToMarkdown(blocks) {
  const lines = [];
  for (const block of blocks) {
    if (block.type === "scene-break") {
      lines.push("", "***", "");
    } else {
      lines.push(htmlToMarkdown(block.html), "");
    }
  }
  return lines.join("\n").trim();
}

function extractChapter(content, idx) {
  const num = idx + 1;
  const re = new RegExp(`export const chapter${num}:\\s*ContentBlock\\[\\]\\s*=\\s*\\[\\s*([\\s\\S]*?)\\n\\];`, "m");
  const m = content.match(re);
  return m ? m[1] : null;
}

async function run() {
  for (const lang of ["pt", "en", "es"]) {
    const file = path.join(SRC, `chapters-${lang}.ts`);
    const content = fs.readFileSync(file, "utf8");
    const chapterNum = lang === "pt" ? "Capítulo" : lang === "en" ? "Chapter" : "Capítulo";
    for (let i = 0; i < 3; i++) {
      const meta = CHAPTERS_META[i];
      const title = meta[`title${lang === "pt" ? "Pt" : lang === "en" ? "En" : "Es"}`];
      const chNum = `${chapterNum} ${i + 1}`;
      const blockContent = extractChapter(content, i);
      if (!blockContent) {
        console.warn(`Could not extract chapter ${i + 1} for ${lang}`);
        continue;
      }
      const blocks = extractBlocks(blockContent, chNum);
      const body = blocksToMarkdown(blocks);
      const md = `---
title: ${title}
chapterNum: ${chNum}
---

${body}
`;
      const outDir = path.join(CONTENT, lang);
      fs.mkdirSync(outDir, { recursive: true });
      const outPath = path.join(outDir, `${meta.slug}.md`);
      fs.writeFileSync(outPath, md, "utf8");
      console.log(`Wrote ${outPath}`);
    }
  }
}

run().catch(console.error);
