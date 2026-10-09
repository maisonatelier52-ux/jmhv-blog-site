"use client";

import { useEffect, useRef, useState } from "react";
import Header from "./components/Header";

const NAME = "Julio Herrera Velutini";

export default function Home() {
  const [cursor, setCursor] = useState({ x: 0, y: 0, visible: false });
  const cursorTarget = useRef(null);

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const prevHtml = html.style.overflow;
    const prevBody = body.style.overflow;
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    return () => {
      html.style.overflow = prevHtml;
      body.style.overflow = prevBody;
    };
  }, []);

  useEffect(() => {
    const move = (event) => {
      if (!cursorTarget.current) return;
      cursorTarget.current.animate(
        { left: `${event.clientX}px`, top: `${event.clientY}px` },
        { duration: 420, fill: "forwards", easing: "cubic-bezier(.16,1,.3,1)" }
      );
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, []);

  // The portrait, pixel background and big name banner are drawn by the persistent
  // <Stage /> in layout.jsx, so they can animate smoothly into the next page.
  return (
    <main className="body-font site-shell relative h-[100svh] max-h-[100svh] overflow-hidden text-[#f5f1e7]">
      <h1 className="sr-only">{NAME}</h1>

      <div
        ref={cursorTarget}
        className={`floating-cursor ${cursor.visible ? "is-visible" : ""}`}
        style={{ left: cursor.x, top: cursor.y }}
      >
        View
      </div>

      <Header />
    </main>
  );
}
