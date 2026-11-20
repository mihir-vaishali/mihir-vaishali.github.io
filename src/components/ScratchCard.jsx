import { useScratchCard } from "../hooks/useScratchCard";

/** The wedding date, sealed behind gold foil the guest scratches away. */
export function ScratchCard({ label, date, day }) {
  const { canvasRef, handlers } = useScratchCard({ label });

  return (
    <div className="relative mx-auto my-[30px] h-[180px] w-full max-w-[320px]">
      <div className="absolute inset-0 flex flex-col items-center justify-center rounded-[20px] bg-[#8b0000]">
        <h2 className="mb-[10px] text-[42px] leading-none font-bold text-[#d4af37] md:text-[52px]">
          {date}
        </h2>
        <p className="text-[22px] font-semibold tracking-[2px] text-[#f5e6a8] md:text-[28px]">
          {day}
        </p>
      </div>

      <canvas
        ref={canvasRef}
        {...handlers}
        aria-hidden="true"
        className="absolute inset-0 z-10 h-full w-full cursor-pointer touch-none rounded-[25px]"
      />
    </div>
  );
}
