import { HomePage } from "@/components/pages";
import { InstagramHomeSection } from "@/components/instagram-home-section";
import { SiteShell } from "@/components/site-shell";

export default function Home() {
  return (
    <SiteShell>
      <HomePage />
      <InstagramHomeSection />
    </SiteShell>
  );
}
