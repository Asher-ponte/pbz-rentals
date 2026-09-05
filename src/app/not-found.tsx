import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="mx-auto flex w-full max-w-lg flex-col items-center px-4 py-20 text-center">
      <p className="text-xs font-bold tracking-[0.2em] text-primary uppercase">404</p>
      <h1 className="mt-2 font-heading text-3xl font-extrabold">Page not found</h1>
      <p className="mt-3 text-sm text-muted-foreground">
        That link does not exist. Head back to the rental price list or start a quote.
      </p>
      <Button asChild className="mt-6 h-11 rounded-full px-6 font-bold">
        <Link href="/">Back home</Link>
      </Button>
    </main>
  );
}
