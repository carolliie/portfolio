// Gera woff2 das fontes Helvetica e versões otimizadas de imagens.
// Uso: npm run assets  (idempotente; só roda quando precisar regenerar)
import fs from "node:fs";
import path from "node:path";
import ttf2woff2 from "ttf2woff2";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");
const fonts = path.join(root, "assets/fonts");
for (const f of fs.readdirSync(fonts).filter((n) => n.endsWith(".ttf"))) {
  const out = path.join(fonts, f.replace(/\.ttf$/, ".woff2"));
  fs.writeFileSync(out, ttf2woff2(fs.readFileSync(path.join(fonts, f))));
  console.log("font", path.basename(out), fs.statSync(out).size);
}

// Screenshots: limita a 1200px de largura (cards usam <= 600px; hero da página de projeto é decorativo)
// e gera uma variante 640w para os cards.
const shots = path.join(root, "screenshots");
for (const f of fs.readdirSync(shots).filter((n) => n.endsWith(".webp") && !n.includes("-640"))) {
  const src = path.join(shots, f);
  const img = sharp(fs.readFileSync(src));
  const meta = await img.metadata();
  const base = f.replace(/\.webp$/, "");
  if (meta.width > 1200) {
    fs.writeFileSync(src, await sharp(fs.readFileSync(src)).resize(1200).webp({ quality: 78 }).toBuffer());
  }
  const small = await sharp(fs.readFileSync(src)).resize(640).webp({ quality: 74 }).toBuffer();
  fs.writeFileSync(path.join(shots, `${base}-640.webp`), small);
  const m2 = await sharp(fs.readFileSync(src)).metadata();
  console.log("shot", f, `${meta.width}x${meta.height} -> ${m2.width}x${m2.height}`);
}

// Arte do contato: GIF de 1.9MB -> WebP animado
const gif = path.join(root, "assets/striped-face-transparent.gif");
const outGif = path.join(root, "assets/striped-face-transparent.webp");
fs.writeFileSync(outGif, await sharp(gif, { animated: true }).webp({ quality: 70, effort: 5 }).toBuffer());
console.log("gif->webp", fs.statSync(outGif).size);

// Foto: versão menor em webp (usada como <img> real e fonte do dither)
const photo = path.join(root, "assets/ana-photo.jpeg");
const m = await sharp(photo).metadata();
fs.writeFileSync(path.join(root, "assets/ana-photo.webp"), await sharp(photo).resize(Math.min(m.width, 900)).webp({ quality: 78 }).toBuffer());
console.log("photo", m.width, m.height);

// ---- Metadados de imagem (dimensões intrínsecas p/ evitar CLS) ----
const meta = {};
for (const f of fs.readdirSync(shots).filter((n) => n.endsWith(".webp") && !n.includes("-640"))) {
  const a = await sharp(path.join(shots, f)).metadata();
  const b = await sharp(path.join(shots, f.replace(".webp", "-640.webp"))).metadata();
  meta[f.replace(".webp", "")] = { w: a.width, h: a.height, w640: b.width, h640: b.height };
}
const cm = await sharp(outGif).metadata();
meta["_contact"] = { w: cm.width, h: cm.pageHeight || cm.height };
fs.writeFileSync(path.join(root, "src/image-meta.json"), JSON.stringify(meta, null, 2) + "\n");

// ---- Imagens Open Graph / Twitter (1200x630 JPEG, uma por projeto + home) ----
const og = path.join(root, "assets/og");
fs.mkdirSync(og, { recursive: true });
for (const f of Object.keys(meta).filter((k) => !k.startsWith("_"))) {
  await sharp(path.join(shots, f + ".webp"))
    .resize(1200, 630, { fit: "cover", position: "top" })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(path.join(og, f + ".jpg"));
}
const face = await sharp(path.join(root, "assets/striped-face.png")).resize({ height: 520, fit: "inside" }).toBuffer();
const svg = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
<rect width="1200" height="630" fill="#0b0608"/>
<g stroke="#ef9bb6" stroke-opacity="0.08">${Array.from({ length: 55 }, (_, i) => `<line x1="${i * 22}" y1="0" x2="${i * 22}" y2="630"/>`).join("")}${Array.from({ length: 29 }, (_, i) => `<line x1="0" y1="${i * 22}" x2="1200" y2="${i * 22}"/>`).join("")}</g>
<rect x="40" y="40" width="1120" height="550" fill="none" stroke="#f1e0e6" stroke-width="3"/>
<text x="90" y="150" font-family="DejaVu Sans Mono, monospace" font-size="26" fill="#ef9bb6">✶ carollie.dev</text>
<text x="90" y="300" font-family="DejaVu Sans Mono, monospace" font-weight="700" font-size="68" fill="#f1e0e6">ana caroline</text>
<text x="90" y="380" font-family="DejaVu Sans Mono, monospace" font-weight="700" font-size="68" fill="#f1e0e6">vieira</text>
<text x="90" y="450" font-family="DejaVu Sans Mono, monospace" font-size="30" fill="#ef9bb6">Software Engineer · Full Stack</text>
<text x="90" y="500" font-family="DejaVu Sans Mono, monospace" font-size="24" fill="#9a7c84">Santarém, Pará · Brasil</text>
</svg>`);
await sharp(svg).composite([{ input: face, left: 700, top: 55 }]).jpeg({ quality: 85, mozjpeg: true }).toFile(path.join(og, "home.jpg"));
console.log("og images", fs.readdirSync(og).length);
