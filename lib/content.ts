export const navigation = [
  { slug: "about", label: "About" },
  { slug: "calendar", label: "Calendar" },
  { slug: "meet-info", label: "Meet Info" },
  { slug: "useful-links", label: "Useful Links" },
  { slug: "photos", label: "Photos" },
] as const;

export const usefulLinks = [
  { name: "Athletic.net", href: "https://www.athletic.net/team/1101/cross-country/2025", description: "Team schedules, meet links, historical race times, and each runner’s career profile." },
  { name: "MileSplit", href: "https://ca.milesplit.com", description: "Cross country news, articles, and invitational meet information." },
  { name: "PrepCalTrack", href: "https://prepcaltrack.com", description: "California track and cross country articles, with occasional meet photography." },
  { name: "XCStats", href: "https://www.xcstats.com/team_page.php?school_id=839", description: "Historical runner and team data, plus summer mileage logging for athletes." },
] as const;

export const timingLinks = [
  { name: "TrackScoreBoard", href: "https://rt.trackscoreboard.com", description: "Used for WCAL, CCS, and State results." },
  { name: "Finished Results", href: "https://www.finishedresults.com", description: "A regular source for invitational results, including Clovis." },
  { name: "AthleticLIVE", href: "https://live.athletic.net/meet-list", description: "Live results from Athletic.net timing partners." },
] as const;

export type Album = { meet: string; groups: { name: string; href: string }[] };

export const photoArchives: Record<"2024" | "2023", Album[]> = {
  "2024": [
    { meet: "Lowell Invitational", groups: [
      { name: "Combined", href: "https://photos.app.goo.gl/kiHYtuwmcg9YyJmt5" },
      { name: "Varsity", href: "https://photos.app.goo.gl/sDdtKnstYUdF4iDg7" },
    ] },
    { meet: "Baylands Invitational", groups: [{ name: "Sophomores", href: "https://photos.app.goo.gl/fZRx8CSSS8hVn2S97" }] },
    { meet: "WCAL 1", groups: [
      { name: "Frosh", href: "https://photos.app.goo.gl/Mus62H7MmaJ73X9aA" },
      { name: "Sophomores", href: "https://photos.app.goo.gl/MwCZ7j4UbYx1Ttv99" },
      { name: "JV", href: "https://photos.app.goo.gl/jHcL6vgVPkjtyNF38" },
      { name: "Varsity", href: "https://photos.app.goo.gl/cCWC3B6QS1jXYSX98" },
    ] },
    { meet: "Ram Invitational", groups: [
      { name: "JV", href: "https://photos.app.goo.gl/BntUfwLaJrQQmMWJA" },
      { name: "Varsity", href: "https://photos.app.goo.gl/93W8y6d3R2WahWBGA" },
      { name: "Combined", href: "https://photos.app.goo.gl/dH5dGR1hdsa7xWma7" },
    ] },
    { meet: "Clovis Invite", groups: [{ name: "Varsity", href: "https://photos.app.goo.gl/GfHK89PboC4tcqx89" }] },
    { meet: "WCAL 2", groups: [{ name: "Varsity", href: "https://photos.app.goo.gl/VLVcM8xm4VLcWiLf6" }] },
    { meet: "CCS", groups: [{ name: "Varsity", href: "https://photos.app.goo.gl/6tFr7R3P4VJYLSuL8" }] },
    { meet: "State", groups: [{ name: "Varsity", href: "https://photos.app.goo.gl/Y1Yi2FzZSr22PvoP8" }] },
  ],
  "2023": [
    { meet: "Lowell Invitational", groups: [
      { name: "Frosh", href: "https://photos.app.goo.gl/ZL3chpRaBZsqJiGM6" },
      { name: "Varsity", href: "https://photos.app.goo.gl/zFusbMpkvLftJbpj9" },
    ] },
    { meet: "Ram Invitational", groups: [
      { name: "Frosh", href: "https://photos.app.goo.gl/8Bx9ocEn4TpFoFuQ8" },
      { name: "Varsity", href: "https://photos.app.goo.gl/EdpnB8ZH4kN8q5Xo6" },
    ] },
    { meet: "Clovis Invite", groups: [{ name: "Varsity", href: "https://photos.app.goo.gl/9vLVzYzqxM8DppG29" }] },
    { meet: "WCAL 2", groups: [
      { name: "JV", href: "https://photos.app.goo.gl/oeLk4evxBPjq989g6" },
      { name: "Varsity", href: "https://photos.app.goo.gl/7BuxwyoYHYh1n8a59" },
    ] },
    { meet: "WCAL 3", groups: [
      { name: "Frosh", href: "https://photos.app.goo.gl/WeA9mKxU1QVsV7Ga9" },
      { name: "Group Photos & Varsity", href: "https://photos.app.goo.gl/QiRdZh32JG15TW1A7" },
    ] },
    { meet: "CCS", groups: [{ name: "Varsity", href: "https://photos.app.goo.gl/K3wFpsLiETaKXLjk9" }] },
    { meet: "State", groups: [{ name: "Varsity", href: "https://photos.app.goo.gl/ZenYJigKtwTwNtrW6" }] },
  ],
};

export const meetTypes = [
  { title: "Invitationals", text: "Meets that Bell competes in outside of league competition. Most are open to the whole team, though a few are varsity-only. They are generally held on weekends, and athletes are expected to attend unless they have communicated otherwise with a coach." },
  { title: "WCALs", text: "The three league events are WCAL 1, WCAL 2, and WCAL 3 (League Finals). Traditional venues are Golden Gate Park, Baylands Park in Sunnyvale, and Crystal Springs in Belmont. Team scores determine league champions at the Freshman, Sophomore, JV, and Varsity levels." },
  { title: "CCS", text: "A varsity-only postseason race, also run at Crystal Springs. California cross country divisions are based on school enrollment; Bellarmine has historically competed in Division I." },
  { title: "State", text: "Varsity must finish in the top three at CCS Division I to qualify. The California State Meet is held each year at Woodward Park in Fresno, usually on the Saturday after Thanksgiving." },
] as const;
