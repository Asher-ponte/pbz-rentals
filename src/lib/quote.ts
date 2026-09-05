import { business } from "@/lib/business";
import { getItem, type PackageDeal } from "@/lib/catalog";
import { formatPeso } from "@/lib/format";

export type QuoteAddon = {
  id: string;
  name: string;
  unitPrice: number;
  qty: number;
};

export type QuoteLine = {
  id: string;
  itemId: string;
  name: string;
  unitPrice: number;
  qty: number;
  addons: QuoteAddon[];
};

export type QuoteState = {
  lines: QuoteLine[];
  deliveryKm: number | null;
};

export const emptyQuote: QuoteState = {
  lines: [],
  deliveryKm: null,
};

export function lineSubtotal(line: QuoteLine): number {
  const addons = line.addons.reduce((sum, addon) => sum + addon.unitPrice * addon.qty, 0);
  return line.unitPrice * line.qty + addons;
}

export function quoteSubtotal(quote: QuoteState): number {
  return quote.lines.reduce((sum, line) => sum + lineSubtotal(line), 0);
}

export function deliveryFee(km: number | null): number {
  if (km === null || km <= 0) return 0;
  if (km <= business.delivery.freeKm) return 0;
  return Math.ceil(km - business.delivery.freeKm) * business.delivery.succeedingPerKm;
}

export function quoteTotal(quote: QuoteState): number {
  return quoteSubtotal(quote) + deliveryFee(quote.deliveryKm);
}

export function itemCount(quote: QuoteState): number {
  return quote.lines.reduce((sum, line) => sum + line.qty, 0);
}

export function upsertLine(
  quote: QuoteState,
  itemId: string,
  qty: number,
  selectedAddonIds: string[] = [],
): QuoteState {
  const item = getItem(itemId);
  if (!item) return quote;

  const addons: QuoteAddon[] = selectedAddonIds
    .map((addonId) => item.addons.find((addon) => addon.id === addonId))
    .filter((addon): addon is NonNullable<typeof addon> => Boolean(addon))
    .map((addon) => ({
      id: addon.id,
      name: addon.name,
      unitPrice: addon.price,
      qty,
    }));

  const existing = quote.lines.find((line) => line.itemId === itemId);
  if (qty <= 0) {
    return {
      ...quote,
      lines: quote.lines.filter((line) => line.itemId !== itemId),
    };
  }

  const nextLine: QuoteLine = {
    id: existing?.id ?? `${itemId}-${Date.now()}`,
    itemId,
    name: item.name,
    unitPrice: item.price,
    qty,
    addons,
  };

  if (existing) {
    return {
      ...quote,
      lines: quote.lines.map((line) => (line.itemId === itemId ? nextLine : line)),
    };
  }

  return { ...quote, lines: [...quote.lines, nextLine] };
}

export function applyPackage(quote: QuoteState, deal: PackageDeal): QuoteState {
  return deal.items.reduce(
    (next, line) => upsertLine(next, line.itemId, line.qty, line.addonIds ?? []),
    quote,
  );
}

export function updateAddonQty(
  quote: QuoteState,
  itemId: string,
  addonId: string,
  qty: number,
): QuoteState {
  return {
    ...quote,
    lines: quote.lines.map((line) => {
      if (line.itemId !== itemId) return line;
      const item = getItem(itemId);
      const catalogAddon = item?.addons.find((addon) => addon.id === addonId);
      if (!catalogAddon) return line;

      const existing = line.addons.find((addon) => addon.id === addonId);
      if (qty <= 0) {
        return { ...line, addons: line.addons.filter((addon) => addon.id !== addonId) };
      }
      if (existing) {
        return {
          ...line,
          addons: line.addons.map((addon) =>
            addon.id === addonId ? { ...addon, qty } : addon,
          ),
        };
      }
      return {
        ...line,
        addons: [
          ...line.addons,
          {
            id: catalogAddon.id,
            name: catalogAddon.name,
            unitPrice: catalogAddon.price,
            qty,
          },
        ],
      };
    }),
  };
}

export function setLineQty(quote: QuoteState, itemId: string, qty: number): QuoteState {
  if (qty <= 0) {
    return { ...quote, lines: quote.lines.filter((line) => line.itemId !== itemId) };
  }
  return {
    ...quote,
    lines: quote.lines.map((line) => {
      if (line.itemId !== itemId) return line;
      return {
        ...line,
        qty,
        addons: line.addons.map((addon) => ({ ...addon, qty })),
      };
    }),
  };
}

export function formatQuoteMessage(
  quote: QuoteState,
  details?: {
    name?: string;
    phone?: string;
    eventType?: string;
    eventDate?: string;
    venue?: string;
    notes?: string;
  },
): string {
  const lines: string[] = [
    `Hi ${business.shortName}! I would like to book rentals.`,
    "",
  ];

  if (details?.name) lines.push(`Name: ${details.name}`);
  if (details?.phone) lines.push(`Phone: ${details.phone}`);
  if (details?.eventType) lines.push(`Event: ${details.eventType}`);
  if (details?.eventDate) lines.push(`Date: ${details.eventDate}`);
  if (details?.venue) lines.push(`Venue: ${details.venue}`);
  if (quote.deliveryKm !== null) {
    lines.push(`Distance from shop: ${quote.deliveryKm} km`);
  }

  if (quote.lines.length > 0) {
    lines.push("", "Items:");
    for (const line of quote.lines) {
      lines.push(
        `• ${line.qty}× ${line.name} — ${formatPeso(line.unitPrice * line.qty)}`,
      );
      for (const addon of line.addons) {
        lines.push(
          `   + ${addon.qty}× ${addon.name} — ${formatPeso(addon.unitPrice * addon.qty)}`,
        );
      }
    }
  }

  lines.push("");
  lines.push(`Items subtotal: ${formatPeso(quoteSubtotal(quote))}`);
  lines.push(`Delivery: ${formatPeso(deliveryFee(quote.deliveryKm))}`);
  lines.push(`Estimated total: ${formatPeso(quoteTotal(quote))}`);
  lines.push("");
  lines.push("This is an estimate only. Please confirm availability. Thank you!");

  if (details?.notes) {
    lines.push("", `Notes: ${details.notes}`);
  }

  return lines.join("\n");
}

export function whatsappUrl(message: string): string {
  return `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function smsUrl(message: string): string {
  return `sms:${business.phones[0].tel}?body=${encodeURIComponent(message)}`;
}
