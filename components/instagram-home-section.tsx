import Script from "next/script";
import { ArrowUpRight, Instagram } from "lucide-react";

const instagramUrl = "https://www.instagram.com/bellarminexctf/";

export function InstagramHomeSection() {
  return (
    <aside
      aria-labelledby="instagram-home-title"
      style={{
        minWidth: 0,
        padding: "clamp(28px, 3vw, 48px)",
        background: "#1d3d6e",
        color: "#fff",
      }}
    >
      <p
        style={{
          margin: "0 0 10px",
          color: "#9cc7e8",
          fontSize: 10,
          fontWeight: 800,
          letterSpacing: ".18em",
          textTransform: "uppercase",
        }}
      >
        Follow the Bells
      </p>

      <h2
        id="instagram-home-title"
        style={{
          margin: 0,
          font: "700 clamp(32px, 3.2vw, 52px)/.96 var(--display-font, Georgia, serif)",
          letterSpacing: "-.045em",
        }}
      >
        @bellarminexctf
      </h2>

      <a
        href={instagramUrl}
        target="_blank"
        rel="noreferrer"
        style={{
          margin: "16px 0 28px",
          display: "inline-flex",
          alignItems: "center",
          gap: 10,
          paddingBottom: 7,
          borderBottom: "1px solid rgba(255,255,255,.6)",
          fontSize: 11,
          fontWeight: 800,
          letterSpacing: ".11em",
          textTransform: "uppercase",
        }}
      >
        <Instagram size={16} /> Open Instagram <ArrowUpRight size={15} />
      </a>

      <div
        style={{
          minHeight: 520,
          overflow: "hidden",
          background: "#fff",
          borderRadius: 2,
        }}
      >
        <div className="sk-ww-instagram-reels" data-embed-id="25708579"></div>
      </div>

      <Script src="https://widgets.sociablekit.com/instagram-reels/widget.js" strategy="afterInteractive" />
    </aside>
  );
}
