import records from "@/data/course-records.json";
import styles from "./course-records.module.css";

type RecordRow = {
  rank: number;
  runner: string;
  runnerId: number;
  gradYear: number | null;
  gradeAtRace: string;
  time: string;
  date: string;
  event: string;
  eventNum: number;
  sourceUrl: string;
};

type RaceCourse = {
  race: string;
  course: string;
  distanceMiles: string;
  categories: string[];
  performanceCount: number;
  uniqueRunnerCount: number;
  records: Partial<Record<string, RecordRow[]>>;
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function cleanCourseName(value: string) {
  return value.replace(/\s*\(\s*Map\s*\)\s*$/i, "").trim();
}

function displayDate(value: string) {
  const [month, day, shortYear] = value.split("/");
  if (!month || !day || !shortYear) return value;
  const year = Number(shortYear);
  if (!Number.isFinite(year)) return value;
  const fullYear = year <= 30 ? 2000 + year : 1900 + year;
  return `${month}/${day}/${fullYear}`;
}

export function CourseRecordsPage() {
  const races = records.courses as unknown as RaceCourse[];

  return (
    <div className={styles.page}>
      <header className={styles.head}>
        <p className={styles.eyebrow}>Bellarmine history</p>
        <h1>Course Records</h1>
        <p className={styles.lede}>
          The fastest verified Bellarmine performances in the XCStats archive, organized by race name, course, and distance.
        </p>
      </header>

      <aside className={styles.method}>
        <strong>How the lists work</strong>
        <p>
          Different races at the same venue are kept separate. Each runner appears once per list with his fastest qualifying performance in that race. Freshman and Sophomore class records use grade at race even when an athlete races up. Baylands Invitational is organized by grade, so its lists are Freshman, Sophomore, Junior, and Senior rather than JV and Varsity. Other meets use the applicable XCStats race squads.
        </p>
      </aside>

      <nav className={styles.index} aria-label="Race record sections">
        <h2>Races</h2>
        <div className={styles.courseLinks}>
          {races.map((race) => {
            const id = slugify(`${race.race}-${race.course}-${race.distanceMiles}`);
            return (
              <a key={id} href={`#${id}`}>
                <strong>{race.race}</strong>
                <span>{cleanCourseName(race.course)} · {race.distanceMiles} mi</span>
              </a>
            );
          })}
        </div>
      </nav>

      {races.map((race) => {
        const id = slugify(`${race.race}-${race.course}-${race.distanceMiles}`);
        return (
          <section className={styles.course} id={id} key={id}>
            <div className={styles.courseHead}>
              <h2>{race.race}</h2>
              <div className={styles.courseMeta}>
                <strong>{cleanCourseName(race.course)} · {race.distanceMiles} miles</strong>
                {race.performanceCount.toLocaleString()} performances · {race.uniqueRunnerCount.toLocaleString()} runners
              </div>
            </div>

            <div className={styles.groups}>
              {race.categories.map((category, categoryIndex) => {
                const rows = race.records[category] ?? [];
                return (
                  <details className={styles.group} key={category} open={categoryIndex === 0}>
                    <summary>
                      <span>{category} Top 10</span>
                      <span className={styles.count}>{rows.length} verified</span>
                    </summary>
                    {rows.length ? (
                      <div className={styles.tableWrap}>
                        <table className={styles.table}>
                          <thead>
                            <tr>
                              <th>Rank</th>
                              <th>Runner</th>
                              <th>Time</th>
                              <th>Grad</th>
                              <th>Date</th>
                            </tr>
                          </thead>
                          <tbody>
                            {rows.map((row) => (
                              <tr key={`${category}-${row.runnerId}`}>
                                <td className={styles.rank}>{row.rank}</td>
                                <td className={styles.runner}>
                                  <a href={row.sourceUrl} target="_blank" rel="noreferrer">{row.runner}</a>
                                </td>
                                <td className={styles.time}>{row.time}</td>
                                <td className={styles.year}>{row.gradYear ?? "—"}</td>
                                <td className={styles.date}>{displayDate(row.date)}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <p className={styles.empty}>No verified performances for this category in the XCStats archive.</p>
                    )}
                  </details>
                );
              })}
            </div>
          </section>
        );
      })}

      <footer className={styles.source}>
        Source: <a href="https://www.xcstats.com/team_page.php?school_id=839" target="_blank" rel="noreferrer">XCStats Bellarmine team history</a>. The generated archive covers {records.generatedFrom.seasonsFound.length} seasons and {records.generatedFrom.eventCount.toLocaleString()} indexed Bellarmine events. Historical records reflect the results available in XCStats and may be expanded if additional older results are added to that archive.
      </footer>
    </div>
  );
}
