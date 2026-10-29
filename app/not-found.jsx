import Link from "next/link";

export const metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

// Shown (with a real 404 status) for any address that is not a page of the site.
export default function NotFound() {
  return (
    <div className="content-page relative z-10 flex h-full w-full flex-col justify-center">
      <div className="content-panel relative z-20 flex flex-col px-5 wide:max-w-[58%] wide:px-8">
        <p className="mb-3 text-[10px] uppercase tracking-[.18em] text-white/50 wide:mb-6 wide:text-[12px]">
          404 — Not found
        </p>
        <h1 className="display-font content-headline text-balance uppercase text-white/80">
          This page does not exist.
        </h1>
        <Link
          href="/"
          className="mt-6 text-[11px] uppercase tracking-[.12em] text-white/50 transition hover:text-white/90 wide:mt-10 wide:text-[12px]"
        >
          ← Back to home
        </Link>
      </div>
    </div>
  );
}
