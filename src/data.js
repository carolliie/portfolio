/* Portfolio content — pulled from CV + project briefs */

import imageMeta from "./image-meta.json";

/* ---------- Configuração do site ----------
   SITE_URL pode ser sobrescrita no build: SITE_URL=https://meudominio.dev npm run build */
export const SITE = {
  name: "Ana Caroline Vieira — Portfólio",
  shortName: "carollie",
  url: (typeof process !== "undefined" && process.env && process.env.SITE_URL) || "https://carollie.netlify.app",
  lang: "pt-BR",
  locale: "pt_BR",
  themeColor: "#0b0608",
};

/* Currículos. O PDF em inglês só é publicado/linkado se o arquivo existir em uploads/ (ver scripts/build.mjs). */
export const CV = {
  pt: { href: "/uploads/CURRICULO_ANA_CAROLINE_VIEIRA.pdf", file: "CURRICULO_ANA_CAROLINE_VIEIRA.pdf", lang: "pt-BR", label: "Currículo em português (PDF)" },
  en: { href: "/uploads/RESUME_ANA_CAROLINE_VIEIRA_EN.pdf", file: "RESUME_ANA_CAROLINE_VIEIRA_EN.pdf", lang: "en", label: "Resume in English (PDF)" },
};

export const PROFILE = {
  name: "ana caroline vieira",
  fullName: "Ana Caroline Monteiro Vieira Pinto",
  role: "Software Engineer",
  roleCv: "Desenvolvedora de Software Jr. (Full Stack / Back-end)",
  location: "Santarém · Pará · BR",
  tagline: "construindo sistemas e apps escaláveis, plataformas SaaS, sistemas distribuídos, integrações, IA & automações.",
  email: "anacvieira1415@gmail.com",
  phone: "+55 (93) 99124-9533",
};

export const LINKS = [
  { id: "github", lbl: "github", val: "carolliie", href: "https://github.com/carolliie" },
  { id: "linkedin", lbl: "linkedin", val: "carolliie", href: "https://linkedin.com/in/carolliie" },
  { id: "instagram", lbl: "instagram", val: "@carollie.dev", href: "https://instagram.com/carollie.dev" },
  { id: "email", lbl: "email", val: "anacvieira1415@gmail.com", href: "mailto:anacvieira1415@gmail.com" },
];

export const STACK = [
  "TypeScript", "JavaScript", "React", "Next.js", "Node.js",
  "Java", "Spring Boot", "PostgreSQL", "REST APIs", "Git", "Linux", "Docker", "Kanban",
];

export const EXPERIENCE = [
  {
    id: "zum",
    company: "Zum Telecom",
    role: "Desenvolvedora de Software",
    period: "mai/2026 — set/2026",
    now: true,
    summary: "Sistemas para provedores de internet — ISP, ERP e CRM.",
    bullets: [
      "Desenvolvimento e manutenção de soluções ISP, ERP e CRM com foco em automação de processos e otimização operacional.",
      "Levantamento de requisitos, modelagem, arquitetura e implementação de funcionalidades para sistemas escaláveis e intuitivos.",
      "Automação de serviços, integração de processos e ampliação da presença digital dos clientes — melhorando experiência e conversão.",
      "Colaboração com equipes multidisciplinares no planejamento, testes e evolução contínua das aplicações.",
    ],
    tags: ["ISP", "ERP", "CRM", "Automação"],
  },
  {
    id: "lugenius",
    company: "Lugenius",
    role: "Estagiária — Soluções em Tecnologia",
    period: "mar/2024 — mar/2026",
    summary: "Interfaces web responsivas e interativas, foco em UI/UX.",
    bullets: [
      "Desenvolvimento de interfaces web responsivas e interativas para uma melhor experiência do usuário.",
      "Aplicação de boas práticas de UI/UX para otimizar navegação e usabilidade.",
      "Implementação de funcionalidades e consumo de APIs RESTful, integrando sistemas.",
      "HTML, CSS, JavaScript, WordPress, React e Git em equipes multidisciplinares.",
    ],
    tags: ["React", "WordPress", "APIs", "UI/UX", "Git"],
  },
  {
    id: "ufopa",
    company: "UFOPA",
    role: "Voluntária — Amazônibus (PIAPE)",
    period: "fev/2025 — dez/2025",
    summary: "App de gestão de transporte e rastreamento de veículos.",
    bullets: [
      "Desenvolvimento de funcionalidades para gestão de transporte universitário e rastreamento de veículos, melhorando a mobilidade dos estudantes.",
      "Levantamento de requisitos, prototipagem e implementação de sistemas alinhados às necessidades da universidade.",
      "Otimização do fluxo de informações e do acesso aos recursos de transporte.",
    ],
    tags: ["Mobilidade", "Tracking", "Prototipagem"],
  },
];

export const EDUCATION = {
  school: "Universidade Federal do Oeste do Pará — UFOPA",
  degree: "Bacharelado em Ciência da Computação",
  period: "2023 — atual",
  focus: "Arquitetura de computadores, Algoritmos, Engenharia de Software e IA",
};

export const STACK_ICONS = {
  TypeScript: "typescript",
  JavaScript: "javascript",
  React: "react",
  "Next.js": "nextdotjs",
  "Node.js": "nodedotjs",
  Java: "openjdk",
  "Spring Boot": "springboot",
  PostgreSQL: "postgresql",
  "REST APIs": "swagger",
  Git: "git",
  Linux: "linux",
  Kanban: "trello",
  Stripe: "stripe",
  Zapier: "zapier",
  Grafana: "grafana",
  "Google Cloud": "googlecloud",
  Flutter: "flutter",
  Docker: "docker",
  HTML: "html5",
  PHP: "php",
  Laravel: "laravel",
  CSS: "css",
  Elementor: "elementor",
  WordPress: "wordpress",
  WooCommerce: "woocommerce",
  JetEngine: "wordpress",
};


const RAW_PROJECTS = [
  {
    id: "antichurn",
    name: "Antichurn",
    image: "./screenshots/antichurn.webp",
    kind: "saas · analytics · customer retention",
    seed: 2.4,
    year: "2026",
    tagline:
      "23.308+ clientes monitorados e 18 indicadores de risco de churn.",
    overview:
      "Plataforma SaaS de inteligência de dados e prevenção de churn para provedores de internet (ISPs). A solução monitora mais de 23.308 clientes distribuídos entre diferentes instâncias e bases ativas, integrando dados comerciais, financeiros e operacionais de ERPs. Utiliza 18 indicadores de risco para identificar clientes com maior probabilidade de cancelamento, automatizar alertas e apoiar estratégias de retenção. Reúne dashboards analíticos, gestão de atendimentos e fluxos operacionais para transformar dados em ações preventivas.",
    role:
      "Desenvolvimento e evolução da plataforma, implementação de regras de negócio, integrações ERP, APIs, automações, dashboards e funcionalidades de retenção.",
    features: [
      "Mais de 23.308 clientes monitorados em bases ativas",
      "18 indicadores para identificação de risco de churn",
      "Integrações com ERPs como SGP e IXC Soft",
      "Análise de inadimplência, satisfação e comportamento",
      "Monitoramento de instabilidade e qualidade de conexão",
      "Score de risco e segmentação de clientes",
      "Kanban para gestão de ações de retenção",
      "Alertas automatizados e dashboards gerenciais",
      "Arquitetura multi-tenant para diferentes provedores",
    ],
    stack: [
      "TypeScript",
      "PHP",
      "Laravel",
      "Node.js",
      "React",
      "PostgreSQL",
      "REST APIs",
      "Docker",
    ],
    status: "ativo",
    url: "https://antichurn.com.br/",
  },
  {
    id: "agnelle",
    name: "Agnelle",
    image: "./screenshots/agnelle.webp",
    kind: "e-commerce · full-stack",
    seed: 1.2,
    year: "2025",
    tagline: "E-commerce com gestão integrada de produtos, pedidos e pagamentos.",
    overview:
      "Plataforma de comércio eletrônico desenvolvida para integrar a experiência de compra à gestão operacional de uma loja virtual. A solução reúne catálogo de produtos, carrinho, checkout e painel administrativo, com foco em usabilidade, desempenho e organização dos processos comerciais.",
    role:
      "Desenvolvimento full-stack, implementação de interfaces responsivas, integrações de pagamento e funcionalidades administrativas.",
    features: [
      "Catálogo de produtos com busca, filtros e categorias",
      "Carrinho de compras e checkout integrado",
      "Gerenciamento de produtos e pedidos",
      "Painel administrativo para operações comerciais",
      "Interface responsiva com foco em usabilidade e conversão",
    ],
    stack: [
      "Next.js",
      "Node.js",
      "PostgreSQL",
      "Stripe",
      "TypeScript",
    ],
    status: "em produção",
    url: "https://agnelles.com.br/",
  },
  {
    id: "maisindica",
    name: "Mais Indica",
    image: "./screenshots/maisindica.webp",
    kind: "saas · referral marketing",
    seed: 3.7,
    year: "2026",
    tagline:
      "283 leads, 211 conversões e R$ 23 mil em receita registrada.",
    overview:
      "Plataforma SaaS de gestão de indicações e recompensas, desenvolvida para automatizar programas de referral marketing e acompanhar resultados comerciais. Em uma operação de provedor de internet, registrou 283 leads, 211 conversões, taxa de conversão de 74,6% e aproximadamente R$ 23 mil em receita. A solução centraliza campanhas, indicadores e fluxos de indicação, proporcionando maior rastreabilidade e eficiência operacional.",
    role:
      "Desenvolvimento de funcionalidades, integrações, automações de processos comerciais e dashboards de desempenho.",
    features: [
      "283 leads registrados em uma operação",
      "211 conversões e taxa de conversão de 74,6%",
      "Aproximadamente R$ 23 mil em receita registrada",
      "Gestão de campanhas e programas de indicação",
      "Rastreamento de leads e acompanhamento de conversões",
      "Dashboards com indicadores comerciais",
      "Automação de fluxos de indicação e recompensas",
    ],
    stack: [
      "React",
      "Node.js",
      "PostgreSQL",
      "REST APIs",
    ],
    status: "ativo",
    url: "https://maisindica.com.br/",
  },
  {
    id: "cloudpet",
    name: "Cloudpet",
    image: "./screenshots/cloudpet.webp",
    kind: "mobile · healthtech · ia",
    seed: 8.9,
    year: "2026",
    tagline:
      "Saúde animal digital com Flutter, OCR e inteligência artificial.",
    overview:
      "Aplicativo mobile de gestão da saúde e dos cuidados veterinários, desenvolvido para conectar tutores, clínicas e profissionais em um ecossistema digital. A solução utiliza OCR e inteligência artificial para digitalizar informações de carteirinhas de vacinação, além de centralizar históricos de saúde, facilitar o acompanhamento preventivo e oferecer recursos de assistência e emergência para animais de estimação.",
    role:
      "Desenvolvimento mobile com Flutter, implementação de funcionalidades, integração com APIs, OCR, inteligência artificial e arquitetura de dados.",
    features: [
      "Digitalização de carteirinhas de vacinação com OCR",
      "Extração inteligente de informações veterinárias",
      "Histórico de saúde e vacinação dos animais",
      "Assistente com inteligência artificial",
      "Módulos específicos para tutores e veterinários",
      "Gestão de informações e acompanhamento de cuidados",
      "Funcionalidades de emergência e transporte pet",
      "Sincronização de dados entre aplicativo e backend",
    ],
    stack: [
      "Flutter",
      "Node.js",
      "PostgreSQL",
      "Docker",
      "REST APIs",
    ],
    status: "em desenvolvimento",
    url: "https://cloudpet.zumdigital.com.br/",
  },

  {
    id: "casadocamarao",
    name: "Casa do Camarão",
    image: "./screenshots/casadocamarao.webp",
    kind: "website · comércio · institucional",
    seed: 4.2,
    year: "2024",
    tagline:
      "Presença digital para uma marca tradicional da gastronomia regional.",
    overview:
      "Website institucional e comercial da Casa do Camarão, empresa de Santarém especializada em pescados regionais. O projeto apresenta produtos, receitas e a história da marca, valorizando sua identidade e tradição amazônica. A experiência digital organiza informações comerciais e facilita o contato com consumidores.",
    role:
      "Desenvolvimento de interfaces web, organização de conteúdo, implementação de páginas e adaptação responsiva.",
    features: [
      "Apresentação institucional e história da empresa",
      "Vitrine digital de produtos regionais",
      "Seção de receitas e conteúdos gastronômicos",
      "Formulário de cadastro de visitantes",
      "Canais de contato e informações comerciais",
      "Interface responsiva",
    ],
    stack: ["WordPress", "Elementor", "HTML", "CSS", "JavaScript"],
    status: "em produção",
    url: "https://casadocamaraostm.com.br/",
  },
  {
    id: "equilibrium",
    name: "Equilibrium Vestibulares",
    image: "./screenshots/equilibrium.webp",
    kind: "website · edtech · institucional",
    seed: 5.6,
    year: "2024",
    tagline:
      "Plataforma educacional com cursos, inscrições e conteúdo institucional.",
    overview:
      "Website educacional do Equilibrium Vestibulares, instituição de preparação para o ENEM e vestibulares em Santarém. A plataforma reúne informações sobre cursos, professores, resultados de aprovação, concursos de bolsas e conteúdos educacionais. O projeto organiza a oferta acadêmica e facilita a descoberta de cursos e o contato de interessados.",
    role:
      "Desenvolvimento e evolução de páginas web, organização de conteúdo, melhorias de interface e experiência do usuário.",
    features: [
      "Catálogo de cursos preparatórios e modalidades",
      "Páginas de cursos com informações e inscrições",
      "Apresentação de professores e equipe",
      "Galeria de aprovados e depoimentos",
      "Divulgação de concursos de bolsas",
      "Blog e conteúdos educacionais",
      "Integração com canais de atendimento",
    ],
    stack: ["WordPress", "Elementor", "HTML", "CSS", "JavaScript"],
    status: "em produção",
    url: "https://equilibriumvestibulares.com/",
  },
  {
    id: "gapstudio",
    name: "Gap Studio",
    image: "./screenshots/gapstudio.webp",
    kind: "website · design · portfolio",
    seed: 7.1,
    year: "2026",
    tagline:
      "Portfólio digital para um estúdio de design e comunicação visual.",
    overview:
      "Website institucional e portfólio para um estúdio criativo especializado em identidade visual, design estratégico e comunicação. A plataforma apresenta serviços e projetos em uma experiência visual voltada à identidade da marca, permitindo que potenciais clientes conheçam o trabalho do estúdio e solicitem orçamentos.",
    role:
      "Desenvolvimento da experiência web, implementação de layouts responsivos, organização do portfólio e integração de canais de contato.",
    features: [
      "Portfólio de projetos criativos",
      "Apresentação de serviços e especialidades",
      "Páginas de projetos e trabalhos realizados",
      "Navegação orientada à identidade visual",
      "Integração com WhatsApp para orçamentos",
      "Layout responsivo para diferentes dispositivos",
    ],
    stack: ["WordPress", "Elementor", "HTML", "CSS", "JavaScript"],
    status: "em produção",
    url: "https://gapstudio.com.br/",
  },
  {
    id: "tapajosskateshop",
    name: "Tapajós Skate Shop",
    image: "./screenshots/tapajosskateshop.webp",
    kind: "e-commerce · retail · streetwear",
    seed: 9.4,
    year: "2023",
    tagline:
      "E-commerce de skate e streetwear com catálogo, carrinho e checkout.",
    overview:
      "Loja virtual especializada em produtos de skate e streetwear, desenvolvida para ampliar a presença digital de uma marca tradicional de Santarém. O e-commerce reúne produtos de diferentes marcas, categorias, ofertas e condições de pagamento, proporcionando uma experiência de compra integrada e acessível em dispositivos móveis e desktop.",
    role:
      "Desenvolvimento e personalização da loja virtual durante estágio na empresa Lugenius: implementação de interfaces, organização do catálogo e melhorias na experiência de compra.",
    features: [
      "Catálogo de produtos por categorias e marcas",
      "Páginas de produtos com preços e variações",
      "Carrinho de compras e fluxo de checkout",
      "Exibição de ofertas e produtos em destaque",
      "Condições de pagamento e parcelamento",
      "Seções promocionais e vitrines personalizadas",
      "Interface responsiva para compras online",
    ],
    stack: [
      "WordPress",
      "WooCommerce",
      "Elementor",
      "PHP",
      "JavaScript",
      "CSS",
    ],
    status: "em produção",
    url: "https://tapajosskateshop.com.br/",
  },
  {
    id: "estruturaimoveis",
    name: "Estrutura Imóveis",
    image: "./screenshots/estruturaimoveis.webp",
    kind: "website · real estate · catálogo",
    seed: 11.3,
    year: "2023",
    tagline:
      "Portal imobiliário com catálogo dinâmico e filtros de busca.",
    overview:
      "Portal imobiliário desenvolvido para apresentar imóveis residenciais, comerciais e terrenos disponíveis para compra ou aluguel. A plataforma organiza anúncios com informações detalhadas e oferece mecanismos de pesquisa por localização, tipo de imóvel, características e faixa de preço, facilitando a descoberta de propriedades e o contato com consultores.",
    role:
      "Desenvolvimento de interfaces e funcionalidades de catálogo imobiliário, implementação de filtros de pesquisa e organização da navegação.",
    features: [
      "Catálogo de imóveis para venda e locação",
      "Busca por bairro, finalidade e tipo de imóvel",
      "Filtros por quartos, banheiros e faixa de preço",
      "Páginas de imóveis com fotos e características",
      "Listagem de empreendimentos e destaques",
      "Integração com canais de atendimento",
      "Blog com conteúdos do mercado imobiliário",
      "Interface responsiva",
    ],
    stack: [
      "WordPress",
      "Elementor",
      "JetEngine",
      "PHP",
      "JavaScript",
      "CSS",
    ],
    status: "em produção",
    url: "https://estruturaimoveis.com.br/",
  },
];




/* ---------- Metadados SEO e resultados por projeto ----------
   Resultados (`results`) usam somente números já publicados no conteúdo do projeto. */
const PROJECT_EXTRA = {
  antichurn: {
    title: "Antichurn — SaaS de prevenção de churn para ISPs",
    seo: "Antichurn: plataforma SaaS de prevenção de churn para provedores de internet, com 18 indicadores de risco e mais de 23 mil clientes monitorados.",
    results: [
      { value: "23.308+", label: "clientes monitorados em bases ativas" },
      { value: "18", label: "indicadores de risco de churn" },
    ],
  },
  agnelle: {
    title: "Agnelle — e-commerce full-stack com Next.js",
    seo: "Agnelle: e-commerce full-stack com catálogo, carrinho, checkout com Stripe e painel administrativo, em Next.js, Node.js e PostgreSQL.",
  },
  maisindica: {
    title: "Mais Indica — SaaS de gestão de indicações",
    seo: "Mais Indica: plataforma SaaS de indicações e recompensas — 283 leads, 211 conversões e cerca de R$ 23 mil em receita registrada em uma operação.",
    results: [
      { value: "283", label: "leads registrados em uma operação" },
      { value: "211", label: "conversões" },
      { value: "74,6%", label: "taxa de conversão" },
      { value: "≈ R$ 23 mil", label: "em receita registrada" },
    ],
  },
  cloudpet: {
    title: "Cloudpet — app de saúde animal com IA e OCR",
    seo: "Cloudpet: app mobile em Flutter para saúde animal, com OCR e IA para digitalizar carteirinhas de vacinação, para tutores e veterinários.",
  },
  casadocamarao: {
    title: "Casa do Camarão — website institucional",
    seo: "Casa do Camarão: website institucional e comercial de uma empresa de pescados regionais de Santarém (PA), em WordPress e Elementor.",
  },
  equilibrium: {
    title: "Equilibrium Vestibulares — site educacional",
    seo: "Equilibrium Vestibulares: site educacional com cursos, professores, aprovados, bolsas e blog para preparação ao ENEM em Santarém (PA).",
  },
  gapstudio: {
    title: "Gap Studio — portfólio de estúdio de design",
    seo: "Gap Studio: website institucional e portfólio de um estúdio de design e comunicação visual, com integração ao WhatsApp para orçamentos.",
  },
  tapajosskateshop: {
    title: "Tapajós Skate Shop — e-commerce de skate",
    seo: "Tapajós Skate Shop: e-commerce de skate e streetwear em WordPress e WooCommerce, com catálogo por marcas, carrinho e checkout.",
  },
  estruturaimoveis: {
    title: "Estrutura Imóveis — portal imobiliário",
    seo: "Estrutura Imóveis: portal imobiliário com catálogo dinâmico, filtros por localização, tipo e preço e páginas detalhadas dos imóveis.",
  },
};

export const PROJECTS = RAW_PROJECTS.map((p) => {
  const m = imageMeta[p.id] || {};
  const x = PROJECT_EXTRA[p.id] || {};
  return {
    ...p,
    year: String(p.year),
    image640: p.image ? p.image.replace(".webp", "-640.webp").replace("./", "/") : undefined,
    image: p.image ? p.image.replace("./", "/") : undefined,
    imageW: m.w, imageH: m.h, imageW640: m.w640, imageH640: m.h640,
    seoTitle: x.title || p.name,
    seoDescription: x.seo || p.tagline,
    results: x.results || [],
  };
});

/* ---------- Dados adicionais do currículo (versão /recruiter) ----------
   Fonte: uploads/CURRICULO_ANA_CAROLINE_VIEIRA.pdf */
export const RECRUITER = {
  headline: "Desenvolvedora de Software Jr. (Full Stack / Back-end)",
  summaryPt:
    "Desenvolvedora de Software e graduanda em Ciência da Computação pela Universidade Federal do Oeste do Pará (UFOPA), com experiência em desenvolvimento de aplicações web, sistemas SaaS, integrações com APIs e ERPs, automação de processos e análise de dados. Atua no desenvolvimento e evolução de sistemas utilizados por provedores de internet, envolvendo backend, frontend, bancos de dados, integrações externas, regras de negócio e resolução de problemas em produção.",
  summaryEn:
    "Software developer and Computer Science student at the Federal University of Western Pará (UFOPA), Brazil, with experience building web applications and SaaS platforms, integrating APIs and ERP systems, automating processes and analysing data. Works on systems used by internet service providers, covering back end, front end, databases, third-party integrations, business rules and production troubleshooting. English level: intermediate.",
  skills: [
    { group: "Linguagens", items: ["Java", "JavaScript", "TypeScript", "SQL"] },
    { group: "Frontend", items: ["React", "Next.js", "HTML", "CSS", "Tailwind CSS", "WordPress"] },
    { group: "Backend", items: ["Node.js", "Express", "Java", "Spring Boot", "APIs REST"] },
    { group: "Banco de dados", items: ["PostgreSQL", "MongoDB", "Modelagem relacional"] },
    { group: "DevOps e cloud", items: ["Docker", "AWS", "Linux", "Git", "GitHub"] },
    { group: "Engenharia de software", items: ["Arquitetura de software", "Engenharia de requisitos", "Orientação a objetos", "Integração de sistemas", "Documentação técnica", "Testes", "Debugging", "Análise de dados", "Metodologias ágeis"] },
  ],
  certifications: [
    { name: "AWS Academy Graduate – Cloud Foundations", issuer: "Amazon Web Services" },
    { name: "AWS Academy Cloud Architecting", issuer: "Amazon Web Services" },
    { name: "Formação Aprenda a programar em Java com Orientação a Objetos", issuer: "Alura" },
    { name: "Formação Java Web: crie aplicações usando Spring Boot", issuer: "Alura" },
  ],
  languages: [{ name: "Português", level: "Nativo" }, { name: "Inglês", level: "Intermediário" }],
  /* Destaques do currículo, por experiência (id de EXPERIENCE) */
  experienceHighlights: {
    zum: [
      "Integrações via API REST com ERPs de provedores de internet (IXC Soft e SGP): clientes, contratos, atendimentos, ordens de serviço e dados financeiros.",
      "Regras de análise de comportamento e risco de clientes transformadas em indicadores de decisão — redução de 91% de trabalho manual (conforme currículo).",
      "Investigação e correção de problemas de sincronização de dados, regras de negócio, APIs, banco de dados e jobs assíncronos.",
      "Stack: React, Next.js, TypeScript, Node.js, PostgreSQL, Docker, Git e serviços de cloud.",
    ],
    lugenius: [
      "Implementação de mais de 20 interfaces a partir de protótipos, com UI/UX, responsividade, acessibilidade e usabilidade.",
    ],
    ufopa: [
      "Amazonibus: sistema web de gestão de requisições de transporte institucional da UFOPA, com React, TypeScript, Vite, Tailwind CSS e Axios; prototipagem no Figma.",
    ],
  },
};
