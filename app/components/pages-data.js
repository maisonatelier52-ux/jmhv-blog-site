/**
 * Content pages — one entry per page, in the order they are shown (prev / next follows this order).
 *
 * - number + label  → the small line above the headline, e.g. "01 — The Profile"
 * - number + title  → the short link text in the prev / next navigation, e.g. "02 Origins"
 * - slug            → the URL (/profile, /origins, …). Pages are pre-built from this list.
 * - headline / body → the visible text. Keep them close to this length: the panel is one screen
 *                     tall with no scrolling, so much longer text can be clipped on small phones.
 *
 * To add a page: add an entry here (number it in order). Nothing else needs to change.
 *
 * Content follows the homepage line: "Dive into a career of international banking, finance and
 * leadership, built on long-term relationships." Every statement is a documented career fact
 * (public profiles and press coverage); no quotes or praise are attributed to anyone.
 */
export const PAGES = [
  {
    slug: "profile",
    number: "01",
    title: "Profile",
    label: "The Profile",
    headline:
      "A banker and financier whose career has moved from Caracas to Puerto Rico to London — more than three decades of international finance.",
    body: "Julio Herrera Velutini was born in Caracas in 1971 into a Venezuelan banking family. He began in the stock market in the early 1990s, went on to chair banks in Venezuela, and later founded financial groups in Puerto Rico and the United Kingdom.",
  },
  {
    slug: "origins",
    number: "02",
    title: "Origins",
    label: "Family & Origins",
    headline:
      "Born into a Venezuelan banking family, schooled in England and Switzerland, then educated at the Central University of Venezuela.",
    body: "His family’s name is closely tied to Banco Caracas, a historic Venezuelan bank that members of the Velutini family led for much of its history. Finance was the family trade long before his own career began in the early 1990s.",
  },
  {
    slug: "heritage",
    number: "03",
    title: "Heritage",
    label: "A House in Caracas",
    headline:
      "A grandson of José Herrera Uslar, from one of the founding families of the Caracas valley and the owners of Hacienda La Vega.",
    body: "His grandparents José Herrera Uslar and Clementina Velutini married in 1932, joining two Caracas families. The family’s Hacienda La Vega, dating from 1590, is often called one of the oldest continuously inhabited houses in the Western Hemisphere.",
  },
  {
    slug: "markets",
    number: "04",
    title: "Markets",
    label: "First Markets",
    headline:
      "A career that began on the Caracas Stock Exchange and moved into senior leadership of investment companies.",
    body: "In the early 1990s he joined the brokerage Multinvest Casa de Bolsa and served on its board until 1998. That year he became chief executive of Transban Investments, a group with companies in finance, securities transport and automotive.",
  },
  {
    slug: "leadership",
    number: "05",
    title: "Leadership",
    label: "Leadership in Banking",
    headline:
      "Chairing banks in his twenties and thirties: Bolívar Banco Universal first, then Banco Real and its holding company.",
    body: "In the early 2000s he also acquired Caja Caracas Casa de Bolsa and the US firm IBG Trading. He chaired Banco Real, and Banreal Holding in Spain, from 2007 until February 2009.",
  },
  {
    slug: "puerto-rico",
    number: "06",
    title: "Puerto Rico",
    label: "A Base in Puerto Rico",
    headline:
      "In 2009 he founded Bancrédito in Puerto Rico, offering private, corporate and institutional banking to a largely Latin American clientele.",
    body: "The Bancrédito group also included a charitable foundation and, in 2016, added Consultiva Wealth Management, an SEC-registered investment adviser with offices in Puerto Rico and New York.",
  },
  {
    slug: "london",
    number: "07",
    title: "London",
    label: "Britannia in London",
    headline:
      "In London he founded Britannia Financial Group, a group of companies spanning wealth management, brokerage, payments and banking.",
    body: "Headquartered in London, Britannia Financial Group became the parent of Britannia Global Markets, Britannia Global Payments and Britannia Bank & Trust. In 2022 it sponsored the Platinum Jubilee Pageant for Queen Elizabeth II.",
  },
  {
    slug: "brokerage",
    number: "08",
    title: "Brokerage",
    label: "Britannia Global Markets",
    headline:
      "Britannia Global Markets, an FCA-regulated London brokerage, serves institutional clients with execution, custody and clearing.",
    body: "Britannia Financial Group acquired a London futures broker in 2019 and renamed it Britannia Global Markets. In 2021 the group added Britannia Prime, a prime brokerage for hedge funds, family offices and other institutional clients.",
  },
  {
    slug: "digital-assets",
    number: "09",
    title: "Digital Assets",
    label: "Into Digital Assets",
    headline:
      "In 2022 the group moved into digital assets, acquiring the crypto trading technology firm Alphaplate.",
    body: "The acquisition allowed Britannia to offer clients execution, custody, OTC services, payments and asset management in digital assets, built on Alphaplate’s quantitative market-making technology.",
  },
  {
    slug: "next-generation",
    number: "10",
    title: "Next Generation",
    label: "A New Generation",
    headline:
      "In 2022 ownership of Britannia Financial Group passed to his son, Julio César Herrera, a new generation of the family in finance.",
    body: "At the time, Britannia was a privately owned group headquartered in London, with offices in Geneva and the Bahamas, covering brokerage, banking and wealth management.",
  },
  {
    slug: "relationships",
    number: "11",
    title: "Relationships",
    label: "Long-Term Relationships",
    headline:
      "Caracas, New York, San Juan, London: a career carried across borders by clients, partners and a family tradition in banking.",
    body: "Private and wealth banking is a business of lasting relationships, and his institutions were built to serve clients across Latin America and Europe. He also created the Bancrédito Foundation, adding a philanthropic arm to the group.",
  },
];

export function getPage(slug) {
  return PAGES.find((p) => p.slug === slug) || null;
}

export const PAGE_SLUGS = PAGES.map((p) => p.slug);
