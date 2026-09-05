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
                "flex items-center gap-2 rounded-2xl px-2.5 py-2 text-left",
                active && "bg-primary text-primary-foreground",
                done && "bg-primary/10 text-primary",
                !active && !done && "bg-accent text-muted-foreground",
              )}
            >
              <span
                className={cn(
                  "flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-extrabold",
                  active && "bg-white/20",
                  done && "bg-primary text-primary-foreground",
                  !active && !done && "bg-white",
                )}
              >
                {step.id}
              </span>
              <span className="min-w-0">
                <span className="block text-[10px] font-semibold uppercase opacity-70">
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
