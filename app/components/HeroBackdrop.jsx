import Image from "next/image";
import { JHV_HEIGHT, JHV_PATHS, JHV_WIDTH } from "./hero-glyphs";

/**
 * Homepage-only backdrop that sits BEHIND the portrait cut-out:
 *   - the silver crest (public/crest.webp), shown see-through
 *   - big "JHV" monogram (grey, lit from the left) drawn ON TOP of the crest
 *   - horizontal light streaks + small flares
 *   - a tiny 3×3 pixel-square accent
 *
 * Everything except the crest is a plain SVG / CSS shape (no fonts, no canvas). It is positioned
 * from the same CSS tokens as the portrait (see "Homepage backdrop" in globals.css) and
 * fades out when the stage moves to a content page (data-pose="side"). The animated
 * pixel-dot canvas (<PixelMap />) is untouched and keeps running over all of it.
 *
 * Readability of the JHV letters: the crest is painted underneath them, it is only ever shown
 * at partial opacity (--fx-crest-opacity in globals.css), a soft dark scrim is blurred behind the
 * letters, and the letters carry a thin dark halo — so the crest's detail never fights the
 * lettering. To swap the artwork, replace public/crest.webp (keep the same proportions, or update
 * CREST below and the aspect-ratio of .fx-crest in globals.css).
 */

// public/crest.webp — its pixel size
const CREST = { src: "/crest.webp", width: 373, height: 551 };

// 3×3 pixel-square accent: f = bright, o = outline, d = dim
const PIXELS = ["d", "o", "f", "o", "d", "o", "f", "o", "d"];
const CELL = 20;
const PITCH = 29;
const PIXEL_X = 6;
const PIXEL_Y = -64;

export default function HeroBackdrop({ pose }) {
  return (
    <div className="hero-fx" data-pose={pose} aria-hidden="true">
      <div className="hero-fx__stage">
        {/* crest — painted first, so the JHV lettering sits on top of it */}
        <div className="fx-crest">
          <Image
            src={CREST.src}
            alt=""
            width={CREST.width}
            height={CREST.height}
            loading="eager"
            decoding="async"
            unoptimized
            draggable={false}
            className="fx-crest__img select-none"
          />
        </div>

        {/* soft dark scrim in the shape of the letters: dims the crest right behind the lettering */}
        <svg
          className="fx-letters fx-letters--scrim"
          viewBox={`0 0 ${JHV_WIDTH} ${JHV_HEIGHT}`}
          focusable="false"
        >
          <defs>
            <filter id="fx-scrim-blur" x="-10%" y="-30%" width="120%" height="160%">
              <feGaussianBlur stdDeviation="24" />
            </filter>
          </defs>
          <g
            className="fx-scrim__body"
            filter="url(#fx-scrim-blur)"
            fill="#0a0a0a"
            stroke="#0a0a0a"
            strokeWidth="30"
            strokeLinejoin="round"
          >
            {JHV_PATHS.map((d, i) => (
              <path key={i} d={d} />
            ))}
          </g>
        </svg>

        {/* JHV monogram */}
        <svg
          className="fx-letters"
          viewBox={`0 0 ${JHV_WIDTH} ${JHV_HEIGHT}`}
          focusable="false"
        >
          <defs>
            <linearGradient
              id="fx-letter-fill"
              gradientUnits="userSpaceOnUse"
              x1="0"
              y1="0"
              x2={JHV_WIDTH * 0.78}
              y2={JHV_HEIGHT * 1.15}
            >
              <stop offset="0" stopColor="#97958f" />
              <stop offset=".42" stopColor="#52514e" />
              <stop offset="1" stopColor="#2c2c2b" />
            </linearGradient>
            <linearGradient
              id="fx-letter-rim"
              gradientUnits="userSpaceOnUse"
              x1="0"
              y1="0"
              x2={JHV_WIDTH}
              y2="0"
            >
              <stop offset="0" stopColor="#f1eee7" stopOpacity=".9" />
              <stop offset=".34" stopColor="#f1eee7" stopOpacity=".32" />
              <stop offset=".62" stopColor="#f1eee7" stopOpacity=".14" />
              <stop offset="1" stopColor="#f1eee7" stopOpacity=".55" />
            </linearGradient>
          </defs>

          {/* thin dark halo: keeps the letter edges crisp where the crest shows through */}
          <g fill="none" stroke="#0a0a0a" strokeOpacity=".5" strokeWidth="14" strokeLinejoin="round">
            {JHV_PATHS.map((d, i) => (
              <path key={i} d={d} />
            ))}
          </g>

          <g fill="url(#fx-letter-fill)">
            {JHV_PATHS.map((d, i) => (
              <path key={i} d={d} />
            ))}
          </g>
          <g fill="none" stroke="url(#fx-letter-rim)" strokeWidth="1.25" strokeLinejoin="round">
            {JHV_PATHS.map((d, i) => (
              <path key={i} d={d} vectorEffect="non-scaling-stroke" />
            ))}
          </g>

          {/* pixel-square accent */}
          <g className="fx-pixels">
            {PIXELS.map((kind, i) => {
              const x = PIXEL_X + (i % 3) * PITCH;
              const y = PIXEL_Y + Math.floor(i / 3) * PITCH;
              return (
                <rect
                  key={i}
                  className={`fx-pixel fx-pixel--${kind}`}
                  style={{ "--n": i }}
                  x={x}
                  y={y}
                  width={CELL}
                  height={CELL}
                />
              );
            })}
          </g>
        </svg>

        {/* light streaks */}
        <span className="fx-streak fx-streak--right" />
        <span className="fx-streak fx-streak--left" />
        <span className="fx-streak fx-streak--low" />
      </div>
    </div>
  );
}
