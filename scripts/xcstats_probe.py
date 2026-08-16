import re
import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin

BASE = "https://www.xcstats.com/"
TEAM = urljoin(BASE, "team_page.php?school_id=839")

s = requests.Session()
s.headers.update({"User-Agent": "Mozilla/5.0 BellXC records research"})

r = s.get(TEAM, timeout=30)
r.raise_for_status()
print("TEAM", r.status_code, len(r.text), r.url)
soup = BeautifulSoup(r.text, "html.parser")

print("COURSE LINKS")
for a in soup.find_all("a", href=True):
    href = a["href"]
    text = " ".join(a.stripped_strings)
    if "alltime_course_report.php" in href:
        print(text, "=>", urljoin(BASE, href))

print("EVENT/SEASON LINKS")
for a in soup.find_all("a", href=True):
    href = a["href"]
    text = " ".join(a.stripped_strings)
    if any(k in href for k in ["event_results.php", "team_page.php", "season", "year="]):
        print(text[:100], "=>", urljoin(BASE, href))

# Probe a known course page and show table/links structure.
url = urljoin(BASE, "alltime_course_report.php?cd_id=514&cr=0&gender=u&gr=0&report_type=i&school_id=839")
r = s.get(url, timeout=30)
r.raise_for_status()
print("COURSE", r.status_code, len(r.text), r.url)
soup = BeautifulSoup(r.text, "html.parser")
for i, table in enumerate(soup.find_all("table")):
    print("TABLE", i)
    rows = table.find_all("tr")[:6]
    for tr in rows:
        cells = [" ".join(c.stripped_strings) for c in tr.find_all(["th","td"])]
        if cells:
            print(cells)
            for a in tr.find_all("a", href=True):
                print("  LINK", " ".join(a.stripped_strings), "=>", a["href"])
