import Link from "next/link";
import { Heart, MapPin, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { business } from "@/lib/business";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#fff7fb_0%,#ffffff_72%)]">
      <div className="pointer-events-none absolute -top-16 -right-10 size-48 rounded-full bg-pink-200/50 blur-3xl" />
      <div className="pointer-events-none absolute top-24 -left-16 size-40 rounded-full bg-rose-100 blur-3xl" />
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-4 py-10 md:flex-row md:items-center md:py-16">
        <div className="flex-1 space-y-5">
          <p className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold tracking-wide text-primary uppercase">
            <Heart className="size-3.5 fill-current" />
            BER months promo
          </p>
          <div>
            <h1 className="font-heading text-4xl leading-[1.05] font-extrabold tracking-tight text-foreground sm:text-5xl">
              Affordable rates
              <span className="block text-primary">+ package deals</span>
            </h1>
            <p className="mt-3 max-w-md text-base leading-7 text-muted-foreground">
              {business.slogan} Rent Uratex chairs, Lifetime tables, and blue pop-up
              tents for birthdays, weddings, and every celebration in Santa Rosa.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild className="h-12 rounded-full px-6 text-sm font-bold">
              <Link href="/quote">Build a quote</Link>
            </Button>
            <Button asChild variant="outline" className="h-12 rounded-full px-6 text-sm font-bold">
              <Link href="/catalog">View price list</Link>
            </Button>
          </div>
          <div className="flex flex-wrap gap-3 text-sm font-medium text-muted-foreground">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 shadow-sm">
              <MapPin className="size-3.5 text-primary" />
              {business.city}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 shadow-sm">
              <Truck className="size-3.5 text-primary" />
              Pickup &amp; delivery
            </span>
          </div>
        </div>

        <div className="relative flex-1">
          <div className="rounded-[2rem] border border-pink-100 bg-white p-5 shadow-[0_24px_60px_-28px_rgba(219,39,119,0.55)]">
            <p className="font-heading text-sm font-bold tracking-[0.2em] text-primary uppercase">
              Rental price list
            </p>
            <ul className="mt-4 space-y-3">
              {[
                ["Monoblock chair", "₱15 / pc"],
                ["4ft table", "₱140"],
                ["6ft table", "₱170"],
                ["Tents from", "₱300"],
              ].map(([label, price]) => (
                <li
                  key={label}
                  className="flex items-center justify-between rounded-2xl bg-accent px-4 py-3"
                >
                  <span className="font-medium">{label}</span>
                  <span className="rounded-full bg-[#e11d48] px-2.5 py-1 text-xs font-extrabold text-white">
                    {price}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-center text-sm font-semibold text-primary">
              {business.slogan}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
