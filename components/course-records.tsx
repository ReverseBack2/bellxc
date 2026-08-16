"use client";

// Course Records includes years used for each course/distance configuration and canonical meet names.
import { useMemo, useState } from "react";
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
  firstYear?: number;
  lastYear?: number;
  yearsRun?: number[];
  categories: string[];
  performanceCount: number;
  uniqueRunnerCount: number;
  records: Partial<Record<string, RecordRow[]>>;
};

type RaceGroup = {
  race: string;
  variants: RaceCourse[];
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

function yearRange(variant: RaceCourse) {
  if (!variant.firstYear || !variant.lastYear) return "";
  return variant.firstYear === variant.lastYear
    ? `${variant.firstYear}`
    : `${variant.firstYear}–${variant.lastYear}`;
}

function variantLabel(variant: RaceCourse) {
  return `${cleanCourseName(variant.course)} · ${variant.distanceMiles} mi`;
}

function variantDisplayLabel(variant: RaceCourse) {
  const years = yearRange(variant);
  return years ? `${variantLabel(variant)} · ${years}` : variantLabel(variant);
}

export function CourseRecordsPage() {
  const raceCourses = records.courses as unknown as RaceCourse[];
  const groups = useMemo<RaceGroup[]>(() => {
    const grouped = new Map<string, RaceCourse[]>();
    for (const raceCourse of raceCourses) {
      const existing = grouped.get(raceCourse.race) ?? [];
      existing.push(raceCourse);
      grouped.set(raceCourse.race, existing);
    }
    return Array.from(grouped, ([race, variants]) => ({
      race,
      variants: variants.sort((a, b) =>
        variantLabel(a).localeCompare(variantLabel(b), undefined, { numeric: true })
      ),
    }));
  }, [raceCourses]);

  const [selectedVariants, setSelectedVariants] = useState<Record<string, number>>({});

  return (
    <div className={styles.page}>
      <header className={styles.head}>
        <p className={styles.eyebrow}>Bellarmine history</p>
        <h1>Course Records</h1>
        <p className={styles.lede}>
          The fastest verified Bellarmine performances in the XCStats archive, grouped by race with course, distance, and years-used selectors where needed.
        </p>
      </header>

      <aside className={styles.method}>
        <strong>How the lists work</strong>
        <p>
          Each race appears once below. When the same race has used multiple courses or distances, choose the course configuration from the selector in that race section; the years show when that configuration appears in the XCStats archive. Equivalent 5K and 3.1-mile labels are treated as the same distance. Each runner appears once per list with his fastest qualifying performance for that exact race and course configuration. Class-year lists use grade at race even when an athlete races up. Baylands Invitational, Central Coast Section Finals (CCS), and the State meet use Freshman, Sophomore, Junior, and Senior class lists.
        </p>
      </aside>

      <nav className={styles.index} aria-label="Race record sections">
        <h2>Races</h2>
        <div className={styles.courseLinks}>
          {groups.map((group) => {
            const id = slugify(group.race);
            return (
              <a key={group.race} href={`#${id}`}>
                <strong>{group.race}</strong>
                <span>
                  {group.variants.length === 1
                    ? variantDisplayLabel(group.variants[0])
                    : `${group.variants.length} course configurations`}
                </span>
              </a>
            );
          })}
        </div>
      </nav>

      {groups.map((group) => {
        const id = slugify(group.race);
        const selectedIndex = Math.min(selectedVariants[group.race] ?? 0, group.variants.length - 1);
        const race = group.variants[selectedIndex];

        return (
          <section className={styles.course} id={id} key={group.race}>
            <div className={styles.courseHead}>
              <div className={styles.raceTitleBlock}>
                <h2>{group.race}</h2>
                {group.variants.length > 1 ? (
                  <label className={styles.variantPicker}>
                    <span>Course / distance / years</span>
                    <select
                      value={selectedIndex}
                      onChange={(event) =>
                        setSelectedVariants((current) => ({
                          ...current,
                          [group.race]: Number(event.target.value),
                        }))
                      }
                    >
                      {group.variants.map((variant, index) => (
                        <option key={`${variant.course}-${variant.distanceMiles}-${variant.firstYear ?? ""}-${variant.lastYear ?? ""}`} value={index}>
                          {variantDisplayLabel(variant)}
                        </option>
                      ))}
                    </select>
                  </label>
                ) : null}
              </div>

              <div className={styles.courseMeta}>
                <strong>{variantDisplayLabel(race)}</strong>
                {race.performanceCount.toLocaleString()} performances · {race.uniqueRunnerCount.toLocaleString()} runners
              </div>
            </div>

            <div className={styles.groups}>
              {race.categories.map((category, categoryIndex) => {
                const rows = race.records[category] ?? [];
                return (
                  <details className={styles.group} key={`${variantLabel(race)}-${category}`} open={categoryIndex === 0}>
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
