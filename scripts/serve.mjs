// Servidor estático mínimo para dist/ (mesma semântica do Netlify: pretty URLs, 404.html).
import http from "node:http";
import fs from "node:fs";
import path from "node:path";

const MIME = { ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".json": "application/json", ".xml": "application/xml; charset=utf-8", ".txt": "text/plain; charset=utf-8", ".svg": "image/svg+xml", ".webp": "image/webp", ".jpg": "image/jpeg", ".png": "image/png", ".woff2": "font/woff2", ".pdf": "application/pdf" };

export function startServer(dir, port = 0) {
  const server = http.createServer((req, res) => {
    const url = new URL(req.url, "http://x");
    let p = path.join(dir, decodeURIComponent(url.pathname));
    if (!p.startsWith(dir)) { res.writeHead(403); return res.end(); }
    let status = 200;
    if (fs.existsSync(p) && fs.statSync(p).isDirectory()) {
      if (!url.pathname.endsWith("/")) { res.writeHead(301, { Location: url.pathname + "/" + url.search }); return res.end(); }
      p = path.join(p, "index.html");
    }
    if (!fs.existsSync(p)) { p = path.join(dir, "404.html"); status = 404; }
    res.writeHead(status, { "Content-Type": MIME[path.extname(p)] || "application/octet-stream" });
    fs.createReadStream(p).pipe(res);
  });
  return new Promise((resolve) => server.listen(port, "127.0.0.1", () => resolve(server)));
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const s = await startServer(path.resolve(import.meta.dirname, "../dist"), Number(process.env.PORT) || 4173);
  console.log("http://127.0.0.1:" + s.address().port);
}
