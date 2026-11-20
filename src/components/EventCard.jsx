import { Fragment } from "react";

import { SmartImage } from "./ui/SmartImage";
import { useInView } from "../hooks/useInView";

export function EventCard({ event, index }) {
  const [ref, inView] = useInView({ threshold: 0.15 });

  const details = [
    ["DATE", event.date],
    ["TIME", event.time],
    ["VENUE", event.venue],
  ];

  // Alternate image side: even index → image left, odd → image right
  const imageRight = index % 2 !== 0;

  return (
    <div
      ref={ref}
      className="mx-auto my-[20px] w-full max-w-[1300px] overflow-hidden rounded-[24px] shadow-[0_15px_40px_rgba(0,0,0,.35)] transition-all duration-1000 md:my-[40px] md:rounded-[35px] flex flex-col md:flex-row"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(80px)",
        flexDirection: imageRight ? undefined : undefined,
      }}
    >
      {/* ── Image panel ── */}
      <div
        className={`relative w-full md:w-[42%] min-h-[320px] md:min-h-[520px] flex-shrink-0 overflow-hidden bg-[#3a0000] ${
          imageRight ? "md:order-2" : "md:order-1"
        }`}
      >
        {/* Ambient blurred backdrop to fill all empty space for any aspect ratio */}
        <SmartImage
          src={event.image}
          alt=""
          placeholderLabel=""
          seed={index}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover blur-2xl scale-125 opacity-70 pointer-events-none"
        />

        {/* Main sharp image (centered and fully visible) */}
        <SmartImage
          src={event.image}
          alt={event.title}
          placeholderLabel={event.title}
          seed={index}
          loading="lazy"
          className="relative h-full w-full object-contain pointer-events-none z-[1]"
        />

        {/* Soft fade toward the content panel */}
        <div
          className="absolute inset-0 pointer-events-none z-[2]"
          style={{
            background: imageRight
              ? "linear-gradient(to left, rgba(80,0,0,0.55) 0%, transparent 50%)"
              : "linear-gradient(to right, rgba(80,0,0,0.55) 0%, transparent 50%)",
          }}
        />
      </div>

      {/* ── Content panel ── */}
      <div
        className={`flex flex-1 flex-col items-center justify-center gap-[6px] p-[28px] py-[36px] text-center md:p-[48px] ${imageRight ? "md:order-1" : "md:order-2"
          }`}
        style={{
          background: "linear-gradient(135deg, #6b0000 0%, #8b0000 60%, #6b0000 100%)",
        }}
      >
        {/* Decorative gold divider top */}
        <div className="mb-[18px] flex items-center gap-3 w-full max-w-[340px]">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#d4af37]/60" />
          <span className="text-[#d4af37] text-[18px]">✦</span>
          <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#d4af37]/60" />
        </div>

        <h2 className="font-script text-[38px] sm:text-[48px] font-bold leading-tight text-[#f5e6a8] drop-shadow-[0_3px_12px_rgba(0,0,0,.5)] md:text-[64px]">
          {event.title}
        </h2>

        <p className="mt-[8px] max-w-[480px] text-[13px] sm:text-[15px] leading-relaxed text-white/80 md:text-[18px]" style={{ fontFamily: '"Poppins", sans-serif' }}>
          {event.description}
        </p>

        {/* Decorative gold divider mid */}
        <div className="my-[18px] flex items-center gap-3 w-full max-w-[340px]">
          <div className="flex-1 h-px bg-[#d4af37]/40" />
          <span className="text-[#d4af37]/60 text-[12px]">◆</span>
          <div className="flex-1 h-px bg-[#d4af37]/40" />
        </div>

        <div className="flex flex-col gap-[10px] w-full max-w-[420px]" style={{ fontFamily: '"Poppins", sans-serif' }}>
          {details.map(([label, value]) => {
            const isVenue = label === "VENUE";
            const isPayalPark =
              isVenue &&
              typeof value === "string" &&
              value.toLowerCase().includes("payal park");

            return (
              <Fragment key={label}>
                <span className="text-[11px] tracking-[4px] text-[#d4af37] uppercase font-semibold">
                  {label}
                </span>
                {isPayalPark ? (
                  <a
                    href="https://www.google.com/maps?q=23.054567028961834,72.63950636818795"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[15px] sm:text-[17px] font-semibold leading-snug text-white md:text-[22px] hover:text-[#f5e6a8] underline decoration-[#d4af37]/70 underline-offset-4 transition-colors"
                    title="Open location in Google Maps"
                  >
                    <svg
                      className="inline-block size-4 sm:size-5 text-white mr-1.5 align-[-2px] shrink-0"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                    </svg>
                    {value.trim()}
                  </a>
                ) : isVenue ? (
                  <strong className="text-[15px] sm:text-[17px] font-semibold leading-snug text-white md:text-[22px]">
                    <svg
                      className="inline-block size-4 sm:size-5 text-white mr-1.5 align-[-2px] shrink-0"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                    </svg>
                    {value.trim()}
                  </strong>
                ) : (
                  <strong className="text-[15px] sm:text-[17px] font-semibold leading-snug text-white md:text-[22px]">
                    {value}
                  </strong>
                )}
              </Fragment>
            );
          })}
        </div>

        {/* Decorative gold divider bottom */}
        <div className="mt-[18px] flex items-center gap-3 w-full max-w-[340px]">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#d4af37]/60" />
          <span className="text-[#d4af37] text-[18px]">✦</span>
          <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#d4af37]/60" />
        </div>
      </div>
    </div>
  );
}

