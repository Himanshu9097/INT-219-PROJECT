export function artworkCardHTML(a, showActions = false, currentUserId = null) {
  const badge = { image: 'badge-image', audio: 'badge-audio', video: 'badge-video', document: 'badge-document' }[a.mediaType] || 'badge-image';
  const label = { image: 'Visual', audio: 'Music', video: 'Video', document: 'Document' }[a.mediaType] || 'Visual';
  const placeholder = `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='300'><rect fill='%23f0ebe3' width='100%25' height='100%25'/><text x='50%25' y='50%25' text-anchor='middle' fill='%23bbb' dy='.3em' font-family='sans-serif' font-size='14'>No Image</text></svg>`;
  let media = '';
  if (a.mediaType === 'audio') {
    media = `<div class="artwork-media-audio">
      <div class="music-icon">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
      </div>
      <p style="color:var(--muted);font-size:.85rem;margin:0">${a.title}</p>
    </div>`;
  } else if (a.mediaType === 'video') {
    media = `<div class="artwork-media-video-thumb" style="background:#111;display:flex;align-items:center;justify-content:center;min-height:160px;">
      <svg width="48" height="48" viewBox="0 0 24 24" fill="white" opacity=".7"><polygon points="5 3 19 12 5 21 5 3"/></svg>
    </div>`;
  } else if (a.mediaType === 'document') {
    media = `<div class="artwork-media-doc">
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" stroke-width="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
      <span style="font-size:.8rem;color:var(--muted)">Document</span>
    </div>`;
  } else {
    media = `<img src="${a.imageUrl||placeholder}" alt="${a.title}" loading="lazy" onerror="this.src='${placeholder}'">`;
  }

  const actions = showActions && currentUserId && a.artistId === currentUserId
    ? `<div class="artwork-actions" onclick="event.preventDefault();event.stopPropagation()">
        <button onclick="window.__editArtwork('${a.id}')" class="btn btn-sm btn-outline">Edit</button>
        <button onclick="window.__deleteArtwork('${a.id}')" class="btn btn-sm btn-danger">Delete</button>
       </div>`
    : '';

  const artistPic = a.artistImage
    ? `<img src="${a.artistImage}" alt="${a.artistName}" class="artwork-artist-avatar" onerror="this.style.display='none'">`
    : `<div class="artwork-artist-avatar" style="display:flex;align-items:center;justify-content:center;font-size:.7rem;font-weight:700;color:var(--accent)">${(a.artistName||'?')[0]}</div>`;

  return `<a href="/artwork.html?id=${a.id}" class="artwork-card" style="display:block;text-decoration:none;color:inherit;">
    <div class="artwork-media">${media}</div>
    <div class="artwork-info">
      <span class="artwork-type-badge ${badge}">${label}</span>
      <div class="artwork-title">${a.title}</div>
      ${a.description ? `<div style="font-size:.85rem;color:var(--muted);margin-top:4px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden">${a.description}</div>` : ''}
      ${a.artistName ? `<div class="artwork-artist">${artistPic}<span class="artwork-artist-name">${a.artistName}</span></div>` : ''}
      ${a.price ? `<div class="artwork-price">$${a.price}</div>` : ''}
      ${actions}
    </div>
  </a>`;
}

export function artistCardHTML(a) {
  const avatar = a.profileImage
    ? `<img src="${a.profileImage}" alt="${a.name}" class="artist-avatar" onerror="this.style.background='var(--secondary-bg)'">`
    : `<div class="artist-avatar" style="display:flex;align-items:center;justify-content:center;font-size:1.8rem;font-weight:700;color:var(--accent)">${a.name[0]}</div>`;
  return `<a href="/profile.html?id=${a.id}" class="artist-card" style="display:block;text-decoration:none;">
    <div class="artist-avatar-wrap">${avatar}</div>
    <div class="artist-name">${a.name}</div>
    <div class="artist-category">${a.category || 'Artist'}</div>
    <div class="artist-bio">${a.bio || 'Creative professional ready to bring your vision to life.'}</div>
    ${a.hourlyRate ? `<div class="artist-rate">From $${a.hourlyRate}/hr</div>` : ''}
  </a>`;
}
