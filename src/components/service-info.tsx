import { CalendarDays, MapPin, Truck } from "lucide-react";
import { business } from "@/lib/business";
import { formatPeso } from "@/lib/format";

const cards = [
  {
    icon: Truck,
    title: "Delivery & set-up",
    body: `Free delivery within ${business.delivery.freeKm}\u00a0km. Succeeding distance ${formatPeso(business.delivery.succeedingPerKm)} / km. Free set-up included.`,
  },
  {
    icon: MapPin,
    title: "Pick-up location",
    body: business.address,
  },
  {
    icon: CalendarDays,
    title: "Book early",
    body: "To reserve your date, availability is first come, first served. Message us to lock in your event.",
  },
];

export function ServiceInfo() {
  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(business.mapQuery)}&z=16&output=embed`;

  return (
    <section className="space-y-5">
      <div className="grid gap-3">
        {cards.map((card) => (
          <article
            key={card.title}
            className="flex gap-3 rounded-[1.4rem] border border-pink-100 bg-white p-4"
          >
            <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <card.icon className="size-5" aria-hidden="true" />
            </div>
            <div>
              <h3 className="font-heading font-bold">{card.title}</h3>
              <p className="mt-1 text-pretty text-base leading-7 text-muted-foreground">{card.body}</p>
            </div>
          </article>
        ))}
      </div>
      <div className="overflow-hidden rounded-[1.6rem] border border-pink-100">
        <iframe
          title="PBZ Rentals pick-up map"
          src={mapSrc}
          className="h-56 w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </section>
  );
}
