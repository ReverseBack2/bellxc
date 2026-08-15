import { notFound } from "next/navigation";
import { SiteShell } from "@/components/site-shell";
import { AthleticCalendarPage } from "@/components/athletic-calendar";
import { ArchivePage, PhotosPage } from "@/components/photo-archives";
import { AboutPage, Meet101Page, MeetInfoPage, MeetTypesPage, UsefulLinksPage } from "@/components/pages";

const pages = {
  about: <AboutPage />,
  calendar: <AthleticCalendarPage />,
  "meet-info": <MeetInfoPage />,
  meet101: <Meet101Page />,
  "meet-types": <MeetTypesPage />,
  "useful-links": <UsefulLinksPage />,
  photos: <PhotosPage />,
  photos2025: <ArchivePage year="2025" />,
  photos2024: <ArchivePage year="2024" />,
  photos2023: <ArchivePage year="2023" />,
} as const;

type PageSlug = keyof typeof pages;

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(pages).map((slug) => ({ slug }));
}

export default async function ContentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!(slug in pages)) notFound();

  return <SiteShell>{pages[slug as PageSlug]}</SiteShell>;
}
