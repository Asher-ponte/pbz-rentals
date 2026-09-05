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
      <body className="flex min-h-full flex-col bg-background font-sans">
        <Providers>
          <Header />
          {children}
          <Footer />
          <MobileDock />
        </Providers>
      </body>
    </html>
  );
}
