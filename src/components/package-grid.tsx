"use client";

import { useRouter } from "next/navigation";
import { useQuote } from "@/components/quote-provider";
import { Button } from "@/components/ui/button";
import { packages, packageEstimate } from "@/lib/catalog";
import { formatPeso } from "@/lib/format";

export function PackageGrid() {
  const router = useRouter();
  const { addPackage } = useQuote();

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {packages.map((deal) => (
        <article
          key={deal.id}
          className="flex flex-col rounded-[1.6rem] border border-pink-100 bg-white p-5 shadow-sm"
        >
          <p className="text-xs font-bold tracking-wide text-primary uppercase">
            {deal.guests}
          </p>
          <h3 className="mt-1 font-heading text-xl font-extrabold">{deal.name}</h3>
          <p className="mt-2 flex-1 text-sm leading-6 text-muted-foreground">
            {deal.description}
          </p>
          <p className="mt-4 text-2xl font-extrabold text-foreground">
            {formatPeso(packageEstimate(deal))}
          </p>
          <p className="text-xs text-muted-foreground">Published rates, no hidden extras</p>
          <Button
            className="mt-4 h-11 rounded-full font-bold"
            onClick={() => {
              addPackage(deal);
              router.push("/quote");
            }}
          >
            Use this set
          </Button>
        </article>
      ))}
    </div>
  );
}
