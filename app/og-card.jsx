import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

/**
 * Draws the 1200 x 630 link-preview card (what shows when a page is shared on WhatsApp, LinkedIn,
 * X, Slack, iMessage…). Used by app/opengraph-image.jsx (homepage) and app/[slug]/opengraph-image.jsx
 * (one card per content page, built from pages-data.js). The portrait is public/person.png, so
 * replacing that file updates every card at the next build.
 */

const W = 1200;
const H = 630;

export async function renderCard({ kicker, title, titleSize = 46, sub, footer }) {
  const [font, portrait] = await Promise.all([
    readFile(join(process.cwd(), "app/fonts/BodoniModa-Bold.ttf")),
    readFile(join(process.cwd(), "public/person.png")),
  ]);
  const portraitSrc = `data:image/png;base64,${portrait.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: W,
          height: H,
          display: "flex",
          position: "relative",
          background: "linear-gradient(120deg, #0a0a0a 55%, #161616 100%)",
          color: "#d2cdc3",
          fontFamily: "Bodoni",
        }}
      >
        <img
          src={portraitSrc}
          width={880}
          height={626}
          style={{ position: "absolute", right: -150, bottom: 0 }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: 760,
            height: H,
            padding: "56px 64px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                fontSize: 21,
                letterSpacing: 5,
                color: "#8d8a84",
                marginBottom: 30,
              }}
            >
              {kicker}
            </div>
            <div
              style={{
                display: "flex",
                fontSize: titleSize,
                lineHeight: 1.08,
                letterSpacing: 1,
                color: "#e6e1d7",
              }}
            >
              {title}
            </div>
            {sub ? (
              <div style={{ display: "flex", fontSize: 28, lineHeight: 1.3, color: "#9b988f", marginTop: 28 }}>
                {sub}
              </div>
            ) : null}
          </div>
          {footer ? (
            <div style={{ display: "flex", fontSize: 24, letterSpacing: 3, color: "#f5f1e7" }}>{footer}</div>
          ) : (
            <div style={{ display: "flex" }} />
          )}
        </div>
      </div>
    ),
    { width: W, height: H, fonts: [{ name: "Bodoni", data: font, weight: 700, style: "normal" }] },
  );
}
