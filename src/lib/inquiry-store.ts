import type { Inquiry } from "@/lib/inquiries";

const globalForInquiries = globalThis as typeof globalThis & {
  pbzInquiries?: Inquiry[];
};

function memory(): Inquiry[] {
  if (!globalForInquiries.pbzInquiries) {
    globalForInquiries.pbzInquiries = [];
  }
  return globalForInquiries.pbzInquiries;
}

export function listStoredInquiries(): Inquiry[] {
  return [...memory()].sort((a, b) => Date.parse(b.receivedAt) - Date.parse(a.receivedAt));
}

export function saveStoredInquiry(inquiry: Inquiry): Inquiry {
  const items = memory();
  const index = items.findIndex((item) => item.id === inquiry.id);
  if (index >= 0) {
    items[index] = inquiry;
  } else {
    items.unshift(inquiry);
  }
  return inquiry;
}

export function updateStoredInquiryStatus(id: string, status: Inquiry["status"]): Inquiry | null {
  const items = memory();
  const current = items.find((item) => item.id === id);
  if (!current) return null;
  const next = { ...current, status, updatedAt: new Date().toISOString() };
  return saveStoredInquiry(next);
}
