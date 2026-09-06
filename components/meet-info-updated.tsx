import Link from "next/link";
import { ArrowUpRight, FileText, Flag, Trophy, Users } from "lucide-react";

const PageHead = ({ eyebrow, title, intro }: { eyebrow: string; title: string; intro?: string }) => (
  <header className="page-head"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1>{intro && <p className="lede">{intro}</p>}</header>
);

export function MeetInfoPage() {
  return (
    <div className="content-page">
      <PageHead eyebrow="Race day, decoded" title="Meet info" intro="New to cross country? Start here for quick guides to meets, uniforms, scoring, and what to expect." />
      <section className="feature-links">
        <Link href="/meet101"><span className="icon-box"><Flag /></span><span><small>Start here</small><strong>Meet 101</strong><em>A practical parent and runner guide</em></span><ArrowUpRight /></Link>
        <Link href="/uniform101"><span className="icon-box"><FileText /></span><span><small>Race-day kit</small><strong>XC Uniform 101</strong><em>Singlet, shorts, shoes, warmups & gear</em></span><ArrowUpRight /></Link>
        <Link href="/scoring101"><span className="icon-box"><Users /></span><span><small>How points work</small><strong>XC Scoring 101</strong><em>Places, top five, blockers & tiebreaks</em></span><ArrowUpRight /></Link>
        <Link href="/meet-types"><span className="icon-box"><Trophy /></span><span><small>Know the season</small><strong>Meet Types</strong><em>Invitationals, WCAL, CCS, and State</em></span><ArrowUpRight /></Link>
      </section>
    </div>
  );
}

export function Scoring101Page() {
  const scoringSteps = [
    {
      icon: Flag,
      title: "Individual score",
      text: "Every runner earns an individual placement based on speed. In the September 2026 guide, that individual place is the blue number on the far left of the results.",
    },
    {
      icon: Users,
      title: "Team score",
      text: "A team needs at least five runners to earn a team score. Runners from teams with fewer than five still receive an individual place, but they are skipped in team scoring.",
    },
    {
      icon: Trophy,
      title: "The first five count",
      text: "Each team’s first seven runners receive placement scores. The places of the first five finishers are added together to calculate the team score.",
    },
    {
      icon: FileText,
      title: "Six and seven are blockers",
      text: "The sixth and seventh runners do not add to the five-runner total, but their places still matter because they push competitors behind them to higher team scores.",
    },
  ];

  return (
    <div className="content-page">
      <PageHead eyebrow="Cross country scoring" title="XC Scoring 101" intro="How individual finishes turn into a team result—and why runners six and seven still matter." />
      <section className="types-grid">
        {scoringSteps.map((item, i) => {
          const Icon = item.icon;
          return <article key={item.title}><span className="number">0{i + 1}</span><Icon /><h2>{item.title}</h2><p>{item.text}</p></article>;
        })}
      </section>
      <aside className="callout">
        <span>Lowest score wins</span>
        <p>The winning team has the lowest total score. If two teams tie, the winner is determined by the sixth runner’s score.</p>
        <p>In the guide’s example, Bellarmine’s top five team places are 2nd, 4th, 5th, 6th and 7th: 2 + 4 + 5 + 6 + 7 = 24.</p>
      </aside>
      <section className="link-section">
        <h2>Examples from the guide</h2>
        <p className="section-intro">Jonathan Ho finished 4th individually, but his team had fewer than five runners, so he was skipped in the team scoring. Gavin Borer was Bellarmine’s sixth finisher and took 10th place for team scoring; his point did not enter Bellarmine’s total, but every team finisher behind him received a place one point higher.</p>
      </section>
    </div>
  );
}
