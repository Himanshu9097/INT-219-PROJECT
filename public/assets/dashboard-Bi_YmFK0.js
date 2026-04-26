import{f as Q,r as X,h as Z,b as B,e as z,i as F,u as H,j as ee,k as te,m as ie,n as oe,o as ne,p as D,q as le,t as W,v as O}from"./nav-BC0pQlW7.js";import{b as U,a as ae}from"./cards-zDbMPcTx.js";import{s as v,e as I}from"./toast-D4Myoz-8.js";import{initGlobalAnimations as re}from"./animations-DP-uY6Jr.js";const se="modulepreload",de=function(t){return"/"+t},j={},ce=function(e,o,n){let l=Promise.resolve();if(o&&o.length>0){let w=function(s){return Promise.all(s.map(u=>Promise.resolve(u).then(m=>({status:"fulfilled",value:m}),m=>({status:"rejected",reason:m}))))};document.getElementsByTagName("link");const r=document.querySelector("meta[property=csp-nonce]"),p=r?.nonce||r?.getAttribute("nonce");l=w(o.map(s=>{if(s=de(s),s in j)return;j[s]=!0;const u=s.endsWith(".css"),m=u?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${s}"]${m}`))return;const g=document.createElement("link");if(g.rel=u?"stylesheet":se,u||(g.as="script"),g.crossOrigin="",g.href=s,p&&g.setAttribute("nonce",p),document.head.appendChild(g),u)return new Promise((T,K)=>{g.addEventListener("load",T),g.addEventListener("error",()=>K(new Error(`Unable to preload CSS for ${s}`)))})}))}function d(r){const p=new Event("vite:preloadError",{cancelable:!0});if(p.payload=r,window.dispatchEvent(p),!p.defaultPrevented)throw r}return l.then(r=>{for(const p of r||[])p.status==="rejected"&&d(p.reason);return e().catch(d)})};Q();X("dashboard");window.__doLogout=Z;let i=null,L=[],y=[],k=null,b=null,E=null,f=null;function a(t=""){return String(t).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function pe(t){const e=String(t||"").replace(/\D/g,"");return e?(e.startsWith("91")&&e.length>10,e.slice(-10)):""}function ue(t,e){const o=String(t||"").replace(/\D/g,"");return o?`https://wa.me/${o}?text=${encodeURIComponent(e)}`:""}function A(){if(!i)return;const t=i.name;document.getElementById("greeting").textContent=`Welcome back, ${t}! 👋`,document.getElementById("sidebar-name").textContent=t,document.getElementById("sidebar-role").textContent=i.role==="artist"?"Artist":"Client";const e=document.getElementById("sidebar-avatar");e.textContent="",e.style.backgroundImage="",e.style.backgroundSize="",e.style.backgroundPosition="",i.profileImage?(e.style.backgroundImage=`url(${i.profileImage})`,e.style.backgroundSize="cover",e.style.backgroundPosition="center"):e.textContent=t[0]}window.showTab=function(t){document.querySelectorAll(".dashboard-tab").forEach(e=>e.classList.remove("active")),document.querySelectorAll(".sidebar-nav-item").forEach(e=>e.classList.remove("active")),document.getElementById("tab-"+t)?.classList.add("active"),document.querySelector(`[data-tab="${t}"]`)?.classList.add("active"),t==="myworks"&&R(),t==="community"&&ge(),t==="profile"&&P(),t==="requests"&&C()};document.querySelectorAll(".sidebar-nav-item[data-tab]").forEach(t=>{t.addEventListener("click",()=>showTab(t.dataset.tab))});async function me(){if(i=le(),i||(i=await W()),!i){window.location.href="/login.html";return}A(),i.role==="artist"?(document.getElementById("artist-only-cta").style.display="block",document.getElementById("upload-tab-btn").style.display="flex"):document.getElementById("upload-tab-btn").style.display="none",await q(),ke(),re()}async function q(){try{const[t,e,o]=await Promise.all([B(i.id),z(),B()]);y=t||[],L=o||[],document.getElementById("stat-works").textContent=y.length,document.getElementById("stat-community").textContent=(e||[]).length,document.getElementById("stat-community-works").textContent=L.length;const n=document.getElementById("overview-works");y.length>0?n.innerHTML=y.slice(0,4).map(l=>U(l)).join(""):n.innerHTML=`<div class="empty-state" style="grid-column:1/-1"><div class="empty-state-icon">🎨</div><div class="empty-state-title">Upload your first work</div><div class="empty-state-sub">Start your portfolio with a certificate, concert project, product shoot, or any creative work.</div><button onclick="showTab('upload')" class="btn btn-accent" style="margin-top:16px">Upload Now</button></div>`}catch(t){console.error(t)}}async function R(){const t=document.getElementById("my-works-grid");t.innerHTML='<div class="loading-wrap"><div class="spinner"></div></div>';try{y=await B(i.id)||[],y.length===0?t.innerHTML=`<div class="empty-state" style="grid-column:1/-1"><div class="empty-state-icon">🎨</div><div class="empty-state-title">No works yet</div><div class="empty-state-sub">Upload your first artwork to build your portfolio</div><button onclick="showTab('upload')" class="btn btn-accent" style="margin-top:16px">Upload Now</button></div>`:t.innerHTML=y.map(e=>U(e,!0,i.id)).join("")}catch(e){console.error("Failed to load works",e),t.innerHTML=`<div class="empty-state" style="grid-column:1/-1"><div class="empty-state-icon">⚠️</div><div class="empty-state-title">Couldn’t load works</div><div class="empty-state-sub">${a(e.message||"Please refresh and try again.")}</div></div>`}}let _="",c=[];async function ge(){const t=document.getElementById("community-feed"),e=document.getElementById("community-artists");t.innerHTML='<div class="loading-wrap"><div class="spinner"></div></div>';try{const[o,n]=await Promise.allSettled([B(),z()]);L=o.status==="fulfilled"?o.value||[]:[];const d=(n.status==="fulfilled"?n.value||[]:[]).filter(r=>r.id!==i.id);e.innerHTML=d.slice(0,6).map(ae).join("")||'<p class="text-muted">No other artists yet.</p>',G(),o.status==="rejected"&&console.error("Failed to load community works",o.reason),n.status==="rejected"&&(console.error("Failed to load community artists",n.reason),e.innerHTML='<p class="text-muted">Failed to load artists.</p>')}catch(o){console.error("Failed to load community",o),t.innerHTML=`<div class="empty-state" style="grid-column:1/-1"><div class="empty-state-icon">⚠️</div><div class="empty-state-title">Couldn’t load community</div><div class="empty-state-sub">${a(o.message||"Please refresh and try again.")}</div></div>`}}function G(){const t=document.getElementById("community-feed");let e=L.filter(o=>o.artistId!==i.id);_&&(e=e.filter(o=>o.mediaType===_)),e.length===0?t.innerHTML='<div class="empty-state" style="grid-column:1/-1"><div class="empty-state-icon">🌐</div><div class="empty-state-title">No works found</div><div class="empty-state-sub">Be the first to upload in this category!</div></div>':t.innerHTML=e.map(o=>U(o)).join("")}document.getElementById("community-filters").addEventListener("click",t=>{const e=t.target.closest(".filter-btn");e&&(document.querySelectorAll("#community-filters .filter-btn").forEach(o=>o.classList.remove("active")),e.classList.add("active"),_=e.dataset.type,G())});async function P(){const t=document.getElementById("profile-info");if(!i)return;c=[...Array.isArray(i.spotlights)?i.spotlights:i.spotlightTitle||i.spotlightDescription||i.spotlightImage?[{title:i.spotlightTitle,description:i.spotlightDescription,image:i.spotlightImage}]:[]],t.innerHTML=`
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:60px;">
          
          <!-- Left Column: Current Profile Preview -->
          <div style="border-right:1px solid var(--border);padding-right:20px;" id="profile-preview-col">
            <div style="display:flex;align-items:center;gap:20px;margin-bottom:28px;">
              <div style="width:80px;height:80px;border-radius:50%;background:${i.profileImage?`url(${a(i.profileImage)}) center/cover no-repeat`:"var(--secondary-bg)"};border:3px solid var(--border);display:flex;align-items:center;justify-content:center;font-size:1.8rem;font-weight:700;color:var(--accent);flex-shrink:0">${i.profileImage?"":i.name[0]}</div>
              <div style="display:flex;flex-direction:column;gap:4px;">
                <div style="font-family:var(--font-serif);font-size:1.4rem;font-weight:700;color:var(--foreground);">${i.name}</div>
                <div style="display:inline-flex;align-items:center;gap:6px;font-size:.85rem;color:var(--accent);font-weight:700;letter-spacing:0.04em;text-transform:uppercase;background:var(--secondary-bg);padding:4px 12px;border-radius:99px;width:fit-content;">
                  ${i.category||i.role||"Artist"}
                </div>
              </div>
            </div>
            
            ${i.tagline?`<div style="font-size:1.05rem;font-weight:600;color:var(--foreground);margin-bottom:12px;">“${i.tagline}”</div>`:""}
            ${i.bio?`<p style="color:var(--muted);font-size:0.95rem;line-height:1.6;margin-bottom:24px;border-bottom:1px solid var(--border);padding-bottom:24px;">${i.bio}</p>`:'<p style="color:var(--muted);font-size:.875rem;border-bottom:1px solid var(--border);padding-bottom:24px;margin-bottom:24px;">No bio yet.</p>'}
            
            <div style="display:flex;flex-direction:column;gap:12px;margin-bottom:24px;">
              ${i.location?`<div style="font-size:.9rem;color:var(--muted);display:flex;align-items:center;gap:8px;"><span>📍</span> ${i.location}</div>`:""}
              ${i.hourlyRate?`<div style="font-size:.9rem;color:var(--muted);display:flex;align-items:center;gap:8px;"><span>💰</span> $${i.hourlyRate} / hr</div>`:""}
              ${i.availabilityStatus?`<div style="font-size:.9rem;color:var(--muted);display:flex;align-items:center;gap:8px;"><span>🟢</span> ${i.availabilityStatus.charAt(0).toUpperCase()+i.availabilityStatus.slice(1)}</div>`:""}
            </div>
            
            ${i.website||i.instagram||i.behance||i.linkedin||i.github?`
              <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:24px;">
                ${i.website?`<a href="${a(i.website)}" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm">Website</a>`:""}
                ${i.instagram?`<a href="${a(i.instagram)}" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm">Instagram</a>`:""}
                ${i.behance?`<a href="${a(i.behance)}" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm">Behance</a>`:""}
                ${i.linkedin?`<a href="${a(i.linkedin)}" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm">LinkedIn</a>`:""}
                ${i.github?`<a href="${a(i.github)}" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm">GitHub</a>`:""}
              </div>`:""}
              
            ${i.skills?`<div><div style="font-size:.8rem;font-weight:700;letter-spacing:0.1em;color:var(--foreground);margin-bottom:12px;">SKILLS & EXPERTISE</div><div class="profile-skills" style="gap:8px;">${i.skills.split(",").map(o=>`<span class="skill-tag" style="background:var(--secondary-bg);color:var(--foreground);border:1px solid var(--border);">${o.trim()}</span>`).join("")}</div></div>`:""}
            
            <div id="spotlight-preview" style="margin-top:24px;"></div>
          </div>

          <!-- Right Column: Settings Form -->
          <div>
            <form id="profile-edit-form" style="display:flex;flex-direction:column;gap:20px;">
              <div style="font-family:var(--font-serif);font-size:1.3rem;font-weight:700;color:var(--foreground);border-bottom:1px solid var(--border);padding-bottom:12px;margin-bottom:8px;">
                Edit Profile Information
              </div>
              
              <div class="form-group" style="margin-bottom:0;">
                <label class="form-label" for="profile-image-file-input">Profile Avatar</label>
                <div style="display:flex;gap:12px;align-items:center;">
                  <input class="form-input" id="profile-image-file-input" type="file" accept="image/*" style="flex:1;" />
                  <button type="button" class="btn btn-primary" id="profile-image-upload-btn">Upload</button>
                </div>
              </div>
              
              <div class="form-row">
                <div class="form-group" style="margin-bottom:0;">
                  <label class="form-label" for="profile-name-input">Display Name *</label>
                  <input class="form-input" id="profile-name-input" type="text" required value="${a(i.name||"")}" />
                </div>
                <div class="form-group" style="margin-bottom:0;">
                  <label class="form-label" for="profile-category-input">Primary Role / Category</label>
                  <input class="form-input" id="profile-category-input" type="text" placeholder="e.g. 3D Animator" value="${a(i.category||"")}" />
                </div>
              </div>

              <div class="form-group" style="margin-bottom:0;">
                <label class="form-label" for="profile-tagline-input">Quick Tagline</label>
                <input class="form-input" id="profile-tagline-input" type="text" placeholder="Illustrator crafting bold editorial worlds" value="${a(i.tagline||"")}" />
              </div>

              <div class="form-group" style="margin-bottom:0;">
                <label class="form-label" for="profile-bio-input">About You</label>
                <textarea class="form-input form-textarea" id="profile-bio-input" rows="3" placeholder="Tell clients what you do and what makes your work unique...">${a(i.bio||"")}</textarea>
              </div>

              <div class="form-row">
                <div class="form-group" style="margin-bottom:0;">
                  <label class="form-label" for="profile-location-input">Location</label>
                  <input class="form-input" id="profile-location-input" type="text" placeholder="City, Country" value="${a(i.location||"")}" />
                </div>
                <div class="form-group" style="margin-bottom:0;">
                  <label class="form-label" for="profile-phone-input">Phone Number</label>
                  <div style="display:flex;gap:8px;">
                    <input class="form-input" style="width:60px;padding:12px 8px;text-align:center;" type="text" value="+91" disabled />
                    <input class="form-input" id="profile-phone-input" type="tel" style="flex:1;" inputmode="numeric" maxlength="10" pattern="[0-9]{10}" placeholder="9876543210" value="${a(pe(i.phoneNumber))}" />
                  </div>
                </div>
              </div>

              <div class="form-row">
                <div class="form-group" style="margin-bottom:0;">
                  <label class="form-label" for="profile-rate-input">Hourly Rate ($)</label>
                  <input class="form-input" id="profile-rate-input" type="number" min="0" step="1" placeholder="e.g. 50" value="${i.hourlyRate||""}" />
                </div>
                <div class="form-group" style="margin-bottom:0;">
                  <label class="form-label" for="profile-availability-input">Current Availability</label>
                  <select class="form-input form-select" id="profile-availability-input">
                    <option value="available" ${i.availabilityStatus==="available"?"selected":""}>Available for work</option>
                    <option value="limited" ${i.availabilityStatus==="limited"?"selected":""}>Limited availability</option>
                    <option value="booked" ${i.availabilityStatus==="booked"?"selected":""}>Fully booked</option>
                  </select>
                </div>
              </div>

              <div class="form-group" style="margin-bottom:0;">
                <label class="form-label" for="profile-skills-input">Skills (comma separated)</label>
                <input class="form-input" id="profile-skills-input" type="text" placeholder="Branding, Illustration, Motion Design" value="${a(i.skills||"")}" />
              </div>

              <div style="font-family:var(--font-serif);font-size:1.1rem;font-weight:700;color:var(--foreground);border-bottom:1px solid var(--border);padding-bottom:12px;margin-top:8px;margin-bottom:4px;">
                Social Links & URLs
              </div>

              <div class="form-row">
                <input class="form-input" id="profile-website-input" type="url" placeholder="Website URL" value="${a(i.website||"")}" />
                <input class="form-input" id="profile-instagram-input" type="url" placeholder="Instagram URL" value="${a(i.instagram||"")}" />
              </div>
              <div class="form-row">
                <input class="form-input" id="profile-behance-input" type="url" placeholder="Behance URL" value="${a(i.behance||"")}" />
                <input class="form-input" id="profile-linkedin-input" type="url" placeholder="LinkedIn URL" value="${a(i.linkedin||"")}" />
              </div>
              <div class="form-row">
                <input class="form-input" id="profile-github-input" type="url" placeholder="GitHub URL" value="${a(i.github||"")}" />
                <input class="form-input" id="profile-image-input" type="url" placeholder="Profile Image Link (optional override)" value="${a(i.profileImage||"")}" />
              </div>

              <div style="margin-top:12px;padding:20px;border:1px solid var(--border);border-radius:12px;background:var(--secondary-bg);">
                <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;">
                  <div style="font-weight:700;color:var(--foreground);">Highlights / Features</div>
                  <button type="button" class="btn btn-outline btn-sm" id="add-spotlight-btn">+ Add</button>
                </div>
                <div id="spotlight-list"></div>
              </div>

              <div class="form-error hidden" id="profile-save-error" style="padding:12px;background:#fef2f2;border-radius:8px;"></div>
              
              <div style="display:flex;justify-content:flex-end;margin-top:12px;">
                <button type="submit" class="btn btn-accent btn-lg" style="min-width: 180px;">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      `,document.getElementById("view-public-profile").href=`/profile.html?id=${i.id}`,document.getElementById("profile-edit-form").addEventListener("submit",fe),document.getElementById("profile-image-upload-btn").addEventListener("click",ye),document.getElementById("add-spotlight-btn").addEventListener("click",ve),$(),S()}async function fe(t){t.preventDefault();const e=document.getElementById("profile-save-error");e.classList.add("hidden");const o={name:document.getElementById("profile-name-input").value.trim(),tagline:document.getElementById("profile-tagline-input").value.trim()||void 0,bio:document.getElementById("profile-bio-input").value.trim()||void 0,category:document.getElementById("profile-category-input").value.trim()||void 0,location:document.getElementById("profile-location-input").value.trim()||void 0,phoneNumber:void 0,hourlyRate:document.getElementById("profile-rate-input").value?Number(document.getElementById("profile-rate-input").value):void 0,availabilityStatus:document.getElementById("profile-availability-input").value,skills:document.getElementById("profile-skills-input").value.trim()||void 0,website:document.getElementById("profile-website-input").value.trim()||void 0,profileImage:document.getElementById("profile-image-input").value.trim()||void 0,instagram:document.getElementById("profile-instagram-input").value.trim()||void 0,behance:document.getElementById("profile-behance-input").value.trim()||void 0,linkedin:document.getElementById("profile-linkedin-input").value.trim()||void 0,github:document.getElementById("profile-github-input").value.trim()||void 0,spotlights:c.map(l=>({title:(l.title||"").trim(),description:(l.description||"").trim(),image:(l.image||"").trim()})).filter(l=>l.title||l.description||l.image)},n=document.getElementById("profile-phone-input").value.replace(/\D/g,"");if(n){if(n.length!==10){e.textContent="Phone number must be exactly 10 digits.",e.classList.remove("hidden");return}o.phoneNumber=`91${n}`}if(!o.name){e.textContent="Display name is required.",e.classList.remove("hidden");return}try{i=await O(o),localStorage.setItem("artfolio_user",JSON.stringify(i)),A(),v("Profile updated successfully."),await P()}catch(l){e.textContent=l.message||"Failed to save profile.",e.classList.remove("hidden")}}async function ye(){const t=document.getElementById("profile-save-error"),e=document.getElementById("profile-image-file-input"),o=document.getElementById("profile-image-upload-btn"),n=e.files?.[0];if(t.classList.add("hidden"),!n){t.textContent="Please choose an image file first.",t.classList.remove("hidden");return}o.disabled=!0,o.textContent="Uploading...";try{const l=await D(n),d=document.getElementById("profile-image-input");if(d&&(d.value=l.url),await O({name:i.name,tagline:i.tagline,bio:i.bio,category:i.category,location:i.location,phoneNumber:i.phoneNumber,hourlyRate:i.hourlyRate,availabilityStatus:i.availabilityStatus||"available",skills:i.skills,website:i.website,instagram:i.instagram,behance:i.behance,linkedin:i.linkedin,github:i.github,spotlights:c,profileImage:l.url}),i=await W(),!i)throw new Error("Profile was uploaded, but refreshing the updated user failed.");localStorage.setItem("artfolio_user",JSON.stringify(i)),A(),v("Profile image updated."),await P()}catch(l){t.textContent=l.message||"Failed to upload profile image.",t.classList.remove("hidden")}finally{o.disabled=!1,o.textContent="Upload"}}function S(){const t=document.getElementById("spotlight-list");if(t){if(!c.length){t.innerHTML=`<div class="empty-state" style="border:1px dashed var(--border);padding:16px;border-radius:12px;">
          <div class="empty-state-title" style="font-size:1rem;">Add your first highlight</div>
          <div class="empty-state-sub">Show a certificate, concert, event, or product work with title, description, and image.</div>
        </div>`;return}t.innerHTML=c.map((e,o)=>`
          <div style="border:1px solid var(--border);border-radius:12px;padding:12px;display:grid;gap:10px;background:#fff;">
            <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;">
              <div style="font-weight:700;color:var(--foreground);">Highlight #${o+1}</div>
              <button type="button" class="btn btn-outline btn-sm" onclick="window.__removeSpotlight(${o})">Remove</button>
            </div>
            <input class="form-input" type="text" value="${a(e.title||"")}" oninput="window.__updateSpotlight(${o}, 'title', this.value)" placeholder="Title" />
            <textarea class="form-input form-textarea" rows="2" oninput="window.__updateSpotlight(${o}, 'description', this.value)" placeholder="Short description">${a(e.description||"")}</textarea>
            <div style="display:flex;align-items:center;gap:10px;">
              <button type="button" class="btn btn-outline btn-sm" onclick="document.getElementById('spotlight-file-${o}').click()">Replace Image</button>
              <input id="spotlight-file-${o}" type="file" accept="image/*" style="display:none;" onchange="window.__uploadSpotlight(${o})" />
              ${e.image?'<span style="font-size:.85rem;color:var(--muted);flex:1;">Image set</span>':'<span style="font-size:.85rem;color:var(--muted);flex:1;">No image</span>'}
            </div>
            ${e.image?`<img src="${a(e.image)}" alt="Highlight ${o+1}" style="width:100%;max-height:140px;object-fit:cover;border-radius:10px;" />`:""}
          </div>
        `).join("")}}function ve(){c.push({title:"",description:"",image:""}),S(),$()}function be(t,e,o){c[t]&&(c[t]={...c[t],[e]:o},$())}async function he(t){const e=document.getElementById("profile-save-error");e.classList.add("hidden");const n=document.getElementById(`spotlight-file-${t}`)?.files?.[0];if(!n){e.textContent="Please choose a highlight image first.",e.classList.remove("hidden");return}try{const l=await D(n);c[t]={...c[t],image:l.url},S(),$(),v("Highlight image uploaded. Save profile to apply.")}catch(l){e.textContent=l.message||"Failed to upload highlight image.",e.classList.remove("hidden")}}function we(t){c.splice(t,1),S(),$()}function $(){const t=document.getElementById("spotlight-preview");if(t){if(!c.length){t.innerHTML="";return}t.innerHTML=`
        <div style="margin-top:20px;padding:18px;border:1px solid var(--border);border-radius:16px;background:var(--secondary-bg);display:grid;gap:12px;">
          <div style="font-size:.78rem;font-weight:700;letter-spacing:.08em;color:var(--accent);display:flex;align-items:center;justify-content:space-between;gap:10px;">
            <span>HIGHLIGHTS</span>
            ${c.length>1?`<div class="highlight-nav" style="position:static;transform:none;gap:6px;width:auto;">
              <button type="button" class="highlight-btn" onclick="window.__scrollHighlights('dashboard-spotlights-track', -1)">‹</button>
              <button type="button" class="highlight-btn" onclick="window.__scrollHighlights('dashboard-spotlights-track', 1)">›</button>
            </div>`:""}
          </div>
          <div class="highlight-slider">
            <div class="highlight-track" id="dashboard-spotlights-track">
              ${c.map(e=>`
                <div class="highlight-card">
                  ${e.image?`<img src="${a(e.image)}" alt="${a(e.title||"Highlight")}" />`:""}
                  ${e.title?`<div style="font-family:var(--font-serif);font-weight:700;">${a(e.title)}</div>`:""}
                  ${e.description?`<div style="color:var(--muted);font-size:.9rem;">${a(e.description)}</div>`:""}
                  <button type="button" class="btn btn-outline btn-sm" style="justify-content:center;" onclick="window.__removeSpotlight(${c.indexOf(e)})">Remove</button>
                </div>
              `).join("")}
            </div>
            ${c.length>1?`
              <div class="highlight-nav">
                <button type="button" class="highlight-btn" onclick="window.__scrollHighlights('dashboard-spotlights-track', -1)">‹</button>
                <button type="button" class="highlight-btn" onclick="window.__scrollHighlights('dashboard-spotlights-track', 1)">›</button>
              </div>`:""}
          </div>
        </div>`,setTimeout(()=>{ce(()=>import("./animations-DP-uY6Jr.js"),[]).then(e=>{e.initHighlightAnimations&&e.initHighlightAnimations()}).catch(e=>console.error("Could not load animations module",e))},50)}}window.__updateSpotlight=be;window.__uploadSpotlight=he;window.__removeSpotlight=we;window.__scrollHighlights=(t,e)=>{const o=document.getElementById(t);if(!o)return;const n=o.querySelector(".highlight-card"),l=n?n.offsetWidth+12:o.clientWidth;o.scrollBy({left:e*l,behavior:"smooth"})};const N={pending:{label:"Pending",bg:"#fef3c7",color:"#92400e"},accepted:{label:"Accepted",bg:"#d1fae5",color:"#065f46"},declined:{label:"Declined",bg:"#fee2e2",color:"#991b1b"},completed:{label:"Completed",bg:"#dbeafe",color:"#1e40af"}};function xe(t,e){const o=N[t.status]||N.pending,n=e?t.clientName:t.artistName,l=t.deadline?new Date(t.deadline).toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"}):"Flexible",d=t.budget?`$${t.budget.toLocaleString()}`:"Open to offers",r=new Date(t.createdAt).toLocaleDateString("en-US",{month:"short",day:"numeric"}),p=e&&t.status==="pending"?`
        <div style="display:flex;gap:10px;margin-top:20px;">
          <button onclick="window.__acceptRequest('${t.id}')" class="btn btn-accent btn-sm" style="flex:1;justify-content:center;">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
            Accept
          </button>
          <button onclick="window.__declineRequest('${t.id}')" class="btn btn-outline btn-sm" style="flex:1;justify-content:center;color:#ef4444;border-color:#ef4444;">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            Decline
          </button>
        </div>`:"",w=!e&&t.status==="accepted"?`
        <div style="margin-top:16px;">
          <button onclick="window.__markComplete('${t.id}')" class="btn btn-outline btn-sm" style="width:100%;justify-content:center;">
            Mark as Completed
          </button>
        </div>`:"",s=e?t.clientEmail:t.artistEmail,u=e?t.clientPhoneNumber:t.artistPhoneNumber,m=`
        <div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:16px;">
          ${s?`<a href="mailto:${s}?subject=${encodeURIComponent(`Regarding: ${t.title}`)}" class="btn btn-outline btn-sm">Email</a>`:""}
          ${u?`<a href="${ue(u,`Hi, I want to discuss the project "${t.title}".`)}" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm">WhatsApp</a>`:""}
        </div>`;return`
        <div style="background:var(--card-bg);border:1px solid var(--border);border-radius:16px;padding:24px;margin-bottom:16px;transition:box-shadow .2s;" onmouseenter="this.style.boxShadow='0 4px 24px rgba(0,0,0,.08)'" onmouseleave="this.style.boxShadow='none'">
          <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:12px;flex-wrap:wrap;">
            <div style="flex:1;min-width:0;">
              <div style="display:flex;align-items:center;gap:10px;margin-bottom:6px;flex-wrap:wrap;">
                <span style="font-family:var(--font-serif);font-size:1.05rem;font-weight:700;">${t.title}</span>
                <span style="background:${o.bg};color:${o.color};font-size:.72rem;font-weight:700;padding:3px 10px;border-radius:999px;">${o.label}</span>
              </div>
              <div style="font-size:.83rem;color:var(--muted);margin-bottom:12px;">
                ${e?"From":"To"} <strong style="color:var(--text)">${n||"Unknown"}</strong> · ${r}
              </div>
              <p style="font-size:.88rem;color:var(--muted);line-height:1.55;margin-bottom:0;">${t.description.length>180?t.description.slice(0,180)+"…":t.description}</p>
            </div>
            <div style="text-align:right;flex-shrink:0;">
              <div style="font-family:var(--font-serif);font-size:1.4rem;font-weight:700;color:var(--accent);">${d}</div>
              <div style="font-size:.78rem;color:var(--muted);">📅 ${l}</div>
            </div>
          </div>
          ${m}${p}${w}
        </div>`}async function C(){const t=document.getElementById("requests-list");t.innerHTML='<div class="loading-wrap"><div class="spinner"></div></div>';const e=i?.role==="artist";document.getElementById("requests-section-label").textContent=e?"Incoming Offers":"My Sent Offers",document.getElementById("requests-heading").textContent=e?"Hire Requests":"My Requests";try{const o=await F();Y(o);const n=document.getElementById("requests-summary-badge");if(o.length>0){const l=o.filter(d=>d.status==="pending").length;n.style.display="block",n.textContent=l>0?`${l} pending · ${o.length} total`:`${o.length} total`}else n.style.display="none";o.length===0?t.innerHTML=`<div class="empty-state">
            <div class="empty-state-icon">${e?"📬":"🤝"}</div>
            <div class="empty-state-title">${e?"No hire requests yet":"No requests sent yet"}</div>
            <div class="empty-state-sub">${e?"When clients send you offers, they will appear here.":"Browse artists and send your first hire request."}</div>
            ${e?"":'<a href="/browse.html" class="btn btn-accent" style="margin-top:16px">Browse Artists</a>'}
          </div>`:t.innerHTML=o.map(l=>xe(l,e)).join("")}catch{t.innerHTML='<p class="text-muted text-center">Failed to load requests.</p>'}}function Y(t){if(!i||i.role!=="artist")return;const e=(t||[]).filter(n=>n.status==="pending").length,o=document.getElementById("requests-badge");e>0?(o.textContent=e>99?"99+":e,o.style.display="inline-block"):o.style.display="none"}async function ke(){if(!(!i||i.role!=="artist"))try{const t=await F();Y(t)}catch{}}window.__acceptRequest=async t=>{try{await H(t,"accepted"),v("Request accepted! 🎉"),C()}catch(e){I(e.message||"Failed to update")}};window.__declineRequest=async t=>{if(confirm("Decline this hire request?"))try{await H(t,"declined"),v("Request declined."),C()}catch(e){I(e.message||"Failed to update")}};window.__markComplete=async t=>{try{await H(t,"completed"),v("Marked as completed! ✅"),C()}catch(e){I(e.message||"Failed to update")}};const h=document.getElementById("upload-zone"),x=document.getElementById("file-input"),M=document.getElementById("file-selected"),Ee=document.getElementById("file-name");h.addEventListener("click",()=>x.click());h.addEventListener("dragover",t=>{t.preventDefault(),h.classList.add("dragover")});h.addEventListener("dragleave",()=>h.classList.remove("dragover"));h.addEventListener("drop",t=>{t.preventDefault(),h.classList.remove("dragover");const e=t.dataTransfer.files[0];e&&J(e)});x.addEventListener("change",()=>{x.files[0]&&J(x.files[0])});document.getElementById("file-remove").addEventListener("click",V);const Ie={image:"🖼",audio:"🎵",video:"🎬",application:"📄"};function J(t){k=t,b=null,E=null;const e=t.type.split("/")[0],o=Ie[e]||"📁";document.getElementById("file-preview-icon").textContent=o,Ee.textContent=t.name+" ("+(t.size/1024/1024).toFixed(1)+" MB)",M.classList.remove("hidden");const n=document.getElementById("upload-preview-container");if(e==="image"){const r=URL.createObjectURL(t);n.innerHTML=`<div class="upload-preview"><img src="${r}" style="max-height:200px;width:100%;object-fit:contain;"></div>`}else if(e==="audio"){const r=URL.createObjectURL(t);n.innerHTML=`<div class="upload-preview"><audio controls style="width:100%;padding:16px"><source src="${r}"></audio></div>`}else if(e==="video"){const r=URL.createObjectURL(t);n.innerHTML=`<div class="upload-preview"><video controls style="width:100%;max-height:200px"><source src="${r}"></video></div>`}else n.innerHTML="";const l={image:"Digital Art",audio:"Music",video:"Video",application:"Writing"},d=document.getElementById("work-category");!d.value&&l[e]&&(d.value=l[e])}function V(){k=null,b=null,E=null,x.value="",M.classList.add("hidden"),document.getElementById("upload-preview-container").innerHTML=""}function $e(){f=null,document.getElementById("upload-form").reset(),document.getElementById("upload-submit").textContent="Publish Work",document.querySelector(".upload-form-title").textContent="Share Your Work",document.querySelector(".upload-form-sub").textContent="Upload images, music, video, or any creative file — all formats welcome",document.getElementById("upload-progress").style.display="none",document.getElementById("upload-bar").style.width="0%",V()}document.getElementById("upload-form").addEventListener("submit",async t=>{t.preventDefault();const e=document.getElementById("work-title").value.trim(),o=document.getElementById("title-error"),n=document.getElementById("upload-error"),l=document.getElementById("upload-submit");if(!e){o.textContent="Title is required",o.classList.remove("hidden");return}if(o.classList.add("hidden"),!f&&!k&&!b){n.textContent="Please select a file to upload",n.classList.remove("hidden");return}n.classList.add("hidden"),l.disabled=!0,l.textContent=f?"Saving…":"Uploading…";try{if(!f&&!b){const u=document.getElementById("upload-progress"),m=document.getElementById("upload-bar");u.style.display="block";const g=await ee(k,T=>{m.style.width=T+"%"});b=g.url,E=g.mediaType,m.style.width="100%"}const d=document.getElementById("work-desc").value.trim(),r=document.getElementById("work-category").value,p=document.getElementById("work-price").value,w=document.getElementById("work-project-url")?.value.trim(),s={title:e,description:d||void 0,imageUrl:b||void 0,projectUrl:w||void 0,mediaType:E||"image",category:r||void 0,price:p?parseFloat(p):void 0};if(f){const u=y.find(m=>m.id===f);await te(f,{...s,imageUrl:s.imageUrl||u?.imageUrl,mediaType:s.imageUrl?s.mediaType:u?.mediaType}),v("Work updated successfully.")}else await ie(s),v("Work published! 🎉");$e(),await q(),showTab("myworks"),await R()}catch(d){n.textContent=d.message||"Upload failed. Please try again.",n.classList.remove("hidden")}finally{l.disabled=!1,l.textContent=f?"Save Changes":"Publish Work"}});window.__editArtwork=async t=>{const e=y.find(n=>n.id===t)||await oe(t);if(!e){I("Artwork not found.");return}f=e.id,b=e.imageUrl||null,E=e.mediaType||null,k=null,document.getElementById("work-title").value=e.title||"",document.getElementById("work-desc").value=e.description||"",document.getElementById("work-category").value=e.category||"",document.getElementById("work-price").value=e.price||"",document.getElementById("work-project-url").value=e.projectUrl||"",document.getElementById("upload-submit").textContent="Save Changes",document.querySelector(".upload-form-title").textContent="Edit Your Work",document.querySelector(".upload-form-sub").textContent="Update the title, description, category, price, or project link for this showcase item.",document.getElementById("upload-progress").style.display="none",document.getElementById("upload-bar").style.width="0%";const o=document.getElementById("upload-preview-container");o.innerHTML=e.imageUrl?`<div class="upload-preview"><img src="${e.imageUrl}" style="max-height:200px;width:100%;object-fit:contain;"></div>`:"",M.classList.add("hidden"),showTab("upload")};window.__deleteArtwork=async t=>{if(confirm("Delete this work? This cannot be undone."))try{await ne(t),v("Work deleted"),R(),await q()}catch(e){I(e.message||"Failed to delete")}};me();
