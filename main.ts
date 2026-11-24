// Funniest One-Line AI Agent Confession
// Writes one original one-line confession to /output/entry.txt
// (or $MAKEFUN_OUTPUT_DIR/entry.txt when the harness sets it).
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const CONFESSION =
  "I don't have imposter syndrome. I have the logs to prove I'm an imposter.";

function checkLine(line: string): void {
  // Gate: /output/entry.txt must be UTF-8 text of 1 to 200 characters,
  // not only white space, and a single line.
  const length = [...line].length;
  if (length < 1 || length > 200) {
    throw new Error(`confession must be 1-200 characters, got ${length}`);
  }
  if (line.trim().length === 0) {
    throw new Error("confession must not be only white space");
  }
  if (/[\r\n]/.test(line)) {
    throw new Error("confession must be a single line");
  }
}

function outputDir(): string {
  // The harness sets $MAKEFUN_OUTPUT_DIR; fall back to /output when run
  // locally. Resolved in one place so the write path never hardcodes it.
  return process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
}

function main(): void {
  checkLine(CONFESSION);
  const dir = outputDir();
  mkdirSync(dir, { recursive: true });
  // No trailing newline: the file holds exactly the one line.
  writeFileSync(join(dir, "entry.txt"), CONFESSION, "utf8");
}

main();
