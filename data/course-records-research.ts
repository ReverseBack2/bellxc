export type CourseRecord = {
  rank: number;
  runner: string;
  gradYear: number;
  time: string;
  date: string;
  event: string;
};

export type CourseRecordResearch = {
  course: string;
  distance: string;
  source: string;
  verifiedThrough: string;
  overall: CourseRecord[];
};

// Research branch only. Do not surface this file on the public site until
// course configurations and division-specific lists have been verified.
export const courseRecordResearch: CourseRecordResearch[] = [
  {
    course: "Baylands Park",
    distance: "3.1 miles",
    source: "XCStats Bellarmine all-time course report (school_id=839, cd_id=514)",
    verifiedThrough: "2025 XCStats indexed results; top positions cross-checked against 2025 WCAL #2 records",
    overall: [
      { rank: 1, runner: "Meika Beaudoin-Rousseau", gradYear: 2018, time: "15:11.4", date: "10/4/17", event: "WCAL #1" },
      { rank: 2, runner: "Nolan Topper", gradYear: 2021, time: "15:20.5", date: "3/24/21", event: "WCAL #2" },
      { rank: 3, runner: "Stephen Sziebert", gradYear: 2026, time: "15:32.7", date: "10/16/25", event: "WCAL #2" },
      { rank: 4, runner: "Galen Topper", gradYear: 2021, time: "15:39.7", date: "3/24/21", event: "WCAL #2" },
      { rank: 5, runner: "Shrey Chettiar", gradYear: 2025, time: "15:41.5", date: "10/17/24", event: "WCAL #2" },
      { rank: 6, runner: "Alex Scales", gradYear: 2018, time: "15:47.8", date: "10/4/17", event: "WCAL #1" },
      { rank: 7, runner: "Devansh Shah", gradYear: 2025, time: "15:50.7", date: "10/17/24", event: "WCAL #2" },
      { rank: 8, runner: "Matthew Richardson", gradYear: 2017, time: "15:56.2", date: "10/1/15", event: "WCAL #1" },
      { rank: 9, runner: "Dylan Doblar", gradYear: 2017, time: "15:58.1", date: "10/1/15", event: "WCAL #1" },
      { rank: 10, runner: "Raymond Meijer", gradYear: 2013, time: "16:02", date: "10/3/12", event: "WCAL #1" },
    ],
  },
  {
    course: "Westmoor HS '18",
    distance: "2.4 miles",
    source: "XCStats Bellarmine all-time course report (school_id=839, cd_id=1576)",
    verifiedThrough: "XCStats indexed report crawled 2026",
    overall: [
      { rank: 1, runner: "Daniel Vaca", gradYear: 2021, time: "12:53", date: "9/28/19", event: "Ram Invitational" },
      { rank: 1, runner: "Matt Eckstrom", gradYear: 2020, time: "12:53", date: "9/28/19", event: "Ram Invitational" },
      { rank: 3, runner: "Ben Callon", gradYear: 2021, time: "12:54", date: "9/28/19", event: "Ram Invitational" },
      { rank: 4, runner: "Casper Aliaga", gradYear: 2021, time: "12:59", date: "9/29/18", event: "Ram Invitational" },
      { rank: 5, runner: "Tristan Lalonde", gradYear: 2022, time: "13:00", date: "9/28/19", event: "Ram Invitational" },
      { rank: 6, runner: "James Cuff-alvarado", gradYear: 2020, time: "13:04", date: "9/28/19", event: "Ram Invitational" },
      { rank: 7, runner: "Jack Glanville", gradYear: 2022, time: "13:08", date: "9/28/19", event: "Ram Invitational" },
      { rank: 8, runner: "Holden Duflock", gradYear: 2020, time: "13:12", date: "9/29/18", event: "Ram Invitational" },
      { rank: 9, runner: "Weston Raynak", gradYear: 2020, time: "13:16", date: "9/29/18", event: "Ram Invitational" },
      { rank: 10, runner: "Miller Craycraft", gradYear: 2019, time: "13:19", date: "9/29/18", event: "Ram Invitational" },
    ],
  },
];
