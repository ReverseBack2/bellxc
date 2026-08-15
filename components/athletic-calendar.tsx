import { ExternalLink, MapPin } from "lucide-react";

const races = [
  {
    date: "2026-09-04",
    title: "Baylands Invitational",
    location: "Baylands Park, Sunnyvale, CA",
    locationUrl: "https://www.google.com/maps/search/?api=1&query=Baylands+Park+Sunnyvale+CA",
    eventUrl: "https://www.athletic.net/team/1101/cross-country/2026",
  },
  {
    date: "2026-09-12",
    title: "Lowell Invitational",
    location: "Golden Gate Park, San Francisco, CA",
    locationUrl: "https://www.google.com/maps/search/?api=1&query=Golden+Gate+Park+San+Francisco+CA",
    eventUrl: "https://www.athletic.net/team/1101/cross-country/2026",
  },
  {
    date: "2026-10-10",
    title: "Clovis Invitational",
    location: "Woodward Park, Fresno, CA",
    locationUrl: "https://www.google.com/maps/search/?api=1&query=Woodward+Park+Fresno+CA",
    eventUrl: "https://www.athletic.net/team/1101/cross-country/2026",
  },
  {
    date: "2026-10-15",
    title: "WCAL II",
    location: "Baylands Park, Sunnyvale, CA",
    locationUrl: "https://www.google.com/maps/search/?api=1&query=Baylands+Park+Sunnyvale+CA",
    eventUrl: "https://www.athletic.net/team/1101/cross-country/2026",
  },
  {
    date: "2026-10-23",
    title: "Clovis North Twilight Invitational",
    location: "Clovis North High School, Fresno, CA",
    locationUrl: "https://www.google.com/maps/search/?api=1&query=Clovis+North+High+School+Fresno+CA",
    eventUrl: "https://www.athletic.net/Help/CrossCountry.aspx?Meet=273393",
  },
  {
    date: "2026-11-14",
    title: "CCS Championships",
    location: "Crystal Springs Cross Country Course, Belmont, CA",
    locationUrl: "https://www.google.com/maps/search/?api=1&query=Crystal+Springs+Cross+Country+Course+Belmont+CA",
    eventUrl: "https://www.athletic.net/team/1101/cross-country/2026",
  },
  {
    date: "2026-11-28",
    title: "CIF State Cross Country Championship",
    location: "Woodward Park, Fresno, CA",
    locationUrl: "https://www.google.com/maps/search/?api=1&query=Woodward+Park+Fresno+CA",
    eventUrl: "https://www.athletic.net/team/1101/cross-country/2026",
  },
] as const;

export function AthleticCalendarPage() {
  return (
    <div className="content-page">
      <header className="page-head">
        <p className="eyebrow">The season</p>
        <h1>Calendar</h1>
        <p className="lede">2026 Bellarmine Cross Country race dates currently posted for the season.</p>
      </header>

      <section className="event-list">
        {races.map((race) => {
          const date = new Date(`${race.date}T12:00:00`);
          return (
            <article key={`${race.date}-${race.title}`}>
              <time dateTime={race.date}>
                <span>{date.toLocaleDateString("en-US", { month: "short" })}</span>
                <strong>{date.getDate()}</strong>
                <em>{date.toLocaleDateString("en-US", { weekday: "short" })}</em>
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
        <p>This page lists the 2026 races currently confirmed from public schedule information. Athletic.net remains the source for the latest team additions and changes.</p>
        <a className="text-link" href="https://www.athletic.net/team/1101/cross-country/2026" target="_blank" rel="noreferrer">
          Full Athletic.net calendar <ExternalLink />
        </a>
      </div>
    </div>
  );
}
