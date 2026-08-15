import { ExternalLink } from "lucide-react";

const athleticCalendarEmbed = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <style>
    :root { color-scheme: light; }
    * { box-sizing: border-box; }
    body { margin: 0; padding: 18px; background: #fff; color: #171717; font-family: Arial, Helvetica, sans-serif; }
    #ANETxcCAL_Container { width: 100%; }
    #ANETxcCAL_Container table { width: 100%; border-collapse: collapse; font-family: Arial, Helvetica, sans-serif; font-size: 14px; border: 0; }
    #ANETxcCAL_Container td { padding: 16px 12px; border-bottom: 1px solid #d9d9d9; vertical-align: top; }
    .ANETxcCAL_SeasonTitle { color: #2f5f98; font-size: 22px; font-weight: 700; }
    .ANETxcCAL_MeetDate { width: 120px; color: #676767; font-weight: 700; }
    .ANETxcCAL_MeetTitle a { color: #1d3d6e; font-weight: 700; text-decoration: none; }
    .ANETxcCAL_MeetTitle a:hover { text-decoration: underline; }
    .ANETxcCAL_MoreInfo { color: #676767; font-style: normal; line-height: 1.5; }
  </style>
</head>
<body>
  <script src="https://www.athletic.net/api/1/RemoteHTML.ashx?Report=XCCalendar1&Style=1&SchoolID=1101&Season=2026" type="text/javascript"></script>
</body>
</html>`;

export function AthleticCalendarPage() {
  return (
    <div className="content-page">
      <header className="page-head">
        <p className="eyebrow">The season</p>
        <h1>Calendar</h1>
        <p className="lede">The official 2026 Bellarmine Cross Country race calendar, synced from Athletic.net.</p>
      </header>

      <section className="document-card">
        <div>
          <ExternalLink />
          <h2>2026 race schedule</h2>
          <p>
            Meet dates and race information come directly from Athletic.net. Select a meet name to open its event page for location and additional details.
          </p>
          <a
            className="text-link"
            href="https://www.athletic.net/team/1101/cross-country/2026"
            target="_blank"
            rel="noreferrer"
          >
            Open Athletic.net <ExternalLink />
          </a>
        </div>
        <iframe
          srcDoc={athleticCalendarEmbed}
          title="Bellarmine Cross Country 2026 Athletic.net calendar"
          sandbox="allow-scripts allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation"
        />
      </section>

      <div className="calendar-footer">
        <p>Race dates and meet information update whenever Bellarmine changes its team calendar on Athletic.net.</p>
        <a
          className="text-link"
          href="https://www.athletic.net/team/1101/cross-country/2026"
          target="_blank"
          rel="noreferrer"
        >
          Full schedule & results <ExternalLink />
        </a>
      </div>
    </div>
  );
}
