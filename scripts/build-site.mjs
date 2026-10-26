import { mkdir, copyFile, writeFile } from "node:fs/promises";

const output = new URL("../dist/", import.meta.url);
await mkdir(output, { recursive: true });
for (const file of ["index.html", "convite-AE.html"]) {
  await copyFile(new URL(`../${file}`, import.meta.url), new URL(file, output));
}

const supabase = {
  url: process.env.SUPABASE_URL || "",
  anonKey: process.env.SUPABASE_ANON_KEY || "",
};
await writeFile(
  new URL("config.js", output),
  `window.CASAL_SUPABASE = ${JSON.stringify(supabase)};\n`,
  "utf8",
);
console.log(`Shared RSVP backend: ${supabase.url && supabase.anonKey ? "configured" : "not configured"}`);
