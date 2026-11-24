# Otimização para SEO, recrutadores e sistemas automatizados

## 1. Auditoria (estado anterior)

| Achado | Impacto |
|---|---|
| `index.html` tinha `<div id="root"></div>` vazio; todo o conteúdo vinha de React + **Babel no navegador** (~3 MB de JS compilado em runtime) | Buscadores/IAs que não executam JS viam página vazia; LCP muito lento |
| Rotas por hash (`#/projeto/x`) | Nenhuma página de projeto indexável (hash não é enviado ao servidor) |
| Um único `<title>`, sem description, canonical, OG, Twitter, JSON-LD, robots.txt, sitemap | Sem controle de snippet/compartilhamento |
| `h1` era só a frase "No matter where you are…" (sem nome/cargo); seções com `<span>` no lugar de headings nas páginas de projeto | Estrutura semântica fraca |
| Navegação, "voltar", cards e "próximo projeto" eram `<button>`/`<div onClick>` | Sem links rastreáveis; teclado/leitor de tela prejudicados |
| Ícones de stack: `alt=""` + `title` e vindos de CDN externo; nomes das tecnologias não estavam em texto | Informação só em imagem; dependência de terceiros |
| Typewriter renderizava vazio no HTML inicial | Texto do hero invisível sem JS |
| Fontes: TTF de 300 KB cada + Google Fonts (2 conexões extras) ; GIF de 3,5 MB; screenshots até 1,2 MB sem width/height/lazy | CWV (LCP, CLS) ruins |
| Pasta `uploads/` inteira (imagens coladas, foto) publicada | Arquivos não intencionais públicos |
| Reveal-on-scroll com `opacity:0` sempre; boot sem acesso por teclado; `prefers-reduced-motion` cobria só 2 efeitos | Acessibilidade |
| Nada bloqueava indexação (não havia robots/meta robots) | OK — agora explícito |

## 2. O que foi implementado

**Arquitetura (req. 1–2):** `scripts/build.mjs` faz bundle com esbuild, renderiza cada página com `react-dom/server` e grava HTML completo em `dist/`. O cliente apenas hidrata (`hydrateRoot`). Babel e unpkg foram removidos. Netlify agora publica `dist/` (`netlify.toml`).

**Rotas estáticas:** `/`, `/recruiter/`, `/projetos/<id>/` (9 projetos), `404.html`. URLs antigas `#/projeto/<id>` redirecionam para a nova rota.

**Metadados (req. 3, 6, 13):** title, description (≤170), canonical, robots (`index, follow, max-image-preview:large`), Open Graph e Twitter Cards individuais por página, com imagens 1200×630 geradas (`assets/og/`). `404` usa `noindex`.

**JSON-LD (req. 4):** `WebSite` + `ProfilePage` + `Person` (com `sameAs`, `alumniOf`, `knowsAbout`) na home e em `/recruiter/`; `WebPage` + `CreativeWork` + `BreadcrumbList` nas páginas de projeto. Não foram usados tipos que gerariam rich results enganosos (sem `Review`, `Rating`, `JobPosting`, `SoftwareApplication` sem oferta).

**robots.txt / sitemap.xml / llms.txt (req. 5):** gerados no build a partir dos dados (sitemap = exatamente as rotas indexáveis; `lastmod` vem do último commit).

**Páginas de projeto (req. 7):** headings reais — visão geral, responsabilidades, resultados (somente quando há números já publicados: Antichurn e Mais Indica), funcionalidades, tecnologias (ícones + texto), status e link do projeto ao vivo.

**/recruiter (req. 8):** resumo (PT + parágrafo em inglês com `lang="en"`), experiência completa sem accordion (inclui destaques do currículo PDF), tecnologias por categoria, projetos com links, formação, certificações, idiomas, contato e botões de currículo. O PDF em inglês só aparece se o arquivo existir.

**Semântica e acessibilidade (req. 9, 11, 12):** um `h1` por página (com nome/cargo acessível), `h2/h3` para seções; nav como `<a>`; skip link; `aria-expanded/controls` nos acordeões de experiência; foto "decode: hover" também revela por foco de teclado; boot acessível por teclado; ícones com nome em texto; focus-visible; `prefers-reduced-motion` desativa animações, cursor customizado, spotlight, typewriter e boot; reveal só esconde conteúdo quando JS está ativo (sem JS tudo aparece). Canvas dither e animações são decorativos; todo conteúdo real está em HTML.

**Performance (req. 10):** sem Babel/unpkg/Google Fonts/simpleicons (todos auto-hospedados); fontes woff2 (Helvetica 318→107 KB) com preload; CSS/JS minificados com hash e cache imutável; screenshots ≤1200 px + variante 640 px com `srcset`, `width/height`, `lazy`; GIF de contato → WebP; hero reveal por CSS (sem esperar JS); JS ~62 KB gzip.

**Testes (req. 14):** `npm test` — 67 testes (status HTTP, title/description/canonical/OG/Twitter por rota, 1 h1, conteúdo essencial no HTML sem JS, JSON-LD parseável, links internos, sitemap = rotas, robots, 404, redirect, a11y estática). `scripts/smoke.mjs` abre as páginas no Chromium e falha se houver erro de console/hidratação.

## 3. Problemas remanescentes / decisões suas

1. **Domínio canônico.** `carollie.dev` não respondia na auditoria; usei `https://carollie.netlify.app` (o mesmo do link do currículo). Ao apontar domínio próprio, defina `SITE_URL` no Netlify e reenvie o sitemap.
2. **Inconsistência no conteúdo (não alterei):** `EXPERIENCE` diz Zum Telecom "mai/2026 — atual", mas o PDF diz "Maio/2026 – Setembro/2026" e a seção Sobre diz "trabalho como freelancer". Corrija em `src/data.js` para recrutadores não verem datas conflitantes.
3. **Currículo em inglês não existe** no repositório. Gere o PDF e salve como `uploads/RESUME_ANA_CAROLINE_VIEIRA_EN.pdf`; o botão aparece automaticamente (e entra no `llms.txt`).
4. O PDF do currículo contém telefone e e-mail e é público — mantenha ciente.
5. Projetos sem números (Agnelle, Cloudpet, sites WordPress) não têm "resultados": só aparecem métricas reais. Se tiver outras (usuários, vendas, tempo de carga), adicione em `PROJECT_EXTRA.results`.
6. `striped-face-transparent.webp` ainda pesa ~1,6 MB (animação); está com `lazy`, mas considere um vídeo curto ou versão menor.
7. Arquivos não mais publicados mas ainda no repo: TTFs, `uploads/pasted-*.png`, GIF/PNG não usados, `monitoracx.webp`, `*:Zone.Identifier`. Pode remover.
8. Sem CSP (há scripts inline pequenos); só cabeçalhos básicos de segurança.
9. Nenhum teste Lighthouse automatizado (sem acesso à rede do PageSpeed aqui) — medir em produção (abaixo).

## 4. Como validar em produção

1. **Deploy:** configure `SITE_URL` (Netlify → Site settings → Environment variables) e faça deploy. Confira `https://SEU-SITE/robots.txt`, `/sitemap.xml`, `/recruiter/` e `curl -s https://SEU-SITE/ | grep -c "<h1"` (HTML já contém o conteúdo).
2. **Google Search Console:** adicione a propriedade (prefixo de URL ou domínio) → verifique (meta tag: defina `GOOGLE_SITE_VERIFICATION` e reenvie o build, ou DNS) → *Sitemaps* → enviar `sitemap.xml` → *Inspeção de URL* em `/`, `/recruiter/` e um projeto → "Testar URL ao vivo" → conferir "HTML renderizado" e "Solicitar indexação". Acompanhe *Páginas* e *Experiência → Core Web Vitals*.
3. **Bing Webmaster Tools:** importe do Search Console (ou verifique com `BING_SITE_VERIFICATION`), envie o sitemap e use "Inspeção de URL".
4. **PageSpeed Insights** (pagespeed.web.dev): teste `/`, `/projetos/antichurn/` e `/recruiter/` em mobile e desktop. Metas: LCP < 2,5 s, CLS < 0,1, INP < 200 ms; também confira Acessibilidade e SEO = 100.
5. **Rich Results Test** (search.google.com/test/rich-results) e **Schema Markup Validator** (validator.schema.org): teste as 3 tipos de página; esperado: Person/ProfilePage e Breadcrumb detectados, sem erros. (`WebSite` e `CreativeWork` aparecem só no validador schema.org, não geram rich result.)
6. **Compartilhamento:** teste um link no LinkedIn Post Inspector / Facebook Sharing Debugger e no card de X para ver as imagens OG.
7. Indexação leva dias; use `site:seu-dominio` no Google/Bing para acompanhar.
