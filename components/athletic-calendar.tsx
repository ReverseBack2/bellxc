import { ExternalLink, MapPin } from "lucide-react";

const athleticNetUrl = "https://www.athletic.net/team/1101/cross-country/2026";

const races = [
  {
    date: "2026-08-22",
    title: "Steps4SMILEs 5k/10k Charity Race",
    location: "Baylands Park, 999 E Caribbean Dr, Sunnyvale, CA",
    locationUrl: "https://www.google.com/maps/search/?api=1&query=999+E+Caribbean+Dr+Sunnyvale+CA+94089",
    eventUrl: "https://www.athletic.net/CrossCountry/meet/278731",
  },
  {
    date: "2026-09-04",
    title: "Baylands Invitational",
    location: "Baylands Park, Sunnyvale, CA",
    locationUrl: "https://www.google.com/maps/search/?api=1&query=Baylands+Park+Sunnyvale+CA",
    eventUrl: "https://www.athletic.net/CrossCountry/meet/273592",
  },
  {
    date: "2026-09-23",
    title: "WCAL I",
    location: "Polo Fields, Golden Gate Park, San Francisco, CA",
    locationUrl: "https://www.google.com/maps/search/?api=1&query=Polo+Fields+Golden+Gate+Park+San+Francisco+CA",
    eventUrl: athleticNetUrl,
  },
  {
    date: "2026-09-26",
    title: "RAM Invitational",
    location: "Westmoor High School, Daly City, CA",
    locationUrl: "https://www.google.com/maps/search/?api=1&query=Westmoor+High+School+Daly+City+CA",
    eventUrl: "https://www.athletic.net/CrossCountry/meet/276451",
  },
  {
    date: "2026-10-09",
    endDate: "2026-10-10",
    title: "47th Asics Clovis Invitational",
    location: "Woodward Park, Fresno, CA",
    locationUrl: "https://www.google.com/maps/search/?api=1&query=Woodward+Park+Fresno+CA",
    eventUrl: "https://www.athletic.net/CrossCountry/meet/274719",
  },
  {
    date: "2026-10-10",
    title: "Crystal Springs Invitational",
    location: "Crystal Springs Cross Country Course, Belmont, CA",
    locationUrl: "https://www.google.com/maps/search/?api=1&query=Crystal+Springs+Cross+Country+Course+Belmont+CA",
    eventUrl: athleticNetUrl,
  },
  {
    date: "2026-10-15",
    title: "WCAL II",
    location: "Baylands Park, Sunnyvale, CA",
    locationUrl: "https://www.google.com/maps/search/?api=1&query=Baylands+Park+Sunnyvale+CA",
    eventUrl: "https://www.athletic.net/CrossCountry/meet/274263",
  },
  {
    date: "2026-10-23",
    title: "Clovis North Twilight Invitational",
    location: "Clovis North High School, 2770 E International Ave, Fresno, CA",
    locationUrl: "https://www.google.com/maps/search/?api=1&query=2770+E+International+Ave+Fresno+CA+93730",
    eventUrl: "https://www.athletic.net/CrossCountry/meet/273393",
  },
  {
    date: "2026-11-04",
    title: "WCAL Championship",
    location: "Crystal Springs Cross Country Course, Belmont, CA",
    locationUrl: "https://www.google.com/maps/search/?api=1&query=Crystal+Springs+Cross+Country+Course+Belmont+CA",
    eventUrl: "https://www.athletic.net/CrossCountry/meet/274262",
  },
  {
    date: "2026-11-14",
    title: "2026 CIF Central Coast Section Championships",
    location: "Crystal Springs Cross Country Course, Belmont, CA",
    locationUrl: "https://www.google.com/maps/search/?api=1&query=Crystal+Springs+Cross+Country+Course+Belmont+CA",
    eventUrl: "https://www.athletic.net/CrossCountry/meet/274261",
  },
  {
    date: "2026-11-28",
    title: "CIF State Cross Country Championship",
    location: "Woodward Park, Fresno, CA",
    locationUrl: "https://www.google.com/maps/search/?api=1&query=Woodward+Park+Fresno+CA",
    eventUrl: "https://www.athletic.net/CrossCountry/meet/273403",
  },
] as const;

export function AthleticCalendarPage() {
  return (
    <div className="content-page">
      <header className="page-head">
        <p className="eyebrow">The season</p>
        <h1>Calendar</h1>
        <p className="lede">2026 Bellarmine Cross Country race dates currently posted on Athletic.net.</p>
      </header>

      <section className="event-list">
        {races.map((race) => {
          const start = new Date(`${race.date}T12:00:00`);
          const end = "endDate" in race ? new Date(`${race.endDate}T12:00:00`) : null;
          const dayLabel = end ? `${start.getDate()}–${end.getDate()}` : String(start.getDate());
          const weekdayLabel = end
            ? `${start.toLocaleDateString("en-US", { weekday: "short" })}–${end.toLocaleDateString("en-US", { weekday: "short" })}`
            : start.toLocaleDateString("en-US", { weekday: "short" });

          return (
            <article key={`${race.date}-${race.title}`}>
              <time dateTime={race.date}>
                <span>{start.toLocaleDateString("en-US", { month: "short" })}</span>
                <strong>{dayLabel}</strong>
                <em>{weekdayLabel}</em>
              </time>
              <div className="event-copy">
                <div><span>Race</span></div>
                <h2>{race.title}</h2>
                <p>
                  <a href={race.locationUrl} target="_blank" rel="noreferrer">
                    <MapPin style={{ width: 16, height: 16, verticalAlign: "text-bottom", marginRight: 7 }} />
                    {race.location}
                  </a>
                </p>
                <a className="text-link" href={race.eventUrl} target="_blank" rel="noreferrer">
                  Athletic.net details <ExternalLink />
                </a>
              </div>
            </article>
          );
        })}
      </section>

      <div className="calendar-footer">
        <p>Schedule matched to the races currently shown on Bellarmine's 2026 Athletic.net team calendar.</p>
        <a className="text-link" href={athleticNetUrl} target="_blank" rel="noreferrer">
          Full Athletic.net calendar <ExternalLink />
        </a>
      </div>
    </div>
  );
}
