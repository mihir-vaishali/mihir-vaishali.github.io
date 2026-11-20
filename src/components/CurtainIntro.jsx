import { useEffect, useRef, useState } from "react";

import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

const OPEN_DURATION = 1800; // ms for the panels to slide apart

const GREEN = "#0b2e1f";
const GOLD = "#d4af37";
const GOLD_LIGHT = "#f5e6a8";

/**
 * Mandala-textured curtain intro with an MV logo seal in the center.
 * Tapping the seal slides both halves apart like a blind, then calls onOpen.
 */
export function CurtainIntro({
  onOpen,
  logoSrc = "/images/logo.png",
  textureSrc = "/images/mandala-texture.jpg",
}) {
  const [opening, setOpening] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  const onOpenRef = useRef(onOpen);
  useEffect(() => {
    onOpenRef.current = onOpen;
  }, [onOpen]);

  useEffect(() => {
    if (!opening) return undefined;

    const id = setTimeout(
      () => onOpenRef.current?.(),
      prefersReducedMotion ? 0 : OPEN_DURATION
    );
    return () => clearTimeout(id);
  }, [opening, prefersReducedMotion]);

  const panelTransition = prefersReducedMotion
    ? "none"
    : `transform ${OPEN_DURATION}ms cubic-bezier(0.65, 0, 0.35, 1)`;

  return (
    <div
      className="fixed inset-0 z-[9999] h-screen w-full overflow-hidden pointer-events-none"
      style={{ backgroundColor: opening ? "transparent" : GREEN }}
    >
      <style>{`
        @keyframes cv-pulse {
          0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(212,175,55,.6), 0 0 24px 4px rgba(212,175,55,.18); }
          50% { transform: scale(1.06); box-shadow: 0 0 0 16px rgba(212,175,55,0), 0 0 36px 10px rgba(212,175,55,.28); }
        }
        @keyframes cv-ripple {
          0% { transform: scale(1); opacity: 0.55; }
          100% { transform: scale(2.2); opacity: 0; }
        }
      `}</style>

      {/* Left panel */}
      <CurtainPanel
        side="left"
        opening={opening}
        transition={panelTransition}
        textureSrc={textureSrc}
      />
      {/* Right panel */}
      <CurtainPanel
        side="right"
        opening={opening}
        transition={panelTransition}
        textureSrc={textureSrc}
      />

      {/* Gold seam down the middle */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 bottom-0 left-1/2 -translate-x-1/2 transition-opacity duration-700"
        style={{
          width: 1.5,
          zIndex: 15,
          background: `linear-gradient(to bottom, transparent 0%, ${GOLD} 8%, ${GOLD_LIGHT} 50%, ${GOLD} 92%, transparent 100%)`,
          opacity: opening ? 0 : 1,
          boxShadow: `0 0 6px 2px rgba(212,175,55,0.6)`,
        }}
      />

      {/* Center logo seal */}
      <div
        className="absolute inset-0 z-20 flex items-center justify-center transition-opacity duration-700"
        style={{ opacity: opening ? 0 : 1 }}
      >
        {/* Ripple rings behind the seal */}
        {!opening && (
          <>
            <span
              aria-hidden="true"
              className="pointer-events-none absolute rounded-full"
              style={{
                width: 148,
                height: 148,
                border: `1.5px solid ${GOLD}`,
                animation: prefersReducedMotion
                  ? "none"
                  : "cv-ripple 2.4s ease-out 0s infinite",
              }}
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute rounded-full"
              style={{
                width: 148,
                height: 148,
                border: `1.5px solid ${GOLD}`,
                animation: prefersReducedMotion
                  ? "none"
                  : "cv-ripple 2.4s ease-out 1.2s infinite",
              }}
            />
          </>
        )}

        <button
          type="button"
          onClick={() => setOpening(true)}
          disabled={opening}
          aria-label="Open the invitation"
          className="pointer-events-auto relative flex cursor-pointer items-center justify-center rounded-full border-none bg-transparent p-0"
        >
          <span
            className="flex items-center justify-center rounded-full overflow-hidden"
            style={{
              width: 136,
              height: 136,
              background: `radial-gradient(circle at 35% 30%, ${GOLD_LIGHT}, ${GOLD} 55%, #9c7a1f)`,
              boxShadow: `0 0 0 3px ${GOLD}, 0 0 20px 4px rgba(212,175,55,0.5)`,
              animation: prefersReducedMotion
                ? "none"
                : "cv-pulse 2.4s ease-in-out infinite",
            }}
          >
            <img
              src={logoSrc}
              alt="M & V monogram"
              className="h-full w-full rounded-full object-cover"
            />
          </span>
        </button>
      </div>
    </div>
  );
}

function CurtainPanel({ side, opening, transition, textureSrc }) {
  const isLeft = side === "left";

  return (
    <div
      aria-hidden="true"
      className="absolute top-0 h-full w-1/2 overflow-hidden"
      style={{
        [isLeft ? "left" : "right"]: 0,
        transform: opening
          ? `translateX(${isLeft ? "-100%" : "100%"})`
          : "translateX(0)",
        transition,
        zIndex: 5,
        backgroundColor: "#002011",
      }}
    >
      {/* Each panel gets its own full-centered mandala */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${textureSrc})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Dark green overlay (#002011) to mute/darken the texture */}
      <div
        className="absolute inset-0"
        style={{ background: "rgba(0, 32, 17, 0.55)" }}
      />

      {/* Outer edge vignette for depth */}
      <div
        className="absolute inset-0"
        style={{
          background: isLeft
            ? "linear-gradient(to right, rgba(0,20,10,0.5) 0%, transparent 55%)"
            : "linear-gradient(to left, rgba(0,20,10,0.5) 0%, transparent 55%)",
        }}
      />
    </div>
  );
}