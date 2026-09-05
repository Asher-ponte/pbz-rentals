"use client";

import { useEffect, useMemo, useState } from "react";
import { Inbox, LockKeyhole } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatPeso } from "@/lib/format";
import {
  ADMIN_PIN,
  ADMIN_UNLOCK_KEY,
  mergeInquiries,
  readLocalInquiries,
  seedInquiries,
  statusLabel,
  upsertLocalInquiry,
  writeLocalInquiries,
  type Inquiry,
  type InquiryStatus,
} from "@/lib/inquiries";

type Filter = "all" | InquiryStatus;

const filters: { id: Filter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "new", label: "New" },
  { id: "contacted", label: "Contacted" },
  { id: "booked", label: "Booked" },
  { id: "closed", label: "Closed" },
];

export function AdminInbox() {
  const [unlocked, setUnlocked] = useState(false);
  const [pin, setPin] = useState("");
  const [pinError, setPinError] = useState("");
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [filter, setFilter] = useState<Filter>("all");
  const [openId, setOpenId] = useState<string | null>(null);

  useEffect(() => {
    if (window.sessionStorage.getItem(ADMIN_UNLOCK_KEY) === "1") {
      setUnlocked(true);
    }
  }, []);

  useEffect(() => {
    if (!unlocked) return;

    let cancelled = false;

    async function load() {
      const local = readLocalInquiries();
      let remote: Inquiry[] = [];
      try {
        const response = await fetch("/api/inquiry");
        const payload = (await response.json()) as { inquiries?: Inquiry[] };
        remote = payload.inquiries ?? [];
      } catch {
        remote = [];
      }

      const next = mergeInquiries(seedInquiries(), local, remote);
      if (cancelled) return;
      writeLocalInquiries(next);
      setInquiries(next);
      setOpenId((current) => current ?? next[0]?.id ?? null);
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, [unlocked]);

  const visible = useMemo(
    () => (filter === "all" ? inquiries : inquiries.filter((item) => item.status === filter)),
    [filter, inquiries],
  );

  const newCount = inquiries.filter((item) => item.status === "new").length;

  function unlock(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pin.trim().toLowerCase() !== ADMIN_PIN) {
      setPinError("That PIN does not match the demo staff code.");
      return;
    }
    window.sessionStorage.setItem(ADMIN_UNLOCK_KEY, "1");
    setUnlocked(true);
    setPinError("");
  }

  async function setStatus(inquiry: Inquiry, status: InquiryStatus) {
    const next = { ...inquiry, status, updatedAt: new Date().toISOString() };
    const list = upsertLocalInquiry(next);
    setInquiries(list);
    try {
      await fetch("/api/inquiry", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: inquiry.id, status }),
      });
    } catch {
      // Demo inbox stays on this device even if the API instance restarted.
    }
  }

  if (!unlocked) {
    return (
      <form
        onSubmit={unlock}
        className="mx-auto max-w-md rounded-[1.6rem] border border-pink-100 bg-white p-5"
      >
        <LockKeyhole className="size-8 text-primary" aria-hidden="true" />
        <h1 className="mt-3 font-heading text-3xl font-extrabold tracking-tight">Staff Inbox</h1>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Mock admin for booking inquiries. Enter the demo PIN to view requests submitted from
          this browser.
        </p>
        <div className="mt-5 space-y-1.5">
          <Label htmlFor="admin-pin" className="text-sm font-bold">
            Staff PIN
          </Label>
          <Input
            id="admin-pin"
            type="password"
            className="h-12 rounded-2xl"
            value={pin}
            onChange={(event) => setPin(event.target.value)}
            autoComplete="current-password"
          />
          <p className="text-xs text-muted-foreground">Demo PIN: {ADMIN_PIN}</p>
        </div>
        {pinError ? <p className="mt-2 text-sm font-medium text-destructive">{pinError}</p> : null}
        <Button type="submit" className="mt-4 h-12 w-full rounded-full font-bold">
          Open Inbox
        </Button>
      </form>
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-bold tracking-[0.2em] text-primary uppercase">Mock admin</p>
          <h1 className="mt-2 font-heading text-3xl font-extrabold tracking-tight">Inquiry Inbox</h1>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            {newCount} new request{newCount === 1 ? "" : "s"} · {inquiries.length} total
          </p>
        </div>
        <Inbox className="mt-1 size-7 text-primary" aria-hidden="true" />
      </div>

      <div className="rounded-[1.4rem] bg-accent p-4 text-sm leading-6 text-muted-foreground">
        This is a mockup inbox. Submitted requests stay on this device so you can review them
        without a live database.
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {filters.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setFilter(item.id)}
            className={`h-10 shrink-0 rounded-full px-4 text-sm font-bold ${
              filter === item.id
                ? "bg-primary text-primary-foreground"
                : "bg-white text-muted-foreground ring-1 ring-pink-100"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <p className="rounded-[1.4rem] border border-dashed border-pink-200 px-4 py-10 text-center text-sm text-muted-foreground">
          No inquiries in this filter yet.
        </p>
      ) : (
        <ul className="space-y-3">
          {visible.map((inquiry) => {
            const open = openId === inquiry.id;
            return (
              <li
                key={inquiry.id}
                className="overflow-hidden rounded-[1.5rem] border border-pink-100 bg-white"
              >
                <button
                  type="button"
                  className="flex w-full items-start justify-between gap-3 p-4 text-left"
                  onClick={() => setOpenId(open ? null : inquiry.id)}
                >
                  <span>
                    <span className="block font-heading text-base font-extrabold">
                      {inquiry.name}
                    </span>
                    <span className="mt-1 block text-sm text-muted-foreground">
                      {inquiry.eventType} · {formatDisplayDate(inquiry.eventDate)}
                    </span>
                  </span>
                  <span className="flex flex-col items-end gap-1">
                    <StatusBadge status={inquiry.status} />
                    <span className="text-xs font-bold text-foreground">
                      {formatPeso(inquiry.estimate)}
                    </span>
                  </span>
                </button>

                {open ? (
                  <div className="space-y-3 border-t border-pink-100 px-4 py-4 text-sm">
                    <Detail label="Mobile" value={inquiry.phone} />
                    <Detail
                      label="Social"
                      value={inquiry.facebook || "Not provided"}
                    />
                    <Detail label="Venue" value={inquiry.venue || "Not provided"} />
                    <Detail label="Notes" value={inquiry.notes || "None"} />
                    <div>
                      <p className="font-bold">Requested items</p>
                      {inquiry.quote.lines.length === 0 ? (
                        <p className="mt-1 text-muted-foreground">Inquiry only — no cart items.</p>
                      ) : (
                        <ul className="mt-1 space-y-1 text-muted-foreground">
                          {inquiry.quote.lines.map((line) => (
                            <li key={line.id}>
                              {line.qty}× {line.name}
                              {line.addons.length > 0
                                ? ` + ${line.addons.map((addon) => addon.name).join(", ")}`
                                : ""}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor={`status-${inquiry.id}`} className="text-sm font-bold">
                        Status
                      </Label>
                      <select
                        id={`status-${inquiry.id}`}
                        className="h-12 w-full rounded-2xl border border-input bg-transparent px-3 text-sm"
                        value={inquiry.status}
                        onChange={(event) =>
                          void setStatus(inquiry, event.target.value as InquiryStatus)
                        }
                      >
                        {filters
                          .filter((item) => item.id !== "all")
                          .map((item) => (
                            <option key={item.id} value={item.id}>
                              {item.label}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>
                ) : null}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

function StatusBadge({ status }: { status: InquiryStatus }) {
  const variant =
    status === "new" ? "default" : status === "closed" ? "outline" : "secondary";
  return <Badge variant={variant}>{statusLabel(status)}</Badge>;
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="font-bold">{label}</p>
      <p className="mt-0.5 text-muted-foreground">{value}</p>
    </div>
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
