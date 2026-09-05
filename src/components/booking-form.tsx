"use client";

import { useState } from "react";
import { CheckCircle2, Send } from "lucide-react";
import { FacebookIcon } from "@/components/facebook-icon";
import { useQuote } from "@/components/quote-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { business, eventTypes } from "@/lib/business";
import { formatPeso } from "@/lib/format";
import { upsertLocalInquiry, type Inquiry } from "@/lib/inquiries";

type FormState = {
  name: string;
  phone: string;
  facebook: string;
  eventType: string;
  eventDate: string;
  venue: string;
  notes: string;
};

const initial: FormState = {
  name: "",
  phone: "",
  facebook: "",
  eventType: "Birthday",
  eventDate: "",
  venue: "",
  notes: "",
};

export function BookingForm() {
  const { quote, total, clear } = useQuote();
  const [form, setForm] = useState<FormState>(initial);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState<Inquiry | null>(null);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!form.name.trim() || !form.phone.trim() || !form.eventDate) {
      setError("Please add your name, phone, and event date.");
      return;
    }

    setError("");
    setSubmitting(true);

    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, quote }),
      });
      const payload = (await response.json()) as { ok?: boolean; error?: string; inquiry?: Inquiry };

      if (!response.ok || !payload.ok || !payload.inquiry) {
        setError(payload.error ?? "Could not send your request. Please try again.");
        return;
      }

      upsertLocalInquiry(payload.inquiry);
      clear();
      setSubmitted(payload.inquiry);
      setForm(initial);
    } catch {
      setError("Could not send your request. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="space-y-4 text-center">
        <CheckCircle2 className="mx-auto size-12 text-primary" aria-hidden="true" />
        <div>
          <h2 className="font-heading text-2xl font-extrabold tracking-tight">Request Submitted</h2>
          <p className="mt-2 text-pretty text-sm leading-6 text-muted-foreground">
            Thanks, {submitted.name}. We received your {submitted.eventType.toLowerCase()} inquiry
            for {formatDisplayDate(submitted.eventDate)}.
          </p>
        </div>
        <div className="rounded-[1.4rem] bg-accent p-4 text-left text-sm">
          <p className="font-bold">What we received</p>
          <p className="mt-1 text-muted-foreground">
            {submitted.quote.lines.length === 0
              ? "Inquiry only — no cart items yet."
              : `${submitted.quote.lines.length} item group${submitted.quote.lines.length === 1 ? "" : "s"} · estimate ${formatPeso(submitted.estimate)}`}
          </p>
        </div>
        <Button
          type="button"
          className="h-12 w-full rounded-full font-bold"
          onClick={() => setSubmitted(null)}
        >
          Submit Another Request
        </Button>
      </div>
    );
  }

  return (
    <form className="space-y-4" onSubmit={onSubmit}>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Your name" htmlFor="name">
          <Input
            id="name"
            className="h-12 rounded-2xl"
            value={form.name}
            onChange={(event) => update("name", event.target.value)}
            autoComplete="name"
            required
          />
        </Field>
        <Field label="Mobile number" htmlFor="phone">
          <Input
            id="phone"
            className="h-12 rounded-2xl"
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
            className="h-12 w-full rounded-2xl border border-input bg-transparent px-3 text-sm"
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
            className="h-12 rounded-2xl"
            value={form.eventDate}
            onChange={(event) => update("eventDate", event.target.value)}
            required
          />
        </Field>
      </div>

      <Field label="Venue / address" htmlFor="venue">
        <Input
          id="venue"
          className="h-12 rounded-2xl"
          value={form.venue}
          onChange={(event) => update("venue", event.target.value)}
          placeholder="Barangay, Santa Rosa, Laguna"
        />
      </Field>

      <Field label="Facebook or social" htmlFor="facebook">
        <Input
          id="facebook"
          className="h-12 rounded-2xl"
          value={form.facebook}
          onChange={(event) => update("facebook", event.target.value)}
          placeholder="Your Facebook name or page"
          autoComplete="nickname"
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
            ? "No items yet — you can still inquire, or add items from the rental catalog."
            : `${quote.lines.length} item group${quote.lines.length === 1 ? "" : "s"} · estimate ${formatPeso(total)}`}
        </p>
      </div>

      <div className="rounded-[1.4rem] border border-pink-100 bg-white p-4">
        <p className="font-bold">Social media</p>
        <p className="mt-1 text-sm leading-6 text-muted-foreground">
          Follow or message {business.shortName} on Facebook for photos and availability updates.
        </p>
        <a
          href={business.facebookUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-3 flex min-h-12 items-center gap-3 rounded-2xl bg-accent px-3 py-2 text-sm font-bold text-foreground"
        >
          <span className="flex size-9 items-center justify-center rounded-full bg-white text-primary">
            <FacebookIcon className="size-4" />
          </span>
          <span className="text-left">
            Facebook
            <span className="block text-xs font-medium text-muted-foreground">
              {business.facebookName}
            </span>
          </span>
        </a>
      </div>

      {error ? <p className="text-sm font-medium text-destructive">{error}</p> : null}

      <Button type="submit" className="h-12 w-full rounded-full font-bold" disabled={submitting}>
        <Send data-icon="inline-start" aria-hidden="true" />
        {submitting ? "Submitting..." : "Submit Request"}
      </Button>
    </form>
  );
}

function formatDisplayDate(value: string) {
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("en-PH", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
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
