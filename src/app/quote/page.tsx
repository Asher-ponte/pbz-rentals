import type { Metadata } from "next";
import { FunnelSteps } from "@/components/funnel-steps";
import { QuoteBuilder } from "@/components/quote-builder";

export const metadata: Metadata = {
  title: "Cart",
  description: "Review rental quantities, add-ons, and delivery distance before booking.",
};

export default function QuotePage() {
  return (
    <main className="mx-auto w-full max-w-xl px-4 py-8">
      <FunnelSteps current={2} />
      <p className="text-xs font-bold tracking-[0.2em] text-primary uppercase">
        Step 2 · Cart
      </p>
      <h1 className="mt-2 text-balance font-heading text-4xl font-extrabold tracking-tight">
        Review Your Cart
      </h1>
      <p className="mt-3 text-pretty text-base leading-7 text-muted-foreground">
        Change quantities, add extras, then continue to book. Delivery is free within
        3&nbsp;km.
      </p>
      <div className="mt-6">
        <QuoteBuilder />
      </div>
    </main>
  );
}
