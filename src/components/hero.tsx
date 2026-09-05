import Link from "next/link";
import { Button } from "@/components/ui/button";
import { business } from "@/lib/business";

export function Hero() {
  return (
    <section className="bg-[#1c1416]">
      <div className="mx-auto flex w-full max-w-5xl flex-col px-4 pt-6 pb-6 sm:pt-10 sm:pb-10">
        <p className="text-center text-[11px] font-bold tracking-[0.22em] text-[#f3b8c0] uppercase sm:text-xs sm:tracking-[0.28em]">
          {business.slogan}
        </p>
        <h1 className="mx-auto mt-2 max-w-xl text-balance text-center font-heading text-[1.75rem] leading-[1.15] font-extrabold text-white sm:text-5xl">
          Book the Seats Today.
          <span className="mt-1 block text-[#ffd0d6]">We&apos;ll Set Them Up.</span>
        </h1>
        <p className="mx-auto mt-3 max-w-lg text-pretty text-center text-base leading-6 text-[#fff1f3]">
          Lock chairs, tables, and tents in 3 taps. Free set-up and free delivery
          within 3&nbsp;km of Santa Rosa.
        </p>
        <p className="mx-auto mt-2 max-w-md text-pretty text-center text-sm font-semibold tracking-wide text-[#ffd0d6]">
          Choose a set → Check your cart → Book the date
        </p>

        <div className="mx-auto mt-5 flex w-full max-w-md flex-col gap-2.5 sm:flex-row">
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
            <Link href="/catalog">View Rental Catalog</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
