import Link from "next/link";
import { CatalogGrid } from "@/components/catalog-grid";
import { FlyerGallery } from "@/components/flyer-gallery";
import { Hero } from "@/components/hero";
import { PackageGrid } from "@/components/package-grid";
import { ServiceInfo } from "@/components/service-info";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <main>
      <Hero />

      <section className="mx-auto w-full max-w-5xl px-4 py-10">
        <div className="mb-5">
          <p className="text-xs font-bold tracking-[0.2em] text-primary uppercase">
            Suggested sets
          </p>
          <h2 className="font-heading text-3xl font-extrabold tracking-tight">
            BER months package deals
          </h2>
          <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
            Pre-built from our published price list so you can estimate faster. Ask us
            about seasonal package pricing when you book.
          </p>
        </div>
        <PackageGrid />
      </section>

      <section className="bg-[linear-gradient(180deg,#fff7fb_0%,#ffffff_100%)]">
        <div className="mx-auto w-full max-w-5xl px-4 py-10">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold tracking-[0.2em] text-primary uppercase">
                Rental price list
              </p>
              <h2 className="font-heading text-3xl font-extrabold tracking-tight">
                Chairs, tables, tents
              </h2>
            </div>
            <Button asChild variant="outline" className="hidden rounded-full sm:inline-flex">
              <Link href="/catalog">See all</Link>
            </Button>
          </div>
          <CatalogGrid />
        </div>
      </section>

      <FlyerGallery />

      <section className="mx-auto w-full max-w-5xl px-4 py-10">
        <h2 className="mb-5 font-heading text-3xl font-extrabold tracking-tight">
          Delivery, pickup &amp; booking
        </h2>
        <ServiceInfo />
        <div className="mt-6">
          <Button asChild className="h-12 w-full rounded-full font-bold sm:w-auto sm:px-8">
            <Link href="/book">Reserve your date</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
