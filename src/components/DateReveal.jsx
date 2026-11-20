import { useEffect, useRef } from "react";
import { useInView } from "../hooks/useInView";

/**
 * Shows the wedding date & day.
 * Calls `onInView(cardElement)` once when the card enters the viewport —
 * the parent (InvitationHero) uses that to launch fireworks.
 */
export function DateReveal({ date, day, onInView }) {
  const [inViewRef, inView] = useInView({ threshold: 0.5 });
  const cardRef = useRef(null);

  // Merge both refs onto the same DOM element
  const setRef = (el) => {
    cardRef.current = el;
    inViewRef.current = el;
  };

  useEffect(() => {
    if (inView && cardRef.current) {
      onInView?.(cardRef.current);
    }
    // Only fire once — no deps on onInView to avoid repeated calls
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return (
    <div
      ref={setRef}
      className="relative mx-auto my-[30px] flex flex-col items-center justify-center rounded-[20px] px-[40px] py-[28px] shadow-[0_0_30px_rgba(212,175,55,0.35),0_8px_30px_rgba(0,0,0,0.4)]"
      style={{
        background: "linear-gradient(135deg, #6b0000 0%, #8b0000 60%, #6b0000 100%)",
        border: "2px solid rgba(212,175,55,0.5)",
        minWidth: 280,
      }}
    >
      {/* Top gold divider */}
      <div className="mb-[14px] flex items-center gap-3 w-full">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#d4af37]/70" />
        <span className="text-[#d4af37] text-[14px]">✦</span>
        <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#d4af37]/70" />
      </div>

      <h2 className="text-[42px] leading-none font-bold text-[#d4af37] drop-shadow-[0_2px_8px_rgba(0,0,0,.5)] md:text-[52px]">
        {date}
      </h2>

      <p className="mt-[8px] text-[20px] font-semibold tracking-[4px] text-[#f5e6a8] md:text-[26px]">
        {day}
      </p>

      {/* Bottom gold divider */}
      <div className="mt-[14px] flex items-center gap-3 w-full">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#d4af37]/70" />
        <span className="text-[#d4af37] text-[14px]">✦</span>
        <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#d4af37]/70" />
      </div>
    </div>
  );
}
