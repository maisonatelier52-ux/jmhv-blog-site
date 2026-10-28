"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PAGES } from "./pages-data";

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const firstSlug = PAGES[0]?.slug || "profile";

  return (
    <header className="absolute left-0 top-0 z-50 flex w-full items-start justify-between gap-4 px-5 pt-5 wide:px-8 wide:pt-7">
      {/* Wordmark: shown on every page except the homepage (which has the big name instead).
          It stays in the layout so the page-change fade doesn't shift the button. */}
      <Link
        href="/"
        className="header-name name-font -m-2 block p-2 text-left text-[11px] leading-[.9] tracking-[.02em] whitespace-nowrap min-[360px]:text-[12px] wide:text-[14px]"
        data-home={isHome ? "" : undefined}
        aria-hidden={isHome ? "true" : undefined}
        tabIndex={isHome ? -1 : undefined}
      >
        JULIO HERRERA VELUTINI
      </Link>

      {isHome ? (
        <Link
          href={`/${firstSlug}`}
          className="view-btn group relative -m-1 flex shrink-0 items-center gap-2.5 overflow-hidden rounded-full border border-white/25 bg-white/[0.06] px-4 py-2 text-[12px] uppercase tracking-[0.16em] text-[#f5f1e7] transition-all duration-500 ease-[cubic-bezier(.16,1,.3,1)] hover:border-white/50 hover:bg-white/[0.12] hover:tracking-[0.2em] wide:px-5 wide:py-2.5 wide:text-[13px]"
          aria-label="View profile"
        >
          <span className="relative z-10">View</span>
          <span
            className="relative z-10 flex h-5 w-5 items-center justify-center rounded-full border border-white/30 transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-x-0.5 group-hover:border-white/60"
            aria-hidden
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="opacity-80">
              <path d="M1.5 5h7M5.5 2l3 3-3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <span
            className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
            aria-hidden
          />
        </Link>
      ) : (
        <Link
          href="/"
          className="view-btn group relative -m-1 flex shrink-0 items-center gap-2.5 overflow-hidden rounded-full border border-white/20 bg-white/[0.04] px-4 py-2 text-[12px] uppercase tracking-[0.16em] text-white/70 transition-all duration-500 ease-[cubic-bezier(.16,1,.3,1)] hover:border-white/40 hover:bg-white/[0.1] hover:text-[#f5f1e7] wide:px-5 wide:py-2.5 wide:text-[13px]"
          aria-label="Back to home"
        >
          <span
            className="relative z-10 flex h-5 w-5 items-center justify-center rounded-full border border-white/25 transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:-translate-x-0.5"
            aria-hidden
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="opacity-80">
              <path d="M8.5 5h-7M4.5 2l-3 3 3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <span className="relative z-10">Home</span>
        </Link>
      )}
    </header>
  );
}
