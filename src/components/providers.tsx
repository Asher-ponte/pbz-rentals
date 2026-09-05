"use client";

import { QuoteProvider } from "@/components/quote-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return <QuoteProvider>{children}</QuoteProvider>;
}
