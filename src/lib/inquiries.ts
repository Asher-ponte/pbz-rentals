import { emptyQuote, quoteTotal, type QuoteState } from "@/lib/quote";

export const INQUIRY_STORAGE_KEY = "pbz-inquiries";
export const ADMIN_UNLOCK_KEY = "pbz-admin-unlocked";
export const ADMIN_PIN = "pbzadmin";

export const inquiryStatuses = ["new", "contacted", "booked", "closed"] as const;

export type InquiryStatus = (typeof inquiryStatuses)[number];

export type InquiryContact = {
  name: string;
  phone: string;
  facebook: string;
  eventType: string;
  eventDate: string;
  venue: string;
  notes: string;
};

export type Inquiry = InquiryContact & {
  id: string;
  status: InquiryStatus;
  quote: QuoteState;
  estimate: number;
  receivedAt: string;
  updatedAt: string;
};

export function generateInquiryId(): string {
  return `inq_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

export function createInquiry(
  contact: InquiryContact,
  quote: QuoteState = emptyQuote,
  extras?: Partial<Pick<Inquiry, "id" | "status" | "receivedAt" | "updatedAt">>,
): Inquiry {
  const receivedAt = extras?.receivedAt ?? new Date().toISOString();
  return {
    id: extras?.id ?? generateInquiryId(),
    status: extras?.status ?? "new",
    ...contact,
    name: contact.name.trim(),
    phone: contact.phone.trim(),
    facebook: contact.facebook.trim(),
    eventType: contact.eventType.trim(),
    eventDate: contact.eventDate,
    venue: contact.venue.trim(),
    notes: contact.notes.trim(),
    quote,
    estimate: quoteTotal(quote),
    receivedAt,
    updatedAt: extras?.updatedAt ?? receivedAt,
  };
}

export function parseInquiries(raw: string | null): Inquiry[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as Inquiry[];
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((item) => item && typeof item.id === "string" && item.name);
  } catch {
    return [];
  }
}

export function readLocalInquiries(): Inquiry[] {
  if (typeof window === "undefined") return [];
  return parseInquiries(window.localStorage.getItem(INQUIRY_STORAGE_KEY));
}

export function writeLocalInquiries(inquiries: Inquiry[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(INQUIRY_STORAGE_KEY, JSON.stringify(inquiries));
}

export function upsertLocalInquiry(inquiry: Inquiry): Inquiry[] {
  const next = [inquiry, ...readLocalInquiries().filter((item) => item.id !== inquiry.id)].sort(
    (a, b) => Date.parse(b.receivedAt) - Date.parse(a.receivedAt),
  );
  writeLocalInquiries(next);
  return next;
}

export function mergeInquiries(...lists: Inquiry[][]): Inquiry[] {
  const byId = new Map<string, Inquiry>();
  for (const list of lists) {
    for (const inquiry of list) {
      const existing = byId.get(inquiry.id);
      if (!existing || Date.parse(inquiry.updatedAt) >= Date.parse(existing.updatedAt)) {
        byId.set(inquiry.id, inquiry);
      }
    }
  }
  return [...byId.values()].sort((a, b) => Date.parse(b.receivedAt) - Date.parse(a.receivedAt));
}

export function seedInquiries(): Inquiry[] {
  return [
    createInquiry(
      {
        name: "Maricel Santos",
        phone: "0917 555 2140",
        facebook: "Maricel Santos",
        eventType: "Birthday",
        eventDate: "2026-09-14",
        venue: "Barangay, Santa Rosa, Laguna",
        notes: "Gold chair covers and blush ribbons. Set-up by 2 PM.",
      },
      {
        deliveryKm: 2,
        lines: [
          {
            id: "seed-chairs",
            itemId: "monoblock-chair",
            name: "Monoblock Chair",
            unitPrice: 15,
            qty: 80,
            addons: [
              { id: "chair-cover", name: "Chair Cover", unitPrice: 15, qty: 80 },
              { id: "chair-ribbon", name: "Chair Ribbon", unitPrice: 10, qty: 80 },
            ],
          },
          {
            id: "seed-tables",
            itemId: "table-6ft",
            name: "6ft Foldable Table",
            unitPrice: 170,
            qty: 10,
            addons: [],
          },
        ],
      },
      {
        id: "inq_seed_maricel",
        status: "new",
        receivedAt: "2026-09-05T08:12:00.000Z",
        updatedAt: "2026-09-05T08:12:00.000Z",
      },
    ),
    createInquiry(
      {
        name: "Paolo Ramirez",
        phone: "0905 359 1108",
        facebook: "PBZ wedding inquiry — Paolo",
        eventType: "Wedding",
        eventDate: "2026-10-24",
        venue: "Dita, Santa Rosa, Laguna",
        notes: "Need a 3x3 tent near the garden aisle.",
      },
      {
        deliveryKm: 4,
        lines: [
          {
            id: "seed-wedding-chairs",
            itemId: "monoblock-chair",
            name: "Monoblock Chair",
            unitPrice: 15,
            qty: 120,
            addons: [{ id: "chair-cover", name: "Chair Cover", unitPrice: 15, qty: 120 }],
          },
          {
            id: "seed-tent",
            itemId: "tent-3x3",
            name: "Pop-up Tent 3×3 m",
            unitPrice: 500,
            qty: 1,
            addons: [],
          },
        ],
      },
      {
        id: "inq_seed_paolo",
        status: "contacted",
        receivedAt: "2026-09-04T14:40:00.000Z",
        updatedAt: "2026-09-05T02:18:00.000Z",
      },
    ),
    createInquiry(
      {
        name: "Aira Villanueva",
        phone: "0951 244 8802",
        facebook: "",
        eventType: "Christening",
        eventDate: "2026-09-20",
        venue: "Santa Rosa Homes, Dita",
        notes: "Small afternoon gathering. Confirm if 4ft tables are available.",
      },
      {
        deliveryKm: 1,
        lines: [
          {
            id: "seed-christening",
            itemId: "table-4ft",
            name: "4ft Foldable Table",
            unitPrice: 140,
            qty: 6,
            addons: [],
          },
          {
            id: "seed-christening-chairs",
            itemId: "monoblock-chair",
            name: "Monoblock Chair",
            unitPrice: 15,
            qty: 40,
            addons: [],
          },
        ],
      },
      {
        id: "inq_seed_aira",
        status: "booked",
        receivedAt: "2026-09-03T09:05:00.000Z",
        updatedAt: "2026-09-04T11:30:00.000Z",
      },
    ),
  ];
}

export function statusLabel(status: InquiryStatus): string {
  switch (status) {
    case "new":
      return "New";
    case "contacted":
      return "Contacted";
    case "booked":
      return "Booked";
    case "closed":
      return "Closed";
  }
}
