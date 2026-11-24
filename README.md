# portfolio — Ana Caroline Vieira

Site estático gerado em build (React 18 renderizado no servidor + hidratação no cliente).

```bash
npm install
npm run build    # gera dist/ (HTML, CSS/JS com hash, sitemap, robots, llms.txt)
npm run serve    # serve dist/ em http://127.0.0.1:4173
npm test         # build + 67 testes (metadados, rotas, sitemap, HTTP, conteúdo no HTML)
npm run assets   # (raro) regenera woff2, webp, imagens OG e src/image-meta.json
```

- Código-fonte: `src/` · Build: `scripts/build.mjs` · Testes: `tests/`
- Domínio final: `SITE_URL=https://seu-dominio npm run build` (padrão: `https://carollie.netlify.app`)
- Verificação de propriedade (opcional): variáveis `GOOGLE_SITE_VERIFICATION` e `BING_SITE_VERIFICATION`
- Currículo em inglês: coloque o PDF em `uploads/RESUME_ANA_CAROLINE_VIEIRA_EN.pdf`; o link aparece sozinho em `/recruiter/`

Documentação completa das mudanças e validação: [docs/SEO.md](docs/SEO.md)
