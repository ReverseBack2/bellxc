export function PdfPreview({ src, title }: { src: string; title: string }) {
  return <iframe src={src} title={title} />;
}
