import Link from "next/link";
import { cn } from "@/lib/utils";

const steps = [
  { id: 1, label: "Choose", href: "/packages" },
  { id: 2, label: "Cart", href: "/quote" },
  { id: 3, label: "Book", href: "/book" },
] as const;

export function FunnelSteps({ current }: { current: 1 | 2 | 3 }) {
  return (
    <ol className="mb-6 grid grid-cols-3 gap-2">
      {steps.map((step, index) => {
        const done = current > step.id;
        const active = current === step.id;
        return (
          <li key={step.id}>
            <Link
              href={step.href}
              className={cn(
                "flex min-h-12 cursor-pointer items-center gap-2 rounded-2xl px-2.5 py-2 text-left focus-visible:ring-3 focus-visible:ring-ring/50",
                active && "bg-primary text-primary-foreground",
                done && "bg-primary/10 text-primary",
                !active && !done && "bg-white text-foreground ring-1 ring-rose-200",
              )}
            >
              <span
                className={cn(
                  "flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-extrabold",
                  active && "bg-white/20 text-white",
                  done && "bg-primary text-primary-foreground",
                  !active && !done && "bg-rose-100 text-foreground",
                )}
              >
                {step.id}
              </span>
              <span className="min-w-0">
                <span className="block text-[11px] font-semibold uppercase">
                  Step {index + 1}
                </span>
                <span className="block truncate text-sm font-extrabold">{step.label}</span>
              </span>
            </Link>
          </li>
        );
      })}
    </ol>
  );
}
