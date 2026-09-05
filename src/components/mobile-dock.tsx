"use client";

import Link from "next/link";
import { Phone, ShoppingBag } from "lucide-react";
import { FacebookIcon } from "@/components/facebook-icon";
import { useQuote } from "@/components/quote-provider";
import { business } from "@/lib/business";
import { formatPeso } from "@/lib/format";

export function MobileDock() {
  const { count, total } = useQuote();

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-pink-100 bg-white/95 px-3 py-2 backdrop-blur md:hidden">
      <div className="mx-auto grid max-w-lg grid-cols-3 gap-2">
        <a
          href={`tel:${business.phones[0].tel}`}
          className="flex flex-col items-center justify-center rounded-2xl bg-accent px-2 py-2 text-[11px] font-semibold text-foreground"
        >
          <Phone className="mb-0.5 size-4 text-primary" />
          Call
        </a>
        <a
          href={business.messengerUrl}
          target="_blank"
          rel="noreferrer"
          className="flex flex-col items-center justify-center rounded-2xl bg-accent px-2 py-2 text-[11px] font-semibold text-foreground"
        >
          <FacebookIcon className="mb-0.5 size-4 text-primary" />
          Message
        </a>
        <Link
          href={count > 0 ? "/quote" : "/book"}
          className="flex flex-col items-center justify-center rounded-2xl bg-primary px-2 py-2 text-[11px] font-semibold text-primary-foreground"
        >
          <ShoppingBag className="mb-0.5 size-4" />
          {count > 0 ? formatPeso(total) : "Book"}
        </Link>
      </div>
    </div>
  );
}
