import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { themeDetails, themes } from "@/lib/content";

export default function ConceptIndex() {
  return <main className="concept-index"><header><Image src="/images/bell-xc-shield.png" width={1500} height={229} alt="Bellarmine Cross Country" priority /><p>Website directions · 2026</p><h1>Four ways forward.</h1><div><span>One complete site.</span><span>Four distinct visual identities.</span></div></header><section>{themes.map((theme, index) => <Link className={`concept-card concept-${theme}`} key={theme} href={`/${theme}`}><span className="concept-number">0{index + 1}</span><div><small>{themeDetails[theme].eyebrow}</small><h2>{themeDetails[theme].name}</h2><p>{themeDetails[theme].description}</p></div><ArrowUpRight /></Link>)}</section><footer>Bellarmine Cross Country · Independent website concept</footer></main>;
}
