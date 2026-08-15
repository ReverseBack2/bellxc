"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { navigation } from "@/lib/content";

export function SiteShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="site theme-pace">
      <header className="site-header">
        <Link className="brand" href="/" aria-label="Bellarmine Cross Country home">
          <Image src="/images/bell-xc-shield.png" width={1500} height={229} priority alt="Bellarmine Cross Country shield" />
        </Link>
        <button className="menu-button" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-label="Toggle navigation">
          {open ? <X /> : <Menu />}
        </button>
        <nav className={open ? "main-nav open" : "main-nav"} aria-label="Main navigation">
          {navigation.map((item) => <Link key={item.slug} href={`/${item.slug}`} onClick={() => setOpen(false)}>{item.label}</Link>)}
        </nav>
      </header>
      <main>{children}</main>
      <footer>
        <div><span className="footer-mark">BELL XC</span><p>Men for and with others — one stride at a time.</p></div>
      </footer>
    </div>
  );
}
