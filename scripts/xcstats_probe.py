import requests
from bs4 import BeautifulSoup

s = requests.Session()
s.headers.update({"User-Agent": "Mozilla/5.0 BellXC records research"})
url = "https://www.xcstats.com/event_results.php?school_id=839&event_num=13730&gender=u"
r = s.get(url, timeout=60)
r.raise_for_status()
print("EVENT", r.status_code, len(r.text), r.url)
soup = BeautifulSoup(r.text, "html.parser")
print("TITLE", soup.title.get_text(" ", strip=True) if soup.title else "")
for i, table in enumerate(soup.find_all("table")):
    print("TABLE", i)
    for tr in table.find_all("tr")[:12]:
        cells = [" ".join(c.stripped_strings) for c in tr.find_all(["th","td"])]
        if cells:
            print(cells)
            for a in tr.find_all("a", href=True):
                print(" LINK", " ".join(a.stripped_strings), "=>", a["href"])
