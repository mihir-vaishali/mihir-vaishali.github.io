import { useMemo } from "react";

import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

const COUNT = 32;

const random = (min, max) => min + Math.random() * (max - min);

/**
 * Falling cherry blossom. A fixed pool of CSS-animated nodes rendered once,
 * rather than appending a fresh element on a timer — same look, no DOM churn.
 *
 * Each petal gets a *negative* animation delay so it starts already partway
 * through its fall. A positive delay would park every petal at its start
 * position — a visible row of stuck flowers along the top edge — until its
 * timer fired.
 */
export function FlowerRain({ active = true }) {
  const prefersReducedMotion = usePrefersReducedMotion();

  const petals = useMemo(
    () =>
      Array.from({ length: COUNT }, (_, index) => {
        const duration = random(4, 8);

        return {
          id: index,
          left: random(0, 100),
          size: random(20, 45),
          duration,
          offset: random(0, duration),
        };
      }),
    [],
  );

  if (!active || prefersReducedMotion) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[999] overflow-hidden"
    >
      {petals.map((petal) => (
        <span
          key={petal.id}
          className="absolute -top-[50px] leading-none will-change-transform"
          style={{
            left: `${petal.left}%`,
            fontSize: `${petal.size}px`,
            animation: `fall ${petal.duration}s linear -${petal.offset}s infinite both`,
          }}
        >
          🌹
        </span>
      ))}
    </div>
  );
}
