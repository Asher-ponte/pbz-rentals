export const business = {
  name: "PBZ Tables & Chairs Rental",
  shortName: "PBZ Rentals",
  slogan: "Your event, our seats!",
  tagline: "Affordable tables, chairs, and tents for every celebration.",
  city: "Dita, Santa Rosa, Laguna",
  address: "Blk 13 Lot 47, Santa Rosa Homes, Dita, Santa Rosa, Laguna 4026",
  mapQuery: "Santa Rosa Homes, Dita, Santa Rosa, Laguna",
  hours: "8:00 AM – 9:00 PM, daily",
  phones: [
    { display: "0905-359-4937", tel: "+639053594937" },
    { display: "0951-244-4425", tel: "+639512444425" },
  ],
  facebookUrl: "https://www.facebook.com/1118163494723689",
  facebookName: "PBZ Rentals and Chair Rentals",
  messengerUrl: "https://m.me/1118163494723689",
  whatsapp: "639053594937",
  delivery: {
    freeKm: 3,
    succeedingPerKm: 50,
    setupIncluded: true,
  },
} as const;

export type EventType =
  | "Birthday"
  | "Wedding"
  | "Debut"
  | "Christening"
  | "Corporate"
  | "Fiesta"
  | "Other";

export const eventTypes: EventType[] = [
  "Birthday",
  "Wedding",
  "Debut",
  "Christening",
  "Corporate",
  "Fiesta",
  "Other",
];
