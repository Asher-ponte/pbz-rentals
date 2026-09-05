import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { MobileDock } from "@/components/mobile-dock";
import { Providers } from "@/components/providers";
import { business } from "@/lib/business";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://pbz-rentals.vercel.app"),
  title: {
    default: `${business.shortName} · ${business.slogan}`,
    template: `%s · ${business.shortName}`,
  },
  description: `${business.tagline} Pickup and delivery from ${business.city}.`,
  applicationName: business.shortName,
  openGraph: {
    title: `${business.name} · ${business.slogan}`,
    description: business.tagline,
    locale: "en_PH",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#2a1c20",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${plusJakarta.variable} h-full antialiased`}>
      <body className="flex min-h-dvh flex-col bg-background font-sans [touch-action:manipulation]">
        <Providers>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-primary-foreground"
          >
            Skip to content
          </a>
          <Header />
          <div id="main-content">{children}</div>
          <Footer />
          <MobileDock />
        </Providers>
      </body>
    </html>
  );
}
