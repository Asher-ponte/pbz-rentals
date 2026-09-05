# PBZ Tables & Chairs Rental

Mobile-first booking site for **PBZ Rentals** in Dita, Santa Rosa, Laguna. Guests can browse the published price list, build a quote with add-ons and delivery, then submit a booking request. Facebook is listed as the social contact. Staff can review inquiries in the mock admin inbox.

## Features

- Catalog for Uratex chairs, Lifetime tables, and pop-up tents
- Add-ons: chair covers, ribbons, table covers, runners, centerpieces
- Suggested BER months sets that pre-fill a quote from published rates
- Delivery calculator (free within 3 km, ₱50/km after)
- Booking form that submits the quote as an inquiry
- Mock staff inbox at `/admin` for submitted requests
- Sticky mobile Home / Packages / Catalog / Cart / Book dock

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production build

Run this before any Vercel deploy so a broken build never consumes remote build minutes:

```bash
npm run build
```

## Deploy

The app is a standard Next.js App Router project. After the local build succeeds, push to GitHub and deploy with Vercel.

## Contact used in the app

- Blk 13 Lot 47, Santa Rosa Homes, Dita, Santa Rosa, Laguna
- 0905-359-4937 / 0951-244-4425
- Facebook: PBZ Rentals and Chair Rentals
