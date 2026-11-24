import React, { useState, useEffect, useRef } from "react";
import {
  Boot, Nav, Hero, About, Experience, Projects, Contact, Footer, SkipLink, NAV,
} from "./sections.jsx";
import { ProjectPage, NotFound } from "./projectpage.jsx";
import { RecruiterPage } from "./recruiter.jsx";
import { useReveal } from "./ui.jsx";

/* ---------- Custom pixel cursor (apenas ponteiros finos) ---------- */
function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);
  const pos = useRef({ x: -100, y: -100 });
  const rpos = useRef({ x: -100, y: -100 });
  const [variant, setVariant] = useState("");
  const lastV = useRef("");

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    document.body.classList.add("has-cursor");
    const move = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (dot.current) dot.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      const t = e.target.closest && e.target.closest("[data-cursor]");
      const v = t ? t.getAttribute("data-cursor") : "";
      if (v !== lastV.current) { lastV.current = v; setVariant(v); }
    };
    let raf;
    const loop = () => {
      rpos.current.x += (pos.current.x - rpos.current.x) * 0.18;
      rpos.current.y += (pos.current.y - rpos.current.y) * 0.18;
      if (ring.current) ring.current.style.transform = `translate(${rpos.current.x}px, ${rpos.current.y}px)`;
      raf = requestAnimationFrame(loop);
    };
    loop();
    window.addEventListener("mousemove", move, { passive: true });
    return () => { window.removeEventListener("mousemove", move); cancelAnimationFrame(raf); document.body.classList.remove("has-cursor"); };
  }, []);

  return (
    <React.Fragment>
      <div ref={dot} className="cursor-dot" aria-hidden="true" />
      <div ref={ring} className="cursor-ring" aria-hidden="true">
        <i className={"cursor-ring__b cursor--" + variant}>
          {variant === "view" && <span className="cursor-label crt-type">abrir</span>}
        </i>
      </div>
    </React.Fragment>
  );
}

/* page: { type: "home" | "project" | "recruiter" | "404", id?, hasEnglishCv? } */
export function App({ page }) {
  const home = page.type === "home";
  // Server e primeira renderização do cliente coincidem (sem boot); o boot só aparece
  // na primeira visita da sessão, depois da hidratação.
  const [booted, setBooted] = useState(true);
  const [active, setActive] = useState("inicio");

  useEffect(() => {
    let seen = false;
    try { seen = sessionStorage.getItem("cl_booted") === "1"; } catch (e) { seen = true; }
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!seen && home && !reduce) setBooted(false);
    document.documentElement.classList.remove("pre-boot");
  }, []);

  // spotlight segue o mouse via transform (sem repintar a página)
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0, x = 0, y = 0;
    const apply = () => {
      raf = 0;
      const el = document.querySelector(".spot");
      if (el) el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };
    const onMove = (e) => { x = e.clientX; y = e.clientY; if (!raf) raf = requestAnimationFrame(apply); };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => { window.removeEventListener("mousemove", onMove); if (raf) cancelAnimationFrame(raf); };
  }, []);

  useReveal();

  // scroll spy na home
  useEffect(() => {
    if (!home || !booted) return;
    const ids = NAV.map((n) => n.id);
    let raf = 0;
    const check = () => {
      raf = 0;
      const mid = window.innerHeight * 0.4;
      let cur = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= mid) cur = id;
      }
      setActive(cur);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(check); };
    check();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); if (raf) cancelAnimationFrame(raf); };
  }, [home, booted]);

  const finishBoot = () => {
    try { sessionStorage.setItem("cl_booted", "1"); } catch (e) {}
    setBooted(true);
  };

  const navActive = home ? active : page.type === "recruiter" ? "recruiter" : page.type === "project" ? "projetos" : "";

  return (
    <React.Fragment>
      {!booted && <Boot onDone={finishBoot} />}
      <SkipLink />
      <Cursor />
      <Nav active={navActive} home={home} />
      <main id="conteudo" tabIndex={-1} className={home ? "app" : undefined}>
        {home && (
          <React.Fragment>
            <div className="spot" aria-hidden="true" />
            <Hero />
            <About />
            <Experience />
            <Projects />
            <Contact />
          </React.Fragment>
        )}
        {page.type === "project" && <ProjectPage id={page.id} />}
        {page.type === "recruiter" && <RecruiterPage hasEnglishCv={!!page.hasEnglishCv} />}
        {page.type === "404" && <NotFound />}
      </main>
      <Footer home={home} />
      <div className="crt" aria-hidden="true" />
    </React.Fragment>
  );
}
