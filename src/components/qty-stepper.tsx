"use client";

import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function QtyStepper({
  value,
  onChange,
  min = 0,
  max = 500,
  className,
}: {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  className?: string;
}) {
  return (
    <div className={cn("inline-flex items-center rounded-full bg-accent p-1", className)}>
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        className="rounded-full"
        onClick={() => onChange(Math.max(min, value - 1))}
        aria-label="Decrease quantity"
      >
        <Minus />
      </Button>
      <span className="min-w-8 text-center text-sm font-bold tabular-nums">{value}</span>
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        className="rounded-full"
        onClick={() => onChange(Math.min(max, value + 1))}
        aria-label="Increase quantity"
      >
        <Plus />
      </Button>
    </div>
  );
}
