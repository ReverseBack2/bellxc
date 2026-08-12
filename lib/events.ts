import fs from "node:fs";
import path from "node:path";

export type CalendarEvent = {
  slug: string;
  title: string;
  date: string;
  time: string;
  location: string;
  category: string;
  example: boolean;
  details: string;
};

const eventsDirectory = path.join(process.cwd(), "content", "events");

function parseEventFile(filename: string): CalendarEvent {
  const raw = fs.readFileSync(path.join(eventsDirectory, filename), "utf8");
  const match = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) throw new Error(`${filename} is missing YAML-style frontmatter.`);

  const fields = Object.fromEntries(
    match[1].split("\n").filter(Boolean).map((line) => {
      const separator = line.indexOf(":");
      return [line.slice(0, separator).trim(), line.slice(separator + 1).trim().replace(/^['"]|['"]$/g, "")];
    }),
  );

  for (const required of ["title", "date", "time", "location", "category"]) {
    if (!fields[required]) throw new Error(`${filename} is missing the '${required}' field.`);
  }

  return {
    slug: filename.replace(/\.md$/, ""),
    title: fields.title,
    date: fields.date,
    time: fields.time,
    location: fields.location,
    category: fields.category,
    example: fields.example === "true",
    details: match[2].trim(),
  };
}

export function getCalendarEvents(): CalendarEvent[] {
  if (!fs.existsSync(eventsDirectory)) return [];
  return fs.readdirSync(eventsDirectory)
    .filter((filename) => filename.endsWith(".md"))
    .map(parseEventFile)
    .sort((a, b) => a.date.localeCompare(b.date));
}
