/**
 * Pixel-field renderer (no React, no DOM) — the maths behind the animated dot map.
 *
 * Same wave formula as before, but restructured so the expensive part runs per
 * column / per row instead of per cell:
 *
 *   wave = sin(A(x) + B(y))·.46 + cos(C(y) + D(x))·.34 + sin(E(x) + F(y))·.2
 *
 * Every term is split with the angle-addition identities, e.g.
 * sin(A+B) = sinA·cosB + cosA·sinB, so sin/cos are evaluated ~(cols + rows) times
 * per frame instead of ~7 × cols × rows times. The per-cell loop is plain
 * multiplications. Dots are then batched by opacity level, so fillStyle is set a
 * few dozen times per frame instead of once per dot (no string building / parsing
 * per cell, no garbage for the GC).
 */

const LEVELS = 28; // opacity buckets (step ≈ 0.02 alpha — not visible)
const SIZES = [1.1, 1.75, 2.5];

export const FILL_STYLES = Array.from({ length: LEVELS }, (_, i) => {
  const intensity = (i + 0.5) / LEVELS;
  return `rgba(245,241,231,${(0.08 + intensity * 0.62).toFixed(3)})`;
});

export function createPixelField() {
  let width = 1;
  let height = 1;
  let cell = 6;
  let cols = 0;
  let rows = 0;

  // Scratch buffers — grown only when the viewport grows, never per frame
  let capCols = 0;
  let capRows = 0;
  let capCells = 0;
  let sA1, cA1, sD2, cD2, sA3, cA3, dx2; // per column
  let sB1, cB1, sC2, cC2, sC3, cC3, dy2; // per row
  let next = new Int32Array(0);
  let size = new Uint8Array(0);
  const head = new Int32Array(LEVELS);

  function resize(w, h) {
    width = Math.max(1, w);
    height = Math.max(1, h);
    cell = width < 700 ? 5 : 6;
    cols = Math.ceil(width / cell) + 2;
    rows = Math.ceil(height / cell) + 2;

    if (cols > capCols) {
      capCols = cols;
      [sA1, cA1, sD2, cD2, sA3, cA3, dx2] = Array.from({ length: 7 }, () => new Float64Array(capCols));
    }
    if (rows > capRows) {
      capRows = rows;
      [sB1, cB1, sC2, cC2, sC3, cC3, dy2] = Array.from({ length: 7 }, () => new Float64Array(capRows));
    }
    if (cols * rows > capCells) {
      capCells = cols * rows;
      next = new Int32Array(capCells);
      size = new Uint8Array(capCells);
    }
  }

  function draw(ctx, time) {
    ctx.clearRect(0, 0, width, height);

    const driftX = time * 34;
    const driftY = time * 12;

    for (let x = 0; x < cols; x += 1) {
      const nx = (x * cell + driftX) / width;
      const a1 = nx * 9 + time * 1.1;
      const d2 = Math.sin(nx * 6) * 1.3;
      const a3 = nx * 18 - time * 0.95;
      sA1[x] = Math.sin(a1);
      cA1[x] = Math.cos(a1);
      sD2[x] = Math.sin(d2);
      cD2[x] = Math.cos(d2);
      sA3[x] = Math.sin(a3);
      cA3[x] = Math.cos(a3);
      const dx = nx - 0.5;
      dx2[x] = dx * dx;
    }

    for (let y = 0; y < rows; y += 1) {
      const ny = (y * cell + driftY) / height;
      const b1 = Math.sin(ny * 5) * 1.7;
      const c2 = ny * 13 - time * 0.7;
      const c3 = ny * 18;
      sB1[y] = Math.sin(b1);
      cB1[y] = Math.cos(b1);
      sC2[y] = Math.sin(c2);
      cC2[y] = Math.cos(c2);
      sC3[y] = Math.sin(c3);
      cC3[y] = Math.cos(c3);
      const dy = ny - 0.47;
      dy2[y] = dy * dy;
    }

    head.fill(-1);

    for (let y = 0; y < rows; y += 1) {
      const rsB1 = sB1[y];
      const rcB1 = cB1[y];
      const rsC2 = sC2[y];
      const rcC2 = cC2[y];
      const rsC3 = sC3[y];
      const rcC3 = cC3[y];
      const rdy2 = dy2[y];
      const rowBase = y * cols;

      for (let x = 0; x < cols; x += 1) {
        const wave =
          (sA1[x] * rcB1 + cA1[x] * rsB1) * 0.46 +
          (rcC2 * cD2[x] - rsC2 * sD2[x]) * 0.34 +
          (sA3[x] * rcC3 + cA3[x] * rsC3) * 0.2;
        const field = (wave + 1) / 2;
        const center = 1 - Math.min(1, Math.sqrt(dx2[x] + rdy2) * 1.6);
        const threshold = 0.52 + (1 - center) * 0.16;
        const intensity = Math.max(0, (field - threshold) / Math.max(0.01, 1 - threshold));

        if (intensity > 0.035) {
          const level = Math.min(LEVELS - 1, (intensity * LEVELS) | 0);
          const i = rowBase + x;
          size[i] = intensity > 0.66 ? 2 : intensity > 0.34 ? 1 : 0;
          next[i] = head[level];
          head[level] = i;
        }
      }
    }

    for (let level = 0; level < LEVELS; level += 1) {
      let i = head[level];
      if (i < 0) continue;
      ctx.fillStyle = FILL_STYLES[level];
      while (i >= 0) {
        const y = (i / cols) | 0;
        const x = i - y * cols;
        const s = SIZES[size[i]];
        ctx.fillRect(x * cell, y * cell, s, s);
        i = next[i];
      }
    }
  }

  return { resize, draw };
}
