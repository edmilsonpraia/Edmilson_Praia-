#!/usr/bin/env node
/**
 * Post-build: generate a per-route index.html file under build/<route>/
 * with route-specific <title>, <meta description>, <link rel="canonical">,
 * og:url, og:title and og:description — so each URL is a distinct page
 * for crawlers (fixes Google treating them as duplicates of the homepage).
 *
 * Runs as `postbuild` in a plain Node environment — no Puppeteer, no
 * headless Chrome — so it works reliably on Vercel.
 */

const fs = require('fs');
const path = require('path');

const SITE = 'https://www.edmilsondelfimpraia.com';
const BUILD_DIR = path.resolve(__dirname, '..', 'build');
const BASE_HTML_PATH = path.join(BUILD_DIR, 'index.html');

// Must mirror ROUTE_MAP in src/App.tsx
const ROUTES = [
  {
    path: '/sobre',
    title: 'Perfil · Edmilson Delfim Praia',
    description: 'Perfil profissional completo de Edmilson Delfim Praia — competências, formação em Geofísica Aplicada (Ufa) e biografia executiva.'
  },
  {
    path: '/experiencia',
    title: 'Experiência · Edmilson Delfim Praia',
    description: 'Experiência profissional: COPIA Group of Companies (Director R&D&T), EDELPHIA (Fundador), Justificações Acadêmicas (Fundador & CEO) e WellDesk (Líder Técnico).'
  },
  {
    path: '/palestras',
    title: 'Palestras & Conferências 2026 · Edmilson Delfim Praia',
    description: '10 palcos continentais em 2026: AGLNG Maputo, AEW Cape Town, AOG Luanda, NIEC Windhoek, MINEA, AIMCT, NOGC, AHTLS, Huawei Innovation Center, Capital Humano.'
  },
  {
    path: '/produtos',
    title: 'Produtos & Tecnologias · COPIA Seis, DynamicSim, Quasar · Edmilson Delfim Praia',
    description: 'Criador de 5 produtos de software com módulos de IA: COPIA Seis (interpretação sísmica), COPIA DynamicSim (reservoir simulation), COPIA Quasar (infraestruturas críticas), Well Log Web Pro, IA PetroChat.'
  },
  {
    path: '/formacao',
    title: 'Formação Académica · Edmilson Delfim Praia',
    description: 'Doutoramento em Geofísica Aplicada — Universidade Estatal do Petróleo de Ufa, Rússia. Especialização em geologia de petróleo e ciência de dados.'
  },
  {
    path: '/publicacoes',
    title: 'Publicações & Pesquisa COPIA Seis 2026 · Edmilson Delfim Praia',
    description: '3 artigos flagship COPIA Seis 2026 sobre horizon tracking, cycle skipping e oil-water contact windows. Plus 6 publicações anteriores em OILFIELD ENGINEERING e WellDesk.'
  },
  {
    path: '/reconhecimentos',
    title: 'Reconhecimentos & Prémios · Edmilson Delfim Praia',
    description: 'Medalha de Honra da Embaixada de Angola na Rússia (2025) · 2º Lugar Jovens Cientistas Ufa 2024 · Certificate of Appreciation AIMCT Angola 2026.'
  },
  {
    path: '/galeria',
    title: 'Galeria Profissional · Edmilson Delfim Praia',
    description: 'Fotografias profissionais das 10 conferências e eventos de 2026 — AGLNG Maputo, AOG Luanda, AEW Cape Town, NIEC Windhoek, MINEA, AIMCT, NOGC, AHTLS, Huawei, Capital Humano.'
  },
  {
    path: '/contato',
    title: 'Contato · Edmilson Delfim Praia · WhatsApp +244 933 514 132',
    description: 'Contato directo de Edmilson Delfim Praia: WhatsApp +244 933 514 132, email praiae180@gmail.com. Base: Luanda, Angola.'
  }
];

const escapeAttr = s => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function replaceOnce(html, pattern, replacement, label) {
  const after = html.replace(pattern, replacement);
  if (after === html) console.warn(`  [WARN] did not match ${label}`);
  return after;
}

function main() {
  if (!fs.existsSync(BASE_HTML_PATH)) {
    console.error(`Base HTML not found at ${BASE_HTML_PATH}`);
    process.exit(1);
  }
  const baseHtml = fs.readFileSync(BASE_HTML_PATH, 'utf-8');
  console.log(`Base HTML loaded: ${baseHtml.length} bytes`);

  let generated = 0;
  for (const route of ROUTES) {
    const canonical = SITE + route.path;
    const titleEsc = escapeAttr(route.title);
    const descEsc = escapeAttr(route.description);

    let html = baseHtml;
    html = replaceOnce(html, /<link rel="canonical"[^>]*>/i, `<link rel="canonical" href="${canonical}"/>`, 'canonical');
    html = replaceOnce(html, /<title>[^<]*<\/title>/i, `<title>${route.title}</title>`, 'title');
    html = replaceOnce(html, /<meta name="description"[^>]*>/i, `<meta name="description" content="${descEsc}"/>`, 'meta description');
    html = replaceOnce(html, /<meta property="og:url"[^>]*>/i, `<meta property="og:url" content="${canonical}"/>`, 'og:url');
    html = replaceOnce(html, /<meta property="og:title"[^>]*>/i, `<meta property="og:title" content="${titleEsc}"/>`, 'og:title');
    html = replaceOnce(html, /<meta property="og:description"[^>]*>/i, `<meta property="og:description" content="${descEsc}"/>`, 'og:description');
    html = replaceOnce(html, /<meta name="twitter:title"[^>]*>/i, `<meta name="twitter:title" content="${titleEsc}"/>`, 'twitter:title');
    html = replaceOnce(html, /<meta name="twitter:description"[^>]*>/i, `<meta name="twitter:description" content="${descEsc}"/>`, 'twitter:description');

    const outDir = path.join(BUILD_DIR, route.path.replace(/^\//, ''));
    fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(path.join(outDir, 'index.html'), html, 'utf-8');
    console.log(`  → ${route.path.padEnd(18)}  canonical=${canonical}`);
    generated++;
  }
  console.log(`\nGenerated ${generated} per-route HTML files with distinct metadata.`);
}

main();
