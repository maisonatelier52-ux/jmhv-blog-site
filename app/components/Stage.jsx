"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import PixelMap from "./PixelMap";
import HeroBackdrop from "./HeroBackdrop";

/**
 * Persistent stage — lives in app/layout.jsx, so it is NOT remounted when you
 * navigate between routes. That is what lets the portrait genuinely travel from
 * the homepage pose (centered, above the name banner) to the content-page pose
 * (right side, sitting on the bottom edge) instead of one image disappearing and
 * another fading in.
 *
 * How the motion works
 * - Two hidden "anchor" boxes are laid out with plain CSS (see globals.css), one for
 *   each pose. They use the exact same size formulas as the design, so every
 *   breakpoint / mobile viewport is handled by CSS, not by JS guesses.
 * - We measure those boxes and turn each one into translate + scale for a single
 *   <img>. Switching pose only flips `data-pose`; the browser then eases the
 *   transform. Transform-only = GPU composited = smooth, even on phones.
 * - The name banner uses the same duration + easing, so the portrait's feet stay
 *   glued to the banner's top edge while both slide down together.
 */

const NAME = "Julio Herrera Velutini";

const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

export default function Stage() {
  const pathname = usePathname();
  const pose = pathname === "/" ? "home" : "side";

  const personRef = useRef(null);
  const imgRef = useRef(null);
  const homeAnchorRef = useRef(null);
  const sideAnchorRef = useRef(null);

  const [measured, setMeasured] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const ready = measured && loaded;

  // Measure both poses, and re-measure on resize / rotation. Transitions are paused
  // while we do it so resizing the window never makes the portrait "lag" behind.
  useIsoLayoutEffect(() => {
    const person = personRef.current;
    const homeAnchor = homeAnchorRef.current;
    const sideAnchor = sideAnchorRef.current;
    if (!person || !homeAnchor || !sideAnchor) return undefined;

    let raf = 0;

    const apply = () => {
      const h = homeAnchor.getBoundingClientRect();
      const s = sideAnchor.getBoundingClientRect();
      // Render the image at the larger of the two sizes so it only ever scales
      // down — keeps it crisp during the move.
      const base = Math.max(h.width, s.width, 1);
      const set = (key, value) => person.style.setProperty(key, value);
      set("--person-w", `${base}px`);
      set("--hx", `${h.left}px`);
      set("--hy", `${h.top}px`);
      set("--hs", String(h.width / base));
      set("--sx", `${s.left}px`);
      set("--sy", `${s.top}px`);
      set("--ss", String(s.width / base));
    };

    const measure = () => {
      person.removeAttribute("data-armed");
      apply();
      void person.offsetWidth; // flush styles so this jump isn't animated
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        raf = requestAnimationFrame(() => person.setAttribute("data-armed", ""));
      });
    };

    measure();
    setMeasured(true);

    // The SSR'd <img> may already be loaded before React attached onLoad.
    if (imgRef.current && imgRef.current.complete) setLoaded(true);

    window.addEventListener("resize", measure, { passive: true });
    window.addEventListener("orientationchange", measure, { passive: true });
    return () => {
      window.removeEventListener("resize", measure);
      window.removeEventListener("orientationchange", measure);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      {/* Homepage-only JHV lettering + ring + light streaks. Rendered BEFORE the pixel canvas,
          so the animated dots keep drifting over it. */}
      <HeroBackdrop pose={pose} />
      <PixelMap />

      {/* Soft vignette behind the portrait — homepage only, fades out on content pages */}
      <div className="stage-vignette" data-pose={pose} aria-hidden="true" />

      {/* Invisible measuring boxes (one per pose) — never rendered */}
      <div ref={homeAnchorRef} className="pose-anchor pose-anchor--home" aria-hidden="true" />
      <div ref={sideAnchorRef} className="pose-anchor pose-anchor--side" aria-hidden="true" />

      {/* The one and only portrait */}
      <div ref={personRef} className="stage-person" data-pose={pose} data-ready={ready ? "" : undefined}>
        {/* next/image serves a resized WebP (a fraction of the PNG's 1.1 MB) with proper
            caching — public/person.png stays the single source file you replace. */}
        <Image
          ref={imgRef}
          src="/person.png"
          alt={NAME}
          width={1487}
          height={1058}
          sizes="(min-width: 768px) 1040px, 140vw"
          loading="eager"
          fetchPriority="high"
          className="stage-person-img select-none"
          draggable={false}
          data-ready={ready ? "" : undefined}
          onLoad={() => setLoaded(true)}
          onError={() => setLoaded(true)}
        />
      </div>

      {/* Name banner — slides down and away when moving to a content page */}
      <div className="stage-banner" data-pose={pose} aria-hidden="true">
        <div className="banner-name">
          <span>Julio Herrera</span>
          {" "}
          <span>Velutini</span>
        </div>
      </div>
    </>
  );
}
