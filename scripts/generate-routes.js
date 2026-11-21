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
// Static footer-nav block injected after <div id="root"> in EVERY page.
// Visible to any crawler (ignores noscript stripping) and to users as a
// semantic footer-style sitemap. Safe for React hydration because it
// lives OUTSIDE #root, so React never touches it.
const STATIC_FOOTER_NAV = `
<footer class="static-sitemap" aria-label="Mapa do site e conferências" style="padding:48px 20px 32px;background:#0f172a;color:#cbd5e1;font-family:-apple-system,system-ui,sans-serif;font-size:13px;line-height:1.6;border-top:1px solid #1e293b;">
<div style="max-width:1100px;margin:0 auto;display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:32px;">
<nav aria-label="Secções do site">
<h3 style="color:#fff;font-size:13px;letter-spacing:0.08em;text-transform:uppercase;margin:0 0 12px;">Secções</h3>
<ul style="list-style:none;padding:0;margin:0;">
<li><a href="/" style="color:#cbd5e1;text-decoration:none;display:block;padding:4px 0;">Início</a></li>
<li><a href="/sobre" style="color:#cbd5e1;text-decoration:none;display:block;padding:4px 0;">Perfil</a></li>
<li><a href="/experiencia" style="color:#cbd5e1;text-decoration:none;display:block;padding:4px 0;">Experiência</a></li>
<li><a href="/palestras" style="color:#cbd5e1;text-decoration:none;display:block;padding:4px 0;">Palestras &amp; Conferências 2026</a></li>
<li><a href="/produtos" style="color:#cbd5e1;text-decoration:none;display:block;padding:4px 0;">Produtos &amp; Tecnologias</a></li>
<li><a href="/formacao" style="color:#cbd5e1;text-decoration:none;display:block;padding:4px 0;">Formação Académica</a></li>
<li><a href="/publicacoes" style="color:#cbd5e1;text-decoration:none;display:block;padding:4px 0;">Publicações &amp; Pesquisa</a></li>
<li><a href="/reconhecimentos" style="color:#cbd5e1;text-decoration:none;display:block;padding:4px 0;">Reconhecimentos</a></li>
<li><a href="/galeria" style="color:#cbd5e1;text-decoration:none;display:block;padding:4px 0;">Galeria</a></li>
<li><a href="/contato" style="color:#cbd5e1;text-decoration:none;display:block;padding:4px 0;">Contato</a></li>
</ul>
</nav>
<nav aria-label="Conferências internacionais 2026 (sites oficiais)">
<h3 style="color:#fff;font-size:13px;letter-spacing:0.08em;text-transform:uppercase;margin:0 0 12px;">Palestras 2026 — Sites oficiais</h3>
<ul style="list-style:none;padding:0;margin:0;">
<li><a href="https://www.namibiaenergyconference.com/" target="_blank" rel="noopener" style="color:#cbd5e1;text-decoration:none;display:block;padding:4px 0;">NIEC — Namibia International Energy Conference (Windhoek, 14 Abril 2026)</a></li>
<li><a href="https://www.conferenciaminea.com/" target="_blank" rel="noopener" style="color:#cbd5e1;text-decoration:none;display:block;padding:4px 0;">MINEA — 2ª Conferência Internacional sobre Energia e Águas (Luanda, 28-29 Maio 2026)</a></li>
<li><a href="https://integratedglobal.com/en/events/aimct-angola-2026/" target="_blank" rel="noopener" style="color:#cbd5e1;text-decoration:none;display:block;padding:4px 0;">AIMCT Angola — Asset Integrity, Maintenance, Corrosion &amp; Turnaround (Luanda, 14 Julho 2026)</a></li>
<li><a href="https://www.namibiaoilandgasconf.com/" target="_blank" rel="noopener" style="color:#cbd5e1;text-decoration:none;display:block;padding:4px 0;">NOGC — Namibia Oil &amp; Gas Conference (Windhoek, 18-20 Agosto 2026)</a></li>
<li><a href="https://angolaoilandgas.com/attend/pre-conference-program" target="_blank" rel="noopener" style="color:#cbd5e1;text-decoration:none;display:block;padding:4px 0;">AOG — Angola Oil &amp; Gas (Luanda, 8-10 Setembro 2026)</a></li>
<li><a href="https://www.angolahubsummit.com/" target="_blank" rel="noopener" style="color:#cbd5e1;text-decoration:none;display:block;padding:4px 0;">AHTLS — Angola Hub Transporte &amp; Logística Summit (Talatona, 28-30 Setembro 2026)</a></li>
<li><a href="https://aecweek.com/" target="_blank" rel="noopener" style="color:#cbd5e1;text-decoration:none;display:block;padding:4px 0;">AEW — African Energy Week (Cape Town, 12 Outubro 2026)</a></li>
<li><a href="https://africagaslng.com/" target="_blank" rel="noopener" style="color:#cbd5e1;text-decoration:none;display:block;padding:4px 0;">AGLNG — Africa Gas &amp; LNG Summit (Maputo, 11-13 Novembro 2026)</a></li>
</ul>
</nav>
<nav aria-label="Empresas e produtos">
<h3 style="color:#fff;font-size:13px;letter-spacing:0.08em;text-transform:uppercase;margin:0 0 12px;">Empresas</h3>
<ul style="list-style:none;padding:0;margin:0;">
<li><a href="https://www.copiagroupofcompanies.com/" target="_blank" rel="noopener" style="color:#cbd5e1;text-decoration:none;display:block;padding:4px 0;">COPIA Group of Companies, S.A. (criador de Seis, DynamicSim, Quasar)</a></li>
<li><a href="https://edelphia.vercel.app/" target="_blank" rel="noopener" style="color:#cbd5e1;text-decoration:none;display:block;padding:4px 0;">EDELPHIA (Fundador · data science &amp; algoritmos)</a></li>
<li><a href="https://www.justificacoesacademicas.org/" target="_blank" rel="noopener" style="color:#cbd5e1;text-decoration:none;display:block;padding:4px 0;">Justificações Acadêmicas (Fundador &amp; CEO · formação profissional)</a></li>
<li><a href="https://welldesk.io/" target="_blank" rel="noopener" style="color:#cbd5e1;text-decoration:none;display:block;padding:4px 0;">WellDesk (Líder Técnico · Well Log Web Pro)</a></li>
</ul>
</nav>
</div>
<div style="max-width:1100px;margin:28px auto 0;padding-top:20px;border-top:1px solid #1e293b;font-size:12px;color:#64748b;">
<strong>Edmilson Delfim Praia</strong> · Director de Pesquisa, Desenvolvimento e Tecnologia na COPIA Group of Companies, S.A. · Geocientista-executivo angolano · Doutoramento em Geofísica Aplicada (Universidade Estatal do Petróleo de Ufa) · Contacto: <a href="mailto:praiae180@gmail.com" style="color:#cbd5e1;">praiae180@gmail.com</a> · <a href="https://wa.me/244933514132" style="color:#cbd5e1;">WhatsApp +244 933 514 132</a>
</div>
</footer>
`;

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

function injectStaticFooter(html) {
  // Insert the static sitemap/conference nav AFTER <div id="root"></div>
  // so it's part of the body, visible to crawlers, and outside React's root
  // (so hydration is unaffected).
  if (html.includes('data-static-sitemap="v1"')) return html; // idempotent
  const marker = '<div id="root"></div>';
  if (!html.includes(marker)) {
    console.warn('  [WARN] <div id="root"></div> marker not found; injection skipped');
    return html;
  }
  const taggedFooter = STATIC_FOOTER_NAV.replace('<footer ', '<footer data-static-sitemap="v1" ');
  return html.replace(marker, marker + '\n' + taggedFooter);
}

function main() {
  if (!fs.existsSync(BASE_HTML_PATH)) {
    console.error(`Base HTML not found at ${BASE_HTML_PATH}`);
    process.exit(1);
  }
  let baseHtml = fs.readFileSync(BASE_HTML_PATH, 'utf-8');
  console.log(`Base HTML loaded: ${baseHtml.length} bytes`);

  // 1) Inject the static footer into the homepage build/index.html itself
  baseHtml = injectStaticFooter(baseHtml);
  fs.writeFileSync(BASE_HTML_PATH, baseHtml, 'utf-8');
  console.log(`Homepage patched with static footer: ${baseHtml.length} bytes`);

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
