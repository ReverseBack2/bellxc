import Link from "next/link";
import { Camera, ExternalLink } from "lucide-react";
import { photoArchives, type Album } from "@/lib/content";

const photoArchives2025: Album[] = [];

function galleryCount(albums: Album[]) {
  return albums.reduce((total, album) => total + album.groups.length, 0);
}

export function PhotosPage() {
  return (
    <div className="content-page">
      <header className="page-head">
        <p className="eyebrow">Through the lens</p>
        <h1>Photo archives</h1>
        <p className="lede">Race-day moments, team portraits, and finish-line memories from recent seasons.</p>
      </header>
      <section className="year-grid">
        <Link href="/photos2025">
          <span>20</span><strong>25</strong><em>{photoArchives2025.length ? `${galleryCount(photoArchives2025)} galleries` : "Albums coming soon"}</em><Camera />
        </Link>
        <Link href="/photos2024">
          <span>20</span><strong>24</strong><em>{galleryCount(photoArchives["2024"])} galleries</em><Camera />
        </Link>
        <Link href="/photos2023">
          <span>20</span><strong>23</strong><em>{galleryCount(photoArchives["2023"])} galleries</em><Camera />
        </Link>
      </section>
    </div>
  );
}

export function ArchivePage({ year }: { year: "2025" | "2024" | "2023" }) {
  const albums = year === "2025" ? photoArchives2025 : photoArchives[year];

  return (
    <div className="content-page">
      <header className="page-head">
        <p className="eyebrow">Photo archive</p>
        <h1>{year}</h1>
        <p className="lede">
          {albums.length
            ? `${albums.length} meets captured across the ${year} season.`
            : `2025 cross country albums will be linked here as they are added.`}
        </p>
      </header>

      {albums.length ? (
        <section className="album-list">
          {albums.map((album, index) => (
            <article key={album.meet}>
              <span className="album-number">{String(index + 1).padStart(2, "0")}</span>
              <h2>{album.meet}</h2>
              <div>
                {album.groups.map((group) => (
                  <a key={group.href} href={group.href} target="_blank" rel="noreferrer">
                    {group.name}<ExternalLink />
                  </a>
                ))}
              </div>
            </article>
          ))}
        </section>
      ) : (
        <section className="empty-state">
          <Camera />
          <h2>2025 albums coming soon</h2>
          <p>The 2025 XC Google Photos albums will appear here in the same meet-by-meet format as the 2024 and 2023 archives.</p>
        </section>
      )}
    </div>
  );
}
