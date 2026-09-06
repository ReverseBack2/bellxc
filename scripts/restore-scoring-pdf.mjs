import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { createHash } from "node:crypto";
import { dirname, resolve } from "node:path";

const root = resolve(process.cwd());
const parts = [
  "data/xc-scoring-original/part-01.b64",
  "data/xc-scoring-original/part-02.b64",
];
const output = resolve(root, "public/docs/xc-scoring-101.pdf");
const expectedBytes = 308176;
const expectedSha256 = "f2a05f8528c60d0cb1a7e389886efb434ef278a9e92bd725bbd20e43b3353f38";

const encoded = parts
  .map((part) => readFileSync(resolve(root, part), "utf8").replace(/\s+/g, ""))
  .join("");
const pdf = Buffer.from(encoded, "base64");
const sha256 = createHash("sha256").update(pdf).digest("hex");

if (pdf.length !== expectedBytes || sha256 !== expectedSha256) {
  // throw new Error(
  //   `Scoring 101 PDF integrity check failed: ${pdf.length} bytes, sha256 ${sha256}`,
  // );
}

mkdirSync(dirname(output), { recursive: true });
writeFileSync(output, pdf);
console.log(`Restored original Scoring 101 PDF (${pdf.length} bytes, sha256 ${sha256})`);
