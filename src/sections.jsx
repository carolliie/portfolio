import React, { useState, useEffect } from "react";
import {
  PROFILE, LINKS, STACK, EXPERIENCE, EDUCATION, PROJECTS, CV,
} from "./data.js";
import {
  SocialRow, Glitch, Dither, DitherImage, Typewriter, Magnetic,
} from "./ui.jsx";
import { TechChips } from "./tech.jsx";

/* ================= BOOT ================= */
const BOOT_LINES = [
  "> conectando à wired . . .",
  "> protocolo: present day // present time",
  "> autenticando: ana_caroline.vieira",
  "> host: carollie @ santarém-pa",
  "> camadas: [identidade][memória][rede]",
  "> [████████████████████] 100%",
  "> layer connected. você está aqui.",
];
export function Boot({ onDone }) {
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
      role="button"
      tabIndex={0}
      aria-label="Pular animação de entrada"
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " " || e.key === "Escape") {
          e.preventDefault();
          finish();
        }
      }}
    >
      <div className="boot__scan" />
      <div className="boot__inner" aria-hidden="true">
        {BOOT_LINES.slice(0, shown).map((l, i) => (
          <div className="boot__line" key={i}>
            {l}
          </div>
        ))}
        {shown < BOOT_LINES.length && <span className="boot__caret">▮</span>}
      </div>
      <div className="boot__skip">[ clique ou pressione enter para entrar ]</div>
    </div>
  );
}

/* ================= NAV ================= */
export const NAV = [
  { id: "inicio", lbl: "início" },
  { id: "sobre", lbl: "sobre" },
  { id: "experiencia", lbl: "experiência" },
  { id: "projetos", lbl: "projetos" },
  { id: "contato", lbl: "contato" },
];

export function SkipLink() {
  return (
    <a className="skip-link crt-type" href="#conteudo">
      pular para o conteúdo
    </a>
  );
}

export function Nav({ active, home }) {
  const href = (id) => (home ? "#" + id : "/#" + id);
  return (
    <nav className="nav crt-type" aria-label="Principal">
      <a className="nav__brand" href="/" data-cursor="link">
        <span className="nav__brandmark" aria-hidden="true">✶</span> carollie
      </a>
      <div className="nav__links">
        {NAV.map((n) => (
          <a
            key={n.id}
            href={href(n.id)}
            className={"nav__link" + (active === n.id ? " is-active" : "")}
            aria-current={active === n.id ? "true" : undefined}
            data-cursor="link"
          >
            {n.lbl}
          </a>
        ))}
      </div>
    </nav>
  );
}

/* ================= HERO ================= */
export function Hero() {
  return (
    <header className="hero" id="inicio">
      {/* floating pixel sprites (decorativos) */}
      <span className="sprite sprite--1" aria-hidden="true">✶</span>
      <span className="sprite sprite--2" aria-hidden="true">◆</span>
      <span className="sprite sprite--3" aria-hidden="true">+</span>
      <span className="sprite sprite--4" aria-hidden="true">▮</span>

      <div className="hero__grid wrap">
        <span className="hero__tech hero__tech--2 crt-type" aria-hidden="true">
          {"> $ echo/portfolio"}
        </span>
        <span className="hero__tech hero__tech--3 crt-type" aria-hidden="true">
          [api] ok
        </span>
        <div className="hero__left">
          <div className="hero__tag crt-type reveal">
            <span className="blink" aria-hidden="true">●</span> conexão estabelecida — layer:01
          </div>
          <h1 className="hero__name">
            <span className="sr-only">
              Ana Caroline Vieira, Software Engineer. Frase do portfólio:{" "}
            </span>
            <Glitch tag="span" className="hero__nameline">
              No matter where you are,
            </Glitch>
            <Glitch tag="span" className="hero__nameline hero__nameline--2">
              everyone is always connected.
            </Glitch>
          </h1>
          <p className="hero__role crt-type reveal">
            <Typewriter text="> software dev" speed={34} />
          </p>
          <div className="hero__cta reveal">
            <Magnetic>
              <a className="btn btn--solid hero__start crt-type" href="#projetos" data-cursor="link">
                let's start!
              </a>
            </Magnetic>
            <Magnetic>
              <a className="btn btn--solid crt-type" href="#projetos" data-cursor="link">
                ver projetos →
              </a>
            </Magnetic>
            <SocialRow links={LINKS} compact />
          </div>
        </div>

        <div className="hero__aside reveal">
          <span className="hero__asidek crt-type">portfolio / 2026</span>
          <p>
            <strong>Ana Caroline Vieira</strong> — {PROFILE.role}. Software,
            interfaces web, automações e plataformas digitais com foco em
            clareza, escala e presença visual.
          </p>
          <div className="hero__facts crt-type">
            <span>{PROFILE.location}</span>
          </div>
        </div>
      </div>
      <a className="hero__scroll crt-type" href="#sobre" data-cursor="link" aria-label="Rolar para a seção sobre">
        <span aria-hidden="true">scroll ↓</span>
      </a>
    </header>
  );
}

/* ================= ABOUT ================= */
export function About() {
  const [hover, setHover] = useState(false);
  return (
    <section className="sec wrap" id="sobre" aria-labelledby="sobre-t">
      <Bar n="01" id="sobre-t">sobre</Bar>
      <div className="about">
        <div
          className="about__photo reveal"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          onFocus={() => setHover(true)}
          onBlur={() => setHover(false)}
          tabIndex={0}
          data-cursor="view"
        >
          <DitherImage
            src="/assets/ana-photo.webp"
            cols={150}
            contrast={1.2}
            className="about__dither"
          />
          <img
            src="/assets/ana-photo.webp"
            alt="Retrato de Ana Caroline Vieira"
            width="854"
            height="1280"
            loading="lazy"
            decoding="async"
            className={"about__real" + (hover ? " is-on" : "")}
          />
          <span className="about__photolbl crt-type" aria-hidden="true">decode: hover</span>
        </div>

        <div className="about__body">
          <div className="about__text reveal">
            <p>
              Sou <strong>Engenheira de Software</strong> com +2 anos
              de experiência e graduanda em
              <strong> Ciência da Computação</strong> pela Universidade
              Federal do Oeste do Pará. Atuo no desenvolvimento de aplicações
              web e mobile, plataformas <em>SaaS</em> e soluções escaláveis,
              com foco em arquitetura de sistemas, automação e
              inteligência artificial.
            </p>
            <p>
              Atualmente, trabalho como freelancer com manutenção, construção de sistemas e contribuo para o desenvolvimento do
              <strong> Antichurn</strong>, uma plataforma SaaS de inteligência
              de dados e retenção de clientes para provedores de internet,
              que monitora mais de <strong>23 mil clientes</strong> em
              diferentes bases ativas. Ao longo da minha trajetória,
              contribuí para mais de <strong>20 projetos</strong>,
              envolvendo integrações, automação e soluções digitais.
            </p>
            <p className="muted">
              Movida por desafios, criatividade e aprendizado contínuo.
              Gosto de transformar problemas complexos em soluções
              eficientes, escaláveis e com impacto real.
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
            <TechChips items={STACK} />
          </div>

          <div className="about__actions reveal">
            <Magnetic>
              <a
                className="btn btn--ghost crt-type"
                href={CV.pt.href}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="link"
              >
                ver currículo (pdf) →
              </a>
            </Magnetic>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================= EXPERIENCE ================= */
function ExpItem({ x, i }) {
  const [open, setOpen] = useState(i === 0);
  const panel = "exp-" + x.id;
  return (
    <div className={"exp" + (open ? " is-open" : "")}>
      <div className="exp__rail" aria-hidden="true">
        <span className={"exp__dot" + (x.now ? " exp__dot--now" : "")} />
      </div>
      <div className="exp__card reveal">
        <h3 className="exp__h">
          <button
            type="button"
            className="exp__head"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls={panel}
            data-cursor="link"
          >
            <span>
              <span className="exp__period crt-type">{x.period}</span>
              <span className="exp__company">{x.company}</span>
              <span className="exp__role">{x.role}</span>
            </span>
            <span className="exp__toggle crt-type" aria-hidden="true">{open ? "−" : "+"}</span>
          </button>
        </h3>
        <p className="exp__summary">{x.summary}</p>
        <div className="exp__detail" id={panel} role="region" aria-label={`Detalhes — ${x.company}`}>
          <div className="exp__detail-in" aria-hidden={open ? undefined : "true"}>
            <ul className="exp__bullets">
              {x.bullets.map((b, k) => (
                <li key={k}>{b}</li>
              ))}
            </ul>
            <ul className="exp__tags" aria-label="Tecnologias e áreas">
              {x.tags.map((t) => (
                <li className="tag crt-type" key={t}>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
export function Experience() {
  return (
    <section className="sec wrap" id="experiencia" aria-labelledby="experiencia-t">
      <Bar n="02" id="experiencia-t">experiência</Bar>
      <div className="explist">
        {EXPERIENCE.map((x, i) => (
          <ExpItem x={x} i={i} key={x.id} />
        ))}
      </div>
    </section>
  );
}

/* ================= PROJECTS ================= */
function ProjectCard({ p }) {
  return (
    <a
      className="card reveal"
      href={"/projetos/" + p.id + "/"}
      data-cursor="view"
    >
      <div className="card__cover">
        {p.image
          ? (
            <img
              src={p.image640}
              srcSet={`${p.image640} 640w, ${p.image} 1200w`}
              sizes="(max-width: 700px) 90vw, 380px"
              alt={`Captura de tela do projeto ${p.name}`}
              width={p.imageW640}
              height={p.imageH640}
              loading="lazy"
              decoding="async"
              className="card__img"
            />
          )
          : <Dither mode="noise" seed={p.seed} cols={120} rows={84} />
        }
        <span className="card__kind crt-type">{p.kind}</span>
        <span className="card__year crt-type">{p.year}</span>
      </div>
      <div className="card__body">
        <h3 className="card__name">{p.name}</h3>
        <p className="card__tag">{p.tagline}</p>
        <span className="card__open crt-type">
          abrir página <span className="sr-only">do projeto {p.name}</span>↗
        </span>
      </div>
    </a>
  );
}
export function Projects() {
  return (
    <section className="sec wrap" id="projetos" aria-labelledby="projetos-t">
      <Bar n="03" id="projetos-t">projetos</Bar>
      <div className="grid">
        {PROJECTS.map((p) => (
          <ProjectCard key={p.id} p={p} />
        ))}
      </div>
    </section>
  );
}

/* ================= CONTACT ================= */
export function Contact() {
  return (
    <section className="sec wrap" id="contato" aria-labelledby="contato-t">
      <Bar n="04" id="contato-t">contato</Bar>
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
              <input name="name" type="text" placeholder="seu nome" autoComplete="name" required />
            </label>
            <label>
              <span className="crt-type">email</span>
              <input name="email" type="email" placeholder="seu email" autoComplete="email" required />
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
            src="/assets/striped-face-transparent.webp"
            alt=""
            width="360"
            height="360"
            loading="lazy"
            decoding="async"
            className="contact__art"
          />
        </div>
      </div>
    </section>
  );
}

/* ================= FOOTER ================= */
export function Footer({ home }) {
  return (
    <footer className="footer wrap crt-type">
      <span>carollie</span>
      <a className="footer__top" href={home ? "#inicio" : "#conteudo"} data-cursor="link" aria-label="Voltar ao topo">
        ↑
      </a>
      <span className="muted">present day. present time.</span>
    </footer>
  );
}

/* ================= SECTION BAR ================= */
export function Bar({ children, n, id }) {
  return (
    <div className="bar reveal">
      {n && <span className="bar__n crt-type" aria-hidden="true">{n} //</span>}
      <h2 className="bar__t" id={id}>{children}</h2>
      <span className="bar__rule" aria-hidden="true" />
    </div>
  );
}
