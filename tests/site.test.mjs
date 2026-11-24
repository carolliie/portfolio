// Testes do site gerado (dist/). Rode com: npm test  (faz o build antes)
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { startServer } from "../scripts/serve.mjs";

const dist = path.resolve(import.meta.dirname, "../dist");
const projectsSrc = fs.readFileSync(path.resolve(import.meta.dirname, "../src/data.js"), "utf8");
const projectIds = [...projectsSrc.matchAll(/^\s+id: "(\w+)",\n\s+name:/gm)].map((m) => m[1]);
let server, base;
before(async () => { server = await startServer(dist); base = `http://127.0.0.1:${server.address().port}`; });
after(() => server.close());

const get = async (p, opts) => { const r = await fetch(base + p, { redirect: "manual", ...opts }); return { r, text: await r.text() }; };
const meta = (h, re) => (h.match(re) || [])[1];
const strip = (h) => h.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, "").replace(/<[^>]+>/g, " ");

const routes = ["/", "/recruiter/", ...projectIds.map((id) => `/projetos/${id}/`)];

test("há 9 projetos descobertos nos dados", () => assert.ok(projectIds.length >= 9, String(projectIds)));

for (const route of routes) {
  test(`${route}: status 200 e metadados completos`, async () => {
    const { r, text: h } = await get(route);
    assert.equal(r.status, 200);
    const title = meta(h, /<title>([^<]+)<\/title>/);
    const desc = meta(h, /<meta name="description" content="([^"]+)"/);
    assert.ok(title && title.length >= 20 && title.length <= 75, `title: ${title}`);
    assert.ok(desc && desc.length >= 70 && desc.length <= 170, `description (${desc?.length}): ${desc}`);
    const canon = meta(h, /<link rel="canonical" href="([^"]+)"/);
    assert.ok(canon && canon.startsWith("https://") && canon.endsWith(route), `canonical: ${canon}`);
    for (const p of ["og:title", "og:description", "og:url", "og:image", "og:type", "og:site_name"]) assert.match(h, new RegExp(`property="${p}"`), p);
    for (const n of ["twitter:card", "twitter:title", "twitter:description", "twitter:image"]) assert.match(h, new RegExp(`name="${n}"`), n);
    assert.equal(meta(h, /property="og:url" content="([^"]+)"/), canon);
    assert.doesNotMatch(h, /noindex/, "página pública não pode ter noindex");
    assert.match(h, /<html lang="pt-BR"/);
  });

  test(`${route}: um único h1 e conteúdo essencial no HTML inicial (sem JS)`, async () => {
    const { text: h } = await get(route);
    assert.equal((h.match(/<h1[\s>]/g) || []).length, 1, "exatamente um <h1>");
    const body = strip(h);
    assert.ok(body.replace(/\s+/g, " ").length > 600, "texto visível suficiente no HTML");
    assert.match(h, /<main id="conteudo"/);
    assert.match(h, /<h2[\s>]/);
  });

  test(`${route}: imagem OG existe`, async () => {
    const { text: h } = await get(route);
    const img = new URL(meta(h, /property="og:image" content="([^"]+)"/));
    const { r } = await get(img.pathname);
    assert.equal(r.status, 200);
    assert.match(r.headers.get("content-type"), /image\/jpeg/);
  });

  test(`${route}: JSON-LD válido`, async () => {
    const { text: h } = await get(route);
    const blocks = [...h.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
    assert.ok(blocks.length >= 1);
    const g = JSON.parse(blocks[0][1])["@graph"];
    const types = g.map((n) => n["@type"]);
    assert.ok(types.includes("Person") && types.includes("WebSite"), types.join());
  });

  test(`${route}: todos os links internos resolvem`, async () => {
    const { text: h } = await get(route);
    const hrefs = new Set([...h.matchAll(/(?:href|src)="(\/[^"#?]*)/g)].map((m) => m[1]));
    for (const href of hrefs) {
      const { r } = await get(href);
      assert.ok(r.status === 200, `${href} -> ${r.status}`);
    }
  });
}

test("home: conteúdo profissional presente no HTML (nome, cargo, experiência, projetos, contato)", async () => {
  const { text: h } = await get("/");
  const t = strip(h);
  for (const s of ["Ana Caroline Vieira", "Software Engineer", "Zum Telecom", "Lugenius", "UFOPA", "Ciência da Computação", "Antichurn", "Tapajós Skate Shop", "TypeScript", "contato"]) assert.ok(t.includes(s), `falta: ${s}`);
  assert.match(h, /href="\/projetos\/antichurn\/"/);
  assert.match(h, /href="\/recruiter\/"/);
});

test("home: JSON-LD Person com sameAs e WebSite", async () => {
  const { text: h } = await get("/");
  const g = JSON.parse(h.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1])["@graph"];
  const person = g.find((n) => n["@type"] === "Person");
  assert.equal(person.name, "Ana Caroline Vieira");
  assert.ok(person.sameAs.some((u) => u.includes("github.com/carolliie")));
  assert.ok(g.find((n) => n["@type"] === "WebSite").url);
});

test("recruiter: seções, links de currículo e conteúdo completo no HTML", async () => {
  const { text: h } = await get("/recruiter/");
  const t = strip(h);
  for (const s of ["resumo profissional", "experiência", "tecnologias", "projetos", "formação", "Spring Boot", "AWS Academy", "Inglês"]) assert.ok(t.includes(s), `falta: ${s}`);
  assert.match(h, /href="\/uploads\/CURRICULO_ANA_CAROLINE_VIEIRA\.pdf"/);
  const { r } = await get("/uploads/CURRICULO_ANA_CAROLINE_VIEIRA.pdf");
  assert.equal(r.status, 200);
  assert.equal(r.headers.get("content-type"), "application/pdf");
  // cada experiência com todos os bullets visíveis (sem accordion)
  assert.ok(t.includes("Colaboração com equipes multidisciplinares"));
  assert.ok(t.includes("Implementação de mais de 20 interfaces"));
});

test("páginas de projeto: seções técnicas e link do projeto", async () => {
  for (const id of projectIds) {
    const { text: h } = await get(`/projetos/${id}/`);
    const t = strip(h);
    for (const s of ["visão geral", "responsabilidades", "funcionalidades", "tecnologias", "status"]) assert.ok(t.includes(s), `${id}: falta ${s}`);
    assert.match(h, /target="_blank" rel="noopener noreferrer"/);
    assert.match(h, /"@type":"BreadcrumbList"/);
    assert.match(h, /"@type":"CreativeWork"/);
  }
});

test("projetos com resultados mostram apenas números reais publicados", async () => {
  const a = (await get("/projetos/antichurn/")).text;
  assert.ok(strip(a).includes("23.308+") && strip(a).includes("18"));
  const m = (await get("/projetos/maisindica/")).text;
  assert.ok(strip(m).includes("74,6%"));
});

test("imagens têm alt/dimensões e ícones não dependem do CDN externo", async () => {
  const { text: h } = await get("/");
  for (const img of h.match(/<img [^>]*>/g)) {
    assert.match(img, /alt="/, img);
    assert.match(img, /width="\d+"/, img);
  }
  assert.doesNotMatch(h, /simpleicons|fonts\.googleapis|unpkg\.com/);
});

test("sem bloqueio de indexação: robots.txt e sitemap.xml", async () => {
  const { r, text: robots } = await get("/robots.txt");
  assert.equal(r.status, 200);
  assert.match(robots, /User-agent: \*/);
  assert.doesNotMatch(robots, /Disallow:\s*\/\s*$/m);
  assert.match(robots, /Sitemap: https:\/\/[^\s]+\/sitemap\.xml/);
  const { r: rs, text: xml } = await get("/sitemap.xml");
  assert.equal(rs.status, 200);
  assert.match(rs.headers.get("content-type"), /xml/);
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
  assert.deepEqual(locs.sort(), [...routes].sort());
  assert.ok(!locs.includes("/404.html"));
  for (const l of locs) assert.equal((await get(l)).r.status, 200);
});

test("404 retorna status 404 com noindex", async () => {
  const { r, text } = await get("/nao-existe/");
  assert.equal(r.status, 404);
  assert.match(text, /noindex/);
});

test("rota antiga /projetos/x sem barra redireciona", async () => {
  const { r } = await get("/recruiter");
  assert.equal(r.status, 301);
});

test("acessibilidade estática: skip link, nav rotulada, aria-expanded em acordeões", async () => {
  const { text: h } = await get("/");
  assert.match(h, /class="skip-link[^"]*" href="#conteudo"/);
  assert.match(h, /<nav class="nav[^"]*" aria-label="Principal"/);
  assert.match(h, /aria-expanded="(true|false)"/);
  const css = fs.readFileSync(path.join(dist, "assets", fs.readdirSync(path.join(dist, "assets")).find((f) => f.endsWith(".css"))), "utf8");
  assert.match(css, /prefers-reduced-motion/);
  assert.match(css, /focus-visible/);
});

test("deploy: assets com hash e netlify.toml publica dist/", () => {
  const toml = fs.readFileSync(path.resolve(import.meta.dirname, "../netlify.toml"), "utf8");
  assert.match(toml, /publish = "dist"/);
  assert.ok(fs.readdirSync(path.join(dist, "assets")).some((f) => /^app-[A-Z0-9]+\.js$/.test(f)));
});
