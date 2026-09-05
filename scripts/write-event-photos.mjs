#!/usr/bin/env node
import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const photos = [
  ["public/catalog/chairs-uratex.jpg", "scripts/photos/chairs-uratex.b64"],
  ["public/catalog/tables-lifetime.jpg", "scripts/photos/tables-lifetime.b64"],
  ["public/catalog/tables-chairs-banner.jpg", "scripts/photos/tables-chairs-banner.b64"],
  ["public/catalog/tent-2x2.jpg", "scripts/photos/tent-2x2.b64"],
  ["public/catalog/tent-3x3.jpg", "scripts/photos/tent-3x3.b64"],
  ["public/catalog/tent-3x45.jpg", "scripts/photos/tent-3x45.b64"],
  ["public/feedback/client-review.jpg", "scripts/photos/client-review.b64"],
  ["public/feedback/free-delivery.jpg", "scripts/photos/free-delivery.b64"],
  ["public/feedback/product-lineup.jpg", "scripts/photos/product-lineup.b64"],
  ["public/feedback/tent-sizes.jpg", "scripts/photos/tent-sizes.b64"],
  ["public/feedback/tent-nearby.jpg", "scripts/photos/tent-nearby.b64"],
];

const copies = [
  ["public/catalog/chairs-uratex.jpg", "public/feedback/ready-for-delivery.jpg"],
  ["public/catalog/tables-lifetime.jpg", "public/feedback/event-inventory.jpg"],
  ["public/catalog/tables-chairs-banner.jpg", "public/feedback/brand-banner.jpg"],
];

for (const [destRel, sourceRel] of photos) {
  const dest = join(root, destRel);
  const source = join(root, sourceRel);
  mkdirSync(dirname(dest), { recursive: true });
  if (existsSync(source)) {
    writeFileSync(dest, Buffer.from(readFileSync(source, "utf8"), "base64"));
  }
}

for (const [fromRel, toRel] of copies) {
  const from = join(root, fromRel);
  const to = join(root, toRel);
  if (!existsSync(from)) continue;
  mkdirSync(dirname(to), { recursive: true });
  copyFileSync(from, to);
}
