import Image from "next/image";
import { cn } from "@/lib/utils";

export function Logo({
  className,
  showWordmark = true,
  size = 44,
}: {
  className?: string;
  showWordmark?: boolean;
  size?: number;
}) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <Image
        src="/logo.jpg"
        alt="PBZ Rentals logo"
        width={size}
        height={size}
        className="shrink-0 rounded-full bg-zinc-900 shadow-[0_4px_14px_-6px_rgba(0,0,0,0.45)]"
        priority
      />
      {showWordmark ? (
        <div className="leading-tight">
          <p className="font-heading text-[0.95rem] font-extrabold tracking-tight text-foreground">
            PBZ Rentals
          </p>
          <p className="text-[11px] font-medium tracking-wide text-primary">
            Tables &amp; Chairs
          </p>
        </div>
      ) : null}
    </div>
  );
}
