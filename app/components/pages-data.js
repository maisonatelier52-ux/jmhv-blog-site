export const PAGES = [
  {
    slug: "profile",
    number: "01",
    title: "Profile",
    label: "The Profile",
    headline:
      "A modern visual identity built around Julio Herrera Velutini — precision, presence, perspective, and attention to detail.",
    body: "Julio Herrera Velutini represents a considered approach to leadership and international finance. His presence is defined by clarity, long-term relationships, and a quiet authority that does not need to announce itself.",
  },
  {
    slug: "perspective",
    number: "02",
    title: "Perspective",
    label: "International Perspective",
    headline:
      "A global point of view shaped by international banking, finance, leadership, and long-term relationships across continents.",
    body: "Years of work across markets have forged a perspective that is both practical and far-reaching. Decisions are made with an understanding of local nuance and global consequence.",
  },
  {
    slug: "trust",
    number: "03",
    title: "Trust",
    label: "Built on Trust",
    headline:
      "A personal brand experience focused on clarity, discretion, precision, and the confidence that comes from consistent action.",
    body: "Trust is not a slogan. It is the cumulative result of careful judgment, confidential counsel, and an unwavering standard of integrity in every engagement.",
  },
  {
    slug: "motion",
    number: "04",
    title: "Motion",
    label: "Motion with Intention",
    headline:
      "Every transition is deliberately restrained so the experience feels premium rather than distracting — motion in service of meaning.",
    body: "In a world of noise, measured movement stands out. The same principle guides strategy: deliberate steps, clear direction, and no wasted gesture.",
  },
  {
    slug: "detail",
    number: "05",
    title: "Detail",
    label: "Detail Matters",
    headline:
      "Typography, spacing, image treatment, texture, and timing work together as one visual system — and one standard of excellence.",
    body: "Excellence lives in the particulars. From the structure of a conversation to the architecture of a deal, the quality of the detail determines the quality of the outcome.",
  },
  {
    slug: "editorial",
    number: "06",
    title: "Editorial",
    label: "Modern Editorial",
    headline:
      "A monochrome visual language combines portraiture, typography, and moving pixel fields into a single, cohesive narrative.",
    body: "The aesthetic is editorial by design: restrained, high-contrast, and timeless. It reflects a preference for substance over spectacle.",
  },
  {
    slug: "evolving",
    number: "07",
    title: "Evolving",
    label: "Always Evolving",
    headline:
      "The interface is designed as a flexible foundation that can grow with the story, the work, and the next chapter.",
    body: "Continuity and change are not opposites. Julio Herrera Velutini’s work continues to expand while remaining anchored in the same core values of precision and perspective.",
  },
];

export function getPage(slug) {
  return PAGES.find((p) => p.slug === slug) || null;
}

export const PAGE_SLUGS = PAGES.map((p) => p.slug);
