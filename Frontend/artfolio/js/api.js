const API = '/api';

function getToken() {
  return localStorage.getItem('artfolio_token');
}

function authHeaders(extra = {}) {
  const h = { 'Content-Type': 'application/json', ...extra };
  const t = getToken();
  if (t) h['Authorization'] = `Bearer ${t}`;
  return h;
}

async function request(method, path, body, isFormData = false) {
  const opts = { method, headers: isFormData ? {} : authHeaders() };
  if (isFormData) {
    const t = getToken();
    if (t) opts.headers['Authorization'] = `Bearer ${t}`;
  }
  if (body && !isFormData) opts.body = JSON.stringify(body);
  if (body && isFormData) opts.body = body;
  const res = await fetch(API + path, opts);
  if (!res.ok) {
    let msg = res.statusText;
    try { const d = await res.json(); msg = d.error || msg; } catch {}
    throw new Error(msg);
  }
  if (res.status === 204) return null;
  return res.json();
}

// Auth
export const login = (email, password) => request('POST', '/auth/login', { email, password });
export const register = (name, email, password, role) => request('POST', '/auth/register', { name, email, password, role });
export const getMe = () => request('GET', '/auth/me');

// Artists
export const getArtists = (params = '') => request('GET', '/artists' + (params ? '?' + params : ''));
export const getFeaturedArtists = () => request('GET', '/artists/featured');
export const getArtistById = (id) => request('GET', `/artists/${id}`);
export const getPlatformStats = () => request('GET', '/artists/stats');
export const updateArtistProfile = (data) => request('PUT', '/artists/profile', data);

// Artworks
export const getArtworks = (artistId) => request('GET', '/artworks' + (artistId ? `?artistId=${artistId}` : ''));
export const getArtworkById = (id) => request('GET', `/artworks/${id}`);
export const createArtwork = (data) => request('POST', '/artworks', data);
export const updateArtwork = (id, data) => request('PUT', `/artworks/${id}`, data);
export const deleteArtwork = (id) => request('DELETE', `/artworks/${id}`);

// Upload file
export async function uploadFile(file, onProgress) {
  const form = new FormData();
  form.append('file', file);
  const token = getToken();
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', API + '/upload');
    if (token) xhr.setRequestHeader('Authorization', `Bearer ${token}`);
    if (onProgress) {
      xhr.upload.addEventListener('progress', e => {
        if (e.lengthComputable) onProgress(Math.round((e.loaded / e.total) * 100));
      });
    }
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(JSON.parse(xhr.responseText));
      } else {
        let msg = 'Upload failed';
        try { msg = JSON.parse(xhr.responseText).error || msg; } catch {}
        reject(new Error(msg));
      }
    };
    xhr.onerror = () => reject(new Error('Network error during upload'));
    xhr.send(form);
  });
}

export async function uploadProfileImage(file) {
  const form = new FormData();
  form.append('file', file);
  const token = getToken();

  const res = await fetch(API + '/upload/profile-image', {
    method: 'POST',
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    body: form,
  });

  if (!res.ok) {
    let msg = 'Profile image upload failed';
    try { msg = (await res.json()).error || msg; } catch {}
    throw new Error(msg);
  }

  return res.json();
}

// Hire
export const sendHireRequest = (artistId, data) => request('POST', `/hire/${artistId}`, data);
export const getHireRequests = () => request('GET', '/hire/requests');
export const updateHireStatus = (id, status) => request('PATCH', `/hire/requests/${id}/status`, { status });
