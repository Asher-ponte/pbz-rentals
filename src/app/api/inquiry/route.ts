import { NextResponse } from "next/server";
import { formatQuoteMessage, emptyQuote, type QuoteState } from "@/lib/quote";

type InquiryBody = {
  name?: string;
  phone?: string;
  eventType?: string;
  eventDate?: string;
  venue?: string;
  notes?: string;
  quote?: QuoteState;
};

export async function POST(request: Request) {
  const body = (await request.json()) as InquiryBody;

  if (!body.name?.trim() || !body.phone?.trim() || !body.eventDate) {
    return NextResponse.json(
      { ok: false, error: "Name, phone, and event date are required." },
      { status: 400 },
    );
  }

  const quote = body.quote ?? emptyQuote;
  const message = formatQuoteMessage(quote, {
    name: body.name,
    phone: body.phone,
    eventType: body.eventType,
    eventDate: body.eventDate,
    venue: body.venue,
    notes: body.notes,
  });

  return NextResponse.json({
    ok: true,
    message,
    receivedAt: new Date().toISOString(),
  });
}
