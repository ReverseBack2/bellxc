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

print("SCRIPT SRCS")
for script in soup.find_all("script", src=True):
    src = urljoin(BASE, script["src"])
    print(src)
    try:
        js = s.get(src, timeout=30)
        if js.ok and "showSeasons" in js.text:
            print("FOUND showSeasons in", src)
            idx = js.text.find("showSeasons")
            print(js.text[max(0, idx-1000):idx+4000])
    except Exception as e:
        print("ERR", e)

print("INLINE")
for script in soup.find_all("script"):
    txt = script.string or script.get_text(" ", strip=True)
    if "showSeasons" in txt:
        print(txt[:5000])
