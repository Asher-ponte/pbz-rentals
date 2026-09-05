import type { Metadata } from "next";
import { BookingForm } from "@/components/booking-form";
import { FunnelSteps } from "@/components/funnel-steps";
import { business } from "@/lib/business";

export const metadata: Metadata = {
  title: "Book now",
  description: `Reserve chairs, tables, and tents with ${business.shortName}. First come, first served.`,
};

export default function BookPage() {
  return (
    <main className="mx-auto w-full max-w-xl px-4 py-8">
      <FunnelSteps current={3} />
      <p className="text-xs font-bold tracking-[0.2em] text-primary uppercase">
        Step 3 · Book
      </p>
      <h1 className="mt-2 text-balance font-heading text-4xl font-extrabold tracking-tight">
        Reserve Your Date
      </h1>
      <p className="mt-3 text-pretty text-base leading-7 text-muted-foreground">
        Submit your request and we will confirm availability. Find us on Facebook:{" "}
        {business.facebookName}. Hours: {business.hours}.
      </p>
      <div className="mt-6 rounded-[1.6rem] border border-pink-100 bg-white p-4 sm:p-6">
        <BookingForm />
      </div>
    </main>
  );
}
