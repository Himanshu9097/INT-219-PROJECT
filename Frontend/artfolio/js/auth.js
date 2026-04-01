import { getMe } from './api.js';

const TOKEN_KEY = 'artfolio_token';
const USER_KEY = 'artfolio_user';

export function getToken() { return localStorage.getItem(TOKEN_KEY); }
export function setToken(t) { localStorage.setItem(TOKEN_KEY, t); }
export function removeToken() { localStorage.removeItem(TOKEN_KEY); localStorage.removeItem(USER_KEY); }
export function isLoggedIn() { return !!getToken(); }

export function getCachedUser() {
  try { return JSON.parse(localStorage.getItem(USER_KEY) || 'null'); } catch { return null; }
}
export function cacheUser(u) { localStorage.setItem(USER_KEY, JSON.stringify(u)); }

export async function fetchCurrentUser() {
  if (!isLoggedIn()) return null;
  try {
    const u = await getMe();
    cacheUser(u);
    return u;
  } catch {
    return null;
  }
}

export function requireAuth(redirectTo = '/login.html') {
  if (!isLoggedIn()) {
    window.location.href = redirectTo;
    return false;
  }
  return true;
}

export function requireGuest(redirectTo = '/dashboard.html') {
  if (isLoggedIn()) {
    window.location.href = redirectTo;
    return false;
  }
  return true;
}

export function logout() {
  removeToken();
  window.location.href = '/index.html';
}
