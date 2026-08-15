import { ExternalLink, MapPin } from "lucide-react";

const races = [
  {
    date: "2026-09-04",
    title: "Baylands Invite",
    location: "Baylands Park, Sunnyvale, CA",
    locationUrl: "https://www.google.com/maps/search/?api=1&query=Baylands+Park+Sunnyvale+CA",
  },
  {
    date: "2026-09-12",
    title: "St Francis Invitational",
    location: "St. Francis / event venue",
    locationUrl: "https://www.google.com/maps/search/?api=1&query=St+Francis+Invitational+Cross+Country+California",
  },
  {
    date: "2026-09-19",
    title: "Viking Invitational",
    location: "Event venue",
    locationUrl: "https://www.google.com/maps/search/?api=1&query=Viking+Invitational+Cross+Country+California",
  },
  {
    date: "2026-09-26",
    title: "SFU Apple Classic",
    location: "Event venue",
    locationUrl: "https://www.google.com/maps/search/?api=1&query=SFU+Apple+Classic+Cross+Country+California",
  },
  {
    date: "2026-10-03",
    title: "Artichoke Invite",
    location: "Half Moon Bay, CA",
    locationUrl: "https://www.google.com/maps/search/?api=1&query=Artichoke+Invitational+Half+Moon+Bay+CA",
  },
  {
    date: "2026-10-15",
    title: "WCAL II",
    location: "Baylands Park, Sunnyvale, CA",
    locationUrl: "https://www.google.com/maps/search/?api=1&query=Baylands+Park+Sunnyvale+CA",
  },
  {
    date: "2026-10-23",
    title: "Clovis North Twilight Invitational",
    location: "Clovis North High School, Fresno, CA",
    locationUrl: "https://www.google.com/maps/search/?api=1&query=Clovis+North+High+School+Fresno+CA",
  },
  {
    date: "2026-11-02",
    title: "WCAL Championship",
    location: "Crystal Springs Cross Country Course, Belmont, CA",
    locationUrl: "https://www.google.com/maps/search/?api=1&query=Crystal+Springs+Cross+Country+Course+Belmont+CA",
  },
  {
    date: "2026-11-14",
    title: "CCS Championships",
    location: "Crystal Springs Cross Country Course, Belmont, CA",
    locationUrl: "https://www.google.com/maps/search/?api=1&query=Crystal+Springs+Cross+Country+Course+Belmont+CA",
  },
  {
    date: "2026-11-28",
    title: "CIF State Cross Country Championship",
    location: "Woodward Park, Fresno, CA",
    locationUrl: "https://www.google.com/maps/search/?api=1&query=Woodward+Park+Fresno+CA",
  },
] as const;

const athleticNetUrl = "https://www.athletic.net/team/1101/cross-country/2026";

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
                <a className="text-link" href={athleticNetUrl} target="_blank" rel="noreferrer">
                  Athletic.net details <ExternalLink />
                </a>
              </div>
            </article>
          );
        })}
      </section>

      <div className="calendar-footer">
        <p>Schedule synced to the races currently shown on Bellarmine's 2026 Athletic.net team calendar.</p>
        <a className="text-link" href={athleticNetUrl} target="_blank" rel="noreferrer">
          Full Athletic.net calendar <ExternalLink />
        </a>
      </div>
    </div>
  );
}
