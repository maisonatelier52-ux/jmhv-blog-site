"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getPage, PAGES, PAGE_SLUGS } from "./pages-data";

/**
 * Persistent content layer — lives in app/layout.jsx next to <Stage />.
 *
 * Why it is here and not inside app/[slug]/page.jsx: a dynamic route segment is
 * re-mounted by Next.js every time the slug changes, which threw away the fade
 * state (so the fade-out never ran and every page change had a blank wait), and
 * forced the page's JS chunk + a server round-trip on every click. Rendered from
 * the layout it stays mounted, so changing page is just a client-side re-render.
 * The route files in app/ only exist so the URLs are real, statically generated
 * pages (good for direct visits, SEO and prefetching).
 */

const FADE_OUT_MS = 320;

function slugFromPath(pathname) {
  if (!pathname || pathname === "/") return null;
  const slug = pathname.replace(/^\/+|\/+$/g, "");
  return getPage(slug) ? slug : null;
}

export default function ContentLayer() {
  const pathname = usePathname();
  const target = slugFromPath(pathname);

  // `shown` is what is on screen; `target` is where the URL says we are going.
  const [shown, setShown] = useState(target);
  // The first arrival (direct visit, or coming from the home pose) waits a beat so the
  // text blooms as the portrait settles. Page → page changes are not delayed.
  const [delayed, setDelayed] = useState(true);

  // Nothing on screen yet (we were on the home pose) → show the new page straight away
  if (shown === null && target !== null) {
    setShown(target);
    setDelayed(true);
  }

  const leaving = shown !== null && target !== shown;

  // Fade the current text out, then swap to the new page (or to nothing on home)
  useEffect(() => {
    if (!leaving) return undefined;
    const timer = setTimeout(() => {
      setShown(target);
      setDelayed(false);
    }, FADE_OUT_MS);
    return () => clearTimeout(timer);
  }, [leaving, target]);

  const page = shown ? getPage(shown) : null;
  if (!page) return null;

  const currentIndex = PAGE_SLUGS.indexOf(page.slug);
  const prevPage = currentIndex > 0 ? PAGES[currentIndex - 1] : null;
  const nextPage = currentIndex < PAGES.length - 1 ? PAGES[currentIndex + 1] : null;

  return (
    <div className="content-page relative z-10 flex h-full w-full flex-col md:flex-row">
      {/* Left / top: editorial content — pushed up on mobile so it clears the cutout */}
      <div
        key={shown}
        className={`content-panel relative z-20 flex min-h-0 flex-1 flex-col justify-start px-5 pt-[4.5rem] pb-[50vh] md:max-w-[58%] md:justify-center md:px-8 md:pb-16 md:pt-24 lg:max-w-[55%] ${
          leaving ? "content-fade-out" : "content-fade-in"
        } ${delayed ? "content-enter-delay" : ""}`}
      >
        <p className="mb-3 text-[10px] uppercase tracking-[.18em] text-white/50 md:mb-6 md:text-[12px]">
          {page.number} — {page.label}
        </p>
        <h1 className="display-font content-headline text-balance break-words uppercase text-white/80">
          {page.headline}
        </h1>
        <p className="content-body mt-4 max-w-xl text-[13px] leading-[1.4] text-white/55 md:mt-8 md:text-[15px] md:leading-[1.5]">
          {page.body}
        </p>

        {/* Prev / Next */}
        <div className="mt-8 flex flex-wrap items-center gap-4 md:mt-14 md:gap-6">
          {prevPage ? (
            <Link
              href={`/${prevPage.slug}`}
              className="group flex items-center gap-2 text-[11px] uppercase tracking-[.12em] text-white/50 transition hover:text-white/90 md:text-[12px]"
            >
              <span aria-hidden className="transition group-hover:-translate-x-1">
                ←
              </span>
              <span>
                {prevPage.number} {prevPage.title}
              </span>
            </Link>
          ) : (
            <span className="text-[11px] uppercase tracking-[.12em] text-white/20 md:text-[12px]">← Start</span>
          )}
          <span className="text-white/20">/</span>
          {nextPage ? (
            <Link
              href={`/${nextPage.slug}`}
              className="group flex items-center gap-2 text-[11px] uppercase tracking-[.12em] text-white/50 transition hover:text-white/90 md:text-[12px]"
            >
              <span>
                {nextPage.number} {nextPage.title}
              </span>
              <span aria-hidden className="transition group-hover:translate-x-1">
                →
              </span>
            </Link>
          ) : (
            <span className="text-[11px] uppercase tracking-[.12em] text-white/20 md:text-[12px]">End →</span>
          )}
        </div>
      </div>
    </div>
  );
}
