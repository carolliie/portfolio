import React from "react";
import { PROJECTS } from "./data.js";
import { Dither, Glitch, Magnetic } from "./ui.jsx";
import { TechChips } from "./tech.jsx";

export function ProjectPage({ id }) {
  const idx = PROJECTS.findIndex((p) => p.id === id);
  const p = PROJECTS[idx];
  if (!p) return <NotFound />;
  const next = PROJECTS[(idx + 1) % PROJECTS.length];

  return (
    <article className="pp">
      <div className="pp__hero">
        <Dither
          mode="scape"
          seed={p.seed + 0.5}
          cols={240}
          rows={96}
          className="pp__herodither"
        />
        <div
          className="pp__heroveil"
          role="presentation"
          style={{ backgroundImage: `url(${p.image})` }}
        />
        <div className="pp__herotop wrap crt-type">
          <a className="pp__back" href="/#projetos" data-cursor="link">
            ← projetos
          </a>
          <span>
            {p.year} · {p.kind}
          </span>
        </div>
        <div className="pp__herotitle wrap">
          <Glitch tag="h1" className="pp__name">
            {p.name}
          </Glitch>
          <p className="pp__tagline">{p.tagline}</p>
        </div>
      </div>

      <div className="pp__body wrap">
        <div className="pp__main">
          <section className="pp__block reveal" aria-labelledby="pp-overview">
            <h2 className="pp__klbl crt-type" id="pp-overview">visão geral //</h2>
            <p className="pp__lead">{p.overview}</p>
          </section>
          <section className="pp__block reveal" aria-labelledby="pp-role">
            <h2 className="pp__klbl crt-type" id="pp-role">responsabilidades //</h2>
            <p>{p.role}</p>
          </section>
          {p.results.length > 0 && (
            <section className="pp__block reveal" aria-labelledby="pp-results">
              <h2 className="pp__klbl crt-type" id="pp-results">resultados //</h2>
              <dl className="pp__results">
                {p.results.map((r) => (
                  <div className="pp__result" key={r.label}>
                    <dt className="crt-type">{r.label}</dt>
                    <dd>{r.value}</dd>
                  </div>
                ))}
              </dl>
            </section>
          )}
          <section className="pp__block reveal" aria-labelledby="pp-features">
            <h2 className="pp__klbl crt-type" id="pp-features">funcionalidades //</h2>
            <ul className="pp__features">
              {p.features.map((f, i) => (
                <li key={i}>
                  <span className="pp__fnum crt-type" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {f}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <aside className="pp__side reveal" aria-label="Ficha técnica">
          <div className="pp__panel">
            <h2 className="pp__klbl crt-type">status //</h2>
            <p className="pp__status crt-type">
              <span aria-hidden="true">● </span>{p.status}
            </p>
          </div>
          <div className="pp__panel">
            <h2 className="pp__klbl crt-type">tecnologias //</h2>
            <TechChips items={p.stack} />
            <p className="pp__stacktext crt-type">{p.stack.join(" · ")}</p>
          </div>
          {p.url && (
            <Magnetic>
              <a
                className="btn btn--solid crt-type pp__visit"
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="link"
              >
                ver {p.name} ao vivo →
              </a>
            </Magnetic>
          )}
        </aside>
      </div>

      <a className="pp__next wrap" href={"/projetos/" + next.id + "/"} data-cursor="view">
        <span className="pp__nextlbl crt-type">próximo projeto →</span>
        <Glitch tag="span" className="pp__nextname">
          {next.name}
        </Glitch>
      </a>
    </article>
  );
}

export function NotFound() {
  return (
    <div className="pp wrap">
      <h1 className="crt-type">404 // layer não encontrada.</h1>
      <p className="muted">A página que você procurou não existe ou mudou de endereço.</p>
      <p>
        <a className="btn btn--ghost crt-type" href="/" data-cursor="link">← voltar ao início</a>{" "}
        <a className="btn btn--ghost crt-type" href="/#projetos" data-cursor="link">ver projetos</a>
      </p>
    </div>
  );
}
