import { ProductCard } from "@/components/product-card";
import { catalog, categories, type CatalogCategory } from "@/lib/catalog";

export function CatalogGrid({
  only,
}: {
  only?: CatalogCategory;
}) {
  const visible = only ? categories.filter((category) => category.id === only) : categories;

  return (
    <div className="space-y-10">
      {visible.map((category) => (
        <section key={category.id} id={category.id} className="space-y-4">
          <div>
            <h2 className="font-heading text-2xl font-extrabold tracking-tight">
              {category.title}
            </h2>
            <p className="text-sm text-muted-foreground">{category.subtitle}</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {catalog
              .filter((item) => item.category === category.id)
              .map((item) => (
                <ProductCard key={item.id} item={item} />
              ))}
          </div>
        </section>
      ))}
    </div>
  );
}
