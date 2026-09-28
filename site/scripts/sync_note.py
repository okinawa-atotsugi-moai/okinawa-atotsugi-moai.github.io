"""Fetch official note RSS at build time; keep last successful content on errors."""
import json, urllib.request, xml.etree.ElementTree as ET
from pathlib import Path
from email.utils import parsedate_to_datetime
ROOT = Path(__file__).resolve().parents[1]
CACHE = ROOT / 'content' / 'note.json'
try:
    req = urllib.request.Request('https://note.com/okinawa_atotsugi/rss', headers={'User-Agent': 'MoaiWebsite/1.0'})
    with urllib.request.urlopen(req, timeout=25) as response:
        root = ET.fromstring(response.read())
    items = []
    for item in root.findall('./channel/item')[:6]:
        url = item.findtext('link', '')
        if not url.startswith('https://note.com/okinawa_atotsugi/'): continue
        image = item.findtext('{http://search.yahoo.com/mrss/}thumbnail', '')
        if image and not image.startswith('https://assets.st-note.com/'): image = ''
        items.append({'title': item.findtext('title', ''), 'url': url, 'date': parsedate_to_datetime(item.findtext('pubDate')).strftime('%Y.%m.%d'), 'image': image})
    if not items: raise ValueError('RSS contained no valid articles')
    CACHE.write_text(json.dumps(items, ensure_ascii=False, indent=2), encoding='utf-8')
    print(f'Updated {len(items)} note articles')
except Exception as exc:
    print(f'RSS unavailable; using saved articles: {exc}')
    if not CACHE.exists(): raise
data = {'articles': json.loads(CACHE.read_text(encoding='utf-8')), 'event': json.loads((ROOT/'content/event.json').read_text(encoding='utf-8'))}
(ROOT/'dist/content.js').write_text('window.MOAI_CONTENT = '+json.dumps(data, ensure_ascii=False)+';\n', encoding='utf-8')
