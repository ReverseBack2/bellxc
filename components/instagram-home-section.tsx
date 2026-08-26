import { ArrowUpRight, Instagram } from "lucide-react";

const instagramUrl = "https://www.instagram.com/bellarminexctf/";

const mockPosts = [
  { label: "Race day", meta: "Latest meet moments" },
  { label: "Team life", meta: "Training + team culture" },
  { label: "Bellarmine XC", meta: "Photos from @bellarminexctf" },
];

export function InstagramHomeSection() {
  return (
    <section
      aria-labelledby="instagram-home-title"
      style={{
        padding: "clamp(72px, 9vw, 132px) clamp(28px, 9vw, 145px)",
        background: "#1d3d6e",
        color: "#fff",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, .8fr) minmax(0, 1.2fr)",
          gap: "clamp(44px, 8vw, 120px)",
          alignItems: "end",
          marginBottom: "clamp(42px, 6vw, 78px)",
        }}
      >
        <div>
          <p
            style={{
              margin: "0 0 16px",
              color: "#9cc7e8",
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: ".19em",
              textTransform: "uppercase",
            }}
          >
            Follow the Bells
          </p>
          <h2
            id="instagram-home-title"
            style={{
              margin: 0,
              font: "700 clamp(46px, 6vw, 88px)/.94 var(--display-font, Georgia, serif)",
              letterSpacing: "-.05em",
            }}
          >
            From the course<br />to your feed.
          </h2>
        </div>

        <div style={{ maxWidth: 560 }}>
          <p style={{ margin: 0, color: "rgba(255,255,255,.72)", fontSize: 17, lineHeight: 1.75 }}>
            Meet-day photos, team moments, training, and Bellarmine XC updates from the official team Instagram.
          </p>
          <a
            href={instagramUrl}
            target="_blank"
            rel="noreferrer"
            style={{
              marginTop: 28,
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
              paddingBottom: 8,
              borderBottom: "1px solid rgba(255,255,255,.7)",
              fontSize: 12,
              fontWeight: 800,
              letterSpacing: ".12em",
              textTransform: "uppercase",
            }}
          >
            <Instagram size={17} /> @bellarminexctf <ArrowUpRight size={16} />
          </a>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
          gap: 1,
          background: "rgba(255,255,255,.18)",
          border: "1px solid rgba(255,255,255,.18)",
        }}
      >
        {mockPosts.map((post, index) => (
          <a
            key={post.label}
            href={instagramUrl}
            target="_blank"
            rel="noreferrer"
            aria-label={`${post.label} Instagram mockup tile`}
            style={{
              minHeight: "clamp(250px, 29vw, 430px)",
              position: "relative",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              padding: "clamp(22px, 3vw, 34px)",
              background:
                index === 0
                  ? "linear-gradient(145deg, #365f8f 0%, #183455 68%, #10263f 100%)"
                  : index === 1
                    ? "linear-gradient(145deg, #6da8d6 0%, #2f5f98 56%, #1d3d6e 100%)"
                    : "linear-gradient(145deg, #284d79 0%, #152f50 54%, #0d2138 100%)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 800,
                  letterSpacing: ".16em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,.7)",
                }}
              >
                Mock feed tile {String(index + 1).padStart(2, "0")}
              </span>
              <Instagram size={22} />
            </div>

            <div>
              <strong
                style={{
                  display: "block",
                  font: "700 clamp(28px, 3vw, 44px)/1 var(--display-font, Georgia, serif)",
                  letterSpacing: "-.03em",
                }}
              >
                {post.label}
              </strong>
              <span style={{ display: "block", marginTop: 10, color: "rgba(255,255,255,.68)", fontSize: 13 }}>
                {post.meta}
              </span>
            </div>
          </a>
        ))}
      </div>

      <p
        style={{
          margin: "22px 0 0",
          color: "rgba(255,255,255,.5)",
          fontSize: 11,
          lineHeight: 1.6,
        }}
      >
        Mockup only — these tiles intentionally do not pull live Instagram posts yet. A feed provider or Meta API can replace them later without changing the section layout.
      </p>
    </section>
  );
}
