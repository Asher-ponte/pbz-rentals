import { NextResponse } from "next/server";
import {
  createInquiry,
  inquiryStatuses,
  type InquiryContact,
  type InquiryStatus,
} from "@/lib/inquiries";
import {
  listStoredInquiries,
  saveStoredInquiry,
  updateStoredInquiryStatus,
} from "@/lib/inquiry-store";
import { emptyQuote, formatQuoteMessage, type QuoteState } from "@/lib/quote";

type InquiryBody = Partial<InquiryContact> & {
  quote?: QuoteState;
};

function isStatus(value: unknown): value is InquiryStatus {
  return typeof value === "string" && inquiryStatuses.includes(value as InquiryStatus);
}

export async function GET() {
  return NextResponse.json({
    ok: true,
    inquiries: listStoredInquiries(),
  });
}

export async function POST(request: Request) {
  const body = (await request.json()) as InquiryBody;

  if (!body.name?.trim() || !body.phone?.trim() || !body.eventDate) {
    return NextResponse.json(
      { ok: false, error: "Name, phone, and event date are required." },
      { status: 400 },
    );
  }

  const quote = body.quote ?? emptyQuote;
  const inquiry = saveStoredInquiry(
    createInquiry(
      {
        name: body.name,
        phone: body.phone,
        facebook: body.facebook ?? "",
        eventType: body.eventType ?? "",
        eventDate: body.eventDate,
        venue: body.venue ?? "",
        notes: body.notes ?? "",
      },
      quote,
    ),
  );

  return NextResponse.json({
    ok: true,
    inquiry,
    message: formatQuoteMessage(quote, inquiry),
    receivedAt: inquiry.receivedAt,
  });
}

export async function PATCH(request: Request) {
  const body = (await request.json()) as { id?: string; status?: string };

  if (!body.id?.trim() || !isStatus(body.status)) {
    return NextResponse.json(
      { ok: false, error: "A valid inquiry id and status are required." },
      { status: 400 },
    );
  }

  const inquiry = updateStoredInquiryStatus(body.id, body.status);
  if (!inquiry) {
    return NextResponse.json({ ok: false, error: "Inquiry not found." }, { status: 404 });
  }

  return NextResponse.json({ ok: true, inquiry });
}
