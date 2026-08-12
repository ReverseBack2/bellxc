import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Bellarmine Cross Country", template: "%s | Bellarmine XC" },
  description: "Bellarmine College Preparatory Cross Country team information, meet resources, and photo archives.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
