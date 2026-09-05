import Image from "next/image";

export function FlyerGallery() {
  return (
    <section className="mx-auto w-full max-w-5xl px-4 py-10">
      <p className="text-xs font-bold tracking-[0.2em] text-primary uppercase">
        From the shop
      </p>
      <h2 className="mt-2 font-heading text-3xl font-extrabold tracking-tight">
        Same rates as our flyer
      </h2>
      <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
        The website uses the published PBZ Rentals price list — chairs from ₱15,
        tables from ₱140, and tents from ₱300.
      </p>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <figure className="overflow-hidden rounded-[1.6rem] border border-pink-100 bg-white">
          <Image
            src="/images/flyer-promo.jpg"
            alt="PBZ Rentals Facebook promo for BER months celebrations"
            width={1200}
            height={1500}
            className="h-auto w-full object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </figure>
        <figure className="overflow-hidden rounded-[1.6rem] border border-pink-100 bg-white">
          <Image
            src="/images/flyer-pricelist.jpg"
            alt="PBZ Tables and Chairs Rental price list flyer"
            width={1200}
            height={1500}
            className="h-auto w-full object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </figure>
      </div>
    </section>
  );
}
