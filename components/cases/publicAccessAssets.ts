/**
 * Inline SVG data URIs so the PublicAccess case ships real <img> elements
 * (with real `alt` attributes to inspect) and still makes zero network calls.
 * Frozen content — identical for every learner, every load.
 */
const svg = (body: string, w = 160, h = 100) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">${body}</svg>`,
  )}`;

export const IMG_CREST = svg(
  `<rect width="60" height="60" fill="#231A45"/>
   <path d="M30 10l16 8v14c0 10-7 16-16 20-9-4-16-10-16-20V18z" fill="#5624D0"/>
   <path d="M30 22v18M22 31h16" stroke="#EEE9F9" stroke-width="3"/>`,
  60,
  60,
);

export const IMG_TOWNHALL = svg(
  `<rect width="320" height="120" fill="#EEE9F9"/>
   <rect x="20" y="52" width="280" height="60" fill="#DDD3F4"/>
   <path d="M160 18l130 34H30z" fill="#231A45"/>
   <rect x="60" y="66" width="16" height="46" fill="#231A45"/>
   <rect x="110" y="66" width="16" height="46" fill="#231A45"/>
   <rect x="160" y="66" width="16" height="46" fill="#231A45"/>
   <rect x="210" y="66" width="16" height="46" fill="#231A45"/>
   <rect x="256" y="66" width="16" height="46" fill="#231A45"/>`,
  320,
  120,
);

export const ICON_PASSPORT = svg(
  `<rect width="48" height="48" rx="6" fill="#EEE9F9"/>
   <rect x="14" y="10" width="20" height="28" rx="2" fill="#5624D0"/>
   <circle cx="24" cy="20" r="4" fill="#EEE9F9"/>
   <path d="M18 30c0-3 3-5 6-5s6 2 6 5z" fill="#EEE9F9"/>`,
  48,
  48,
);

export const ICON_VEHICLE = svg(
  `<rect width="48" height="48" rx="6" fill="#EEE9F9"/>
   <path d="M10 28l3-9h22l3 9v7H10z" fill="#5624D0"/>
   <circle cx="16" cy="35" r="3.5" fill="#231A45"/>
   <circle cx="32" cy="35" r="3.5" fill="#231A45"/>`,
  48,
  48,
);

export const ICON_WASTE = svg(
  `<rect width="48" height="48" rx="6" fill="#EEE9F9"/>
   <path d="M15 16h18l-2 22H17z" fill="#5624D0"/>
   <rect x="12" y="12" width="24" height="4" rx="2" fill="#231A45"/>`,
  48,
  48,
);

export const ICON_HELP = svg(
  `<rect width="48" height="48" rx="6" fill="#EEE9F9"/>
   <circle cx="24" cy="24" r="13" fill="#5624D0"/>
   <path d="M20 20a4 4 0 116 3.5V26" stroke="#EEE9F9" stroke-width="3" fill="none" stroke-linecap="round"/>
   <circle cx="24" cy="31" r="1.8" fill="#EEE9F9"/>`,
  48,
  48,
);
