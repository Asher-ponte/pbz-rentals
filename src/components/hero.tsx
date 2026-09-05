import Link from "next/link";
import { CalendarClock, CheckCircle2, MapPin, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { business } from "@/lib/business";
import { formatPeso } from "@/lib/format";

const reasons = [
  {
    icon: CheckCircle2,
    title: "Free set-up included",
    detail: "We arrange the chairs, tables, and tents so the venue is ready when guests arrive.",
  },
  {
    icon: Truck,
    title: "Free delivery nearby",
    detail: `Within ${business.delivery.freeKm}\u00a0km of Santa Rosa. After that, only ${formatPeso(business.delivery.succeedingPerKm)} / km.`,
  },
  {
    icon: CalendarClock,
    title: "Dates go fast",
    detail: "First come, first served. Book now to hold your event before the inventory is taken.",
  },
] as const;

export function Hero() {
  return (
    <section className="bg-[#1c1416]">
      <div className="mx-auto flex w-full max-w-5xl flex-col px-4 pt-8 pb-9 sm:pt-12 sm:pb-14">
        <p className="text-center text-[11px] font-bold tracking-[0.22em] text-[#f3b8c0] uppercase sm:text-xs sm:tracking-[0.28em]">
          {business.slogan}
        </p>
        <h1 className="mx-auto mt-3 max-w-xl text-balance text-center font-heading text-[2rem] leading-[1.15] font-extrabold text-white sm:text-5xl">
          Book the Seats Today.
          <span className="mt-1 block text-[#ffd0d6]">We&apos;ll Set Them Up.</span>
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-pretty text-center text-base leading-7 text-[#fff1f3]">
          Birthdays, debuts, weddings, and fiestas fill up fast. Lock chairs, tables,
          and tents in 3 taps — then we deliver and set everything up for you.
        </p>
        <p className="mx-auto mt-4 max-w-md text-pretty text-center text-sm font-semibold tracking-wide text-[#ffd0d6]">
          Choose a set → Check your cart → Book the date
        </p>

        <div className="mx-auto mt-6 flex w-full max-w-md flex-col gap-3 sm:flex-row">
          <Button
            asChild
            className="h-12 min-h-12 flex-1 rounded-full px-6 text-sm font-bold"
          >
            <Link href="/packages">Start With a Package</Link>
          </Button>
          <Button
            asChild
            variant="secondary"
            className="h-12 min-h-12 flex-1 rounded-full border border-white/25 bg-white px-6 text-sm font-bold text-[#1c1416] hover:bg-[#fff4f7]"
          >
            <Link href="/catalog">Shop by Item</Link>
          </Button>
        </div>

        <ul className="mx-auto mt-7 grid w-full max-w-xl gap-2.5">
          {reasons.map((reason) => {
            const Icon = reason.icon;
            return (
              <li
                key={reason.title}
                className="flex gap-3 rounded-2xl bg-[#3a282c] px-3.5 py-3 text-left"
              >
                <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full bg-[#5a3d43] text-[#ffd0d6]">
                  <Icon className="size-4" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-extrabold text-white">{reason.title}</p>
                  <p className="mt-0.5 text-pretty text-sm leading-6 text-[#fff1f3]">
                    {reason.detail}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>

        <div className="mx-auto mt-5 flex w-full max-w-md flex-col gap-2 sm:flex-row sm:justify-center">
          <span className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-full bg-[#5a3d43] px-3.5 py-2 text-sm font-semibold text-white">
            <MapPin className="size-4 text-[#ffd0d6]" aria-hidden="true" />
            {business.city}
          </span>
          <span className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-full bg-[#5a3d43] px-3.5 py-2 text-sm font-semibold text-white">
            <Truck className="size-4 text-[#ffd0d6]" aria-hidden="true" />
            Pickup &amp; Delivery
          </span>
        </div>
      </div>
    </section>
  );
}
