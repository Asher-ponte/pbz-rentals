"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarCheck, Home, LayoutGrid, ShoppingBag, Store } from "lucide-react";
import { useQuote } from "@/components/quote-provider";
import { cn } from "@/lib/utils";

const tabs = [
  { href: "/", label: "Home", icon: Home },
  { href: "/packages", label: "Packages", icon: LayoutGrid },
  { href: "/catalog", label: "Shop", icon: Store },
  { href: "/quote", label: "Cart", icon: ShoppingBag },
  { href: "/book", label: "Book", icon: CalendarCheck },
];

export function MobileDock() {
  const pathname = usePathname();
  const { count } = useQuote();

  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-pink-100 bg-white/95 px-1 pt-1 backdrop-blur md:hidden"
      style={{ paddingBottom: "max(0.4rem, env(safe-area-inset-bottom))" }}
    >
      <div className="mx-auto grid max-w-lg grid-cols-5">
        {tabs.map((tab) => {
          const active = pathname === tab.href;
          const Icon = tab.icon;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "relative flex min-h-12 cursor-pointer flex-col items-center justify-center gap-0.5 rounded-2xl py-1.5 text-[11px] font-bold focus-visible:ring-3 focus-visible:ring-ring/50",
                active ? "text-primary" : "text-foreground/70",
              )}
            >
              <span
                className={cn(
                  "relative flex size-8 items-center justify-center rounded-full",
                  active && "bg-primary/10",
                )}
              >
                <Icon className="size-5" aria-hidden="true" />
                {tab.href === "/quote" && count > 0 ? (
                  <span className="absolute -top-1 -right-1 min-w-4 rounded-full bg-primary px-1 text-[10px] leading-4 font-extrabold text-primary-foreground">
                    {count}
                  </span>
                ) : null}
              </span>
              {tab.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
