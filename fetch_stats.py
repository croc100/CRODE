#!/usr/bin/env python3
"""
fetch_stats.py — CRODE daily stats fetcher
setpoint.kr/api/stats/ 를 호출해 /var/www/crode/stats.json 저장

cron 등록 (crode.net 서버):
  crontab -e
  0 0 * * * /usr/bin/python3 /var/www/crode/fetch_stats.py >> /var/log/crode_stats.log 2>&1
"""

import json
import pathlib
import urllib.request
import urllib.error
from datetime import datetime, timezone

STATS_URL = 'https://setpoint.kr/api/stats/'
OUTPUT    = pathlib.Path('/var/www/crode/stats.json')
TIMEOUT   = 10

def fetch():
    try:
        req = urllib.request.Request(STATS_URL, headers={'User-Agent': 'crode-stats-bot/1.0'})
        with urllib.request.urlopen(req, timeout=TIMEOUT) as resp:
            data = json.loads(resp.read())
        data['fetched_at'] = datetime.now(timezone.utc).strftime('%Y-%m-%dT%H:%M:%SZ')
        OUTPUT.write_text(json.dumps(data, ensure_ascii=False))
        print(f"[OK] {data['fetched_at']} → {data}")
    except Exception as e:
        print(f"[ERR] {e}")
        # 실패 시 기존 파일 유지 (이전 데이터 그대로 표시)

if __name__ == '__main__':
    fetch()
