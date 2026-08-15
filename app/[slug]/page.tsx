import { notFound } from "next/navigation";
import { SiteShell } from "@/components/site-shell";
import { AboutPage, ArchivePage, CalendarPage, Meet101Page, MeetInfoPage, MeetTypesPage, PhotosPage, UsefulLinksPage } from "@/components/pages";

const pages = {
  about: <AboutPage />,
  calendar: <CalendarPage />,
  "meet-info": <MeetInfoPage />,
  meet101: <Meet101Page />,
  "meet-types": <MeetTypesPage />,
  "useful-links": <UsefulLinksPage />,
  photos: <PhotosPage />,
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
