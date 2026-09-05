"use client";

import Link from "next/link";
import { Trash2 } from "lucide-react";
import { QtyStepper } from "@/components/qty-stepper";
import { useQuote } from "@/components/quote-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { business } from "@/lib/business";
import { formatPeso } from "@/lib/format";
import { deliveryFee, lineSubtotal, quoteSubtotal } from "@/lib/quote";

export function QuoteBuilder() {
  const { quote, setQty, setAddon, setDeliveryKm, clear, total } = useQuote();
  const km = quote.deliveryKm ?? 0;

  if (quote.lines.length === 0) {
    return (
      <div className="rounded-[1.6rem] border border-dashed border-pink-200 bg-white p-8 text-center">
        <p className="font-heading text-xl font-extrabold">Your quote is empty</p>
        <p className="mt-2 text-sm text-muted-foreground">
          Add chairs, tables, or tents from the price list to see an estimate.
        </p>
        <Button asChild className="mt-5 h-11 rounded-full px-6 font-bold">
          <Link href="/catalog">Browse rentals</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {quote.lines.map((line) => (
        <article
          key={line.id}
          className="rounded-[1.5rem] border border-pink-100 bg-white p-4"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="font-heading font-extrabold">{line.name}</h3>
              <p className="text-sm text-muted-foreground">
                {formatPeso(line.unitPrice)} each
              </p>
            </div>
            <p className="font-extrabold">{formatPeso(lineSubtotal(line))}</p>
          </div>
          <div className="mt-3 flex items-center justify-between">
            <QtyStepper value={line.qty} onChange={(qty) => setQty(line.itemId, qty)} />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="rounded-full text-muted-foreground"
              onClick={() => setQty(line.itemId, 0)}
              aria-label={`Remove ${line.name}`}
            >
              <Trash2 />
            </Button>
          </div>
          {line.addons.length > 0 ? (
            <ul className="mt-3 space-y-2 border-t border-pink-50 pt-3">
              {line.addons.map((addon) => (
                <li key={addon.id} className="flex items-center justify-between gap-3 text-sm">
                  <span className="text-muted-foreground">
                    {addon.name} · {formatPeso(addon.unitPrice)}
                  </span>
                  <QtyStepper
                    value={addon.qty}
                    onChange={(qty) => setAddon(line.itemId, addon.id, qty)}
                  />
                </li>
              ))}
            </ul>
          ) : null}
        </article>
      ))}

      <div className="rounded-[1.5rem] border border-pink-100 bg-white p-4">
        <Label htmlFor="delivery-km" className="text-sm font-bold">
          Delivery distance (km)
        </Label>
        <p className="mt-1 text-xs text-muted-foreground">
          First {business.delivery.freeKm} km are free. After that,{" "}
          {formatPeso(business.delivery.succeedingPerKm)} / km. Leave 0 for pick-up.
        </p>
        <Input
          id="delivery-km"
          type="number"
          min={0}
          step={0.5}
          inputMode="decimal"
          className="mt-3 h-11 rounded-2xl text-base"
          value={quote.deliveryKm ?? ""}
          placeholder="0"
          onChange={(event) => {
            const next = event.target.value;
            setDeliveryKm(next === "" ? null : Math.max(0, Number(next)));
          }}
        />
      </div>

      <div className="rounded-[1.5rem] bg-foreground p-5 text-background">
        <div className="flex justify-between text-sm opacity-80">
          <span>Items</span>
          <span>{formatPeso(quoteSubtotal(quote))}</span>
        </div>
        <div className="mt-2 flex justify-between text-sm opacity-80">
          <span>Delivery {km > 0 ? `(${km} km)` : ""}</span>
          <span>{formatPeso(deliveryFee(quote.deliveryKm))}</span>
        </div>
        <div className="mt-4 flex items-end justify-between">
          <span className="text-sm font-medium">Estimated total</span>
          <span className="font-heading text-3xl font-extrabold">{formatPeso(total)}</span>
        </div>
        <p className="mt-2 text-xs opacity-70">
          Estimate only. Final amount is confirmed when you book.
        </p>
        <div className="mt-5 grid grid-cols-2 gap-2">
          <Button
            type="button"
            variant="secondary"
            className="h-11 rounded-full font-bold"
            onClick={clear}
          >
            Clear
          </Button>
          <Button asChild className="h-11 rounded-full font-bold">
            <Link href="/book">Book this quote</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
