"use client";

import { useMemo, useState } from "react";
import { MessageCircle, Phone } from "lucide-react";
import { FacebookIcon } from "@/components/facebook-icon";
import { useQuote } from "@/components/quote-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { business, eventTypes } from "@/lib/business";
import { formatPeso } from "@/lib/format";
import { formatQuoteMessage, smsUrl, whatsappUrl } from "@/lib/quote";

type FormState = {
  name: string;
  phone: string;
  eventType: string;
  eventDate: string;
  venue: string;
  notes: string;
};

const initial: FormState = {
  name: "",
  phone: "",
  eventType: "Birthday",
  eventDate: "",
  venue: "",
  notes: "",
};

export function BookingForm() {
  const { quote, total } = useQuote();
  const [form, setForm] = useState<FormState>(initial);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  const message = useMemo(
    () =>
      formatQuoteMessage(quote, {
        name: form.name,
        phone: form.phone,
        eventType: form.eventType,
        eventDate: form.eventDate,
        venue: form.venue,
        notes: form.notes,
      }),
    [form, quote],
  );

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function validate() {
    if (!form.name.trim() || !form.phone.trim() || !form.eventDate) {
      setError("Please add your name, phone, and event date.");
      return false;
    }
    setError("");
    return true;
  }

  async function copyMessage() {
    if (!validate()) return;
    await navigator.clipboard.writeText(message);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  }

  function openWhatsApp() {
    if (!validate()) return;
    window.open(whatsappUrl(message), "_blank", "noopener,noreferrer");
  }

  return (
    <form className="space-y-4" onSubmit={(event) => event.preventDefault()}>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Your name" htmlFor="name">
          <Input
            id="name"
            className="h-11 rounded-2xl"
            value={form.name}
            onChange={(event) => update("name", event.target.value)}
            autoComplete="name"
            required
          />
        </Field>
        <Field label="Mobile number" htmlFor="phone">
          <Input
            id="phone"
            className="h-11 rounded-2xl"
            value={form.phone}
            onChange={(event) => update("phone", event.target.value)}
            inputMode="tel"
            autoComplete="tel"
            required
          />
        </Field>
        <Field label="Event type" htmlFor="eventType">
          <select
            id="eventType"
            className="h-11 w-full rounded-2xl border border-input bg-transparent px-3 text-sm"
            value={form.eventType}
            onChange={(event) => update("eventType", event.target.value)}
          >
            {eventTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Event date" htmlFor="eventDate">
          <Input
            id="eventDate"
            type="date"
            className="h-11 rounded-2xl"
            value={form.eventDate}
            onChange={(event) => update("eventDate", event.target.value)}
            required
          />
        </Field>
      </div>

      <Field label="Venue / address" htmlFor="venue">
        <Input
          id="venue"
          className="h-11 rounded-2xl"
          value={form.venue}
          onChange={(event) => update("venue", event.target.value)}
          placeholder="Barangay, Santa Rosa, Laguna"
        />
      </Field>

      <Field label="Notes" htmlFor="notes">
        <Textarea
          id="notes"
          className="min-h-24 rounded-2xl"
          value={form.notes}
          onChange={(event) => update("notes", event.target.value)}
          placeholder="Chair covers, ribbon color, set-up time..."
        />
      </Field>

      <div className="rounded-[1.4rem] bg-accent p-4 text-sm">
        <p className="font-bold">Quote attached</p>
        <p className="mt-1 text-muted-foreground">
          {quote.lines.length === 0
            ? "No items yet — you can still inquire, or add items from the price list."
            : `${quote.lines.length} item group${quote.lines.length === 1 ? "" : "s"} · estimate ${formatPeso(total)}`}
        </p>
      </div>

      {error ? <p className="text-sm font-medium text-destructive">{error}</p> : null}

      <div className="grid gap-2">
        <Button type="button" className="h-12 rounded-full font-bold" onClick={openWhatsApp}>
          <MessageCircle data-icon="inline-start" />
          Send via WhatsApp
        </Button>
        <Button type="button" variant="outline" className="h-12 rounded-full font-bold" asChild>
          <a href={business.messengerUrl} target="_blank" rel="noreferrer">
            <FacebookIcon className="size-4" />
            Message on Facebook
          </a>
        </Button>
        <div className="grid grid-cols-2 gap-2">
          <Button type="button" variant="secondary" className="h-12 rounded-full font-bold" asChild>
            <a href={`tel:${business.phones[0].tel}`}>
              <Phone data-icon="inline-start" />
              Call
            </a>
          </Button>
          <Button type="button" variant="secondary" className="h-12 rounded-full font-bold" onClick={copyMessage}>
            {copied ? "Copied" : "Copy details"}
          </Button>
        </div>
        <Button type="button" variant="ghost" className="h-10 rounded-full" asChild>
          <a href={smsUrl(message)}>Send SMS</a>
        </Button>
      </div>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={htmlFor} className="text-sm font-bold">
        {label}
      </Label>
      {children}
    </div>
  );
}
