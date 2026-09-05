import type { Metadata } from "next";
import { QuoteBuilder } from "@/components/quote-builder";

export const metadata: Metadata = {
  title: "Your quote",
  description: "Review rental quantities, add-ons, and delivery distance before booking.",
};

export default function QuotePage() {
  return (
    <main className="mx-auto w-full max-w-xl px-4 py-8">
      <p className="text-xs font-bold tracking-[0.2em] text-primary uppercase">
        Instant estimate
      </p>
      <h1 className="mt-2 font-heading text-4xl font-extrabold tracking-tight">
        Your quote
      </h1>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">
        Totals update as you add chairs, tables, tents, and styling extras. Delivery
        is free within 3 km.
      </p>
      <div className="mt-6">
        <QuoteBuilder />
      </div>
    </main>
  );
}
