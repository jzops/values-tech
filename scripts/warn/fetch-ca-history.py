#!/usr/bin/env python3
"""Parse California's historical WARN reports (PDF) into the same JSON shape
as fetch-ca.py, so import-warn.mjs can read either.

Only the current fiscal year is published as .xlsx; everything before it is a
PDF. Those PDFs are where the 2022-2024 tech layoff wave lives, which is exactly
the period the thinnest receipts in the corpus describe ("laid off 7% of
workforce in 2023", no headcount, no date, no source).

Needs pdfplumber, which Homebrew python refuses to install globally (PEP 668):

    python3 -m venv scripts/warn/.venv
    scripts/warn/.venv/bin/pip install -q pdfplumber
    scripts/warn/.venv/bin/python scripts/warn/fetch-ca-history.py
"""
import html, json, re, sys, urllib.request, warnings

try:
    import pdfplumber
except ImportError:
    sys.exit(__doc__.split("Needs pdfplumber")[1].strip())

warnings.filterwarnings("ignore")
BASE = "https://edd.ca.gov/siteassets/files/jobs_and_training/warn/"
UA = "reciepts.tech research robin@reciepts.tech"
OUT = "scripts/warn/ca-warn-history.json"

# Filenames are not consistently formatted across years; these are the real ones.
REPORTS = [
    ("FY2022-23", "warn-report-for-7-1-2022-to-06-30-2023.pdf"),
    ("FY2023-24", "warn-report-for-7-1-2023-to-06-30-2024.pdf"),
    ("FY2024-25", "warn-report-for-7-1-2024-to-06-30-2025.pdf"),
    ("FY2025-26", "warn-report-for-7-1-25-to-6-30-26.pdf"),
]

clean = lambda c: html.unescape(str(c or "")).replace("\n", " ").strip()
def iso(d):
    m = re.match(r"(\d{2})/(\d{2})/(\d{4})", clean(d))
    return f"{m.group(3)}-{m.group(1)}-{m.group(2)}" if m else ""

rows, seen = [], set()
for label, name in REPORTS:
    url = BASE + name
    try:
        req = urllib.request.Request(url, headers={"User-Agent": UA})
        with urllib.request.urlopen(req, timeout=180) as r:
            open("/tmp/warn.pdf", "wb").write(r.read())
    except Exception as e:
        print(f"  {label}: download failed ({e})")
        continue

    n = 0
    with pdfplumber.open("/tmp/warn.pdf") as pdf:
        for page in pdf.pages:
            for row in page.extract_table() or []:
                if len(row) < 7:
                    continue
                notice, _recv, eff, company, county, emp, kind = (clean(c) for c in row[:7])
                if not company or not re.match(r"\d{2}/\d{2}/\d{4}", notice):
                    continue  # header or spillover row
                if not re.fullmatch(r"\d+", emp):
                    continue
                rec = {
                    "company": company, "county": county,
                    "notice": iso(notice), "effective": iso(eff),
                    "employees": emp, "kind": kind, "industry": "", "report": label,
                }
                key = (rec["company"], rec["notice"], rec["county"], rec["employees"])
                if key in seen:
                    continue  # fiscal years overlap at the boundaries
                seen.add(key)
                rows.append(rec); n += 1
    print(f"  {label}: {n} rows")

json.dump({
    "source_url": BASE,
    "report": "California WARN reports, FY2022-23 through FY2025-26",
    "rows": rows,
}, open(OUT, "w"), indent=1)
print(f"\n{len(rows)} rows -> {OUT}")
