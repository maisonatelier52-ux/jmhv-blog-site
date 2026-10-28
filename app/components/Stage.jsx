"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import HomeHero from "./HomeHero";

/**
 * Persistent stage — lives in app/layout.jsx, so it is NOT remounted when you navigate
 * between routes.
 *
 * What it draws (back to front):
 *   1. a static black background (pure CSS, see .site-bg in globals.css — nothing moves)
 *   2. the homepage name, on the left (<HomeHero />, only visible on "/")
 *   3. the portrait cut-out
 *
 * The portrait now has ONE position for every page, homepage included: pinned to the right
 * edge, standing on the bottom of the screen and lifted a little (--person-lift in globals.css).
 * Because it never moves between pages, it is positioned with plain CSS — no measuring, no JS
 * transforms, no flash before it appears. Sizes for every screen are the --person-* tokens in
 * globals.css.
 */

const NAME = "Julio Herrera Velutini";

export default function Stage() {
  const imgRef = useRef(null);
  const [loaded, setLoaded] = useState(false);

  // The SSR'd <img> may already be loaded before React attached onLoad.
  useEffect(() => {
    if (imgRef.current && imgRef.current.complete) setLoaded(true);
  }, []);

  return (
    <>
      <div className="site-bg" aria-hidden="true" />

      <HomeHero />

      {/* The one and only portrait */}
      <div className="stage-person" data-ready={loaded ? "" : undefined}>
        {/* next/image serves a resized WebP (a fraction of the PNG's 1.1 MB) with proper
            caching — public/person.png stays the single source file you replace. */}
        <Image
          ref={imgRef}
          src="/person.png"
          alt={NAME}
          width={1487}
          height={1058}
          sizes="(min-width: 1100px) 720px, 700px"
          loading="eager"
          fetchPriority="high"
          className="stage-person-img select-none"
          draggable={false}
          onLoad={() => setLoaded(true)}
          onError={() => setLoaded(true)}
        />

        {/* The portrait is lifted off the bottom edge of the screen, so this strip carries the
            jacket on down to the edge. It is matched to the bottom edge of public/person.png — if
            you swap the portrait, this strip must be remade too. */}
        <div className="stage-person-coat" aria-hidden="true">
          <Image
            src="/person-coat.png"
            alt=""
            width={1487}
            height={138}
            sizes="(min-width: 1100px) 720px, 700px"
            loading="eager"
            className="stage-person-coat__img select-none"
            draggable={false}
          />
        </div>
      </div>
    </>
  );
}
