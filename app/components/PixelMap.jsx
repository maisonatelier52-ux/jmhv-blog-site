"use client";

import { useEffect, useRef } from "react";
import { createPixelField } from "./pixel-field";

// The dots drift slowly, so 30 fps looks identical to 60 but halves the work
// (and avoids burning 120 fps on ProMotion MacBooks). Raise it if you ever want to.
const TARGET_FPS = 30;
const FRAME_MS = 1000 / TARGET_FPS;
// Original speed was 0.012 per 60 Hz frame — we scale by real elapsed time so the
// motion speed is the same whatever the frame rate is.
const TIME_PER_MS = 0.012 / (1000 / 60);

export default function PixelMap() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const context = canvas.getContext("2d", { alpha: true });
    if (!context) return undefined;

    const field = createPixelField();
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    let raf = 0;
    let resizeRaf = 0;
    let last = 0;
    let time = 0;
    let width = 0;
    let height = 0;
    let dpr = 0;

    // Returns true when the backing store actually had to change
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const w = Math.max(1, rect.width);
      const h = Math.max(1, rect.height);
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      if (w === width && h === height && ratio === dpr) return false;
      width = w;
      height = h;
      dpr = ratio;
      canvas.width = Math.floor(w * ratio);
      canvas.height = Math.floor(h * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      field.resize(w, h);
      return true;
    };

    const frame = (now) => {
      raf = window.requestAnimationFrame(frame);
      const dt = now - last;
      if (dt < FRAME_MS - 2) return; // frame cap
      last = now;
      time += Math.min(dt, 100) * TIME_PER_MS; // clamp so a resumed tab doesn't jump
      field.draw(context, time);
    };

    const start = () => {
      if (raf) return;
      last = performance.now();
      raf = window.requestAnimationFrame(frame);
    };

    const stop = () => {
      window.cancelAnimationFrame(raf);
      raf = 0;
    };

    // Coalesce resize bursts (window drag, rotation) into one canvas rebuild per frame
    const onResize = () => {
      if (resizeRaf) return;
      resizeRaf = window.requestAnimationFrame(() => {
        resizeRaf = 0;
        if (resize() && !raf) field.draw(context, time);
      });
    };

    const applyMotionPreference = () => {
      if (reduceMotion.matches) {
        stop();
        time = 8; // a pleasant still frame
        field.draw(context, time);
      } else {
        start();
      }
    };

    resize();
    applyMotionPreference();

    const observer = new ResizeObserver(onResize);
    observer.observe(canvas);
    window.addEventListener("resize", onResize, { passive: true });
    reduceMotion.addEventListener("change", applyMotionPreference);

    return () => {
      stop();
      window.cancelAnimationFrame(resizeRaf);
      observer.disconnect();
      window.removeEventListener("resize", onResize);
      reduceMotion.removeEventListener("change", applyMotionPreference);
    };
  }, []);

  return <canvas ref={canvasRef} className="pixel-map" aria-hidden="true" />;
}
