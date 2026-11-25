/** Theme each page starts with, and where a visitor's own choice for it is saved. */
export const themes = {
  home: { key: 'theme-home', fallback: 'dark' },
  social: { key: 'theme-social', fallback: 'light' },
};

export const pageFor = (path) => (path.startsWith('/social-media') ? 'social' : 'home');

/** Applies the saved choice for this page, or its default. */
export function applyTheme(path) {
  const { key, fallback } = themes[pageFor(path)];
  let saved = null;
  try { saved = localStorage.getItem(key); } catch (e) { /* storage blocked */ }
  document.documentElement.dataset.theme = saved || fallback;
}
