import Image from "next/image";

const flyers = [
  {
    src: "/feedback/product-lineup.jpg",
    alt: "PBZ Rentals flyer for Uratex chairs, Lifetime tables, and retractable tents",
  },
  {
    src: "/feedback/free-delivery.jpg",
    alt: "PBZ Rentals flyer for free delivery within Dita, Santa Rosa",
  },
];

export function FlyerGallery() {
  return (
    <section className="mx-auto w-full max-w-5xl px-4 py-10">
      <p className="text-xs font-bold tracking-[0.2em] text-primary uppercase">
        From the catalog
      </p>
      <h2 className="mt-2 font-heading text-3xl font-extrabold tracking-tight">
        Same rates as our flyer
      </h2>
      <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
        The website uses the published PBZ Rentals price list — chairs from ₱15,
        tables from ₱140, and tents from ₱300.
      </p>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        {flyers.map((flyer) => (
          <figure
            key={flyer.src}
            className="overflow-hidden rounded-[1.6rem] border border-pink-100 bg-white"
          >
            <Image
              src={flyer.src}
              alt={flyer.alt}
              width={1200}
              height={1500}
              className="h-auto w-full object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </figure>
        ))}
      </div>
    </section>
  );
}
