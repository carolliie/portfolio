// Build estático: bundle (esbuild) + SSR (react-dom/server) + SEO (meta, JSON-LD, sitemap, robots).
// Uso: npm run build   |   SITE_URL=https://seudominio npm run build
import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
import { pathToFileURL } from "node:url";
import esbuild from "esbuild";

const root = path.resolve(import.meta.dirname, "..");
const dist = path.join(root, "dist");
const tmp = path.join(root, ".build");
const rel = (...p) => path.join(root, ...p);
fs.rmSync(dist, { recursive: true, force: true });
fs.rmSync(tmp, { recursive: true, force: true });
fs.mkdirSync(path.join(dist, "assets"), { recursive: true });

/* ---------- 1. Bundles ---------- */
const common = { absWorkingDir: root, logLevel: "warning", loader: { ".jsx": "jsx" }, jsx: "transform" };
const client = await esbuild.build({
  ...common,
  entryPoints: { app: "src/client.jsx" },
  bundle: true, minify: true, format: "esm", target: "es2020",
  outdir: "dist/assets", entryNames: "[name]-[hash]", metafile: true,
  define: { "process.env.NODE_ENV": '"production"', "process.env.SITE_URL": "undefined" },
});
const css = await esbuild.build({
  ...common,
  entryPoints: { styles: "src/styles.css" },
  bundle: true, minify: true, outdir: "dist/assets", entryNames: "[name]-[hash]", metafile: true,
  external: ["/assets/*"],
});
const outName = (meta, ext) => "/" + Object.keys(meta.metafile.outputs).find((f) => f.endsWith(ext)).replace(/^dist\//, "");
const JS = outName(client, ".js");
const CSS = outName(css, ".css");

await esbuild.build({
  ...common,
  entryPoints: ["src/server.jsx"], bundle: true, platform: "node", format: "esm",
  outfile: ".build/server.mjs", packages: "external",
  define: { "process.env.NODE_ENV": '"production"' },
});
const { render, data } = await import(pathToFileURL(path.join(tmp, "server.mjs")).href);
const { SITE, PROFILE, LINKS, STACK, EDUCATION, PROJECTS, CV, RECRUITER } = data;

/* ---------- 2. Helpers ---------- */
const BASE = (process.env.SITE_URL || SITE.url).replace(/\/$/, "");
const abs = (p) => BASE + p;
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const hasEnglishCv = fs.existsSync(rel("uploads", CV.en.file));
let lastmod;
try {
  lastmod = execSync("git log -1 --format=%cI -- src uploads assets screenshots", { cwd: root, stdio: ["ignore", "pipe", "ignore"] }).toString().trim();
} catch { /* sem git */ }
lastmod = (lastmod || new Date().toISOString()).slice(0, 10);

/* ---------- 3. JSON-LD ---------- */
const PERSON_ID = abs("/#person");
const person = {
  "@type": "Person",
  "@id": PERSON_ID,
  name: "Ana Caroline Vieira",
  alternateName: [PROFILE.fullName, "carollie"],
  jobTitle: PROFILE.role,
  description: "Software Engineer em Santarém (PA), com experiência em plataformas SaaS, aplicações web e mobile, integrações com APIs e ERPs, automação e inteligência artificial.",
  url: abs("/"),
  image: abs("/assets/ana-photo.webp"),
  email: "mailto:" + PROFILE.email,
  sameAs: LINKS.filter((l) => l.id !== "email").map((l) => l.href),
  address: { "@type": "PostalAddress", addressLocality: "Santarém", addressRegion: "PA", addressCountry: "BR" },
  alumniOf: { "@type": "CollegeOrUniversity", name: "Universidade Federal do Oeste do Pará", alternateName: "UFOPA" },
  knowsAbout: STACK,
  knowsLanguage: ["pt-BR", "en"],
};
const website = {
  "@type": "WebSite", "@id": abs("/#website"), url: abs("/"), name: SITE.name, inLanguage: SITE.lang,
  publisher: { "@id": PERSON_ID }, author: { "@id": PERSON_ID },
};
const crumbs = (items) => ({
  "@type": "BreadcrumbList",
  itemListElement: items.map(([name, p], i) => ({ "@type": "ListItem", position: i + 1, name, item: abs(p) })),
});

/* ---------- 4. Páginas ---------- */
const pages = [];
pages.push({
  out: "index.html", path: "/", page: { type: "home" }, home: true,
  title: "Ana Caroline Vieira — Software Engineer | Portfólio",
  description: "Portfólio de Ana Caroline Vieira, Software Engineer em Santarém (PA): plataformas SaaS, apps web e mobile, integrações e automação. Projetos, experiência e currículo.",
  image: "/assets/og/home.jpg", imageAlt: "Ana Caroline Vieira — Software Engineer",
  jsonld: [website, { "@type": "ProfilePage", "@id": abs("/#profilepage"), url: abs("/"), name: "Ana Caroline Vieira — Portfólio", inLanguage: SITE.lang, dateModified: lastmod, mainEntity: { "@id": PERSON_ID }, isPartOf: { "@id": abs("/#website") } }, person],
});
pages.push({
  out: "recruiter/index.html", path: "/recruiter/", page: { type: "recruiter", hasEnglishCv },
  title: "Ana Caroline Vieira — Currículo e experiência (recrutadores)",
  description: "Resumo, experiência, tecnologias, projetos, formação e currículo em PDF de Ana Caroline Vieira, desenvolvedora de software Full Stack / Back-end.",
  image: "/assets/og/home.jpg", imageAlt: "Ana Caroline Vieira — Software Engineer",
  jsonld: [website, { "@type": "ProfilePage", "@id": abs("/recruiter/#profilepage"), url: abs("/recruiter/"), name: "Ana Caroline Vieira — Currículo", inLanguage: SITE.lang, dateModified: lastmod, mainEntity: { "@id": PERSON_ID }, isPartOf: { "@id": abs("/#website") } }, person, crumbs([["Início", "/"], ["Recrutadores", "/recruiter/"]])],
});
for (const p of PROJECTS) {
  const pagePath = `/projetos/${p.id}/`;
  pages.push({
    out: `projetos/${p.id}/index.html`, path: pagePath, page: { type: "project", id: p.id }, type: "article",
    title: `${p.seoTitle} | Ana Caroline Vieira`,
    description: p.seoDescription,
    image: `/assets/og/${p.id}.jpg`, imageAlt: `Captura de tela do projeto ${p.name}`,
    preloadImage: p.image,
    jsonld: [website, person, {
      "@type": "WebPage", "@id": abs(pagePath) + "#webpage", url: abs(pagePath), name: p.seoTitle, description: p.seoDescription,
      inLanguage: SITE.lang, dateModified: lastmod, isPartOf: { "@id": abs("/#website") }, primaryImageOfPage: abs(`/assets/og/${p.id}.jpg`),
      breadcrumb: { "@id": abs(pagePath) + "#breadcrumb" }, mainEntity: { "@id": abs(pagePath) + "#work" },
    }, {
      "@type": "CreativeWork", "@id": abs(pagePath) + "#work", name: p.name, headline: p.tagline, description: p.overview,
      url: p.url, image: abs(`/assets/og/${p.id}.jpg`), dateCreated: p.year, keywords: p.stack.join(", "),
      genre: p.kind, inLanguage: "pt-BR", creator: { "@id": PERSON_ID },
    }, { ...crumbs([["Início", "/"], ["Projetos", "/#projetos"], [p.name, pagePath]]), "@id": abs(pagePath) + "#breadcrumb" }],
  });
}
pages.push({
  out: "404.html", path: "/404.html", page: { type: "404" }, noindex: true,
  title: "Página não encontrada | Ana Caroline Vieira", description: "A página procurada não existe.",
  image: "/assets/og/home.jpg", imageAlt: "Ana Caroline Vieira", jsonld: [],
});

const verification = [
  process.env.GOOGLE_SITE_VERIFICATION && `<meta name="google-site-verification" content="${esc(process.env.GOOGLE_SITE_VERIFICATION)}">`,
  process.env.BING_SITE_VERIFICATION && `<meta name="msvalidate.01" content="${esc(process.env.BING_SITE_VERIFICATION)}">`,
].filter(Boolean).join("\n");

function html(pg) {
  const url = abs(pg.path === "/404.html" ? "/" : pg.path);
  const img = abs(pg.image);
  const body = render({ ...pg.page });
  const boot = pg.home
    ? `if(sessionStorage.getItem('cl_booted')!=='1'&&!matchMedia('(prefers-reduced-motion: reduce)').matches){c.add('pre-boot');setTimeout(function(){c.remove('pre-boot')},4000)}if(/^#\\/projeto\\/[\\w-]+/.test(location.hash)){location.replace('/projetos/'+location.hash.split('/')[2]+'/')}`
    : "";
  const ld = pg.jsonld.length ? `<script type="application/ld+json">${JSON.stringify({ "@context": "https://schema.org", "@graph": pg.jsonld }).replace(/</g, "\\u003c")}</script>` : "";
  return `<!doctype html>
<html lang="${SITE.lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(pg.title)}</title>
<meta name="description" content="${esc(pg.description)}">
<link rel="canonical" href="${url}">
<meta name="robots" content="${pg.noindex ? "noindex, follow" : "index, follow, max-image-preview:large, max-snippet:-1"}">
<meta name="author" content="Ana Caroline Vieira">
<meta name="theme-color" content="${SITE.themeColor}">
<meta name="color-scheme" content="dark">
${verification}
<meta property="og:type" content="${pg.type || "website"}">
<meta property="og:site_name" content="${esc(SITE.name)}">
<meta property="og:locale" content="${SITE.locale}">
<meta property="og:title" content="${esc(pg.title)}">
<meta property="og:description" content="${esc(pg.description)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${img}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${esc(pg.imageAlt)}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(pg.title)}">
<meta name="twitter:description" content="${esc(pg.description)}">
<meta name="twitter:image" content="${img}">
<meta name="twitter:image:alt" content="${esc(pg.imageAlt)}">
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<link rel="sitemap" type="application/xml" href="/sitemap.xml">
<link rel="preload" href="/assets/fonts/Helvetica.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/assets/fonts/SpaceMono-Regular.woff2" as="font" type="font/woff2" crossorigin>
${pg.preloadImage ? `<link rel="preload" href="${pg.preloadImage}" as="image" type="image/webp" fetchpriority="high">` : ""}
<link rel="stylesheet" href="${CSS}">
<script>(function(){var c=document.documentElement.classList;c.add('js');try{${boot}}catch(e){}})()</script>
${ld}
</head>
<body>
<div id="root" data-page="${esc(JSON.stringify(pg.page))}">${body}</div>
<script type="module" src="${JS}"></script>
</body>
</html>
`;
}

for (const pg of pages) {
  const f = path.join(dist, pg.out);
  fs.mkdirSync(path.dirname(f), { recursive: true });
  fs.writeFileSync(f, html(pg));
}

/* ---------- 5. robots, sitemap, llms.txt ---------- */
fs.writeFileSync(path.join(dist, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${abs("/sitemap.xml")}\n`);
const indexable = pages.filter((p) => !p.noindex);
fs.writeFileSync(path.join(dist, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${indexable.map((p) => `  <url>\n    <loc>${abs(p.path)}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`).join("\n")}
</urlset>
`);
fs.writeFileSync(path.join(dist, "llms.txt"), `# Ana Caroline Vieira — Portfólio

> ${PROFILE.role} em ${PROFILE.location.replace(/ · /g, ", ")}. ${RECRUITER.summaryPt}

## Páginas principais
- [Portfólio](${abs("/")}): apresentação, experiência, projetos e contato
- [Versão para recrutadores](${abs("/recruiter/")}): currículo completo em HTML, tecnologias, projetos e formação
- [Currículo (PDF, pt-BR)](${abs(CV.pt.href)})
${hasEnglishCv ? `- [Resume (PDF, English)](${abs(CV.en.href)})\n` : ""}
## Projetos
${PROJECTS.map((p) => `- [${p.name}](${abs(`/projetos/${p.id}/`)}): ${p.tagline}`).join("\n")}

## Links
${LINKS.map((l) => `- ${l.lbl}: ${l.href}`).join("\n")}
`);

/* ---------- 6. Arquivos estáticos ---------- */
const copy = (from, to) => { fs.mkdirSync(path.dirname(path.join(dist, to)), { recursive: true }); fs.copyFileSync(rel(from), path.join(dist, to)); };
copy("favicon.svg", "favicon.svg");
for (const f of ["Helvetica", "Helvetica-Bold", "Helvetica-Oblique", "Helvetica-BoldOblique", "SpaceMono-Regular", "SpaceMono-Bold"]) copy(`assets/fonts/${f}.woff2`, `assets/fonts/${f}.woff2`);
for (const f of fs.readdirSync(rel("assets/icons"))) copy(`assets/icons/${f}`, `assets/icons/${f}`);
for (const f of fs.readdirSync(rel("assets/og"))) copy(`assets/og/${f}`, `assets/og/${f}`);
copy("assets/ana-photo.webp", "assets/ana-photo.webp");
copy("assets/striped-face-transparent.webp", "assets/striped-face-transparent.webp");
for (const p of PROJECTS) for (const i of [p.image, p.image640]) if (i) copy(i.slice(1), i.slice(1));
copy(`uploads/${CV.pt.file}`, `uploads/${CV.pt.file}`);
if (hasEnglishCv) copy(`uploads/${CV.en.file}`, `uploads/${CV.en.file}`);

fs.rmSync(tmp, { recursive: true, force: true });
console.log(`build ok: ${pages.length} páginas, base ${BASE}, lastmod ${lastmod}, resume EN: ${hasEnglishCv ? "sim" : "não (arquivo ausente)"}`);
