import { isLoggedIn, getCachedUser, logout, fetchCurrentUser } from './auth.js';
import logoUrl from '../logo.png';

export function renderNav(activePage = '') {
  const nav = document.getElementById('main-nav');
  if (!nav) return;
  const loggedIn = isLoggedIn();
  nav.innerHTML = `
    <div class="container">
      <div class="nav-inner">
        <a href="/index.html" class="nav-logo">
          <div class="nav-logo-icon">
            <img src="${logoUrl}" alt="Artfolio logo" />
          </div>
          Artfolio
        </a>
        <div class="nav-links">
          <a href="/browse.html" class="nav-link ${activePage === 'browse' ? 'font-bold' : ''}">Discover Artists</a>
          ${loggedIn ? `<a href="/dashboard.html" class="nav-link ${activePage === 'dashboard' ? 'font-bold' : ''}">My Studio</a>` : ''}
          ${loggedIn
            ? `<div id="nav-user-section" style="display:flex;align-items:center;gap:12px;">
                <span class="nav-user-name" id="nav-user-name">Loading…</span>
                <button onclick="window.__navLogout()" class="nav-btn-outline" style="cursor:pointer;border:none;background:var(--secondary-bg);padding:8px 16px;border-radius:99px;font-size:0.875rem;font-weight:500;">Log out</button>
               </div>`
            : `<a href="/login.html" class="nav-link">Log in</a>
               <a href="/register.html" class="nav-btn">Join Artfolio</a>`
          }
        </div>
      </div>
    </div>
  `;

  window.__navLogout = logout;

  if (loggedIn) {
    const cached = getCachedUser();
    if (cached) document.getElementById('nav-user-name') && (document.getElementById('nav-user-name').textContent = cached.name);
    fetchCurrentUser().then(u => {
      if (u) {
        const el = document.getElementById('nav-user-name');
        if (el) el.textContent = u.name;
      }
    });
  }
}
