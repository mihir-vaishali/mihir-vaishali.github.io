import { useCountdown } from "../hooks/useCountdown";
import { useSite } from "../hooks/useSite";
import { formatLongDate, parseDate } from "../lib/date";

const BACKDROP =
  "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1600";

const pad = (value) => String(value).padStart(2, "0");

export function CountdownSection() {
  const { countdown, weddingDate, ceremonyHour } = useSite();

  const target = parseDate(weddingDate, ceremonyHour);
  const remaining = useCountdown(target);

  // `target` must be checked too: an unparseable date also reports `isPast`,
  // and showing "Happily Married" because of a typo would be worse than zeros.
  const celebrating = Boolean(target) && remaining.isPast;

  return (
    <section
      className="flex min-h-screen flex-col items-center justify-center px-5 py-[50px] text-center"
      style={{
        background: "linear-gradient(160deg, #6b0000 0%, #8b0000 50%, #6b0000 100%)",
      }}
    >
      <h2 className="mb-[15px] font-script text-[50px] font-bold text-[#d4af37] drop-shadow-[0_2px_10px_rgba(0,0,0,.4)] md:text-[80px]">
        {celebrating ? countdown.completedTitle : countdown.title}
      </h2>

      <p className="mb-[40px] text-[20px] text-white/75">
        {celebrating ? countdown.completedMessage : countdown.subtitle}
      </p>

      {celebrating ? (
        <p className="rounded-[25px] bg-white px-[35px] py-[22px] text-[22px] font-semibold tracking-[1px] text-[#8b0000] shadow-[0_10px_25px_rgba(0,0,0,.3)] md:text-[28px]">
          {formatLongDate(target)}
        </p>
      ) : (
        <div
          className="flex flex-wrap justify-center gap-[10px] md:gap-[25px]"
          role="timer"
          aria-label={`${remaining.days} days until the wedding`}
        >
          {countdown.units.map((unit) => (
            <div
              key={unit.id}
              className="flex size-[75px] flex-col items-center justify-center rounded-[25px] bg-white shadow-[0_10px_25px_rgba(0,0,0,.25)] md:size-[140px]"
            >
              <span className="text-[22px] font-bold text-[#a50000] tabular-nums md:text-[48px]">
                {pad(remaining[unit.id])}
              </span>
              <small className="mt-[5px] text-[12px] font-semibold tracking-[1px] uppercase text-[#8b0000]/70 md:text-[14px]">
                {unit.label}
              </small>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
