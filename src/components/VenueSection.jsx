import { useSite } from "../hooks/useSite";

export function VenueSection() {
  const { venue } = useSite();

  return (
    <section
      className="min-h-screen flex items-center justify-center px-[30px] py-[80px]"
      style={{
        background: "linear-gradient(160deg, #6b0000 0%, #8b0000 50%, #6b0000 100%)",
      }}
    >
      <div className="w-full max-w-[1300px] overflow-hidden rounded-[24px] shadow-[0_15px_40px_rgba(0,0,0,.35)] md:rounded-[35px] flex flex-col md:flex-row">

        {/* ── Left: Title & Details ── */}
        <div
          className="flex flex-1 flex-col items-center justify-center gap-[8px] p-[32px] py-[48px] text-center md:p-[56px]"
          style={{
            background: "linear-gradient(135deg, #6b0000 0%, #8b0000 60%, #6b0000 100%)",
          }}
        >
          {/* Top gold divider */}
          <div className="mb-[16px] flex items-center gap-3 w-full max-w-[360px]">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#d4af37]/60" />
            <span className="text-[#d4af37] text-[18px]">✦</span>
            <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#d4af37]/60" />
          </div>

          <p className="text-[11px] tracking-[5px] uppercase text-[#d4af37] font-semibold">
            {venue.subtitle}
          </p>

          <h2 className="font-script text-[48px] sm:text-[60px] font-bold text-[#f5e6a8] drop-shadow-[0_3px_12px_rgba(0,0,0,.5)] leading-tight md:text-[72px]">
            {venue.title}
          </h2>

          {/* Mid gold divider */}
          <div className="my-[16px] flex items-center gap-3 w-full max-w-[360px]">
            <div className="flex-1 h-px bg-[#d4af37]/40" />
            <span className="text-[#d4af37]/60 text-[12px]">◆</span>
            <div className="flex-1 h-px bg-[#d4af37]/40" />
          </div>

          <h3 className="text-[20px] sm:text-[24px] font-bold text-white md:text-[30px]">
            <svg
              className="inline-block size-5 sm:size-6 text-white mr-2 align-[-3px] shrink-0"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
            </svg>
            {venue.name.trim()}
          </h3>

          <p className="mt-[10px] max-w-[380px] text-[14px] sm:text-[16px] leading-relaxed whitespace-pre-line text-white/80 md:text-[18px]">
            {venue.address}
          </p>

          {/* Bottom gold divider */}
          <div className="mt-[20px] flex items-center gap-3 w-full max-w-[360px]">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#d4af37]/60" />
            <span className="text-[#d4af37] text-[18px]">✦</span>
            <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#d4af37]/60" />
          </div>
        </div>

        {/* ── Right: Map ── */}
        <div className="w-full md:w-[55%] min-h-[320px] flex-shrink-0 overflow-hidden">
          <iframe
            title={`Map to ${venue.name}`}
            src={venue.mapSrc}
            loading="lazy"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
            className="h-full w-full min-h-[320px] border-0 md:min-h-[500px]"
          />
        </div>

      </div>
    </section>
  );
}

