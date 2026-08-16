import json
import re
import time
from collections import defaultdict
from pathlib import Path
from urllib.parse import parse_qs, urljoin, urlparse

import requests
from bs4 import BeautifulSoup

BASE = "https://www.xcstats.com/"
SCHOOL_ID = "839"
SEASON_YEAR = 2025
NUM_SEASONS = 45
OUT = Path("data/course-records.json")

session = requests.Session()
session.headers.update({"User-Agent": "Mozilla/5.0 BellXC course-records research"})


def get(url, **kwargs):
    for attempt in range(5):
        try:
            r = session.get(url, timeout=60, **kwargs)
            r.raise_for_status()
            return r
        except Exception:
            if attempt == 4:
                raise
            time.sleep(1.5 * (attempt + 1))


def post(url, **kwargs):
    for attempt in range(5):
        try:
            r = session.post(url, timeout=90, **kwargs)
            r.raise_for_status()
            return r
        except Exception:
            if attempt == 4:
                raise
            time.sleep(1.5 * (attempt + 1))


def seconds(value):
    value = value.strip().replace("*", "")
    m = re.fullmatch(r"(?:(\d+):)?(\d+):(\d+(?:\.\d+)?)", value)
    if m:
        h = int(m.group(1) or 0)
        return h * 3600 + int(m.group(2)) * 60 + float(m.group(3))
    m = re.fullmatch(r"(\d+):(\d+(?:\.\d+)?)", value)
    if m:
        return int(m.group(1)) * 60 + float(m.group(2))
    return None


def grad_year(season_year, grade):
    return {"Fr": season_year + 4, "So": season_year + 3, "Jr": season_year + 2, "Sr": season_year + 1}.get(grade)


def normalize_squad(squad):
    s = squad.strip()
    if s in {"Fr", "Frosh", "Freshman"}:
        return "Freshman"
    if s in {"So", "Soph", "Sophomore"}:
        return "Sophomore"
    if s.upper() == "JV":
        return "JV"
    if s.upper() in {"V", "VAR", "VARSITY"}:
        return "Varsity"
    return None


# 1. Pull the complete public Bellarmine XC season index.
r = post(
    urljoin(BASE, "phpajax/showSeasons.php"),
    data={
        "ss": "TRUE",
        "school_id": SCHOOL_ID,
        "xc_flag": "1",
        "priv_flag": "0",
        "season_year": str(SEASON_YEAR),
        "num_seasons": str(NUM_SEASONS),
        "lnf_flag": "1",
    },
)
soup = BeautifulSoup(r.text, "html.parser")

events = []
current_year = None
for node in soup.find_all(["h2", "tr"]):
    if node.name == "h2":
        m = re.search(r"(\d{4})\s+Season", node.get_text(" ", strip=True))
        if m:
            current_year = int(m.group(1))
        continue
    cells = node.find_all("td")
    if not cells or current_year is None or len(cells) < 3:
        continue
    link = cells[1].find("a", href=re.compile(r"event_results\.php"))
    if not link:
        continue
    qs = parse_qs(urlparse(link["href"]).query)
    event_num = qs.get("event_num", [None])[0]
    if not event_num:
        continue
    date_text = cells[0].get_text(" ", strip=True)
    event_name = link.get_text(" ", strip=True)
    course = cells[2].get_text(" ", strip=True)
    events.append({
        "year": current_year,
        "date": f"{date_text}/{str(current_year)[2:]}",
        "event": event_name,
        "course": course,
        "eventNum": int(event_num),
    })

# Deduplicate repeated event IDs if the source ever repeats one.
unique = {}
for e in events:
    unique[e["eventNum"]] = e
events = sorted(unique.values(), key=lambda x: (x["year"], x["eventNum"]))
print(f"Indexed {len(events)} unique events across {len(set(e['year'] for e in events))} seasons")

# 2. Pull each event's Bellarmine individual table.
performances = []
failed_events = []
for idx, event in enumerate(events, 1):
    url = f"{BASE}event_results.php?school_id={SCHOOL_ID}&event_num={event['eventNum']}&gender=u"
    try:
        page = get(url)
    except Exception as exc:
        print("FAILED", event["eventNum"], event["event"], repr(exc))
        failed_events.append(event)
        continue
    esoup = BeautifulSoup(page.text, "html.parser")
    runner_table = None
    header_map = None
    for table in esoup.find_all("table"):
        first = table.find("tr")
        if not first:
            continue
        headers = [c.get_text(" ", strip=True) for c in first.find_all(["th", "td"])]
        needed = {"Runner", "Gr", "Squad", "Time", "Dist"}
        if needed.issubset(set(headers)):
            runner_table = table
            header_map = {h: i for i, h in enumerate(headers)}
            break
    if not runner_table:
        print("NO RUNNER TABLE", event["eventNum"], event["event"])
        failed_events.append(event)
        continue

    rows = runner_table.find_all("tr")[1:]
    for tr in rows:
        cells = tr.find_all("td")
        if len(cells) <= max(header_map.values()):
            continue
        runner_cell = cells[header_map["Runner"]]
        runner_link = runner_cell.find("a", href=re.compile(r"runr_id="))
        if not runner_link:
            continue
        qs = parse_qs(urlparse(runner_link["href"]).query)
        runner_id = qs.get("runr_id", [None])[0]
        if not runner_id:
            continue
        runner = runner_link.get_text(" ", strip=True)
        # XCStats' Bellarmine individual table uses "Last, First"; display "First Last".
        if "," in runner:
            last, first = [part.strip() for part in runner.split(",", 1)]
            runner = f"{first} {last}".strip()
        grade = cells[header_map["Gr"]].get_text(" ", strip=True)
        raw_squad = cells[header_map["Squad"]].get_text(" ", strip=True)
        squad = normalize_squad(raw_squad)
        time_text = cells[header_map["Time"]].get_text(" ", strip=True)
        dist = cells[header_map["Dist"]].get_text(" ", strip=True)
        sec = seconds(time_text)
        if sec is None or not dist:
            continue
        performances.append({
            "runnerId": int(runner_id),
            "runner": runner,
            "grade": grade,
            "gradYear": grad_year(event["year"], grade),
            "squad": squad,
            "rawSquad": raw_squad,
            "time": time_text,
            "seconds": sec,
            "distance": dist,
            "course": event["course"],
            "event": event["event"],
            "date": event["date"],
            "year": event["year"],
            "eventNum": event["eventNum"],
            "sourceUrl": url,
        })

    if idx % 25 == 0 or idx == len(events):
        print(f"Fetched {idx}/{len(events)} events; {len(performances)} Bell performances")
    time.sleep(0.08)

print(f"Parsed {len(performances)} Bellarmine performances; failures={len(failed_events)}")

# 3. Rank best unique runner performance by course + distance and category.
# Freshman/Sophomore are class-year records based on grade at race, regardless of squad.
# JV/Varsity remain race-division records based on the XCStats Squad field.
by_config = defaultdict(list)
for p in performances:
    by_config[(p["course"], p["distance"])].append(p)

categories = ["Overall", "Freshman", "Sophomore", "JV", "Varsity"]
configs = []
for (course, distance), rows in sorted(by_config.items(), key=lambda kv: (kv[0][0].lower(), float(kv[0][1]) if re.fullmatch(r"\d+(?:\.\d+)?", kv[0][1]) else 999)):
    lists = {}
    for category in categories:
        if category == "Overall":
            eligible = rows
        elif category == "Freshman":
            eligible = [p for p in rows if p["grade"] == "Fr"]
        elif category == "Sophomore":
            eligible = [p for p in rows if p["grade"] == "So"]
        else:
            eligible = [p for p in rows if p["squad"] == category]
        best = {}
        for p in eligible:
            existing = best.get(p["runnerId"])
            if existing is None or p["seconds"] < existing["seconds"]:
                best[p["runnerId"]] = p
        ranked = sorted(best.values(), key=lambda p: (p["seconds"], p["runner"].lower()))[:10]
        lists[category] = [
            {
                "rank": i + 1,
                "runner": p["runner"],
                "runnerId": p["runnerId"],
                "gradYear": p["gradYear"],
                "gradeAtRace": p["grade"],
                "time": p["time"],
                "date": p["date"],
                "event": p["event"],
                "eventNum": p["eventNum"],
                "sourceUrl": p["sourceUrl"],
            }
            for i, p in enumerate(ranked)
        ]
    configs.append({
        "course": course,
        "distanceMiles": distance,
        "performanceCount": len(rows),
        "uniqueRunnerCount": len({p["runnerId"] for p in rows}),
        "records": lists,
    })

payload = {
    "source": "XCStats Bellarmine team history (school_id=839)",
    "generatedFrom": {
        "latestSeason": SEASON_YEAR,
        "requestedSeasons": NUM_SEASONS,
        "seasonsFound": sorted({e["year"] for e in events}, reverse=True),
        "eventCount": len(events),
        "performanceCount": len(performances),
        "failedEventCount": len(failed_events),
        "failedEvents": failed_events,
    },
    "methodology": "Top 10 uses each runner's single fastest verified Bellarmine XCStats performance for the exact XCStats course name and race distance. Freshman and Sophomore lists use grade at race (Fr/So) regardless of squad, so class records include runners competing up in JV or Varsity. JV and Varsity lists use the XCStats race Squad field.",
    "courses": configs,
}
OUT.parent.mkdir(parents=True, exist_ok=True)
OUT.write_text(json.dumps(payload, indent=2, ensure_ascii=False) + "\n")
print(f"Wrote {OUT}: {len(configs)} course-distance configurations")
for c in configs:
    counts = ", ".join(f"{k}={len(v)}" for k, v in c["records"].items())
    print(f"CONFIG {c['course']} {c['distanceMiles']} mi :: {counts}")
