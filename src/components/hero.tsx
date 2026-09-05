import Image from "next/image";
import Link from "next/link";
import { MapPin, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { business } from "@/lib/business";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#1c1416_0%,#2a1c20_58%,#fff7fb_58%)]">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center px-4 pt-8 pb-4 text-center">
        <Image
          src="/logo.jpg"
          alt="PBZ Rentals"
          width={148}
          height={148}
          priority
          className="rounded-full shadow-[0_20px_50px_-18px_rgba(0,0,0,0.7)]"
        />
        <p className="mt-5 text-xs font-bold tracking-[0.28em] text-[#e8b4b8] uppercase">
          {business.slogan}
        </p>
        <h1 className="mt-2 max-w-lg font-heading text-3xl leading-tight font-extrabold text-white sm:text-5xl">
          Book chairs, tables, and tents in 3 steps
        </h1>
        <p className="mt-3 max-w-md text-sm leading-6 text-white/70">
          Pick a ready-made set, check your cart, then reserve the date. Free set-up
          and free delivery within 3 km of Santa Rosa.
        </p>
        <div className="mt-5 flex w-full max-w-md flex-col gap-2 sm:flex-row">
          <Button asChild className="h-12 flex-1 rounded-full px-6 text-sm font-bold">
            <Link href="/packages">Start with a package</Link>
          </Button>
          <Button
            asChild
            variant="secondary"
            className="h-12 flex-1 rounded-full bg-white/10 px-6 text-sm font-bold text-white hover:bg-white/20"
          >
            <Link href="/catalog">Shop by item</Link>
          </Button>
        </div>
        <div className="mt-5 flex flex-wrap justify-center gap-2 text-xs font-medium text-white/80">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5">
            <MapPin className="size-3.5 text-[#e8b4b8]" />
            {business.city}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5">
            <Truck className="size-3.5 text-[#e8b4b8]" />
            Pickup &amp; delivery
          </span>
        </div>
      </div>
    </section>
  );
}
