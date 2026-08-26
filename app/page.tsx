import { HomePage } from "@/components/pages";
import { InstagramHomeSection } from "@/components/instagram-home-section";
import { SiteShell } from "@/components/site-shell";
import styles from "./instagram-home-mockup.module.css";

export default function Home() {
  return (
    <SiteShell>
      <div className={styles.homeGrid}>
        <div className={styles.homeMain}>
          <HomePage />
        </div>
        <div className={styles.instagramColumn}>
          <InstagramHomeSection />
        </div>
      </div>
    </SiteShell>
  );
}
