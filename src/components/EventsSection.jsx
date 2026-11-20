import { EventCard } from "./EventCard";
import { useSite } from "../hooks/useSite";

export function EventsSection() {
  const { events } = useSite();
  const enabled = events.filter((event) => event.enabled);

  if (enabled.length === 0) return null;

  return (
    <section className="bg-[#6b0000] px-[30px] py-[100px]" aria-label="Ceremonies">
      {enabled.map((event, index) => (
        <EventCard key={event.id} event={event} index={index} />
      ))}
    </section>
  );
}
