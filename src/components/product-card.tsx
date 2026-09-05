"use client";

import Image from "next/image";
import { useState } from "react";
import { Check } from "lucide-react";
import { QtyStepper } from "@/components/qty-stepper";
import { useQuote } from "@/components/quote-provider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { type CatalogItem } from "@/lib/catalog";
import { formatPeso } from "@/lib/format";
import { cn } from "@/lib/utils";

export function ProductCard({ item }: { item: CatalogItem }) {
  const { quote, addItem, setQty, setAddon } = useQuote();
  const line = quote.lines.find((entry) => entry.itemId === item.id);
  const [pendingAddons, setPendingAddons] = useState<string[]>([]);
  const selectedAddons = line
    ? line.addons.map((addon) => addon.id)
    : pendingAddons;

  function toggleAddon(addonId: string) {
    if (line) {
      const existing = line.addons.find((addon) => addon.id === addonId);
      setAddon(item.id, addonId, existing ? 0 : line.qty);
      return;
    }
    setPendingAddons((current) =>
      current.includes(addonId)
        ? current.filter((id) => id !== addonId)
        : [...current, addonId],
    );
  }

  return (
    <article className="overflow-hidden rounded-[1.6rem] border border-pink-100 bg-white shadow-[0_10px_30px_-20px_rgba(219,39,119,0.45)]">
      <div className="relative aspect-[4/3] bg-[#1c1416]">
        <Image
          src={item.image}
          alt={`${item.name} from PBZ Rentals`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />
      </div>
      <div className="space-y-4 p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              {item.brand ? (
                <Badge variant="secondary" className="rounded-full">
                  {item.brand}
                </Badge>
              ) : null}
              {item.capacity ? (
                <Badge variant="outline" className="rounded-full">
                  {item.capacity}
                </Badge>
              ) : null}
            </div>
            <h3 className="mt-2 font-heading text-lg font-extrabold tracking-tight">
              {item.name}
            </h3>
            {item.size ? (
              <p className="text-xs font-medium text-muted-foreground">{item.size}</p>
            ) : null}
          </div>
          <p className="shrink-0 rounded-full bg-[#e11d48] px-3 py-1 text-sm font-extrabold text-white">
            {formatPeso(item.price)}
            <span className="ml-1 text-[10px] font-semibold opacity-90">/{item.unit}</span>
          </p>
        </div>

        <p className="text-sm leading-6 text-muted-foreground">{item.description}</p>

        {item.addons.length > 0 ? (
          <div className="space-y-2">
            <p className="text-xs font-bold tracking-wide text-primary uppercase">Add-ons</p>
            <div className="flex flex-col gap-2">
              {item.addons.map((addon) => {
                const active = selectedAddons.includes(addon.id);
                return (
                  <button
                    key={addon.id}
                    type="button"
                    onClick={() => toggleAddon(addon.id)}
                    className={cn(
                      "flex items-center justify-between rounded-2xl border px-3 py-2 text-left text-sm",
                      active
                        ? "border-primary bg-primary/10 text-foreground"
                        : "border-pink-100 bg-accent/60 text-muted-foreground",
                    )}
                  >
                    <span className="flex items-center gap-2 font-medium">
                      <span
                        className={cn(
                          "flex size-5 items-center justify-center rounded-full border",
                          active
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-pink-200",
                        )}
                      >
                        {active ? <Check className="size-3" /> : null}
                      </span>
                      {addon.name}
                    </span>
                    <span className="font-bold text-[#e11d48]">{formatPeso(addon.price)}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ) : null}

        <div className="flex items-center justify-between gap-3">
          {line ? (
            <QtyStepper value={line.qty} onChange={(qty) => setQty(item.id, qty)} />
          ) : (
            <Button
              className="h-11 flex-1 rounded-full text-sm font-bold"
              onClick={() => addItem(item.id, 1, pendingAddons)}
            >
              Add to cart
            </Button>
          )}
          {line ? (
            <p className="text-sm font-bold text-foreground">
              In cart · {line.qty} {item.unit}
            </p>
          ) : null}
        </div>
      </div>
    </article>
  );
}
