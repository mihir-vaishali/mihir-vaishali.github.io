import { useCallback, useRef, useState } from "react";

import { DateReveal } from "./DateReveal";
import { Fireworks } from "./Fireworks";
import { Reveal } from "./ui/Reveal";
import { SmartImage } from "./ui/SmartImage";
import { useSite } from "../hooks/useSite";
import { dayName, parseDate } from "../lib/date";

/** The invitation itself: names, portrait and the date reveal with fireworks. */
export function InvitationHero({ active }) {
  const { hero, logo, couplePhoto, weddingDate, ceremonyHour } = useSite();
  const day = dayName(parseDate(weddingDate, ceremonyHour));

  const sectionRef = useRef(null);
  const [fwActive, setFwActive] = useState(false);
  const [fwOrigin, setFwOrigin] = useState(null);
//       "image": "/images/image (5).png",

  /**
   * Called by DateReveal the moment the date card enters the viewport.
   * cardEl = the date card DOM element.
   * We compute its position RELATIVE to the section so the canvas (which
   * sits inside the section as position:absolute) uses the same coordinate
   * system — no viewport/devicePixelRatio mismatches.
   */
  const onDateVisible = useCallback((cardEl) => {
    if (fwActive || !sectionRef.current || !cardEl) return;
    const cardRect = cardEl.getBoundingClientRect();
    const sectionRect = sectionRef.current.getBoundingClientRect();
    setFwOrigin({
      x: cardRect.left - sectionRect.left + cardRect.width / 2,
      y: cardRect.top - sectionRect.top + cardRect.height / 2,
    });
    setFwActive(true);
  }, [fwActive]);

  return (
    <section
      ref={sectionRef}
      className={`relative flex min-h-screen items-center justify-center bg-cover bg-center transition-opacity duration-1000 ${active ? "opacity-100" : "invisible opacity-0"
        }`}
      style={{
        background: "linear-gradient(160deg, #6b0000 0%, #8b0000 40%, #a50000 70%, #8b0000 100%)",
      }}
    >
      {/* Fireworks canvas sits INSIDE the section — same coordinate system */}
      <Fireworks
        active={fwActive}
        origin={fwOrigin}
        containerRef={sectionRef}
      />

      <div className="p-5 text-center">
        <Reveal active={active} delay={400}>
          <div className="relative mx-auto mb-[30px] size-[170px] rounded-full bg-[linear-gradient(135deg,#f7e7a9,#d4af37,#f7e7a9)] p-[8px] shadow-[0_10px_30px_rgba(0,0,0,.35),0_0_0_5px_rgba(212,175,55,.4)] md:size-[220px]">
            <SmartImage
              src={couplePhoto.src}
              alt={couplePhoto.alt}
              placeholderLabel="Couple"
              seed={1}
              className="size-full rounded-full border-4 border-white object-cover"
            />
          </div>
        </Reveal>

        <Reveal
          as="h1"
          active={active}
          preset="slideDown"
          className="font-display text-[70px] font-bold tracking-[3px] text-[#d4af37] drop-shadow-[0_2px_8px_rgba(0,0,0,.4)] md:text-[105px]"
          style={{ fontFamily: '"Tangerine", cursive' }}
        >
          {hero.groom}
        </Reveal>

        <Reveal
          active={active}
          delay={700}
          className="my-[15px] text-[16px] tracking-[5px] text-white/70"
        >
          {hero.weds}
        </Reveal>

        <Reveal
          as="h1"
          active={active}
          preset="slideUp"
          delay={1000}
          className="font-display text-[70px] font-bold tracking-[3px] text-[#d4af37] drop-shadow-[0_2px_8px_rgba(0,0,0,.4)] md:text-[105px]"
          style={{ fontFamily: '"Tangerine", cursive' }}
        >
          {hero.bride}
        </Reveal>

        <Reveal
          as="p"
          active={active}
          delay={1800}
          className="my-[20px] text-[16px] leading-[1.8] whitespace-pre-line text-white/85"
          style={{ fontFamily: '"Poppins", sans-serif' }}
        >
          <span style={{ fontFamily: '"Poppins", sans-serif' }}>{hero.invite}</span>
        </Reveal>

        <Reveal active={active} preset="zoom" delay={2400}>
          <DateReveal date={weddingDate} day={day} onInView={onDateVisible} />
        </Reveal>
      </div>
    </section>
  );
}
