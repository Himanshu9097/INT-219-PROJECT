function n(t,e=!1,a=null){const r={image:"badge-image",audio:"badge-audio",video:"badge-video",document:"badge-document"}[t.mediaType]||"badge-image",o={image:"Visual",audio:"Music",video:"Video",document:"Document"}[t.mediaType]||"Visual",s="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='300'><rect fill='%23f0ebe3' width='100%25' height='100%25'/><text x='50%25' y='50%25' text-anchor='middle' fill='%23bbb' dy='.3em' font-family='sans-serif' font-size='14'>No Image</text></svg>";let i="";t.mediaType==="audio"?i=`<div class="artwork-media-audio">
      <div class="music-icon">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
      </div>
      <p style="color:var(--muted);font-size:.85rem;margin:0">${t.title}</p>
    </div>`:t.mediaType==="video"?i=`<div class="artwork-media-video-thumb" style="background:#111;display:flex;align-items:center;justify-content:center;min-height:160px;">
      <svg width="48" height="48" viewBox="0 0 24 24" fill="white" opacity=".7"><polygon points="5 3 19 12 5 21 5 3"/></svg>
    </div>`:t.mediaType==="document"?i=`<div class="artwork-media-doc">
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" stroke-width="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
      <span style="font-size:.8rem;color:var(--muted)">Document</span>
    </div>`:i=`<img src="${t.imageUrl||s}" alt="${t.title}" loading="lazy" onerror="this.src='${s}'">`;const d=e&&a&&t.artistId===a?`<div class="artwork-actions" onclick="event.preventDefault();event.stopPropagation()">
        <button onclick="window.__editArtwork('${t.id}')" class="btn btn-sm btn-outline">Edit</button>
        <button onclick="window.__deleteArtwork('${t.id}')" class="btn btn-sm btn-danger">Delete</button>
       </div>`:"",l=t.artistImage?`<img src="${t.artistImage}" alt="${t.artistName}" class="artwork-artist-avatar" onerror="this.style.display='none'">`:`<div class="artwork-artist-avatar" style="display:flex;align-items:center;justify-content:center;font-size:.7rem;font-weight:700;color:var(--accent)">${(t.artistName||"?")[0]}</div>`;return`<a href="/artwork.html?id=${t.id}" class="artwork-card" style="display:block;text-decoration:none;color:inherit;">
    <div class="artwork-media">${i}</div>
    <div class="artwork-info">
      <span class="artwork-type-badge ${r}">${o}</span>
      <div class="artwork-title">${t.title}</div>
      ${t.description?`<div style="font-size:.85rem;color:var(--muted);margin-top:4px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden">${t.description}</div>`:""}
      ${t.artistName?`<div class="artwork-artist">${l}<span class="artwork-artist-name">${t.artistName}</span></div>`:""}
      ${t.price?`<div class="artwork-price">₹${t.price}</div>`:""}
      ${d}
    </div>
  </a>`}function c(t){const e=t.profileImage?`<img src="${t.profileImage}" alt="${t.name}" class="artist-avatar" onerror="this.style.background='var(--secondary-bg)'">`:`<div class="artist-avatar" style="display:flex;align-items:center;justify-content:center;font-size:1.8rem;font-weight:700;color:var(--accent)">${t.name[0]}</div>`;return`<a href="/profile.html?id=${t.id}" class="artist-card" style="display:block;text-decoration:none;">
    <div class="artist-avatar-wrap">${e}</div>
    <div class="artist-name">${t.name}</div>
    <div class="artist-category">${t.category||"Artist"}</div>
    <div class="artist-bio">${t.bio||"Creative professional ready to bring your vision to life."}</div>
    ${t.hourlyRate?`<div class="artist-rate">From $${t.hourlyRate}/hr</div>`:""}
  </a>`}export{c as a,n as b};
