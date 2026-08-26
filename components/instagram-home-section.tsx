import Script from "next/script";
import { ArrowUpRight } from "lucide-react";

const instagramUrl = "https://www.instagram.com/bellarminexctf/";

export function InstagramHomeSection() {
  return (
    <aside
      aria-labelledby="instagram-home-title"
      style={{
        minWidth: 0,
        height: "100%",
        padding: "clamp(22px, 2.5vw, 38px)",
        background: "#1d3d6e",
        color: "#fff",
      }}
    >
      <p style={{ margin: "0 0 9px", color: "#9cc7e8", fontSize: 10, fontWeight: 800, letterSpacing: ".18em", textTransform: "uppercase" }}>
        Follow the Bells
      </p>
      <h2 id="instagram-home-title" style={{ margin: 0, font: "700 clamp(28px, 3vw, 46px)/.96 var(--display-font, Georgia, serif)", letterSpacing: "-.045em" }}>
        @bellarminexctf
      </h2>
      <a href={instagramUrl} target="_blank" rel="noreferrer" style={{ margin: "14px 0 20px", display: "inline-flex", alignItems: "center", gap: 9, paddingBottom: 7, borderBottom: "1px solid rgba(255,255,255,.6)", fontSize: 11, fontWeight: 800, letterSpacing: ".11em", textTransform: "uppercase" }}>
        Open Instagram <ArrowUpRight size={15} />
      </a>
      <div style={{ height: 410, maxHeight: "50vh", overflow: "auto", background: "#fff" }}>
        <div className="sk-ww-instagram-reels" data-embed-id="25708579"></div>
      </div>
      <Script src="https://widgets.sociablekit.com/instagram-reels/widget.js" strategy="afterInteractive" />
    </aside>
  );
}
