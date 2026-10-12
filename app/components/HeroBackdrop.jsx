import { JHV_HEIGHT, JHV_PATHS, JHV_WIDTH } from "./hero-glyphs";

/**
 * Homepage-only backdrop that sits BEHIND the portrait cut-out:
 *   - big "JHV" monogram (grey, lit from the left)
 *   - thin ring with a soft glow
 *   - horizontal light streaks + small flares
 *   - a tiny 3×3 pixel-square accent
 *
 * Everything is a plain SVG / CSS shape (no images, no fonts, no canvas), is positioned
 * from the same CSS tokens as the portrait (see "Homepage backdrop" in globals.css) and
 * fades out when the stage moves to a content page (data-pose="side"). The animated
 * pixel-dot canvas (<PixelMap />) is untouched and keeps running over all of it.
 *
 * Colours are neutral greys / the site's stone tone — change the stop-colors below to retune.
 */

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
        {/* soft light haze behind the ring */}
        <span className="fx-haze" />

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

        {/* ring + flare */}
        <svg className="fx-ring" viewBox="0 0 1100 1100" focusable="false">
          <defs>
            <linearGradient
              id="fx-ring-stroke"
              gradientUnits="userSpaceOnUse"
              x1="120"
              y1="80"
              x2="980"
              y2="1020"
            >
              <stop offset="0" stopColor="#f1eee7" stopOpacity=".95" />
              <stop offset=".3" stopColor="#c4c1ba" stopOpacity=".5" />
              <stop offset=".62" stopColor="#8d8b86" stopOpacity=".26" />
              <stop offset="1" stopColor="#f1eee7" stopOpacity=".9" />
            </linearGradient>
            <filter id="fx-ring-blur" x="-8%" y="-8%" width="116%" height="116%">
              <feGaussianBlur stdDeviation="8" />
            </filter>
            <radialGradient id="fx-flare-core">
              <stop offset="0" stopColor="#fbf9f4" stopOpacity=".95" />
              <stop offset=".25" stopColor="#e6e3dc" stopOpacity=".45" />
              <stop offset="1" stopColor="#e6e3dc" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="fx-flare-line" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#f1eee7" stopOpacity="0" />
              <stop offset=".5" stopColor="#fbf9f4" stopOpacity=".95" />
              <stop offset="1" stopColor="#f1eee7" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* glow */}
          <circle
            cx="550"
            cy="550"
            r="548"
            fill="none"
            stroke="url(#fx-ring-stroke)"
            strokeWidth="10"
            opacity=".5"
            filter="url(#fx-ring-blur)"
          />
          {/* crisp hairline */}
          <circle
            cx="550"
            cy="550"
            r="548"
            fill="none"
            stroke="url(#fx-ring-stroke)"
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
          />

          {/* flare near the top of the ring */}
          <g className="fx-flare" transform="translate(436 14)">
            <circle r="58" fill="url(#fx-flare-core)" />
            <rect x="-150" y="-1.6" width="300" height="3.2" fill="url(#fx-flare-line)" />
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
