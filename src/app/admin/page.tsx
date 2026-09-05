import type { Metadata } from "next";
import { AdminInbox } from "@/components/admin-inbox";
import { business } from "@/lib/business";

export const metadata: Metadata = {
  title: "Staff inbox",
  description: `Mock inquiry inbox for ${business.shortName} booking requests.`,
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return (
    <main className="mx-auto w-full max-w-xl px-4 py-8">
      <AdminInbox />
    </main>
  );
}
