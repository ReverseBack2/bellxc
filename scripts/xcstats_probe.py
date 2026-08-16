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

print("FORMS / SELECTS")
for i, form in enumerate(soup.find_all("form")):
    print("FORM", i, "action=", form.get("action"), "method=", form.get("method"))
    for inp in form.find_all(["input", "select", "button"]):
        print(" ", inp.name, "name=", inp.get("name"), "value=", inp.get("value"), "id=", inp.get("id"))
        if inp.name == "select":
            for opt in inp.find_all("option"):
                print("    OPT", opt.get("value"), "=>", " ".join(opt.stripped_strings))

print("SCRIPTS WITH SEASON/YEAR/AJAX")
for script in soup.find_all("script"):
    txt = script.string or script.get_text(" ", strip=True)
    if any(k.lower() in txt.lower() for k in ["season", "year", "ajax", "additional"]):
        print(txt[:5000])

# Probe a known course page and show table/links structure and form values.
url = urljoin(BASE, "alltime_course_report.php?cd_id=514&cr=0&gender=u&gr=0&report_type=i&school_id=839")
r = s.get(url, timeout=30)
r.raise_for_status()
print("COURSE", r.status_code, len(r.text), r.url)
soup = BeautifulSoup(r.text, "html.parser")
for sel in soup.find_all("select"):
    print("COURSE SELECT", sel.get("name"), sel.get("id"))
    for opt in sel.find_all("option"):
        print("  OPT", opt.get("value"), "=>", " ".join(opt.stripped_strings), "selected" if opt.has_attr("selected") else "")

for i, table in enumerate(soup.find_all("table")):
    print("TABLE", i)
    rows = table.find_all("tr")[:6]
    for tr in rows:
        cells = [" ".join(c.stripped_strings) for c in tr.find_all(["th","td"])]
        if cells:
            print(cells)
            for a in tr.find_all("a", href=True):
                print("  LINK", " ".join(a.stripped_strings), "=>", a["href"])

# Probe full race history for Meika at Baylands.
url = urljoin(BASE, "career_course_report.php?cd_id=514&runr_id=105331")
r = s.get(url, timeout=30)
r.raise_for_status()
print("CAREER COURSE", r.status_code, len(r.text), r.url)
soup = BeautifulSoup(r.text, "html.parser")
for i, table in enumerate(soup.find_all("table")):
    print("CCTABLE", i)
    for tr in table.find_all("tr")[:10]:
        cells = [" ".join(c.stripped_strings) for c in tr.find_all(["th","td"])]
        if cells:
            print(cells)
            for a in tr.find_all("a", href=True):
                print("  LINK", " ".join(a.stripped_strings), "=>", a["href"])
