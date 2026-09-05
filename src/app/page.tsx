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

      <section className="mx-auto w-full max-w-5xl px-4 pt-6">
        <FunnelSteps current={1} />
        <div className="mb-5">
          <p className="text-xs font-bold tracking-[0.2em] text-primary uppercase">
            Step 1 · Choose a set
          </p>
          <h2 className="font-heading text-3xl font-extrabold tracking-tight">
            Ready-made packages
          </h2>
          <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
            Fastest way to book. Tap a set, review the cart, then send your date.
            You can still add or remove items after.
          </p>
        </div>
        <PackageGrid />
        <div className="mt-5 rounded-[1.4rem] bg-accent p-4 text-center">
          <p className="text-sm font-semibold">Need a custom mix instead?</p>
          <Button asChild variant="outline" className="mt-3 h-11 rounded-full px-5 font-bold">
            <Link href="/catalog">Shop chairs, tables, and tents</Link>
          </Button>
        </div>
      </section>

      <FeedbackCarousel />

      <section className="mx-auto w-full max-w-5xl px-4 py-10">
        <h2 className="mb-5 font-heading text-3xl font-extrabold tracking-tight">
          Delivery, pickup &amp; booking
        </h2>
        <ServiceInfo />
        <div className="mt-6 grid gap-2 sm:grid-cols-2">
          <Button asChild className="h-12 rounded-full font-bold">
            <Link href="/packages">Choose a package</Link>
          </Button>
          <Button asChild variant="outline" className="h-12 rounded-full font-bold">
            <Link href="/book">I already know what I need</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
