import { ArrowUpRight, FileText } from "lucide-react";
import { PdfPreview } from "./pdf-preview";

const uniformPdfPath = `${process.env.PAGES_BASE_PATH ?? ""}/docs/xc-uniform-101.pdf`;

const PageHead = ({ eyebrow, title, intro }: { eyebrow: string; title: string; intro?: string }) => (
  <header className="page-head"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1>{intro && <p className="lede">{intro}</p>}</header>
);

export function Uniform101Page() {
  return (
    <div className="content-page">
      <PageHead eyebrow="Race-day kit" title="XC Uniform 101" intro="What to wear, what to pack, and the optional gear that makes meet day easier." />
      <section className="document-card">
        <div>
          <FileText />
          <h2>Cross Country Kit 101</h2>
          <p>The two-page August 2026 guide covers the required Bellarmine singlet and race bib, navy shorts, running shoes, warmups, watches, snacks, sunscreen, and recovery items.</p>
          <a className="text-link" href={uniformPdfPath} target="_blank" rel="noreferrer">Open PDF <ArrowUpRight /></a>
          <a className="text-link" href={uniformPdfPath} download="XC Uniform 101.pdf">Download PDF <ArrowUpRight /></a>
        </div>
        <PdfPreview src={uniformPdfPath} title="Bellarmine XC Uniform 101 guide" />
      </section>
    </div>
  );
}
