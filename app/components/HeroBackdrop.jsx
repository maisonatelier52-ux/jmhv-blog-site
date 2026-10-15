/**
 * Homepage-only backdrop that sits BEHIND the portrait cut-out:
 *   - horizontal light streaks + small flares
 *
 * (The silver crest and the big "JHV" monogram that used to live here have been removed.)
 *
 * Everything is a plain CSS shape (no fonts, no canvas). It is positioned from the same CSS tokens
 * as the portrait (see "Homepage backdrop" in globals.css) and fades out when the stage moves to a
 * content page (data-pose="side"). The animated pixel-dot canvas (<PixelMap />) is untouched and
 * keeps running over all of it.
 */
export default function HeroBackdrop({ pose }) {
  return (
    <div className="hero-fx" data-pose={pose} aria-hidden="true">
      <div className="hero-fx__stage">
        {/* light streaks */}
        <span className="fx-streak fx-streak--right" />
        <span className="fx-streak fx-streak--left" />
        <span className="fx-streak fx-streak--low" />
      </div>
    </div>
  );
}
