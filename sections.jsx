/* global React, PROFILE, LINKS, STACK, EXPERIENCE, EDUCATION, PROJECTS,
   SocialRow, Glitch, Dither, DitherImage, Typewriter, ClockHUD, Magnetic, Icon */
const { useState, useEffect, useRef } = React;

/* ================= BOOT ================= */
const BOOT_LINES = [
  "> conectando à wired . . .",
  "> protocolo: present day // present time",
  "> autenticando: ana_caroline.vieira",
  "> host: carollie.dev @ santarém-pa",
  "> camadas: [identidade][memória][rede]",
  "> [████████████████████] 100%",
  "> layer connected. você está aqui.",
];
function Boot({ onDone }) {
  const [shown, setShown] = useState(0);
  const [closing, setClosing] = useState(false);
  const finish = () => {
    setClosing(true);
    setTimeout(onDone, 600);
  };
  useEffect(() => {
    if (shown >= BOOT_LINES.length) {
      const t = setTimeout(finish, 650);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setShown((s) => s + 1), shown === 0 ? 240 : 300);
    return () => clearTimeout(t);
  }, [shown]);
  return (
    <div
      className={"boot crt-type" + (closing ? " boot--out" : "")}
      onClick={finish}
    >
      <div className="boot__scan" />
      <div className="boot__inner">
        {BOOT_LINES.slice(0, shown).map((l, i) => (
          <div className="boot__line" key={i}>
            {l}
          </div>
        ))}
        {shown < BOOT_LINES.length && <span className="boot__caret">▮</span>}
      </div>
      <div className="boot__skip">[ clique para entrar ]</div>
    </div>
  );
}

/* ================= NAV ================= */
const NAV = [
  { id: "inicio", lbl: "início" },
  { id: "sobre", lbl: "sobre" },
  { id: "experiencia", lbl: "experiência" },
  { id: "projetos", lbl: "projetos" },
  { id: "contato", lbl: "contato" },
];
function Nav({ active, onNav }) {
  return (
    <nav className="nav crt-type">
      <button
        className="nav__brand"
        onClick={() => onNav("inicio")}
        data-cursor="link"
      >
        <span className="nav__brandmark">✶</span> carollie.dev
      </button>
      <div className="nav__links">
        {NAV.map((n) => (
          <button
            key={n.id}
            className={"nav__link" + (active === n.id ? " is-active" : "")}
            onClick={() => onNav(n.id)}
            data-cursor="link"
          >
            {n.lbl}
          </button>
        ))}
      </div>
    </nav>
  );
}

/* ================= HERO ================= */
function Hero() {
  return (
    <header className="hero" id="inicio">
      {/* floating pixel sprites */}
      <span className="sprite sprite--1">✶</span>
      <span className="sprite sprite--2">◆</span>
      <span className="sprite sprite--3">+</span>
      <span className="sprite sprite--4">▮</span>

      <div className="hero__grid wrap">
        <span className="hero__tech hero__tech--2 crt-type" aria-hidden="true">
          {"> $ echo/portfolio"}
        </span>
        <span className="hero__tech hero__tech--3 crt-type" aria-hidden="true">
          [api] ok
        </span>
        <div className="hero__left">
          <div className="hero__tag crt-type reveal">
            <span className="blink">●</span> conexão estabelecida — layer:01
          </div>
          <h1 className="hero__name">
            <Glitch tag="span" className="hero__nameline">
              software
            </Glitch>
            <Glitch tag="span" className="hero__nameline hero__nameline--2">
              is my art
            </Glitch>
          </h1>
          <p className="hero__role crt-type reveal">
            <Typewriter text="> software dev" speed={34} />
          </p>
          <div className="hero__cta reveal">
            <Magnetic>
              <a
                className="btn btn--solid hero__start crt-type"
                href="#/"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .getElementById("projetos")
                    .scrollIntoView({ behavior: "smooth" });
                }}
                data-cursor="link"
              >
                let's start!
              </a>
            </Magnetic>
            <Magnetic>
              <a
                className="btn btn--solid crt-type"
                href="#/"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .getElementById("projetos")
                    .scrollIntoView({ behavior: "smooth" });
                }}
                data-cursor="link"
              >
                ver projetos →
              </a>
            </Magnetic>
            <SocialRow links={LINKS} compact />
          </div>
        </div>

        <div className="hero__aside reveal">
          <span className="hero__asidek crt-type">portfolio / 2026</span>
          <p>
            Software, interfaces web, automações e plataformas digitais com foco
            em clareza, escala e presença visual.
          </p>
          <div className="hero__facts crt-type">
            <span>{PROFILE.location}</span>
            <span>{PROFILE.domain}</span>
          </div>
        </div>
      </div>
      <button
        className="hero__scroll crt-type"
        onClick={() =>
          document
            .getElementById("sobre")
            .scrollIntoView({ behavior: "smooth" })
        }
        data-cursor="link"
      >
        scroll ↓
      </button>
    </header>
  );
}

/* ================= ABOUT ================= */
function About() {
  const [hover, setHover] = useState(false);
  return (
    <section className="sec wrap" id="sobre">
      <Bar n="01">sobre</Bar>
      <div className="about">
        <div
          className="about__photo reveal"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          data-cursor="view"
        >
          <DitherImage
            src="assets/ana-photo.jpeg"
            cols={150}
            contrast={1.2}
            className="about__dither"
          />
          <img
            src="assets/ana-photo.jpeg"
            alt="Ana Caroline Vieira"
            className={"about__real" + (hover ? " is-on" : "")}
          />
          <span className="about__photolbl crt-type">decode: hover</span>
        </div>

        <div className="about__body">
          <div className="about__text reveal">
            <p>
              Graduanda em <strong>Ciência da Computação</strong> pela UFOPA,
              com ênfase em <em>Engenharia de Software</em>. Apaixonada por
              construir aplicações web escaláveis, plataformas <em>SaaS</em>,
              integrações e soluções de automação.
            </p>
            <p>
              Hoje desenvolvo sistemas <strong>ISP, ERP e CRM</strong> para
              provedores de internet na <strong>Zum Telecom</strong>. Antes,
              atuei em projetos universitários e como estagiária criando
              interfaces web responsivas com foco em UI/UX e APIs RESTful.
            </p>
            <p className="muted">
              Sempre aberta a aprender, colaborar e encarar novos desafios.
            </p>
          </div>

          <div className="about__meta reveal">
            <div className="metacard metacard--education">
              <span className="metacard__k crt-type">formação</span>
              <span className="metacard__v">{EDUCATION.degree}</span>
              <span className="metacard__sub crt-type">
                {EDUCATION.school} · {EDUCATION.period}
              </span>
            </div>
          </div>

          <div className="stack reveal">
            <span className="stack__lbl crt-type">stack</span>
            <div className="stack__chips">
              {STACK.map((s) => (
                <span className="chip techchip" key={s} title={s} aria-label={s}>
                  <img
                    src={`https://cdn.simpleicons.org/${STACK_ICONS[s] || "codepen"}/ef9bb6`}
                    alt=""
                    aria-hidden="true"
                  />
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

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
};

function AboutStackOnly() {
  return (
    <section className="sec wrap" id="sobre">
      <Bar n="01">sobre</Bar>
      <div className="about">
        <div className="about__body">
          <div className="about__meta reveal">
            <div className="metacard metacard--education">
              <span className="metacard__k crt-type">formacao</span>
              <span className="metacard__v">{EDUCATION.degree}</span>
              <span className="metacard__sub crt-type">
                {EDUCATION.school} · {EDUCATION.period}
              </span>
              <p className="metacard__focus">{EDUCATION.focus}</p>
            </div>
          </div>

          <div className="stack reveal">
            <span className="stack__lbl crt-type">stack</span>
            <div className="stack__chips">
              {STACK.map((s) => (
                <span className="chip techchip" key={s} title={s} aria-label={s}>
                  <img
                    src={`https://cdn.simpleicons.org/${STACK_ICONS[s] || "codepen"}/ef9bb6`}
                    alt=""
                    aria-hidden="true"
                  />
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================= EXPERIENCE ================= */
function ExpItem({ x, i }) {
  const [open, setOpen] = useState(i === 0);
  return (
    <div className={"exp" + (open ? " is-open" : "")}>
      <div className="exp__rail">
        <span className={"exp__dot" + (x.now ? " exp__dot--now" : "")} />
      </div>
      <div className="exp__card reveal">
        <button
          className="exp__head"
          onClick={() => setOpen((o) => !o)}
          data-cursor="link"
        >
          <div>
            <span className="exp__period crt-type">{x.period}</span>
            <h3 className="exp__company">{x.company}</h3>
            <span className="exp__role">{x.role}</span>
          </div>
          <span className="exp__toggle crt-type">{open ? "−" : "+"}</span>
        </button>
        <p className="exp__summary">{x.summary}</p>
        <div
          className="exp__detail"
          style={{ maxHeight: open ? "460px" : "0px" }}
        >
          <ul className="exp__bullets">
            {x.bullets.map((b, k) => (
              <li key={k}>{b}</li>
            ))}
          </ul>
          <div className="exp__tags">
            {x.tags.map((t) => (
              <span className="tag crt-type" key={t}>
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
function Experience() {
  return (
    <section className="sec wrap" id="experiencia">
      <Bar n="02">experiência</Bar>
      <div className="explist">
        {EXPERIENCE.map((x, i) => (
          <ExpItem x={x} i={i} key={x.id} />
        ))}
      </div>
    </section>
  );
}

/* ================= PROJECTS ================= */
function ProjectCard({ p, onOpen }) {
  return (
    <a
      className="card reveal"
      href={"#/projeto/" + p.id}
      onClick={(e) => {
        e.preventDefault();
        onOpen(p.id);
      }}
      data-cursor="view"
    >
      <div className="card__cover">
        <Dither mode="noise" seed={p.seed} cols={120} rows={84} />
        <span className="card__kind crt-type">{p.kind}</span>
        <span className="card__year crt-type">{p.year}</span>
      </div>
      <div className="card__body">
        <h3 className="card__name">{p.name}</h3>
        <p className="card__tag">{p.tagline}</p>
        <span className="card__open crt-type">abrir página ↗</span>
      </div>
    </a>
  );
}
function Projects({ onOpen }) {
  return (
    <section className="sec wrap" id="projetos">
      <Bar n="03">projetos</Bar>
      <div className="grid">
        {PROJECTS.map((p) => (
          <ProjectCard key={p.id} p={p} onOpen={onOpen} />
        ))}
      </div>
    </section>
  );
}

/* ================= CONTACT ================= */
function Contact() {
  return (
    <section className="sec wrap" id="contato">
      <Bar n="04">contato</Bar>
      <div className="contact">
        <div className="contact__left">
          <p className="contact__lead">contact me through the wired:</p>
          <form
            className="contact__form"
            action="https://formsubmit.co/anacvieira1415@gmail.com"
            method="POST"
          >
            <label>
              <span className="crt-type">nome</span>
              <input name="name" type="text" placeholder="seu nome" required />
            </label>
            <label>
              <span className="crt-type">email</span>
              <input name="email" type="email" placeholder="seu email" required />
            </label>
            <label>
              <span className="crt-type">mensagem</span>
              <textarea
                name="message"
                rows="5"
                placeholder="escreva sua mensagem"
                required
              />
            </label>
            <button
              className="btn btn--solid crt-type"
              type="submit"
              data-cursor="link"
            >
              enviar email
            </button>
          </form>
          <SocialRow links={LINKS} />
        </div>
        <div className="contact__right">
          <img
            src="assets/striped-face-transparent.gif"
            alt=""
            className="contact__art"
          />
        </div>
      </div>
    </section>
  );
}

/* ================= FOOTER ================= */
function Footer({ onNav }) {
  return (
    <footer className="footer wrap crt-type">
      <span>carollie.dev</span>
      <button
        className="footer__top"
        onClick={() => onNav("inicio")}
        data-cursor="link"
      >
        voltar ao topo ↑
      </button>
      <span className="muted">present day. present time.</span>
    </footer>
  );
}

/* ================= SECTION BAR ================= */
function Bar({ children, n }) {
  return (
    <div className="bar reveal">
      {n && <span className="bar__n crt-type">{n} //</span>}
      <h2 className="bar__t">{children}</h2>
      <span className="bar__rule" />
    </div>
  );
}

Object.assign(window, {
  Boot,
  Nav,
  Hero,
  About,
  Experience,
  Projects,
  Contact,
  Footer,
  Bar,
  NAV,
});
