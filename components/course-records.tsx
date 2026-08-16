import records from "@/data/course-records.json";
import styles from "./course-records.module.css";

const categories = ["Overall", "Freshman", "Sophomore", "JV", "Varsity"] as const;

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

type Course = {
  course: string;
  distanceMiles: string;
  performanceCount: number;
  uniqueRunnerCount: number;
  records: Record<(typeof categories)[number], RecordRow[]>;
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
  const courses = records.courses as Course[];

  return (
    <div className={styles.page}>
      <header className={styles.head}>
        <p className={styles.eyebrow}>Bellarmine history</p>
        <h1>Course Records</h1>
        <p className={styles.lede}>
          The fastest verified Bellarmine performances in the XCStats archive, separated by exact course and race distance.
        </p>
      </header>

      <aside className={styles.method}>
        <strong>How the lists work</strong>
        <p>
          Each runner appears once per list with his fastest recorded performance on that exact course configuration. Freshman and Sophomore lists are based on the runner&apos;s grade at the time of the race, so a freshman or sophomore still receives class-record credit even when racing JV or Varsity. JV and Varsity lists use the race squad recorded by XCStats. Different course names or distances are kept separate.
        </p>
      </aside>

      <nav className={styles.index} aria-label="Course record sections">
        <h2>Courses</h2>
        <div className={styles.courseLinks}>
          {courses.map((course) => {
            const id = slugify(`${course.course}-${course.distanceMiles}`);
            return (
              <a key={id} href={`#${id}`}>
                <strong>{cleanCourseName(course.course)}</strong>
                <span>{course.distanceMiles} mi · {course.uniqueRunnerCount} runners</span>
              </a>
            );
          })}
        </div>
      </nav>

      {courses.map((course) => {
        const id = slugify(`${course.course}-${course.distanceMiles}`);
        return (
          <section className={styles.course} id={id} key={id}>
            <div className={styles.courseHead}>
              <h2>{cleanCourseName(course.course)}</h2>
              <div className={styles.courseMeta}>
                <strong>{course.distanceMiles} miles</strong>
                {course.performanceCount.toLocaleString()} performances · {course.uniqueRunnerCount.toLocaleString()} runners
              </div>
            </div>

            <div className={styles.groups}>
              {categories.map((category, categoryIndex) => {
                const rows = course.records[category] ?? [];
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
                              <th>Meet</th>
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
                                <td className={styles.meet}>{row.event}</td>
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
