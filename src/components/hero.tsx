import Link from "next/link";
import Image from "next/image";
import { MapPin, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { business } from "@/lib/business";

export function Hero() {
  return (
    <section className="bg-[#1c1416]">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center px-4 pt-7 pb-8 text-center sm:pt-10 sm:pb-12">
        <Image
          src="/logo.jpg"
          alt="PBZ Rentals"
          width={128}
          height={128}
          priority
          className="hidden rounded-full shadow-[0_20px_50px_-18px_rgba(0,0,0,0.7)] sm:block"
        />

        <p className="text-[11px] font-bold tracking-[0.22em] text-[#f3b8c0] uppercase sm:mt-5 sm:text-xs sm:tracking-[0.28em]">
          {business.slogan}
        </p>
        <h1 className="mt-2 max-w-lg text-balance font-heading text-[1.75rem] leading-tight font-extrabold text-white sm:text-5xl">
          Book Chairs, Tables, and Tents in 3 Steps
        </h1>
        <p className="mt-3 max-w-md text-pretty text-base leading-7 text-[#fff1f3]">
          Pick a ready-made set, check your cart, then reserve the date. Free set-up
          and free delivery within 3&nbsp;km of Santa Rosa.
        </p>

        <div className="mt-6 flex w-full max-w-md flex-col gap-3 sm:flex-row">
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

        <div className="mt-5 flex w-full max-w-md flex-col gap-2 sm:flex-row sm:justify-center">
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
