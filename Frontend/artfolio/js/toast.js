let container;
function getContainer() {
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }
  return container;
}

export function toast(msg, type = 'info', duration = 3500) {
  const c = getContainer();
  const el = document.createElement('div');
  el.className = `toast toast-${type}`;
  const icons = { success: '✓', error: '✕', info: 'ℹ' };
  el.innerHTML = `<span style="font-weight:700">${icons[type]||''}</span> ${msg}`;
  c.appendChild(el);
  requestAnimationFrame(() => { requestAnimationFrame(() => { el.classList.add('show'); }); });
  setTimeout(() => {
    el.classList.remove('show');
    el.addEventListener('transitionend', () => el.remove(), { once: true });
  }, duration);
}

export const success = (msg) => toast(msg, 'success');
export const error = (msg) => toast(msg, 'error');
export const info = (msg) => toast(msg, 'info');
