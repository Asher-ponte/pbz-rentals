import type { Metadata } from "next";
import { CatalogGrid } from "@/components/catalog-grid";
import { business } from "@/lib/business";

export const metadata: Metadata = {
  title: "Rental price list",
  description: `Published chair, table, and tent rates from ${business.shortName} in ${business.city}.`,
};

export default function CatalogPage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-8">
      <p className="text-xs font-bold tracking-[0.2em] text-primary uppercase">
        Rental price list
      </p>
      <h1 className="mt-2 font-heading text-4xl font-extrabold tracking-tight">
        Everything we rent
      </h1>
      <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">
        Tap add-ons, set quantities, and send the estimate in one message. Free set-up
        is included with every booking.
      </p>
      <div className="mt-8">
        <CatalogGrid />
      </div>
    </main>
  );
}
