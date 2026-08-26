import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import { InstagramHomeSection } from "@/components/instagram-home-section";
import { SiteShell } from "@/components/site-shell";

export default function Home() {
  return (
    <SiteShell>
      <section className="home-instagram-grid">
        <div className="home-instagram-hero">
          <Image src="/images/runner.png" alt="Bellarmine cross country runner on the trail" fill priority sizes="72vw" />
          <div className="hero-shade" />
          <div className="hero-copy">
            <p className="eyebrow">Bellarmine College Preparatory</p>
            <h1>It’s out<br />there.</h1>
            <p>Find your line. Run as one.</p>
            <Link className="button" href="/about">Meet the team <ChevronRight /></Link>
          </div>
          <p className="hero-index">XC · San Jose, CA</p>
        </div>

        <InstagramHomeSection />
      </section>

      <section className="home-intro">
        <div>
          <p className="eyebrow">The Bellarmine brotherhood</p>
          <h2>More than a team.<br />A village in motion.</h2>
        </div>
        <div>
          <p>Two hundred runners. One shared pursuit. Bellarmine Cross Country is built on the belief that every stride is stronger when we take it together.</p>
          <Link className="text-link" href="/calendar">See the season <ArrowUpRight /></Link>
        </div>
      </section>

      <style>{`
        .home-instagram-grid {
          min-height: calc(100vh - 124px);
          display: grid;
          grid-template-columns: minmax(0, 72%) minmax(320px, 28%);
          align-items: stretch;
        }
        .home-instagram-hero {
          min-height: calc(100vh - 124px);
          position: relative;
          display: flex;
          align-items: center;
          overflow: hidden;
          color: #fff;
        }
        .home-instagram-hero > img {
          object-fit: cover;
          object-position: center;
        }
        @media (max-width: 980px) {
          .home-instagram-grid { grid-template-columns: 1fr; }
          .home-instagram-hero { min-height: 68vh; }
        }
      `}</style>
    </SiteShell>
  );
}
