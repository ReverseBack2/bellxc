import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Camera, ChevronRight, Clock3, ExternalLink, FileText, Flag, Mountain, Trophy, Users } from "lucide-react";
import { meetTypes, photoArchives, timingLinks, usefulLinks } from "@/lib/content";
import { getCalendarEvents } from "@/lib/events";

const PageHead = ({ eyebrow, title, intro }: { eyebrow: string; title: string; intro?: string }) => (
  <header className="page-head"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1>{intro && <p className="lede">{intro}</p>}</header>
);

export function HomePage() {
  return (
    <>
      <section className="hero">
        <Image src="/images/runner.png" alt="Bellarmine cross country runner on the trail" fill priority sizes="100vw" />
        <div className="hero-shade" />
        <div className="hero-copy"><p className="eyebrow">Bellarmine College Preparatory</p><h1>It’s out<br />there.</h1><p>Find your line. Run as one.</p><Link className="button" href="/about">Meet the team <ChevronRight /></Link></div>
        <p className="hero-index">XC · San Jose, CA</p>
      </section>
      <section className="home-intro">
        <div><p className="eyebrow">The Bellarmine brotherhood</p><h2>More than a team.<br />A village in motion.</h2></div>
        <div><p>Two hundred runners. One shared pursuit. Bellarmine Cross Country is built on the belief that every stride is stronger when we take it together.</p><Link className="text-link" href="/calendar">See the season <ArrowUpRight /></Link></div>
      </section>
    </>
  );
}

export function AboutPage() {
  return <div className="content-page"><PageHead eyebrow="The team" title="Who we are" intro="One of the largest high school cross country programs in the nation—and one close-knit brotherhood." /><section className="about-grid"><div className="image-frame"><Image src="/images/team.jpeg" fill sizes="(max-width: 800px) 100vw, 55vw" alt="Bellarmine Cross Country team gathered together" /></div><div className="prose"><p className="dropcap">Bellarmine Cross Country is an all-boys team of 200–250 members each year. Individuals come together to push, cheer, and support one another—creating not just a team, but a village.</p><p>This collective mentality is fostered from day one each season by our tremendous coaching staff, headed by Coach McCrytsle and Coach Maloney.</p><blockquote>Push one another.<br />Cheer for one another.<br />Run for one another.</blockquote></div></section></div>;
}

export function CalendarPage() {
  const events = getCalendarEvents();
  return <div className="content-page"><PageHead eyebrow="The season" title="Calendar" intro="Meet dates and team events, managed as simple Markdown files in the site repository." /><div className="example-notice"><strong>Demonstration schedule</strong><p>The events below are explicitly fictional examples—not official Bellarmine dates. Replace them with confirmed team information before publishing.</p></div><section className="event-list">{events.map((event) => { const date = new Date(`${event.date}T12:00:00`); return <article key={event.slug}><time dateTime={event.date}><span>{date.toLocaleDateString("en-US", { month: "short" })}</span><strong>{date.getDate()}</strong><em>{date.toLocaleDateString("en-US", { weekday: "short" })}</em></time><div className="event-copy"><div><span>{event.category}</span>{event.example && <b>Example only</b>}</div><h2>{event.title}</h2><p>{event.details}</p><dl><div><dt>Time</dt><dd>{event.time}</dd></div><div><dt>Location</dt><dd>{event.location}</dd></div></dl></div></article>; })}</section><div className="calendar-footer"><p>The latest official race schedule and results are also available through Athletic.net.</p><a className="text-link" href="https://www.athletic.net/team/1101/cross-country/2026" target="_blank" rel="noreferrer">Open Athletic.net <ExternalLink /></a></div></div>;
}

export function MeetInfoPage() {
  return <div className="content-page"><PageHead eyebrow="Race day, decoded" title="Meet info" intro="New to cross country? Start here for a quick guide to how meets work and what to expect." /><section className="feature-links"><Link href="/meet101"><span className="icon-box"><Flag /></span><span><small>Start here</small><strong>Meet 101</strong><em>A practical parent and runner guide</em></span><ArrowUpRight /></Link><Link href="/meet-types"><span className="icon-box"><Trophy /></span><span><small>Know the season</small><strong>Meet Types</strong><em>Invitationals, WCAL, CCS, and State</em></span><ArrowUpRight /></Link></section></div>;
}

export function Meet101Page() {
  return <div className="content-page"><PageHead eyebrow="A field guide" title="Meet 101" intro="The team’s complete guide to arriving, racing, supporting, and making the most of meet day." /><section className="document-card"><div><FileText /><h2>Meet 101 details</h2><p>View the original Bellarmine Cross Country meet-day guide below, or open it in a new tab.</p><a className="text-link" target="_blank" rel="noreferrer" href="https://drive.google.com/file/d/1_-bVa8Re0EKpzW4QI5esuANHBpY04vjn/preview">Open full screen <ArrowUpRight /></a></div><iframe src="https://drive.google.com/file/d/1_-bVa8Re0EKpzW4QI5esuANHBpY04vjn/preview" allow="autoplay" title="Bellarmine XC Meet 101 guide" /></section></div>;
}

export function MeetTypesPage() {
  const icons = [Users, Flag, Mountain, Trophy];
  return <div className="content-page"><PageHead eyebrow="From invitationals to Fresno" title="The different types of meets" intro="The season builds in stages. Here’s how each level fits into the journey." /><section className="types-grid">{meetTypes.map((item, i) => { const Icon = icons[i]; return <article key={item.title}><span className="number">0{i + 1}</span><Icon /><h2>{item.title}</h2><p>{item.text}</p></article>; })}</section></div>;
}

export function UsefulLinksPage() {
  return <div className="content-page"><PageHead eyebrow="Runner resources" title="Useful links" intro="Schedules, history, live results, and key information for runners and families." /><section className="link-section"><h2>Team & race resources</h2><div className="resource-grid">{usefulLinks.map((item) => <a key={item.name} href={item.href} target="_blank" rel="noreferrer"><strong>{item.name}</strong><p>{item.description}</p><ArrowUpRight /></a>)}</div></section><section className="link-section"><h2>Live timing</h2><p className="section-intro">The timing provider changes by meet. The event will usually post which live-results service is being used.</p><div className="resource-grid compact">{timingLinks.map((item) => <a key={item.name} href={item.href} target="_blank" rel="noreferrer"><Clock3 /><strong>{item.name}</strong><p>{item.description}</p><ArrowUpRight /></a>)}</div></section><aside className="callout"><span>California safety policy</span><p>California requires high school sports to monitor and adjust practices based on heat and Wet Bulb Globe Temperature readings.</p><a href="https://cifss.org/wp-content/uploads/2024/07/Acclimatization-23-24.pdf" target="_blank" rel="noreferrer">Read the CIF policy <ArrowUpRight /></a></aside></div>;
}

export function PhotosPage() {
  return <div className="content-page"><PageHead eyebrow="Through the lens" title="Photo archives" intro="Race-day moments, team portraits, and finish-line memories from recent seasons." /><section className="year-grid"><Link href="/photos2024"><span>20</span><strong>24</strong><em>14 galleries</em><Camera /></Link><Link href="/photos2023"><span>20</span><strong>23</strong><em>11 galleries</em><Camera /></Link></section></div>;
}

export function ArchivePage({ year }: { year: "2024" | "2023" }) {
  return <div className="content-page"><PageHead eyebrow="Photo archive" title={year} intro={`${photoArchives[year].length} meets captured across the ${year} season.`} /><section className="album-list">{photoArchives[year].map((album, index) => <article key={album.meet}><span className="album-number">{String(index + 1).padStart(2, "0")}</span><h2>{album.meet}</h2><div>{album.groups.map((group) => <a key={group.href} href={group.href} target="_blank" rel="noreferrer">{group.name}<ExternalLink /></a>)}</div></article>)}</section></div>;
}
