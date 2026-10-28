"use client";

import { usePathname } from "next/navigation";

/**
 * Homepage hero: the name and a short line about his background, set on the left of the portrait.
 *
 * - Lives in the persistent Stage, so it is mounted once. On "/" it fades up quietly (name line by
 *   line, then a hairline, then the subtitle). On every other page it fades out; going back to "/"
 *   plays the same short intro again.
 * - Visual only: the real <h1> for screen readers / SEO is the sr-only one in app/page.jsx.
 * - Sizes, timing and easing are in globals.css under "Homepage hero".
 */

const LINES = ["Julio", "Herrera", "Velutini"];

// The line under the name — edit the wording here.
const SUBTITLE =
  "Dive into a career of international banking, finance and leadership, built on long-term relationships.";

export default function HomeHero() {
  const pathname = usePathname();
  const pose = pathname === "/" ? "home" : "away";

  return (
    <div className="home-hero" data-pose={pose} aria-hidden="true">
      <div className="home-hero__inner">
        <div className="home-hero__name name-font">
          {LINES.map((line, i) => (
            <span className="hh-line" key={line} style={{ "--l": i }}>
              {line}
            </span>
          ))}
        </div>
        <span className="hh-rule" />
        <p className="hh-sub">{SUBTITLE}</p>
      </div>
    </div>
  );
}
