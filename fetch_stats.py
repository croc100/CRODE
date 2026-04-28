#!/usr/bin/env python3
"""
fetch_stats.py — CRODE daily stats fetcher
setpoint.kr/api/stats/ 호출 → /var/www/crode/stats.json 저장

cron (crode.net 서버):
  0 0 * * * /usr/bin/python3 /home/ubuntu/CRODE/fetch_stats.py >> /var/log/crode_stats.log 2>&1
"""

import json, pathlib, urllib.request, urllib.error
from datetime import datetime, timezone

STATS_URL = 'https://setpoint.kr/api/stats/'
OUTPUT    = pathlib.Path('/home/ubuntu/CRODE/stats.json')
TIMEOUT   = 10

def fetch():
    # 기존 stats.json 읽기 (없으면 빈 dict)
    prev = {}
    if OUTPUT.exists():
        try:
            prev = json.loads(OUTPUT.read_text())
        except Exception:
            pass

    try:
        req = urllib.request.Request(STATS_URL, headers={'User-Agent': 'crode-stats-bot/1.0'})
        with urllib.request.urlopen(req, timeout=TIMEOUT) as resp:
            data = json.loads(resp.read())
        data['fetched_at'] = datetime.now(timezone.utc).strftime('%Y-%m-%dT%H:%M:%SZ')
        print(f"[OK] {data['fetched_at']} → {data}")
    except Exception as e:
        print(f"[ERR] {e} — 기존 파일 유지")
        return  # 실패 시 기존 파일 유지

    OUTPUT.write_text(json.dumps(data, ensure_ascii=False))

if __name__ == '__main__':
    fetch()
