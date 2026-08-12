import { notFound } from "next/navigation";
import { SiteShell } from "@/components/site-shell";
import { AboutPage, ArchivePage, CalendarPage, HomePage, Meet101Page, MeetInfoPage, MeetTypesPage, PhotosPage, UsefulLinksPage } from "@/components/pages";
import { themes, type Theme } from "@/lib/content";

type Params = { theme: string; slug?: string[] };

export function generateStaticParams() {
  const pages = [undefined, ["about"], ["calendar"], ["meet-info"], ["meet101"], ["meet-types"], ["useful-links"], ["photos"], ["photos2024"], ["photos2023"]];
  return themes.flatMap((theme) => pages.map((slug) => ({ theme, slug })));
}

export default async function ConceptPage({ params }: { params: Promise<Params> }) {
  const { theme: rawTheme, slug = [] } = await params;
  if (!themes.includes(rawTheme as Theme) || slug.length > 1) notFound();
  const theme = rawTheme as Theme;
  const page = slug[0] ?? "home";
  const content: Record<string, React.ReactNode> = {
    home: <HomePage theme={theme} />,
    about: <AboutPage />,
    calendar: <CalendarPage />,
    "meet-info": <MeetInfoPage theme={theme} />,
    meet101: <Meet101Page />,
    "meet-types": <MeetTypesPage />,
    "useful-links": <UsefulLinksPage />,
    photos: <PhotosPage theme={theme} />,
    photos2024: <ArchivePage year="2024" />,
    photos2023: <ArchivePage year="2023" />,
  };
  if (!content[page]) notFound();
  return <SiteShell theme={theme}>{content[page]}</SiteShell>;
}
