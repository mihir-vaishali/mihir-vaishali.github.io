import { useEffect, useState } from "react";

const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

const ZERO = { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };

function breakdown(target) {
  const distance = target - Date.now();
  if (distance <= 0) return ZERO;

  return {
    days: Math.floor(distance / DAY),
    hours: Math.floor((distance % DAY) / HOUR),
    minutes: Math.floor((distance % HOUR) / MINUTE),
    seconds: Math.floor((distance % MINUTE) / SECOND),
    isPast: false,
  };
}

/** Ticks once a second toward `date`; pass `null` for an unknown date. */
export function useCountdown(date) {
  const target = date ? date.getTime() : null;
  const [remaining, setRemaining] = useState(() =>
    target ? breakdown(target) : ZERO,
  );

  useEffect(() => {
    if (!target) {
      setRemaining(ZERO);
      return undefined;
    }

    setRemaining(breakdown(target));

    const id = setInterval(() => {
      const next = breakdown(target);
      setRemaining(next);
      if (next.isPast) clearInterval(id);
    }, SECOND);

    return () => clearInterval(id);
  }, [target]);

  return remaining;
}
