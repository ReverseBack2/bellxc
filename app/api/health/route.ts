import { getCalendarEvents } from "@/lib/events";

export const dynamic = "force-dynamic";

export function GET() {
  try {
    const events = getCalendarEvents();
    return Response.json({ status: "ok", events: events.length });
  } catch (error) {
    return Response.json(
      { status: "error", message: error instanceof Error ? error.message : "Calendar content could not be read." },
      { status: 500 },
    );
  }
}
