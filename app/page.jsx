"use client";

import { useEffect, useRef, useState } from "react";
import Header from "./components/Header";
import PixelMap from "./components/PixelMap";

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
    // Reset so homepage → first page can run the person slide-in again
    try {
      sessionStorage.removeItem("julio-content-entered");
    } catch {
      /* ignore */
    }
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

  return (
    <main className="body-font site-shell relative h-[100svh] max-h-[100svh] overflow-hidden text-[#f5f1e7]">
      <PixelMap />
      <div
        ref={cursorTarget}
        className={`floating-cursor ${cursor.visible ? "is-visible" : ""}`}
        style={{ left: cursor.x, top: cursor.y }}
      >
        View
      </div>

      <Header />

      <section id="top" className="hero-section">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,transparent_18%,rgba(0,0,0,.3)_76%)]" />

        <div className="hero-person-wrap">
          <img
            src="/person.png"
            alt="Julio Herrera Velutini"
            width={1487}
            height={1058}
            className="hero-person select-none"
            draggable="false"
            decoding="async"
            fetchPriority="high"
          />
        </div>
      </section>

      <section className="name-banner" aria-label={NAME}>
        <div className="banner-name">
          <span>Julio Herrera</span> <span>Velutini</span>
        </div>
      </section>
    </main>
  );
}
