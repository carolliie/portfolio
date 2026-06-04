/* global React, PROJECTS, STACK_ICONS, Dither, Glitch, Magnetic */
const { useEffect } = React;

function ProjectPage({ id, onNav, onOpen }) {
  const idx = PROJECTS.findIndex((p) => p.id === id);
  const p = PROJECTS[idx];
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);
  if (!p) {
    return (
      <div className="pp wrap">
        <p className="crt-type">404 // layer não encontrada.</p>
        <button
          className="btn btn--ghost crt-type"
          onClick={() => onNav("projetos")}
          data-cursor="link"
        >
          ← voltar
        </button>
      </div>
    );
  }
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
          style={{ backgroundImage: `url(${p.image})` }}
        />
        <div className="pp__herotop wrap crt-type">
          <button
            className="pp__back"
            onClick={() => onNav("projetos")}
            data-cursor="link"
          >
            ← projetos
          </button>
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
          <section className="pp__block reveal">
            <span className="pp__klbl crt-type">overview //</span>
            <p className="pp__lead">{p.overview}</p>
          </section>
          <section className="pp__block reveal">
            <span className="pp__klbl crt-type">meu papel //</span>
            <p>{p.role}</p>
          </section>
          <section className="pp__block reveal">
            <span className="pp__klbl crt-type">funcionalidades //</span>
            <ul className="pp__features">
              {p.features.map((f, i) => (
                <li key={i}>
                  <span className="pp__fnum crt-type">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {f}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <aside className="pp__side reveal">
          <div className="pp__panel">
            <span className="pp__klbl crt-type">status //</span>
            <p className="pp__status crt-type">● {p.status}</p>
          </div>
          <div className="pp__panel">
            <span className="pp__klbl crt-type">stack //</span>
            <div className="stack__chips">
              {p.stack.map((s) => (
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
          {p.url && (
            <Magnetic>
              <a
                className="btn btn--solid crt-type pp__visit"
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="link"
              >
                ver projeto ao vivo →
              </a>
            </Magnetic>
          )}
        </aside>
      </div>

      <div
        className="pp__next wrap"
        onClick={() => onOpen(next.id)}
        data-cursor="view"
      >
        <span className="pp__nextlbl crt-type">próxima layer →</span>
        <Glitch tag="h2" className="pp__nextname">
          {next.name}
        </Glitch>
      </div>
    </article>
  );
}

window.ProjectPage = ProjectPage;
