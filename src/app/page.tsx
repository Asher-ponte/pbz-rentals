import Link from "next/link";
import { FeedbackCarousel } from "@/components/feedback-carousel";
import { FunnelSteps } from "@/components/funnel-steps";
import { Hero } from "@/components/hero";
import { PackageGrid } from "@/components/package-grid";
import { ServiceInfo } from "@/components/service-info";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <main>
      <Hero />

      <section className="mx-auto w-full max-w-5xl scroll-mt-20 px-4 pt-10 sm:pt-12">
        <FunnelSteps current={1} />
        <div className="mb-5">
          <p className="text-xs font-bold tracking-[0.2em] text-primary uppercase">
            Step 1 · Choose a Set
          </p>
          <h2 className="mt-1 text-balance font-heading text-[1.65rem] font-extrabold tracking-tight sm:text-3xl">
            Ready-Made Packages
          </h2>
          <p className="mt-2 max-w-xl text-pretty text-base leading-7 text-muted-foreground">
            Fastest way to book. Tap a set, review the cart, then send your date.
            You can still add or remove items after.
          </p>
        </div>
        <PackageGrid />
        <div className="mt-5 rounded-[1.4rem] border border-pink-100 bg-white p-5 text-center">
          <p className="text-base font-semibold text-foreground">Need a custom mix instead?</p>
          <Button
            asChild
            variant="outline"
            className="mt-3 h-12 min-h-12 rounded-full px-5 font-bold"
          >
            <Link href="/catalog">Shop Chairs, Tables, and Tents</Link>
          </Button>
        </div>
      </section>

      <FeedbackCarousel />

      <section className="mx-auto w-full max-w-5xl scroll-mt-20 px-4 py-10">
        <h2 className="mb-5 text-balance font-heading text-[1.65rem] font-extrabold tracking-tight sm:text-3xl">
          Delivery, Pickup &amp; Booking
        </h2>
        <ServiceInfo />
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <Button asChild className="h-12 min-h-12 rounded-full font-bold">
            <Link href="/packages">Choose a Package</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="h-12 min-h-12 rounded-full font-bold"
          >
            <Link href="/book">I Already Know What I Need</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
