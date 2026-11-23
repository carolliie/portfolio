/* Portfolio content — pulled from CV + project briefs */

const PROFILE = {
  name: "ana caroline vieira",
  fullName: "Ana Caroline Monteiro Vieira Pinto",
  role: "Software Engineer",
  location: "Santarém · Pará · BR",
  tagline: "construindo sistemas e apps escaláveis, plataformas SaaS, sistemas distribuídos, integrações, IA & automações.",
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
      "Node.js",
      "React",
      "PostgreSQL",
      "REST APIs",
      "Docker",
      "ERP Integrations",
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
      "Automação",
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
      "OCR",
      "Generative AI",
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
    year: 2024,
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
    year: 2026,
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
    year: 2023,
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
    year: 2023,
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


Object.assign(window, { PROFILE, LINKS, STACK, EXPERIENCE, EDUCATION, PROJECTS, STACK_ICONS });
