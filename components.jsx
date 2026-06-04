/* global React */
const { useState, useEffect, useRef, useCallback } = React;

/* ---------- Dither canvas wrapper ---------- */
function Dither({ seed = 1, mode = "noise", cols = 140, rows = 56, theme, className, style }) {
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current && window.renderDither) {
      window.renderDither(ref.current, { seed, mode, cols, rows });
    }
  }, [seed, mode, cols, rows, theme]);
  return (
    <canvas
      ref={ref}
      className={"dither " + (className || "")}
      style={style}
      aria-hidden="true"
    />
  );
}

/* ---------- Boot sequence (The Wired) ---------- */
const BOOT_LINES = [
  "> estabelecendo conexão com a wired . . .",
  "> protocolo: present day // present time",
  "> carregando identidade: ana_caroline.vieira",
  "> host: carollie.dev",
  "> [████████████████████] 100%",
  "> you are here.",
];

function Boot({ onDone }) {
  const [shown, setShown] = useState(0);
  const [closing, setClosing] = useState(false);

  const finish = useCallback(() => {
    setClosing(true);
    setTimeout(onDone, 650);
  }, [onDone]);

  useEffect(() => {
    if (shown >= BOOT_LINES.length) {
      const t = setTimeout(finish, 700);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setShown((s) => s + 1), shown === 0 ? 280 : 360);
    return () => clearTimeout(t);
  }, [shown, finish]);

  return (
    <div className={"boot" + (closing ? " boot--out" : "")} onClick={finish}>
      <div className="boot__inner">
        {BOOT_LINES.slice(0, shown).map((l, i) => (
          <div className="boot__line" key={i}>
            {l}
          </div>
        ))}
        {shown < BOOT_LINES.length && <span className="boot__caret">▮</span>}
      </div>
      <div className="boot__skip mono">clique para entrar →</div>
    </div>
  );
}

/* ---------- Theme switch ---------- */
const THEMES = [
  { id: "rosa", label: "rosa" },
  { id: "wired", label: "wired" },
  { id: "amber", label: "âmbar" },
];

function ThemeSwitch({ theme, setTheme }) {
  return (
    <div className="themeswitch mono">
      <span className="themeswitch__lbl">tema</span>
      <div className="themeswitch__dots">
        {THEMES.map((t) => (
          <button
            key={t.id}
            className={"themeswitch__dot tw--" + t.id + (theme === t.id ? " is-on" : "")}
            onClick={() => setTheme(t.id)}
            aria-label={t.label}
            title={t.label}
          >
            <span className="themeswitch__name">{t.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ---------- Section header (Notion "study plan ~" style) ---------- */
function Bar({ children, n }) {
  return (
    <div className="bar reveal">
      {n && <span className="bar__n mono">{n}</span>}
      <h2 className="bar__t">{children}</h2>
    </div>
  );
}

/* ---------- Hero ---------- */
function Hero({ theme }) {
  return (
    <header className="hero">
      <div className="hero__banner">
        <Dither mode="scape" seed={2.4} cols={220} rows={64} theme={theme} />
        <div className="hero__bannerglow" />
      </div>

      <div className="wrap hero__body">
        <div className="hero__avatar">
          <Dither mode="orb" seed={5.1} cols={64} rows={64} theme={theme} />
        </div>

        <h1 className="hero__name glitch" data-text="ana caroline vieira">
          ana caroline vieira
        </h1>
        <p className="hero__role mono">
          desenvolvedora de software <span className="dot">·</span> carollie.dev
        </p>

        <div className="callout reveal">
          <span className="callout__bullet">✶</span>
          <p>
            software developer & computer science student @ UFOPA. construindo
            web apps escaláveis, plataformas <em>SaaS</em>, integrações e
            automações. <span className="muted">close the world, open the next.</span>
          </p>
        </div>

        <blockquote className="hero__quote reveal">
          “there you are sweetheart, sorry i'm late — i was looking everywhere for you”
        </blockquote>
      </div>
    </header>
  );
}

/* ---------- About ---------- */
const STACK = ["TypeScript", "React", "Next.js", "Node.js", "Java", "Spring Boot", "PostgreSQL", "Cloud", "SaaS", "Automations"];

function About({ theme }) {
  return (
    <section className="sec wrap" id="sobre">
      <Bar n="01">sobre mim ~</Bar>
      <div className="about">
        <div className="about__text reveal">
          <p>
            Software Developer e estudante de Ciência da Computação na{" "}
            <strong>UFOPA</strong>, apaixonada por construir aplicações web
            escaláveis, plataformas <em>SaaS</em>, integrações e soluções de
            automação.
          </p>
          <p>
            Experiência com <strong>TypeScript, React, Next.js, Node.js, Java,
            Spring Boot, PostgreSQL</strong> e tecnologias de nuvem. Interesse em
            engenharia de software, product development e em criar tecnologia que
            melhora a experiência do usuário e os resultados do negócio.
          </p>
          <p className="muted">
            Sempre aberta a aprender, colaborar e encarar novos desafios.
          </p>
        </div>

        <aside className="about__side reveal">
          <div className="remember">
            <h3 className="remember__t">remember ~</h3>
            <ul className="remember__list mono">
              <li>↳ scalable web apps</li>
              <li>↳ SaaS & product</li>
              <li>↳ integrations</li>
              <li>↳ automation</li>
            </ul>
          </div>
          <div className="stack">
            <span className="stack__lbl mono">stack ~</span>
            <div className="stack__chips">
              {STACK.map((s) => (
                <span className="chip mono" key={s}>{s}</span>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}

/* ---------- Projects ---------- */
const PROJECTS = [
  {
    id: "agnelle",
    name: "Agnelle",
    kind: "e-commerce",
    seed: 1.2,
    tagline: "Loja online completa — catálogo, carrinho e checkout.",
    desc: "E-commerce de ponta a ponta: vitrine de produtos, gestão de pedidos, pagamentos e painel administrativo. Foco em performance e numa experiência de compra fluida.",
    stack: ["Next.js", "Node.js", "PostgreSQL", "Stripe"],
    status: "em produção",
  },
  {
    id: "maisindica",
    name: "Mais Indica",
    kind: "saas · recomendação",
    seed: 3.7,
    tagline: "SaaS de indicações e recompensas.",
    desc: "Plataforma de referral marketing: empresas criam programas de indicação, acompanham conversões e distribuem recompensas automaticamente. Dashboards em tempo real.",
    stack: ["React", "Node.js", "Automations", "PostgreSQL"],
    status: "ativo",
  },
  {
    id: "monitoracx",
    name: "MonitoraCX",
    kind: "saas · analytics",
    seed: 6.3,
    tagline: "Análise de atendimento e métricas de CX.",
    desc: "SaaS que coleta e analisa interações de atendimento, gerando métricas e insights de experiência do cliente para decisões orientadas a dados.",
    stack: ["TypeScript", "React", "Node.js", "Dashboards"],
    status: "ativo",
  },
  {
    id: "cloudpet",
    name: "cloudpet",
    kind: "app · gestão",
    seed: 8.9,
    tagline: "App e sistema de gestão de cuidado animal.",
    desc: "Aplicativo e sistema para gerenciar o cuidado de pets — histórico, lembretes e acompanhamento de saúde, com sincronização em nuvem entre app e painel.",
    stack: ["React", "Node.js", "Cloud", "Mobile"],
    status: "em desenvolvimento",
  },
];

function ProjectCard({ p, theme, onOpen }) {
  return (
    <button className="card reveal" onClick={() => onOpen(p)}>
      <div className="card__cover">
        <Dither mode="noise" seed={p.seed} cols={120} rows={84} theme={theme} />
        <span className="card__kind mono">{p.kind}</span>
      </div>
      <div className="card__body">
        <h3 className="card__name">{p.name}</h3>
        <p className="card__tag">{p.tagline}</p>
        <span className="card__open mono">abrir ↗</span>
      </div>
    </button>
  );
}

function ProjectModal({ p, theme, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);
  if (!p) return null;
  return (
    <div className="modal" onClick={onClose}>
      <div className="modal__card" onClick={(e) => e.stopPropagation()}>
        <div className="modal__cover">
          <Dither mode="scape" seed={p.seed + 0.5} cols={200} rows={88} theme={theme} />
          <button className="modal__x mono" onClick={onClose} aria-label="fechar">esc ✕</button>
          <span className="modal__kind mono">{p.kind}</span>
        </div>
        <div className="modal__body">
          <h3 className="modal__name glitch" data-text={p.name}>{p.name}</h3>
          <p className="modal__tag">{p.tagline}</p>
          <p className="modal__desc">{p.desc}</p>
          <div className="modal__meta">
            <div>
              <span className="metalbl mono">stack</span>
              <div className="stack__chips">
                {p.stack.map((s) => <span className="chip mono" key={s}>{s}</span>)}
              </div>
            </div>
            <div>
              <span className="metalbl mono">status</span>
              <p className="modal__status mono">● {p.status}</p>
            </div>
          </div>
          <a className="btn mono" href="#" onClick={(e) => e.preventDefault()}>
            ver projeto →
          </a>
        </div>
      </div>
    </div>
  );
}

function Projects({ theme }) {
  const [open, setOpen] = useState(null);
  return (
    <section className="sec wrap" id="projetos">
      <Bar n="02">projetos ~</Bar>
      <div className="grid">
        {PROJECTS.map((p) => (
          <ProjectCard key={p.id} p={p} theme={theme} onOpen={setOpen} />
        ))}
      </div>
      <ProjectModal p={open} theme={theme} onClose={() => setOpen(null)} />
    </section>
  );
}

/* ---------- Contact ---------- */
const LINKS = [
  { lbl: "instagram", val: "@carollie.dev", href: "https://instagram.com/carollie.dev" },
  { lbl: "linkedin", val: "carolliie", href: "https://linkedin.com/in/carolliie" },
  { lbl: "github", val: "carolliie", href: "https://github.com/carolliie" },
];

function Contact() {
  return (
    <section className="sec wrap" id="contato">
      <Bar n="03">contato ~</Bar>
      <div className="callout reveal">
        <span className="callout__bullet">✶</span>
        <p>aberta a colaborações, freelas e novos desafios. me encontre na wired:</p>
      </div>
      <div className="links">
        {LINKS.map((l) => (
          <a className="link reveal" href={l.href} target="_blank" rel="noreferrer" key={l.lbl}>
            <span className="link__lbl mono">{l.lbl}</span>
            <span className="link__val">{l.val}</span>
            <span className="link__arrow mono">↗</span>
          </a>
        ))}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer wrap mono">
      <span>ana caroline vieira — carollie.dev</span>
      <span className="muted">present day. present time.</span>
    </footer>
  );
}

Object.assign(window, {
  Dither, Boot, ThemeSwitch, Bar, Hero, About, Projects, Contact, Footer, THEMES,
});
