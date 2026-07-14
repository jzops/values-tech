// Pulls the latest committed content from GitHub `main` before every build.
//
// Why this exists: the daily content routine pushes new stances/stats to
// GitHub, but Replit Autoscale builds from the Repl's own workspace — which
// does not automatically pull from GitHub. Without this step a Republish can
// rebuild stale content. Running as `prebuild`, this fetches the canonical
// content files from GitHub `main` so every Republish serves current data,
// no manual `git pull` in the Repl required.
//
// Fail-soft by design: any fetch error leaves the existing file untouched and
// the build proceeds, so a transient network blip never breaks a deploy.

import { writeFile } from "node:fs/promises";

const REPO = "jzops/values-tech";
const BRANCH = "main";
const FILES = [
  "src/lib/mock-data.ts",
  "src/data/companies.ts",
  "src/data/companies-extended.ts",
  "src/data/companies-more.ts",
  "src/data/vcs.ts",
  "src/data/vcs-extended.ts",
];

const base = `https://raw.githubusercontent.com/${REPO}/${BRANCH}/`;

let refreshed = 0;
for (const file of FILES) {
  try {
    const res = await fetch(`${base}${file}?t=${Date.now()}`, { cache: "no-store" });
    if (!res.ok) {
      console.warn(`[sync-content] skip ${file}: HTTP ${res.status} — keeping existing`);
      continue;
    }
    const body = await res.text();
    if (body.length < 50) {
      console.warn(`[sync-content] skip ${file}: response too small (${body.length}b) — keeping existing`);
      continue;
    }
    await writeFile(file, body);
    refreshed++;
    console.log(`[sync-content] synced ${file} (${body.length}b)`);
  } catch (err) {
    console.warn(`[sync-content] error ${file}: ${err.message} — keeping existing`);
  }
}
console.log(`[sync-content] done: ${refreshed}/${FILES.length} files refreshed from GitHub ${BRANCH}`);
