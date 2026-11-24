/* Procedural ordered-dithering engine — renders chunky 2.5-bit halftone "Wired" scenes.
   Reads theme colors from CSS variables so it restains on theme change. */
(function () {
  // 8x8 Bayer matrix, normalized to (0,1)
  const B = [
    [0, 32, 8, 40, 2, 34, 10, 42],
    [48, 16, 56, 24, 50, 18, 58, 26],
    [12, 44, 4, 36, 14, 46, 6, 38],
    [60, 28, 52, 20, 62, 30, 54, 22],
    [3, 35, 11, 43, 1, 33, 9, 41],
    [51, 19, 59, 27, 49, 17, 57, 25],
    [15, 47, 7, 39, 13, 45, 5, 37],
    [63, 31, 55, 23, 61, 29, 53, 21],
  ].map((r) => r.map((v) => (v + 0.5) / 64));

  function hexToRgb(hex) {
    hex = (hex || "").trim().replace("#", "");
    if (hex.length === 3) hex = hex.split("").map((c) => c + c).join("");
    const n = parseInt(hex || "000000", 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }

  function cssVar(name, fallback) {
    const v = getComputedStyle(document.documentElement).getPropertyValue(name);
    return v && v.trim() ? v.trim() : fallback;
  }

  // brightness field in [0,1] for a normalized cell — abstract cyber "scene"
  function field(nx, ny, seed, mode) {
    const cx = 0.5 + 0.26 * Math.sin(seed * 1.7);
    const cy = 0.42 + 0.24 * Math.cos(seed * 1.3);
    const d = Math.hypot((nx - cx) * 1.1, (ny - cy));
    let v;
    if (mode === "orb") {
      v = 1.05 - d * 1.9;
      v += 0.16 * Math.sin((nx * 9 + ny * 7) + seed * 4);
    } else if (mode === "scape") {
      // horizon / room — bright band + perspective floor
      v = 0.55 + 0.5 * Math.sin(ny * 3.1 + seed) ;
      v *= 0.4 + 0.9 * ny;
      v += 0.22 * Math.sin(nx * 7.0 + seed * 2.0);
      v += 0.14 * Math.sin((nx - ny) * 16 + seed * 5);
      v += (1 - d) * 0.35;
    } else {
      // default: layered interference
      v = 1 - d * 1.35;
      v += 0.26 * Math.sin(nx * 11 + seed * 3);
      v += 0.18 * Math.sin(ny * 15 + seed);
      v += 0.12 * Math.sin((nx + ny) * 24 + seed * 6);
      v *= 0.5 + 0.55 * ny;
    }
    return Math.max(0, Math.min(1, v));
  }

  // palette: 4 stops bg -> deep -> accent -> bright
  function renderDither(canvas, opts) {
    opts = opts || {};
    const cols = opts.cols || 140;
    const rows = opts.rows || 56;
    const seed = opts.seed || 1;
    const mode = opts.mode || "noise";

    const bg = hexToRgb(cssVar("--dither-bg", "#0c0709"));
    const deep = hexToRgb(cssVar("--accent-deep", "#a8536f"));
    const acc = hexToRgb(cssVar("--accent", "#ef9bb6"));
    const bright = hexToRgb(cssVar("--accent-bright", "#ff8fb4"));
    const pal = [bg, deep, acc, bright];
    const L = pal.length;

    canvas.width = cols;
    canvas.height = rows;
    const ctx = canvas.getContext("2d");
    const img = ctx.createImageData(cols, rows);

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const f = field(x / cols, y / rows, seed, mode);
        const t = B[y & 7][x & 7];
        const val = f * (L - 1);
        const low = Math.floor(val);
        const frac = val - low;
        let idx = low + (frac > t ? 1 : 0);
        if (idx > L - 1) idx = L - 1;
        const c = pal[idx];
        const o = (y * cols + x) * 4;
        img.data[o] = c[0];
        img.data[o + 1] = c[1];
        img.data[o + 2] = c[2];
        img.data[o + 3] = 255;
      }
    }
    ctx.putImageData(img, 0, 0);
  }

  window.renderDither = renderDither;

  /* ---- Ordered-dither a real image into the theme palette (duotone halftone) ---- */
  function ditherImage(canvas, img, opts) {
    opts = opts || {};
    const cols = opts.cols || 150;
    const aspect = img.naturalHeight / img.naturalWidth || 1;
    const rows = opts.rows || Math.round(cols * aspect);
    const contrast = opts.contrast == null ? 1.15 : opts.contrast;
    const bias = opts.bias == null ? 0.0 : opts.bias;

    const bg = hexToRgb(cssVar("--dither-bg", "#0c0709"));
    const deep = hexToRgb(cssVar("--accent-deep", "#a8536f"));
    const acc = hexToRgb(cssVar("--accent", "#ef9bb6"));
    const bright = hexToRgb(cssVar("--accent-bright", "#ff8fb4"));
    const light = hexToRgb(cssVar("--ink", "#f1e0e6"));
    const pal = [bg, deep, acc, bright, light];
    const L = pal.length;

    // sample image at low-res
    const off = document.createElement("canvas");
    off.width = cols; off.height = rows;
    const octx = off.getContext("2d");
    octx.drawImage(img, 0, 0, cols, rows);
    const src = octx.getImageData(0, 0, cols, rows).data;

    canvas.width = cols; canvas.height = rows;
    const ctx = canvas.getContext("2d");
    const out = ctx.createImageData(cols, rows);

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const o = (y * cols + x) * 4;
        // luminance
        let lum = (0.299 * src[o] + 0.587 * src[o + 1] + 0.114 * src[o + 2]) / 255;
        lum = (lum - 0.5) * contrast + 0.5 + bias;
        lum = Math.max(0, Math.min(1, lum));
        const t = B[y & 7][x & 7];
        const val = lum * (L - 1);
        const low = Math.floor(val);
        const frac = val - low;
        let idx = low + (frac > t ? 1 : 0);
        if (idx > L - 1) idx = L - 1;
        const c = pal[idx];
        out.data[o] = c[0]; out.data[o + 1] = c[1]; out.data[o + 2] = c[2];
        out.data[o + 3] = src[o + 3] < 24 ? 0 : 255;
      }
    }
    ctx.putImageData(out, 0, 0);
  }

  window.ditherImage = ditherImage;
})();
