const DAY_NAMES = [
  "SUNDAY",
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
];

/**
 * Parses a strict `DD/MM/YYYY` string into a Date at the given hour.
 * Returns `null` for anything that is not a real calendar date, which keeps
 * rollover input like `31/02/2026` from silently becoming March 3rd.
 */
export function parseDate(value, hour = 19) {
  if (typeof value !== "string") return null;

  const parts = value.trim().split("/");
  if (parts.length !== 3) return null;

  const [day, month, year] = parts.map(Number);
  if (![day, month, year].every(Number.isInteger)) return null;

  const date = new Date(year, month - 1, day, hour, 0, 0, 0);

  const isRealDate =
    date.getDate() === day &&
    date.getMonth() === month - 1 &&
    date.getFullYear() === year;

  return isRealDate ? date : null;
}

export function dayName(date) {
  return date ? DAY_NAMES[date.getDay()] : "";
}

export function isValidDateString(value, hour = 19) {
  return parseDate(value, hour) !== null;
}

/** "24 November 2026" — used once the countdown has finished. */
export function formatLongDate(date) {
  if (!date) return "";

  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
