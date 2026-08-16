import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin

BASE = "https://www.xcstats.com/"
s = requests.Session()
s.headers.update({"User-Agent": "Mozilla/5.0 BellXC records research"})

url = urljoin(BASE, "phpajax/showSeasons.php")
data = {
    "ss": "TRUE",
    "school_id": "839",
    "xc_flag": "1",
    "priv_flag": "0",
    "season_year": "2025",
    "num_seasons": "45",
    "lnf_flag": "1",
}
r = s.post(url, data=data, timeout=60)
r.raise_for_status()
print("SEASONS", r.status_code, len(r.text), r.url)
print(r.text[:5000])

soup = BeautifulSoup(r.text, "html.parser")
print("LINKS")
for a in soup.find_all("a", href=True):
    text = " ".join(a.stripped_strings)
    href = urljoin(BASE, a["href"])
    print(text[:120], "=>", href)
