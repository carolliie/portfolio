/* global React, ReactDOM, Boot, Nav, Hero, About, Experience, Projects, Contact, Footer,
   ProjectPage, useReveal, NAV */
const { useState, useEffect, useRef, useCallback } = React;

/* ---------- Custom pixel cursor ---------- */
function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);
  const pos = useRef({ x: -100, y: -100 });
  const rpos = useRef({ x: -100, y: -100 });
  const [variant, setVariant] = useState("");

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    document.body.classList.add("has-cursor");
    const move = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (dot.current) dot.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      const t = e.target.closest("[data-cursor]");
      setVariant(t ? t.getAttribute("data-cursor") : "");
    };
    let raf;
    const loop = () => {
      rpos.current.x += (pos.current.x - rpos.current.x) * 0.18;
      rpos.current.y += (pos.current.y - rpos.current.y) * 0.18;
      if (ring.current) ring.current.style.transform = `translate(${rpos.current.x}px, ${rpos.current.y}px)`;
      raf = requestAnimationFrame(loop);
    };
    loop();
    window.addEventListener("mousemove", move);
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

/* ---------- Router parse ---------- */
function parseRoute() {
  const h = location.hash || "";
  const m = h.match(/^#\/projeto\/([\w-]+)/);
  if (m) return { view: "project", id: m[1] };
  return { view: "home" };
}

function App() {
  const [booted, setBooted] = useState(() => sessionStorage.getItem("cl_booted") === "1");
  const [route, setRoute] = useState(parseRoute);
  const [active, setActive] = useState("inicio");
  const pendingScroll = useRef(null);

  useEffect(() => {
    const onMove = (e) => {
      document.documentElement.style.setProperty("--mx", `${e.clientX}px`);
      document.documentElement.style.setProperty("--my", `${e.clientY}px`);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useEffect(() => {
    const onHash = () => setRoute(parseRoute());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  useReveal(route.view + booted);

  // scroll spy on home (rect-based)
  useEffect(() => {
    if (route.view !== "home" || !booted) return;
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
  }, [route.view, booted]);

  // perform pending scroll after returning home
  useEffect(() => {
    if (route.view === "home" && pendingScroll.current) {
      const id = pendingScroll.current;
      pendingScroll.current = null;
      requestAnimationFrame(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      });
    }
  }, [route.view]);

  const onNav = useCallback((id) => {
    if (route.view !== "home") {
      pendingScroll.current = id;
      location.hash = "";
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: id === "inicio" ? "smooth" : "smooth" });
    }
  }, [route.view]);

  const onOpen = useCallback((pid) => { location.hash = "#/projeto/" + pid; }, []);

  const finishBoot = () => { sessionStorage.setItem("cl_booted", "1"); setBooted(true); };

  return (
    <React.Fragment>
      {!booted && <Boot onDone={finishBoot} />}
      <Cursor />
      <Nav active={route.view === "home" ? active : "projetos"} onNav={onNav} />
      {route.view === "project" ? (
        <ProjectPage id={route.id} onNav={onNav} onOpen={onOpen} />
      ) : (
        <main className="app">
          <Hero />
          <About />
          <Experience />
          <Projects onOpen={onOpen} />
          <Contact />
        </main>
      )}
      <Footer onNav={onNav} />
      <div className="crt" aria-hidden="true" />
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
