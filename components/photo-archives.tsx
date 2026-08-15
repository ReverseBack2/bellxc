import Link from "next/link";
import { Camera, ExternalLink } from "lucide-react";
import { photoArchives, type Album } from "@/lib/content";

const photoArchives2025: Album[] = [
  {
    meet: "WCAL 1",
    groups: [
      {
        name: "Varsity",
        href: "https://photos.google.com/share/AF1QipOcnim-78td5zI_ePWTwS7pnk7vZX_cNJ0vaJN6Sfrqw17vnM8bpuWq2GncnHjpzA?key=Y084bmstc01nWDBHXzJsOThNVm01UU42SEZUSWp3",
      },
    ],
  },
  {
    meet: "Westmoor",
    groups: [
      {
        name: "Varsity",
        href: "https://photos.google.com/share/AF1QipNT7OQznMNZfvw1ZMnJ5F-6DB3vMN8t30Q-49rkwLfAXqt7N2vL9-iNaGfIPYWBXg?key=RWpqNnpDUVFhYkNyMlNsVDdxR3lqdjZrOWVZbXVn",
      },
    ],
  },
  {
    meet: "Clovis Invitational",
    groups: [
      {
        name: "Varsity",
        href: "https://photos.google.com/share/AF1QipPaH261KTFFH7ZOIuCDQkb566DRGBGBr3E8Ey3K3keJ-DB7JCmaozBVkNLyTwPNfQ?key=T09FUzRheTI0SkhUTEozck9EMjhGNVB0ekM2STd3",
      },
    ],
  },
  {
    meet: "WCAL 2",
    groups: [
      {
        name: "Freshmen",
        href: "https://photos.google.com/share/AF1QipM8r2_q43vX-HiA1VngMB7YYP7HUEzYdB2BxgCPlJZFoEGU1c5K214uZv6-cg1wFw?key=aW4tTGFrdUlfeXliTlFOeDNrVW5TdGhfcldkOF9R",
      },
    ],
  },
  {
    meet: "WCAL 3",
    groups: [
      {
        name: "Freshmen",
        href: "https://photos.google.com/share/AF1QipMiSXzvSPrpyFLmwjBQKSLqlqkAD9XmZNEoP8zS_wNGXLmL4vhx9g_EqzpFw5RheA?key=Ukg2M2xCdkpWS1BlcVFUcVdDZ0gzNWVHM20ybGZ3",
      },
    ],
  },
  {
    meet: "CCS",
    groups: [
      {
        name: "Varsity",
        href: "https://photos.google.com/share/AF1QipOc5cbXNFBFCdHWB5UgZjeD2kx8pxrHUJNHufs4SKUrH2GOOvbGrbtQq4ZehZtHzg?key=QlJJVFNYcDVKSUdiZWpxVktuTS1oY0pwNGtQdWtn",
      },
    ],
  },
  {
    meet: "State",
    groups: [
      {
        name: "Varsity",
        href: "https://photos.google.com/share/AF1QipPBfz5l1Lb_GHOksdYm-Db41kplIn3SVRBmaxkkZImGMiaeV8s8oxM2RMIS0gzkzA?key=OVJPeG1jNzkwemJsUlgwNzJqaERheVRjVW9zdm1n",
      },
    ],
  },
];

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
