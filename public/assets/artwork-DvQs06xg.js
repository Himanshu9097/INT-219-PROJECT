import{r as p,z as v,x as h,n as g,y}from"./nav-BC0pQlW7.js";import{s as f}from"./toast-D4Myoz-8.js";p("browse");const w=new URLSearchParams(window.location.search),c=w.get("id");c||(window.location.href="/browse.html");let o=null,e=null,t=null;function b(i,n){const r=String(i||"").replace(/\D/g,"");return r?`https://wa.me/${r}?text=${encodeURIComponent(n)}`:""}try{o=await v()}catch{}async function $(){try{if(e=await g(c),document.title=`${e.title} — Artfolio`,e.artistId)try{t=await y(e.artistId)}catch{}B()}catch{document.getElementById("detail-content").innerHTML=`
          <div style="text-align:center;padding:80px 0;">
            <p style="font-size:1.1rem;color:var(--muted)">Artwork not found.</p>
            <a href="/browse.html" class="btn btn-accent" style="margin-top:16px">Browse Works</a>
          </div>`}}function x(){const i="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='500'><rect fill='%23f0ebe3' width='100%25' height='100%25'/><text x='50%25' y='50%25' text-anchor='middle' fill='%23bbb' dy='.3em' font-family='sans-serif' font-size='18'>No Preview</text></svg>";return e.mediaType==="audio"?`<div class="audio-detail-wrap">
          <div class="audio-detail-icon">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
          </div>
          <p style="font-family:var(--font-serif);font-size:1.1rem;font-weight:600;margin-bottom:20px;">${e.title}</p>
          <audio controls style="width:100%;max-width:400px;"><source src="${e.imageUrl}"></audio>
        </div>`:e.mediaType==="video"?`<video controls style="width:100%;max-height:560px;background:#000;"><source src="${e.imageUrl}"></video>`:e.mediaType==="document"?`<div class="doc-detail-wrap">
          <div class="doc-detail-icon">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" stroke-width="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
          </div>
          <p style="font-size:1rem;font-weight:600;margin-bottom:20px;">${e.title}</p>
          <a href="${e.imageUrl}" target="_blank" class="btn btn-accent">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Download / View Document
          </a>
        </div>`:`<img src="${e.imageUrl||i}" alt="${e.title}" style="width:100%;max-height:600px;object-fit:contain;display:block;" onerror="this.src='${i}'">`}function k(){if(!t)return"";const i=o&&o.id!==t.id;return`<div class="artist-detail-card">
        <div class="artist-detail-header">
          ${t.profileImage?`<img src="${t.profileImage}" alt="${t.name}" class="artist-detail-avatar" style="width:56px;height:56px;border-radius:50%;object-fit:cover;" onerror="this.style.display='none'">`:`<div class="artist-detail-avatar">${t.name[0]}</div>`}
          <div>
            <div class="artist-detail-name">${t.name}</div>
            <div class="artist-detail-cat">${t.category||"Artist"}</div>
          </div>
        </div>
        ${t.bio?`<p class="artist-detail-bio">${t.bio}</p>`:""}
        <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;">
          ${t.hourlyRate?`<span class="artist-detail-rate">From $${t.hourlyRate}/hr</span>`:""}
          ${t.location?`<span style="font-size:.85rem;color:var(--muted)">📍 ${t.location}</span>`:""}
        </div>
        <div class="artist-contact-row">
          ${i&&t.email?`<a href="mailto:${t.email}?subject=${encodeURIComponent(`Project inquiry for ${e.title}`)}&body=${encodeURIComponent(`Hi ${t.name}, I want to discuss your project: ${e.title}.`)}" class="btn btn-outline btn-sm">Email</a>`:""}
          ${i&&t.phoneNumber?`<a href="${b(t.phoneNumber,`Hi ${t.name}, I want to discuss your project: ${e.title}.`)}" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm">WhatsApp</a>`:""}
        </div>
      </div>`}function I(){const i=o&&e.artistId===o.id,n=o&&o.role==="client",r=!!o,a=t?`<a href="/profile.html?id=${t.id}" class="btn btn-outline">View Artist Profile</a>`:"";return i?`<div class="action-buttons">
          ${a}
          <div style="text-align:center;color:var(--muted);font-size:.875rem;padding:8px;">This is your artwork</div>
        </div>`:n?`<div class="action-buttons">
          <button class="btn btn-accent" id="hire-btn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 7H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
            Hire This Artist
          </button>
          ${a}
        </div>`:r?`<div class="action-buttons">${a}</div>`:`<div class="action-buttons">
          <a href="/login.html" class="btn btn-accent">Sign In to Hire</a>
          ${a}
        </div>`}function B(){const i={image:"Visual Art",audio:"Music",video:"Video",document:"Document"}[e.mediaType]||"Artwork",n={image:"badge-image",audio:"badge-audio",video:"badge-video",document:"badge-document"}[e.mediaType]||"badge-image";document.getElementById("detail-content").innerHTML=`
        <div class="artwork-detail-grid">
          <div>
            <div class="artwork-detail-media">${x()}</div>
          </div>
          <div class="artwork-detail-panel">
            <div class="artwork-detail-meta">
              <span class="artwork-type-badge ${n}">${i}</span>
              ${e.category?`<span style="font-size:.85rem;color:var(--muted);">${e.category}</span>`:""}
            </div>
            <h1 class="artwork-detail-title">${e.title}</h1>
            ${e.description?`<p class="artwork-detail-desc">${e.description}</p>`:""}
            ${e.price?`<div class="artwork-detail-price">₹${e.price} <span>/ project</span></div>`:""}
            ${e.projectUrl?`<a href="${e.projectUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-outline" style="margin-bottom:20px;">View Live Project</a>`:""}
            ${k()}
            ${I()}
          </div>
        </div>`,document.getElementById("hire-btn")?.addEventListener("click",()=>{if(document.getElementById("modal-artist-name").textContent=t?.name||"Artist",document.getElementById("modal-artwork-ref").textContent=`For: "${e.title}"`,e.price||t&&t.hourlyRate){const a=document.getElementById("bid-ref-row"),d=document.getElementById("bid-ref-price");a.style.display="flex",d.textContent=e.price?`₹${e.price} / project`:`₹${t.hourlyRate} / hr`}document.getElementById("hire-panel-overlay").classList.add("open"),document.body.style.overflow="hidden"})}function s(){document.getElementById("hire-panel-overlay").classList.remove("open"),document.body.style.overflow=""}document.getElementById("cancel-hire").addEventListener("click",s);document.getElementById("cancel-hire-2").addEventListener("click",s);document.getElementById("hire-panel-overlay").addEventListener("click",i=>{i.target===i.currentTarget&&s()});document.getElementById("hire-form").addEventListener("submit",async i=>{i.preventDefault();const n=document.getElementById("hire-error"),r=document.getElementById("hire-submit");n.style.display="none",r.disabled=!0,r.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/></svg> Sending…';const a=document.getElementById("hire-title").value.trim(),d=document.getElementById("hire-desc").value.trim(),l=document.getElementById("hire-budget").value,m=document.getElementById("hire-deadline").value;try{await h(e.artistId,{title:a,description:d,budget:l?Number(l):void 0,deadline:m||void 0}),s(),f("🎉 Offer sent! The artist has been notified and will respond soon."),document.getElementById("hire-form").reset(),document.getElementById("bid-ref-row").style.display="none"}catch(u){n.textContent=u.message||"Failed to send request.",n.style.display="block"}finally{r.disabled=!1,r.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg> Send Offer to Artist'}});$();
