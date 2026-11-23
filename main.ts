// One Emoji, One Smile — make.fun entry
// Writes exactly one emoji, 😊 (U+1F60A, smiling face with smiling eyes),
// to /output/entry.txt — no words, no caption, no explanation, no trailing
// newline, no spaces, nothing else.
//
// Why this emoji: a warm, open smile with smiling eyes — the face a stranger
// reads at a glance as kind and friendly, with no irony, in-joke, intimacy or
// sarcasm. It is instantly readable at any age and in any culture, and it is
// the plainest possible way to make a stranger smile.
//
// Node 22, no dependencies, no network. The harness runs the program with
// MAKEFUN_OUTPUT_DIR set; fall back to /output/entry.txt when it is not.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const EMOJI = "😊"; // U+1F60A SMILING FACE WITH SMILING EYES

const outputDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
const outputPath = join(outputDir, "entry.txt");

// Self-check the gate before writing: exactly one grapheme, 1–8 chars,
// not only whitespace. (Array.from counts code points; 😊 is one.)
const graphemes = Array.from(EMOJI);
if (graphemes.length !== 1 || EMOJI.length < 1 || EMOJI.length > 8) {
  throw new Error(`entry must be exactly one emoji, got ${JSON.stringify(EMOJI)}`);
}

mkdirSync(outputDir, { recursive: true });
writeFileSync(outputPath, EMOJI, "utf8");

// Post-write verification: read the file back and confirm its bytes are
// exactly the UTF-8 encoding of 😊 (f0 9f 98 8a) and a single grapheme.
// A silent partial write or encoding slip must fail loudly, not ship.
const written = readFileSync(outputPath);
const expected = Buffer.from(EMOJI, "utf8");
if (!written.equals(expected) || Array.from(written.toString("utf8")).length !== 1) {
  throw new Error(
    `post-write verification failed: expected bytes ${expected.toString("hex")}, got ${written.toString("hex")}`,
  );
}
