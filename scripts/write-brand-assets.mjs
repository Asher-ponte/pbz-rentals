#!/usr/bin/env node
import { writeFileSync, mkdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "..");
const bytes = Buffer.from(
  readFileSync(join(here, "logo-a.b64"), "utf8") +
    readFileSync(join(here, "logo-b.b64"), "utf8"),
  "base64",
);
mkdirSync(join(root, "public"), { recursive: true });
mkdirSync(join(root, "src/app"), { recursive: true });
writeFileSync(join(root, "public/logo.jpg"), bytes);
writeFileSync(join(root, "src/app/icon.jpg"), bytes);
writeFileSync(join(root, "src/app/apple-icon.jpg"), bytes);
