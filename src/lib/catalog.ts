export type CatalogCategory = "chairs" | "tables" | "tents";

export type Addon = {
  id: string;
  name: string;
  price: number;
  note?: string;
};

export type CatalogItem = {
  id: string;
  category: CatalogCategory;
  name: string;
  brand?: string;
  price: number;
  unit: string;
  capacity?: string;
  size?: string;
  description: string;
  addons: Addon[];
};

export type PackageDeal = {
  id: string;
  name: string;
  guests: string;
  description: string;
  items: { itemId: string; qty: number; addonIds?: string[] }[];
};

export const catalog: CatalogItem[] = [
  {
    id: "monoblock-chair",
    category: "chairs",
    name: "Monoblock Chair",
    brand: "Uratex",
    price: 15,
    unit: "pc",
    description: "Sturdy white monoblock chairs — clean, stackable, and ready for any event.",
    addons: [
      { id: "chair-cover", name: "Chair Cover", price: 15 },
      { id: "chair-ribbon", name: "Chair Ribbon", price: 10 },
    ],
  },
  {
    id: "table-4ft",
    category: "tables",
    name: "4ft Foldable Table",
    brand: "Lifetime",
    price: 140,
    unit: "pc",
    capacity: "4 to 6 pax",
    size: "4 ft",
    description: "Compact Lifetime foldable table, perfect for smaller groups and kids’ parties.",
    addons: [
      { id: "cover-4ft", name: "4ft Table Cover", price: 40 },
      { id: "runner", name: "Tabletop Runner", price: 15 },
      { id: "centerpiece", name: "Centerpiece Flower", price: 30 },
    ],
  },
  {
    id: "table-6ft",
    category: "tables",
    name: "6ft Foldable Table",
    brand: "Lifetime",
    price: 170,
    unit: "pc",
    capacity: "6 to 8 pax",
    size: "6 ft",
    description: "Full-size Lifetime foldable table for family gatherings and receptions.",
    addons: [
      { id: "cover-6ft", name: "6ft Table Cover", price: 50 },
      { id: "runner", name: "Tabletop Runner", price: 15 },
      { id: "centerpiece", name: "Centerpiece Flower", price: 30 },
    ],
  },
  {
    id: "tent-2x2",
    category: "tents",
    name: "Pop-up Tent 2×2 m",
    price: 300,
    unit: "pc",
    size: "2 × 2 m (6.5 ft × 6.5 ft)",
    description: "Blue canopy tent for food stations, registration, or compact outdoor shade.",
    addons: [],
  },
  {
    id: "tent-3x3",
    category: "tents",
    name: "Pop-up Tent 3×3 m",
    price: 500,
    unit: "pc",
    size: "3 × 3 m (10 ft × 10 ft)",
    description: "Our most popular tent size — roomy enough for tables and guests.",
    addons: [],
  },
  {
    id: "tent-3x45",
    category: "tents",
    name: "Pop-up Tent 3×4.5 m",
    price: 600,
    unit: "pc",
    size: "3 × 4.5 m (10 ft × 15 ft)",
    description: "Extra-wide canopy for bigger celebrations and buffet setups.",
    addons: [],
  },
];

export const packages: PackageDeal[] = [
  {
    id: "intimate",
    name: "Intimate Set",
    guests: "Up to 20 guests",
    description: "A starter setup for small birthdays and family lunches.",
    items: [
      { itemId: "monoblock-chair", qty: 20, addonIds: ["chair-cover"] },
      { itemId: "table-4ft", qty: 4, addonIds: ["cover-4ft", "runner"] },
      { itemId: "tent-2x2", qty: 1 },
    ],
  },
  {
    id: "celebration",
    name: "Celebration Set",
    guests: "Up to 50 guests",
    description: "The BER months favorite for debuts, baptisms, and backyard parties.",
    items: [
      { itemId: "monoblock-chair", qty: 50, addonIds: ["chair-cover", "chair-ribbon"] },
      { itemId: "table-6ft", qty: 7, addonIds: ["cover-6ft", "runner", "centerpiece"] },
      { itemId: "tent-3x3", qty: 1 },
    ],
  },
  {
    id: "grand",
    name: "Grand Set",
    guests: "Up to 100 guests",
    description: "A complete outdoor layout for weddings, fiestas, and company events.",
    items: [
      { itemId: "monoblock-chair", qty: 100, addonIds: ["chair-cover", "chair-ribbon"] },
      { itemId: "table-6ft", qty: 13, addonIds: ["cover-6ft", "runner", "centerpiece"] },
      { itemId: "tent-3x45", qty: 1 },
      { itemId: "tent-3x3", qty: 1 },
    ],
  },
];

export const categories: { id: CatalogCategory; title: string; subtitle: string }[] = [
  { id: "chairs", title: "Chairs", subtitle: "Uratex monoblock with optional covers & ribbons" },
  { id: "tables", title: "Tables", subtitle: "Lifetime foldable tables with styling add-ons" },
  { id: "tents", title: "Tents", subtitle: "Blue pop-up canopies in three event sizes" },
];

export function getItem(id: string): CatalogItem | undefined {
  return catalog.find((item) => item.id === id);
}

export function packageContents(deal: PackageDeal) {
  return deal.items.map((line) => {
    const item = getItem(line.itemId);
    const extras = (line.addonIds ?? [])
      .map((addonId) => item?.addons.find((addon) => addon.id === addonId)?.name)
      .filter((name): name is string => Boolean(name));
    return {
      qty: line.qty,
      name: item?.name ?? line.itemId,
      extras,
    };
  });
}

export function packageEstimate(deal: PackageDeal): number {
  return deal.items.reduce((sum, line) => {
    const item = getItem(line.itemId);
    if (!item) return sum;
    const addonTotal = (line.addonIds ?? []).reduce((addonSum, addonId) => {
      const addon = item.addons.find((entry) => entry.id === addonId);
      return addonSum + (addon ? addon.price * line.qty : 0);
    }, 0);
    return sum + item.price * line.qty + addonTotal;
  }, 0);
}
