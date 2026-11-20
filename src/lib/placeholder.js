const PALETTES = [
  ["#7a001c", "#b53045"],
  ["#8d3c3c", "#d1455c"],
  ["#7d4f00", "#d4af37"],
  ["#5c1520", "#a22d2d"],
];

/**
 * Builds an inline SVG stand-in so a missing photo still renders as a designed
 * panel instead of a broken-image icon. Drop the real files into
 * `public/images/` and these disappear on their own.
 */
export function placeholderImage(label, seed = 0) {
  const [from, to] = PALETTES[Math.abs(seed) % PALETTES.length];
  const safeLabel = String(label).replace(/[<>&]/g, "");

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${from}"/>
      <stop offset="100%" stop-color="${to}"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="800" fill="url(#g)"/>
  <g fill="none" stroke="#ffffff" stroke-opacity="0.18" stroke-width="2">
    <circle cx="600" cy="400" r="230"/>
    <circle cx="600" cy="400" r="290"/>
  </g>
  <text x="600" y="380" text-anchor="middle" font-family="Georgia, serif" font-size="76" fill="#ffffff" fill-opacity="0.92">${safeLabel}</text>
  <text x="600" y="440" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="22" letter-spacing="8" fill="#ffffff" fill-opacity="0.6">ADD YOUR PHOTO</text>
</svg>`;

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}
