#!/usr/bin/env python3
"""Download California's WARN report and convert the detailed sheet to JSON.

CA publishes the current fiscal year as a live .xlsx at a stable URL; earlier
years are PDFs only, so this covers the current FY. That is the useful window
anyway — these are layoffs from the last few months, not history.

Node cannot read .xlsx without a dependency, so this step exists purely to hand
import-warn.mjs a JSON array.
"""
import json, sys, urllib.request, warnings
import openpyxl

URL = "https://edd.ca.gov/siteassets/files/jobs_and_training/warn/warn_report1.xlsx"
OUT = "scripts/warn/ca-warn.json"
UA = "reciepts.tech research robin@reciepts.tech"

warnings.filterwarnings("ignore", module="openpyxl")

req = urllib.request.Request(URL, headers={"User-Agent": UA})
with urllib.request.urlopen(req, timeout=120) as r:
    open("/tmp/ca_warn.xlsx", "wb").write(r.read())

wb = openpyxl.load_workbook("/tmp/ca_warn.xlsx", read_only=True, data_only=True)
# NOTE the trailing space in the sheet name. Matching without stripping lands
# on the summary sheet instead, which has 9 rows and no company column.
ws = next(wb[n] for n in wb.sheetnames if n.strip() == "Detailed WARN Report")

rows = list(ws.iter_rows(values_only=True))
header = [str(c or "").replace("\n", " ").strip() for c in rows[1]]
title = str(rows[0][0] or "").replace("\n", " ").strip()

out = []
for r in rows[2:]:
    if not r or not r[4]:
        continue
    d = dict(zip(header, [str(c) if c is not None else "" for c in r]))
    out.append({
        "company":   d.get("Company", "").strip(),
        "county":    d.get("County/Parish", "").strip(),
        "notice":    d.get("Notice Date", "")[:10],
        "effective": d.get("Effective  Date", d.get("Effective Date", ""))[:10],
        "employees": d.get("No. Of Employees", "").strip(),
        "kind":      d.get("Layoff/ Closure", "").strip(),
        "industry":  d.get("Related Industry", "").strip(),
    })

json.dump({"source_url": URL, "report": title, "rows": out}, open(OUT, "w"), indent=1)
print(f"{len(out)} rows -> {OUT}")
print(f"report: {title}")
