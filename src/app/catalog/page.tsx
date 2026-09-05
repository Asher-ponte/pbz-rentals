import type { Metadata } from "next";
import Link from "next/link";
import { CatalogGrid } from "@/components/catalog-grid";
import { FunnelSteps } from "@/components/funnel-steps";
import { business } from "@/lib/business";

export const metadata: Metadata = {
  title: "Rental Catalog",
  description: `Browse published chair, table, and tent rates from ${business.shortName} in ${business.city}.`,
};

export default function CatalogPage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-8">
      <FunnelSteps current={1} />
      <p className="text-xs font-bold tracking-[0.2em] text-primary uppercase">
        Step 1 · Catalog
      </p>
      <h1 className="mt-2 text-balance font-heading text-4xl font-extrabold tracking-tight">
        Rental Catalog
      </h1>
      <p className="mt-3 max-w-xl text-pretty text-base leading-7 text-muted-foreground">
        Add quantities and extras, then open your cart. Prefer a ready-made set?
        Use a package instead.
      </p>
      <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
        {[
          ["#chairs", "Chairs"],
          ["#tables", "Tables"],
          ["#tents", "Tents"],
          ["/packages", "Packages"],
        ].map(([href, label]) => (
          <Link
            key={href}
            href={href}
            className="inline-flex min-h-11 shrink-0 cursor-pointer items-center rounded-full bg-white px-4 py-2 text-sm font-bold text-foreground ring-1 ring-rose-200"
          >
            {label}
          </Link>
        ))}
      </div>
      <div className="mt-6">
        <CatalogGrid />
      </div>
    </main>
  );
}
