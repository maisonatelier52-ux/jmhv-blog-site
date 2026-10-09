"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import { getPage, PAGES, PAGE_SLUGS } from "../components/pages-data";

export default function ContentPage() {
  const params = useParams();
  const router = useRouter();
  const slug = typeof params.slug === "string" ? params.slug : params.slug?.[0];
  const page = getPage(slug);

  const [contentKey, setContentKey] = useState(slug);
  const [fadeIn, setFadeIn] = useState(true);
  // First text entrance waits a beat so it blooms as the portrait settles in place.
  // Page → page changes after that are not delayed.
  const [firstEntry, setFirstEntry] = useState(true);

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

  // Content fade when navigating between pages
  useEffect(() => {
    if (contentKey === slug) return;
    setFadeIn(false);
    const t = setTimeout(() => {
      setFirstEntry(false);
      setContentKey(slug);
      setFadeIn(true);
    }, 340);
    return () => clearTimeout(t);
  }, [slug, contentKey]);

  useEffect(() => {
    if (slug && !page) router.replace("/");
  }, [slug, page, router]);

  if (!page) return null;

  const currentIndex = PAGE_SLUGS.indexOf(page.slug);
  const prevPage = currentIndex > 0 ? PAGES[currentIndex - 1] : null;
  const nextPage = currentIndex < PAGES.length - 1 ? PAGES[currentIndex + 1] : null;

  return (
    <main className="body-font site-shell relative h-[100svh] max-h-[100svh] overflow-hidden text-[#f5f1e7]">
      <Header />

      <div className="content-page relative z-10 flex h-full w-full flex-col md:flex-row">
        {/* Left / top: editorial content — pushed up on mobile so it clears the cutout */}
        <div
          className={`content-panel relative z-20 flex min-h-0 flex-1 flex-col justify-start px-5 pt-[4.5rem] pb-[50vh] md:max-w-[58%] md:justify-center md:px-8 md:pb-16 md:pt-24 lg:max-w-[55%] ${
            fadeIn ? "content-fade-in" : "content-fade-out"
          } ${firstEntry ? "content-enter-delay" : ""}`}
          key={contentKey}
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
    </main>
  );
}
