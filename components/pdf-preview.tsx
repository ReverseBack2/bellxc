"use client";

import { useEffect, useState } from "react";

export function PdfPreview({ src, title }: { src: string; title: string }) {
  const [blobUrl, setBlobUrl] = useState<string | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let active = true;
    let objectUrl: string | null = null;

    setBlobUrl(null);
    setFailed(false);

    fetch(src)
      .then((response) => {
        if (!response.ok) throw new Error(`PDF request failed: ${response.status}`);
        return response.arrayBuffer();
      })
      .then((buffer) => {
        if (!active) return;
        objectUrl = URL.createObjectURL(new Blob([buffer], { type: "application/pdf" }));
        setBlobUrl(objectUrl);
      })
      .catch(() => {
        if (active) setFailed(true);
      });

    return () => {
      active = false;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [src]);

  if (failed) {
    return <iframe src={src} title={title} />;
  }

  return <iframe src={blobUrl ?? "about:blank"} title={title} />;
}
