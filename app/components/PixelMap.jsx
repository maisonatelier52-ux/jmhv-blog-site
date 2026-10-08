"use client";

import { useEffect, useRef } from "react";

export default function PixelMap() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d", { alpha: true });
    let raf = 0;
    let time = 0;
    let width = 0;
    let height = 0;
    let dpr = 1;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      time += 0.012;
      context.clearRect(0, 0, width, height);

      const cell = width < 700 ? 5 : 6;
      const cols = Math.ceil(width / cell) + 2;
      const rows = Math.ceil(height / cell) + 2;
      const driftX = time * 34;
      const driftY = time * 12;

      for (let y = 0; y < rows; y += 1) {
        for (let x = 0; x < cols; x += 1) {
          const px = x * cell;
          const py = y * cell;
          const nx = (px + driftX) / Math.max(width, 1);
          const ny = (py + driftY) / Math.max(height, 1);
          const wave =
            Math.sin(nx * 9 + time * 1.1 + Math.sin(ny * 5) * 1.7) * 0.46 +
            Math.cos(ny * 13 - time * 0.7 + Math.sin(nx * 6) * 1.3) * 0.34 +
            Math.sin((nx + ny) * 18 - time * 0.95) * 0.2;
          const field = (wave + 1) / 2;
          const center = 1 - Math.min(1, Math.hypot(nx - 0.5, ny - 0.47) * 1.6);
          const threshold = 0.52 + (1 - center) * 0.16;
          const intensity = Math.max(0, (field - threshold) / Math.max(0.01, 1 - threshold));

          if (intensity > 0.035) {
            const size = intensity > 0.66 ? 2.5 : intensity > 0.34 ? 1.75 : 1.1;
            context.fillStyle = `rgba(245,241,231,${0.08 + intensity * 0.62})`;
            context.fillRect(px, py, size, size);
          }
        }
      }

      raf = window.requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize, { passive: true });
    raf = window.requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      window.cancelAnimationFrame(raf);
    };
  }, []);

  return <canvas ref={canvasRef} className="pixel-map" aria-hidden="true" />;
}
