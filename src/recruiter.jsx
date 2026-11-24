import React from "react";
import {
  PROFILE, LINKS, EXPERIENCE, EDUCATION, PROJECTS, CV, RECRUITER,
} from "./data.js";
import { Dither, Glitch } from "./ui.jsx";

/* Versão /recruiter: todo o conteúdo profissional em HTML simples, sem accordions,
   sem hover e sem depender de animação. */
export function RecruiterPage({ hasEnglishCv }) {
  const R = RECRUITER;
  return (
    <article className="pp rc">
      <div className="pp__hero">
        <Dither mode="scape" seed={6.5} cols={240} rows={96} className="pp__herodither" />
        <div className="pp__herotop wrap crt-type">
          <a className="pp__back" href="/" data-cursor="link">← portfólio</a>
          <span>versão para recrutadores</span>
        </div>
        <div className="pp__herotitle wrap">
          <Glitch tag="h1" className="pp__name rc__name">
            {PROFILE.fullName}
          </Glitch>
          <p className="pp__tagline">{R.headline} · {PROFILE.location}</p>
        </div>
      </div>

      <div className="pp__body wrap rc__body">
        <div className="pp__main">
          <section className="pp__block" aria-labelledby="rc-resumo">
            <h2 className="pp__klbl crt-type" id="rc-resumo">resumo profissional //</h2>
            <p className="pp__lead">{R.summaryPt}</p>
            <p lang="en" className="muted rc__en">{R.summaryEn}</p>
          </section>

          <section className="pp__block" aria-labelledby="rc-exp">
            <h2 className="pp__klbl crt-type" id="rc-exp">experiência //</h2>
            {EXPERIENCE.map((x) => (
              <div className="rc__item" key={x.id}>
                <h3 className="rc__h3">{x.company}</h3>
                <p className="rc__meta crt-type">{x.role} · {x.period}</p>
                <p>{x.summary}</p>
                <ul className="rc__list">
                  {x.bullets.map((b, i) => <li key={"b" + i}>{b}</li>)}
                  {(R.experienceHighlights[x.id] || []).map((b, i) => <li key={"h" + i}>{b}</li>)}
                </ul>
                <p className="rc__tags crt-type">{x.tags.join(" · ")}</p>
              </div>
            ))}
          </section>

          <section className="pp__block" aria-labelledby="rc-skills">
            <h2 className="pp__klbl crt-type" id="rc-skills">tecnologias //</h2>
            <dl className="rc__skills">
              {R.skills.map((g) => (
                <div key={g.group}>
                  <dt className="crt-type">{g.group}</dt>
                  <dd>{g.items.join(", ")}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section className="pp__block" aria-labelledby="rc-proj">
            <h2 className="pp__klbl crt-type" id="rc-proj">projetos //</h2>
            <ul className="rc__projects">
              {PROJECTS.map((p) => (
                <li key={p.id} className="rc__item">
                  <h3 className="rc__h3">
                    <a href={`/projetos/${p.id}/`} data-cursor="link">{p.name}</a>
                  </h3>
                  <p className="rc__meta crt-type">{p.year} · {p.kind} · {p.status}</p>
                  <p>{p.tagline}</p>
                  <p className="rc__tags crt-type">{p.stack.join(" · ")}</p>
                  <p>
                    <a href={`/projetos/${p.id}/`} data-cursor="link">
                      detalhes técnicos do projeto {p.name}
                    </a>
                    {" · "}
                    <a href={p.url} target="_blank" rel="noopener noreferrer" data-cursor="link">
                      site de {p.name}
                    </a>
                  </p>
                </li>
              ))}
            </ul>
          </section>

          <section className="pp__block" aria-labelledby="rc-edu">
            <h2 className="pp__klbl crt-type" id="rc-edu">formação //</h2>
            <div className="rc__item">
              <h3 className="rc__h3">{EDUCATION.degree}</h3>
              <p className="rc__meta crt-type">{EDUCATION.school} · {EDUCATION.period}</p>
              <p>{EDUCATION.focus}</p>
            </div>
            <h3 className="rc__h3 rc__h3--sub">Certificações e formação complementar</h3>
            <ul className="rc__list">
              {R.certifications.map((c) => <li key={c.name}>{c.name} — {c.issuer}</li>)}
            </ul>
            <h3 className="rc__h3 rc__h3--sub">Idiomas</h3>
            <ul className="rc__list">
              {R.languages.map((l) => <li key={l.name}>{l.name}: {l.level}</li>)}
            </ul>
          </section>
        </div>

        <aside className="pp__side" aria-label="Currículos e contato">
          <div className="pp__panel">
            <h2 className="pp__klbl crt-type">currículo //</h2>
            <p>
              <a className="btn btn--solid crt-type pp__visit" href={CV.pt.href} data-cursor="link" hrefLang="pt-BR" type="application/pdf">
                currículo (pt-br) · pdf →
              </a>
            </p>
            {hasEnglishCv ? (
              <p>
                <a className="btn btn--solid crt-type pp__visit" href={CV.en.href} data-cursor="link" hrefLang="en" type="application/pdf">
                  resume (english) · pdf →
                </a>
              </p>
            ) : (
              <p className="muted crt-type">resume em inglês: em breve.</p>
            )}
          </div>
          <div className="pp__panel">
            <h2 className="pp__klbl crt-type">contato //</h2>
            <ul className="rc__contact">
              {LINKS.map((l) => (
                <li key={l.id}>
                  <span className="crt-type">{l.lbl}: </span>
                  <a href={l.href} target={l.id === "email" ? undefined : "_blank"} rel="noopener noreferrer" data-cursor="link">
                    {l.val}
                  </a>
                </li>
              ))}
              <li><span className="crt-type">local: </span>{PROFILE.location}</li>
            </ul>
          </div>
        </aside>
      </div>
    </article>
  );
}
