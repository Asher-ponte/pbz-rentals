import type { CatalogCategory } from "@/lib/catalog";

export function ProductArt({
  category,
  className,
}: {
  category: CatalogCategory;
  className?: string;
}) {
  if (category === "chairs") {
    return (
      <svg viewBox="0 0 160 140" className={className} aria-hidden>
        <rect x="8" y="8" width="144" height="124" rx="28" fill="#fff1f6" />
        <rect x="56" y="28" width="48" height="38" rx="8" fill="#fff" stroke="#f9a8d4" strokeWidth="3" />
        <rect x="46" y="64" width="68" height="10" rx="4" fill="#ec4899" />
        <rect x="50" y="74" width="8" height="36" rx="3" fill="#fda4af" />
        <rect x="102" y="74" width="8" height="36" rx="3" fill="#fda4af" />
        <rect x="58" y="74" width="7" height="30" rx="3" fill="#fecdd3" />
        <rect x="95" y="74" width="7" height="30" rx="3" fill="#fecdd3" />
      </svg>
    );
  }

  if (category === "tables") {
    return (
      <svg viewBox="0 0 160 140" className={className} aria-hidden>
        <rect x="8" y="8" width="144" height="124" rx="28" fill="#fff1f6" />
        <rect x="28" y="58" width="104" height="14" rx="5" fill="#fff" stroke="#f9a8d4" strokeWidth="3" />
        <rect x="36" y="72" width="8" height="34" rx="3" fill="#fda4af" />
        <rect x="116" y="72" width="8" height="34" rx="3" fill="#fda4af" />
        <rect x="48" y="46" width="64" height="8" rx="4" fill="#ec4899" />
        <circle cx="80" cy="40" r="8" fill="#fb7185" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 160 140" className={className} aria-hidden>
      <rect x="8" y="8" width="144" height="124" rx="28" fill="#eef4ff" />
      <path d="M28 78h104L116 38H44z" fill="#2563eb" />
      <path d="M44 38h72v8H44z" fill="#1d4ed8" />
      <rect x="36" y="78" width="6" height="28" rx="2" fill="#1e3a8a" />
      <rect x="118" y="78" width="6" height="28" rx="2" fill="#1e3a8a" />
    </svg>
  );
}
