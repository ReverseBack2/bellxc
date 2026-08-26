import { HomePage } from "@/components/pages";
import { InstagramHomeSection } from "@/components/instagram-home-section";
import { SiteShell } from "@/components/site-shell";

export default function InstagramPreviewPage() {
  return (
    <SiteShell>
      <div style={{ padding: "12px 24px", background: "#f5d45a", color: "#111", fontSize: 12, fontWeight: 800, letterSpacing: ".08em", textTransform: "uppercase", textAlign: "center" }}>
        Temporary Instagram homepage preview — not linked from site navigation
      </div>
      <HomePage />
      <InstagramHomeSection />
    </SiteShell>
  );
}
