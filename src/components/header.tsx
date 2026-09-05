"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag } from "lucide-react";
import { Logo } from "@/components/logo";
import { useQuote } from "@/components/quote-provider";
import { Button } from "@/components/ui/button";
import { formatPeso } from "@/lib/format";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/", label: "Home" },
  { href: "/packages", label: "Packages" },
  { href: "/catalog", label: "Shop" },
  { href: "/quote", label: "Cart" },
  { href: "/book", label: "Book" },
];

export function Header() {
  const pathname = usePathname();
  const { count, total } = useQuote();

  return (
    <header className="sticky top-0 z-40 border-b border-pink-100/80 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-4">
        <Link href="/" aria-label="PBZ Rentals home">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-full px-3 py-1.5 text-sm font-medium transition-colors",
                pathname === item.href
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild variant="outline" className="h-10 rounded-full px-3">
            <Link href="/quote" aria-label="Open cart">
              <ShoppingBag data-icon="inline-start" />
              <span className="hidden sm:inline">{count > 0 ? formatPeso(total) : "Cart"}</span>
              {count > 0 ? (
                <span className="ml-1 inline-flex min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-[11px] font-extrabold text-primary-foreground sm:hidden">
                  {count}
                </span>
              ) : null}
            </Link>
          </Button>
          <Button asChild className="hidden h-10 rounded-full px-4 md:inline-flex">
            <Link href="/book">Book now</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
