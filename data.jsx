/* Portfolio content — pulled from CV + project briefs */

const PROFILE = {
  name: "ana caroline vieira",
  fullName: "Ana Caroline Monteiro Vieira Pinto",
  role: "Desenvolvedora de Software",
  location: "Santarém · Pará · BR",
  domain: "carollie.dev",
  tagline: "construindo web apps escaláveis, plataformas SaaS, integrações & automações.",
  email: "anacvieira1415@gmail.com",
  phone: "+55 (93) 99124-9533",
};

const LINKS = [
  { id: "github", lbl: "github", val: "carolliie", href: "https://github.com/carolliie" },
  { id: "linkedin", lbl: "linkedin", val: "carolliie", href: "https://linkedin.com/in/carolliie" },
  { id: "instagram", lbl: "instagram", val: "@carollie.dev", href: "https://instagram.com/carollie.dev" },
  { id: "email", lbl: "email", val: "anacvieira1415@gmail.com", href: "mailto:anacvieira1415@gmail.com" },
];

const STACK = [
  "TypeScript", "JavaScript", "React", "Next.js", "Node.js",
  "Java", "Spring Boot", "PostgreSQL", "REST APIs", "Git", "Linux", "Docker", "Kanban",
];

const EXPERIENCE = [
  {
    id: "zum",
    company: "Zum Telecom",
    role: "Desenvolvedora de Software",
    period: "mai/2026 — atual",
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

const EDUCATION = {
  school: "Universidade Federal do Oeste do Pará — UFOPA",
  degree: "Bacharelado em Ciência da Computação",
  period: "2023 — atual",
  focus: "Arquitetura de computadores, Algoritmos, Engenharia de Software e IA",
};

const STACK_ICONS = {
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
  "React Native": "reactnative",
  Flutter: "flutter",
  Docker: "docker",
};

const PROJECTS = [
  {
    id: "agnelle",
    name: "Agnelle",
    image: "./screenshots/agnelle.webp",
    kind: "e-commerce",
    seed: 1.2,
    year: "2025",
    tagline: "Loja online completa — catálogo, carrinho e checkout.",
    overview:
      "E-commerce de ponta a ponta com vitrine de produtos, gestão de pedidos, pagamentos e painel administrativo. Foco em performance e numa jornada de compra fluida do primeiro clique ao checkout.",
    role: "Desenvolvimento full-stack — front-end, integração de pagamentos e painel de gestão.",
    features: [
      "Catálogo com busca, filtros e categorias",
      "Carrinho e checkout com integração de pagamento",
      "Painel administrativo de produtos e pedidos",
      "Layout responsivo e otimizado para conversão",
    ],
    stack: ["Next.js", "Node.js", "PostgreSQL", "Stripe", "TypeScript"],
    status: "em produção",
    url: null,
  },
  {
    id: "maisindica",
    name: "Mais Indica",
    image: "./screenshots/maisindica.webp",
    kind: "saas · recomendação",
    seed: 3.7,
    year: "2026",
    tagline: "SaaS de indicações e recompensas.",
    overview:
      "Plataforma de referral marketing: empresas criam programas de indicação, acompanham conversões em tempo real e distribuem recompensas automaticamente. Pensada para escalar e reduzir trabalho manual.",
    role: "Desenvolvimento de funcionalidades, automações de recompensa e dashboards.",
    features: [
      "Criação e gestão de programas de indicação",
      "Tracking de conversões em tempo real",
      "Distribuição automática de recompensas",
      "Dashboards de performance",
    ],
    stack: ["React", "Node.js", "PostgreSQL", "Zapier"],
    status: "ativo",
    url: null,
  },
  {
    id: "monitoracx",
    name: "MonitoraCX",
    image: "./screenshots/monitoracx.webp",
    kind: "saas · analytics",
    seed: 6.3,
    year: "2026",
    tagline: "Análise de atendimento e métricas de CX.",
    overview:
      "SaaS que coleta e analisa interações de atendimento, transformando dados brutos em métricas e insights de experiência do cliente para decisões orientadas a dados.",
    role: "Modelagem de dados, construção de métricas e visualizações.",
    features: [
      "Coleta e centralização de interações de atendimento",
      "Métricas de CX e indicadores de qualidade",
      "Painéis e visualizações de insights",
      "Base para decisões data-driven",
    ],
    stack: ["TypeScript", "React", "Node.js", "Grafana"],
    status: "ativo",
    url: null,
  },
  {
    id: "cloudpet",
    name: "cloudpet",
    image: "./screenshots/cloudpet.webp",
    kind: "app · gestão",
    seed: 8.9,
    year: "2023",
    tagline: "App e sistema de gestão de cuidado animal.",
    overview:
      "Aplicativo e sistema para gerenciar o cuidado de pets — histórico, lembretes e acompanhamento de saúde, com sincronização em nuvem entre o app e o painel de gestão.",
    role: "Desenvolvimento do app e do painel, integração com a nuvem.",
    features: [
      "Histórico de saúde e cuidados do pet",
      "Lembretes e acompanhamento",
      "Sincronização app ↔ painel via nuvem",
      "Gestão centralizada de informações",
    ],
    stack: ["Flutter", "Node.js", "PostgreSQL", "Docker"],
    status: "em desenvolvimento",
    url: null,
  },
];

Object.assign(window, { PROFILE, LINKS, STACK, EXPERIENCE, EDUCATION, PROJECTS, STACK_ICONS });
