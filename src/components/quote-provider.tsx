"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
} from "react";
import type { PackageDeal } from "@/lib/catalog";
import {
  applyPackage,
  emptyQuote,
  itemCount,
  quoteTotal,
  setLineQty,
  updateAddonQty,
  upsertLine,
  type QuoteState,
} from "@/lib/quote";

const STORAGE_KEY = "pbz-quote";

type QuoteContextValue = {
  quote: QuoteState;
  ready: boolean;
  count: number;
  total: number;
  addItem: (itemId: string, qty?: number, addonIds?: string[]) => void;
  setQty: (itemId: string, qty: number) => void;
  setAddon: (itemId: string, addonId: string, qty: number) => void;
  addPackage: (deal: PackageDeal) => void;
  setDeliveryKm: (km: number | null) => void;
  clear: () => void;
};

const QuoteContext = createContext<QuoteContextValue | null>(null);

const listeners = new Set<() => void>();
let cachedQuote: QuoteState = emptyQuote;
let hasRead = false;

function emit() {
  for (const listener of listeners) listener();
}

function parseQuote(raw: string | null): QuoteState {
  if (!raw) return emptyQuote;
  try {
    const parsed = JSON.parse(raw) as QuoteState;
    if (!parsed || !Array.isArray(parsed.lines)) return emptyQuote;
    return {
      lines: parsed.lines,
      deliveryKm: parsed.deliveryKm ?? null,
    };
  } catch {
    return emptyQuote;
  }
}

function readQuote(): QuoteState {
  if (!hasRead) {
    cachedQuote = parseQuote(window.localStorage.getItem(STORAGE_KEY));
    hasRead = true;
  }
  return cachedQuote;
}

function writeQuote(next: QuoteState) {
  cachedQuote = next;
  hasRead = true;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  emit();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function updateQuote(updater: (current: QuoteState) => QuoteState) {
  writeQuote(updater(readQuote()));
}

export function QuoteProvider({ children }: { children: React.ReactNode }) {
  const quote = useSyncExternalStore(subscribe, readQuote, () => emptyQuote);
  const ready = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );

  const addItem = useCallback((itemId: string, qty = 1, addonIds: string[] = []) => {
    updateQuote((current) => {
      const existing = current.lines.find((line) => line.itemId === itemId);
      const nextQty = (existing?.qty ?? 0) + qty;
      const nextAddons = addonIds.length
        ? addonIds
        : (existing?.addons.map((addon) => addon.id) ?? []);
      return upsertLine(current, itemId, nextQty, nextAddons);
    });
  }, []);

  const setQty = useCallback((itemId: string, qty: number) => {
    updateQuote((current) => setLineQty(current, itemId, qty));
  }, []);

  const setAddon = useCallback((itemId: string, addonId: string, qty: number) => {
    updateQuote((current) => updateAddonQty(current, itemId, addonId, qty));
  }, []);

  const addPackage = useCallback((deal: PackageDeal) => {
    updateQuote((current) => applyPackage(current, deal));
  }, []);

  const setDeliveryKm = useCallback((km: number | null) => {
    updateQuote((current) => ({ ...current, deliveryKm: km }));
  }, []);

  const clear = useCallback(() => writeQuote(emptyQuote), []);

  const value = useMemo(
    () => ({
      quote,
      ready,
      count: itemCount(quote),
      total: quoteTotal(quote),
      addItem,
      setQty,
      setAddon,
      addPackage,
      setDeliveryKm,
      clear,
    }),
    [quote, ready, addItem, setQty, setAddon, addPackage, setDeliveryKm, clear],
  );

  return <QuoteContext.Provider value={value}>{children}</QuoteContext.Provider>;
}

export function useQuote() {
  const value = useContext(QuoteContext);
  if (!value) {
    throw new Error("useQuote must be used inside QuoteProvider");
  }
  return value;
}
