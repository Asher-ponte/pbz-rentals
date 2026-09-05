import Link from "next/link";
import { MapPin, Phone } from "lucide-react";
import { FacebookIcon } from "@/components/facebook-icon";
import { Logo } from "@/components/logo";
import { business } from "@/lib/business";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-pink-100 bg-white pb-28 md:pb-8">
      <div className="mx-auto grid w-full max-w-5xl gap-8 px-4 py-10 sm:grid-cols-2 lg:grid-cols-3">
        <div className="space-y-3">
          <Logo />
          <p className="max-w-xs text-sm leading-6 text-muted-foreground">
            {business.slogan} Affordable event rentals with free setup and delivery
            within {business.delivery.freeKm}&nbsp;km of Santa Rosa.
          </p>
        </div>

        <div className="space-y-3 text-sm">
          <p className="font-heading font-bold">Visit or message</p>
          <p className="flex items-start gap-2 text-muted-foreground">
            <MapPin className="mt-0.5 size-4 text-primary" aria-hidden="true" />
            {business.address}
          </p>
          {business.phones.map((phone) => (
            <a
              key={phone.tel}
              href={`tel:${phone.tel}`}
              className="flex items-center gap-2 font-medium text-foreground"
            >
              <Phone className="size-4 text-primary" aria-hidden="true" />
              {phone.display}
            </a>
          ))}
          <a
            href={business.facebookUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 font-medium text-foreground"
          >
            <FacebookIcon className="size-4 text-primary" />
            {business.facebookName}
          </a>
        </div>

        <div className="space-y-2 text-sm">
          <p className="font-heading font-bold">Quick links</p>
          <Link href="/packages" className="block text-muted-foreground hover:text-primary">
            Packages
          </Link>
          <Link href="/catalog" className="block text-muted-foreground hover:text-primary">
            Shop rentals
          </Link>
          <Link href="/quote" className="block text-muted-foreground hover:text-primary">
            Cart
          </Link>
          <Link href="/book" className="block text-muted-foreground hover:text-primary">
            Reserve a date
          </Link>
          <p className="pt-2 text-xs text-muted-foreground">
            Hours: {business.hours}. First come, first served.
          </p>
        </div>
      </div>
    </footer>
  );
}
