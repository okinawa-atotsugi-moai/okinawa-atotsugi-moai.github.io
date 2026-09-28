const data = window.MOAI_CONTENT || {};
const photoTrack = document.querySelector('.photo-track');
if (photoTrack) {
  const controls = document.querySelector('.photo-controls');
  const photos = [...photoTrack.querySelectorAll('img')];
  const count = controls.querySelector('.photo-count');
  const captions = ['第1回 / 2026.05.22　仲間と出会う。', '第2回 / 2026.08.14　上間喜壽さんから学ぶ。', '第1回 / 2026.05.22　本音で語り合う。', '第2回 / 2026.08.14　学びを持ち寄り、次の一歩へ。', '第1回 / 2026.05.22　家業のこれからを考える。'];
  const caption = document.querySelector('.slide-caption');
  const source = document.querySelector('.photo-source');
  const current = () => Math.round(photoTrack.scrollLeft / photoTrack.clientWidth);
  const move = delta => {
    const next = (current() + delta + photos.length) % photos.length;
    photoTrack.scrollTo({left: next * photoTrack.clientWidth, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'});
  };
  controls.hidden = false;
  controls.querySelector('.photo-prev').addEventListener('click', () => move(-1));
  controls.querySelector('.photo-next').addEventListener('click', () => move(1));
  photoTrack.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { e.preventDefault(); move(e.key === 'ArrowRight' ? 1 : -1); }
  });
  photoTrack.addEventListener('scroll', () => {
    count.textContent = `${String(current() + 1).padStart(2, '0')} / ${String(photos.length).padStart(2, '0')}`;
    caption.textContent = captions[current()] || '';
    source.hidden = ![1, 3].includes(current());
  }, {passive: true});
}
const articles = document.querySelector('#articles');
if (data.articles?.length) {
  articles.replaceChildren(...data.articles.slice(0, 3).map(item => {
    const a = document.createElement('a'); a.className = 'article'; a.href = item.url;
    if (item.image) { const img = document.createElement('img'); img.src = item.image; img.alt = ''; img.loading = 'lazy'; img.width = 600; img.height = 315; a.append(img); }
    const text = document.createElement('div'); const date = document.createElement('small'); date.textContent = `${item.date} / note`;
    const title = document.createElement('h3'); title.textContent = item.title; text.append(date, title); a.append(text); return a;
  }));
}
if (data.event && data.event.title) {
  const e = data.event; const box = document.querySelector('#next-event'); box.replaceChildren();
  const status = document.createElement('span'); status.className='badge'; status.textContent=e.status || '開催予定';
  const title=document.createElement('h3'); title.textContent=e.title;
  const detail=document.createElement('p'); detail.textContent=[e.date, e.venue, e.fee].filter(Boolean).join(' ｜ ');
  box.append(status,title,detail);
  if(e.url && /^https:\/\//.test(e.url)){const a=document.createElement('a'); a.className='text-link';a.href=e.url;a.textContent='詳細・お申し込み ↗';box.append(a);}
}
