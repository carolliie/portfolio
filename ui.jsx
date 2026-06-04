/* global React */
const { useState, useEffect, useRef, useCallback } = React;

/* ---------- Brand icon glyphs (simple monochrome SVG, currentColor) ---------- */
const ICON_PATHS = {
  github:
    "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222 0 1.606-.014 2.898-.014 3.293 0 .322.216.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12",
  linkedin:
    "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  instagram:
    "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z",
  email:
    "M1.5 4.5h21A1.5 1.5 0 0124 6v12a1.5 1.5 0 01-1.5 1.5h-21A1.5 1.5 0 010 18V6a1.5 1.5 0 011.5-1.5zM12 13L2 6.8V18h20V6.8L12 13zM3.2 6L12 11.4 20.8 6H3.2z",
};

function Icon({ name, size = 18 }) {
  const d = ICON_PATHS[name];
  if (!d) return null;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}

/* ---------- Social buttons (pixel-framed) ---------- */
function SocialRow({ links, compact }) {
  return (
    <div className={"social" + (compact ? " social--c" : "")}>
      {links.map((l) => (
        <a
          key={l.id}
          className="social__btn"
          href={l.href}
          target="_blank"
          rel="noreferrer"
          data-cursor="link"
          aria-label={l.lbl}
          title={l.lbl}
        >
          <span className="social__icon"><Icon name={l.id} /></span>
          {!compact && <span className="social__lbl">{l.lbl}</span>}
        </a>
      ))}
    </div>
  );
}

/* ---------- Glitch text ---------- */
function Glitch({ children, tag = "span", className = "" }) {
  const Tag = tag;
  return (
    <Tag className={"glitch " + className} data-text={typeof children === "string" ? children : ""}>
      {children}
    </Tag>
  );
}

/* ---------- Procedural dither canvas ---------- */
function Dither({ seed = 1, mode = "noise", cols = 140, rows = 56, theme, className, style }) {
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current && window.renderDither) {
      window.renderDither(ref.current, { seed, mode, cols, rows });
    }
  }, [seed, mode, cols, rows, theme]);
  return <canvas ref={ref} className={"dither " + (className || "")} style={style} aria-hidden="true" />;
}

/* ---------- Real image dithered into theme palette ---------- */
function DitherImage({ src, cols = 150, contrast, bias, theme, className, style }) {
  const ref = useRef(null);
  const imgRef = useRef(null);
  useEffect(() => {
    let alive = true;
    const draw = (img) => {
      if (alive && ref.current && window.ditherImage) {
        window.ditherImage(ref.current, img, { cols, contrast, bias });
      }
    };
    if (imgRef.current && imgRef.current.complete) {
      draw(imgRef.current);
    } else {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => { imgRef.current = img; draw(img); };
      img.src = src;
    }
    return () => { alive = false; };
  }, [src, cols, contrast, bias, theme]);
  return <canvas ref={ref} className={"dither " + (className || "")} style={style} aria-hidden="true" />;
}

/* ---------- Typewriter ---------- */
function Typewriter({ text, speed = 38, className }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    setN(0);
    let i = 0;
    const id = setInterval(() => {
      i++;
      setN(i);
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text, speed]);
  return (
    <span className={className}>
      {text.slice(0, n)}
      <span className="tw-caret">▮</span>
    </span>
  );
}

/* ---------- Live "wired" clock HUD ---------- */
function ClockHUD() {
  const [t, setT] = useState("");
  useEffect(() => {
    const fmt = () => {
      const d = new Date();
      const p = (x) => String(x).padStart(2, "0");
      setT(`${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`);
    };
    fmt();
    const id = setInterval(fmt, 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="hud-clock crt-type">
      <span className="hud-clock__dot">●</span> present day // {t}
    </div>
  );
}

/* ---------- Magnetic hover wrapper ---------- */
function Magnetic({ children, strength = 0.3, className, ...rest }) {
  const ref = useRef(null);
  const onMove = useCallback((e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width / 2) * strength;
    const y = (e.clientY - r.top - r.height / 2) * strength;
    el.style.transform = `translate(${x}px, ${y}px)`;
  }, [strength]);
  const onLeave = useCallback(() => {
    if (ref.current) ref.current.style.transform = "translate(0,0)";
  }, []);
  return (
    <div ref={ref} className={"magnetic " + (className || "")} onMouseMove={onMove} onMouseLeave={onLeave} {...rest}>
      {children}
    </div>
  );
}

/* ---------- Reveal-on-scroll hook (rect-based, robust without IntersectionObserver) ---------- */
function useReveal() {
  useEffect(() => {
    let raf = 0;
    const check = () => {
      raf = 0;
      const h = window.innerHeight || document.documentElement.clientHeight;
      document.querySelectorAll(".reveal:not(.in)").forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top < h * 0.92 && r.bottom > 0) el.classList.add("in");
      });
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(check); };
    check();
    const t1 = setTimeout(check, 120);
    const t2 = setTimeout(check, 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      clearTimeout(t1); clearTimeout(t2); if (raf) cancelAnimationFrame(raf);
    };
  });
}

Object.assign(window, {
  Icon, SocialRow, Glitch, Dither, DitherImage, Typewriter, ClockHUD, Magnetic, useReveal,
});
