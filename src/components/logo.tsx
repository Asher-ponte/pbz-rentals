import { cn } from "@/lib/utils";

export function Logo({
  className,
  showWordmark = true,
}: {
  className?: string;
  showWordmark?: boolean;
}) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <svg
        viewBox="0 0 80 80"
        className="size-11 shrink-0"
        role="img"
        aria-label="PBZ Rentals logo"
      >
        <circle cx="40" cy="40" r="38" fill="#fff5f8" stroke="#ec4899" strokeWidth="3" />
        <path
          d="M22 46h36M26 46v8M54 46v8M30 46V36h20v10"
          fill="none"
          stroke="#ec4899"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M18 50c0-4 3-7 7-7h4v10H21c-1.7 0-3-1.3-3-3zM51 43h4c4 0 7 3 7 7v0c0 1.7-1.3 3-3 3h-8V43z"
          fill="none"
          stroke="#ec4899"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <text
          x="40"
          y="28"
          textAnchor="middle"
          fill="#db2777"
          fontSize="11"
          fontWeight="800"
          fontFamily="Plus Jakarta Sans, sans-serif"
        >
          PBZ
        </text>
      </svg>
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
