import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { InstagramHomeSection } from "@/components/instagram-home-section";
import { SiteShell } from "@/components/site-shell";

export default function InstagramPreviewPage() {
  return (
    <SiteShell>
      <div style={{ padding: "10px 20px", background: "#f5d45a", color: "#111", fontSize: 11, fontWeight: 800, letterSpacing: ".12em", textTransform: "uppercase", textAlign: "center" }}>
        Temporary Instagram preview — public homepage unchanged
      </div>

      <section className="instagram-preview-grid">
        <div className="instagram-preview-hero">
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

      <style>{`
        .instagram-preview-grid {
          min-height: calc(100vh - 154px);
          display: grid;
          grid-template-columns: minmax(0, 72%) minmax(320px, 28%);
          align-items: stretch;
        }
        .instagram-preview-hero {
          min-height: calc(100vh - 154px);
          position: relative;
          display: flex;
          align-items: center;
          overflow: hidden;
          color: #fff;
        }
        .instagram-preview-hero > img { object-fit: cover; object-position: center; }
        @media (max-width: 980px) {
          .instagram-preview-grid { grid-template-columns: 1fr; }
          .instagram-preview-hero { min-height: 68vh; }
        }
      `}</style>
    </SiteShell>
  );
}
