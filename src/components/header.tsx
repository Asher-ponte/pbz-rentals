"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, ShoppingBag } from "lucide-react";
import { Logo } from "@/components/logo";
import { useQuote } from "@/components/quote-provider";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { formatPeso } from "@/lib/format";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/", label: "Home" },
  { href: "/catalog", label: "Price List" },
  { href: "/quote", label: "Quote" },
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
          <Button asChild variant="outline" className="hidden h-10 rounded-full px-3 sm:inline-flex">
            <Link href="/quote">
              <ShoppingBag data-icon="inline-start" />
              {count > 0 ? formatPeso(total) : "Quote"}
            </Link>
          </Button>
          <Button asChild className="hidden h-10 rounded-full px-4 md:inline-flex">
            <Link href="/book">Book now</Link>
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="size-10 rounded-full md:hidden">
                <Menu />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[86vw] max-w-sm">
              <SheetHeader>
                <SheetTitle className="sr-only">Menu</SheetTitle>
                <Logo />
              </SheetHeader>
              <div className="flex flex-col gap-2 px-4">
                {nav.map((item) => (
                  <SheetClose asChild key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "rounded-2xl px-4 py-3 text-base font-semibold",
                        pathname === item.href
                          ? "bg-primary text-primary-foreground"
                          : "bg-accent text-foreground",
                      )}
                    >
                      {item.label}
                    </Link>
                  </SheetClose>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
