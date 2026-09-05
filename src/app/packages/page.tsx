import type { Metadata } from "next";
import Link from "next/link";
import { FunnelSteps } from "@/components/funnel-steps";
import { PackageGrid } from "@/components/package-grid";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Packages",
  description: "Ready-made chair, table, and tent sets for 20, 50, or 100 guests.",
};

export default function PackagesPage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-8">
      <FunnelSteps current={1} />
      <p className="text-xs font-bold tracking-[0.2em] text-primary uppercase">
        Step 1 · Packages
      </p>
      <h1 className="mt-2 text-balance font-heading text-4xl font-extrabold tracking-tight">
        Pick a Set
      </h1>
      <p className="mt-3 max-w-xl text-pretty text-base leading-7 text-muted-foreground">
        Add a package to your cart in one tap. Quantities and add-ons can be edited
        before you book.
      </p>
      <div className="mt-6">
        <PackageGrid />
      </div>
      <div className="mt-6 text-center">
        <Button asChild variant="ghost" className="h-12 min-h-12 rounded-full font-bold">
          <Link href="/catalog">Or shop individual items</Link>
        </Button>
      </div>
    </main>
  );
}
