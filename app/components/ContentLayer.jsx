"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
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

/**
 * Flowing fade-in
 * Every piece of text on the page (label → headline words → body words → prev/next) gets a
 * running index `--i`. The CSS delays each one by `--i * --flow-step`, so the text appears as
 * one continuous wave that rolls from the top of the panel down to the bottom, instead of the
 * whole block fading in at once. Pure CSS (opacity + transform), so no layout measuring and it
 * is identical on the server render and after hydration.
 */
const FLOW_TOTAL_MS = 1250; // how long the wave takes to travel through all the text (before each word's own fade)
const FLOW_STEP_MIN_MS = 12;
const FLOW_STEP_MAX_MS = 36;

const splitWords = (text) => text.trim().split(/\s+/);

function FlowWords({ words, start }) {
  return words.map((word, i) => (
    <Fragment key={i}>
      <span className="flow-item flow-word" style={{ "--i": start + i }}>
        {word}
      </span>
      {i < words.length - 1 ? " " : null}
    </Fragment>
  ));
}

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

  // Running index for the flowing fade-in: label = 0, then headline words, body words, nav
  const headlineWords = splitWords(page.headline);
  const bodyWords = splitWords(page.body);
  const headlineStart = 1;
  const bodyStart = headlineStart + headlineWords.length;
  const navIndex = bodyStart + bodyWords.length;
  const flowStepMs = Math.max(
    FLOW_STEP_MIN_MS,
    Math.min(FLOW_STEP_MAX_MS, Math.round(FLOW_TOTAL_MS / (navIndex + 1))),
  );

  return (
    <div className="content-page relative z-10 flex h-full w-full flex-col wide:flex-row">
      {/* Left / top: editorial content — pushed up on mobile so it clears the cutout */}
      <div
        key={shown}
        style={{ "--flow-step": `${flowStepMs}ms` }}
        className={`content-panel relative z-20 flex min-h-0 flex-1 flex-col justify-start px-5 pt-[4.5rem] pb-[calc(var(--person-h)+var(--person-lift)+10px)] wide:max-w-[58%] wide:justify-center wide:px-8 wide:pb-16 wide:pt-24 lg:max-w-[55%] ${
          leaving ? "content-fade-out" : ""
        } ${delayed ? "content-enter-delay" : ""}`}
      >
        <p
          className="content-label flow-item mb-3 text-[10px] uppercase tracking-[.18em] text-white/50 wide:mb-6 wide:text-[12px]"
          style={{ "--i": 0 }}
        >
          {page.number} — {page.label}
        </p>
        <h1 className="display-font content-headline text-balance break-words uppercase text-white/80">
          <FlowWords words={headlineWords} start={headlineStart} />
        </h1>
        <p className="content-body mt-4 max-w-xl text-[13px] leading-[1.4] text-white/55 wide:mt-8 wide:text-[15px] wide:leading-[1.5]">
          <FlowWords words={bodyWords} start={bodyStart} />
        </p>

        {/* Prev / Next */}
        <nav
          aria-label="Previous and next page"
          className="content-nav flow-item mt-8 flex flex-wrap items-center gap-4 wide:mt-14 wide:gap-6"
          style={{ "--i": navIndex }}
        >
          {prevPage ? (
            <Link
              href={`/${prevPage.slug}`}
              className="group flex items-center gap-2 text-[11px] uppercase tracking-[.12em] text-white/50 transition hover:text-white/90 wide:text-[12px]"
            >
              <span aria-hidden className="transition group-hover:-translate-x-1">
                ←
              </span>
              <span>
                {prevPage.number} {prevPage.title}
              </span>
            </Link>
          ) : null}
          {prevPage && nextPage ? <span className="text-white/20">/</span> : null}
          {nextPage ? (
            <Link
              href={`/${nextPage.slug}`}
              className="group flex items-center gap-2 text-[11px] uppercase tracking-[.12em] text-white/50 transition hover:text-white/90 wide:text-[12px]"
            >
              <span>
                {nextPage.number} {nextPage.title}
              </span>
              <span aria-hidden className="transition group-hover:translate-x-1">
                →
              </span>
            </Link>
          ) : null}
        </nav>
      </div>
    </div>
  );
}
