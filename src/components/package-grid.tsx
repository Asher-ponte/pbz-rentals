"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useQuote } from "@/components/quote-provider";
import { Button } from "@/components/ui/button";
import { packageContents, packageEstimate, packages } from "@/lib/catalog";
import { formatPeso } from "@/lib/format";

export function PackageGrid() {
  const router = useRouter();
  const { addPackage } = useQuote();

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {packages.map((deal, index) => (
        <article
          key={deal.id}
          className="flex flex-col overflow-hidden rounded-[1.6rem] border border-pink-100 bg-white shadow-sm"
        >
          <div className="relative aspect-[16/10] bg-[#1c1416]">
            <Image
              src={deal.image}
              alt={`${deal.name} with PBZ Rentals chairs, tables, or tents`}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover"
            />
          </div>
          <div className="flex flex-1 flex-col p-5">
            <div className="flex items-center justify-between gap-2">
              <p className="text-xs font-bold tracking-wide text-primary uppercase">
                {deal.guests}
              </p>
              {index === 1 ? (
                <span className="rounded-full bg-primary px-2 py-0.5 text-[10px] font-extrabold text-primary-foreground">
                  Popular
                </span>
              ) : null}
            </div>
            <h3 className="mt-1 font-heading text-xl font-extrabold">{deal.name}</h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{deal.description}</p>
            <ul className="mt-4 flex-1 space-y-1.5 text-sm">
              {packageContents(deal).map((line) => (
                <li key={line.name} className="flex justify-between gap-3">
                  <span className="text-muted-foreground">
                    {line.qty}× {line.name}
                    {line.extras.length > 0 ? (
                      <span className="block text-xs">+ {line.extras.join(", ")}</span>
                    ) : null}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-2xl font-extrabold text-foreground">
              {formatPeso(packageEstimate(deal))}
            </p>
            <p className="text-xs text-muted-foreground">Published rates · edit in cart</p>
            <Button
              className="mt-4 h-12 min-h-12 rounded-full font-bold"
              onClick={() => {
                addPackage(deal);
                router.push("/quote");
              }}
            >
              Add Set to Cart
            </Button>
          </div>
        </article>
      ))}
    </div>
  );
}
