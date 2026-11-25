'use client';

/** Dark / light switch. The saved choice is applied early in app/layout.jsx. */
export default function ThemeToggle() {
  const toggle = () => {
    const root = document.documentElement;
    root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    try { localStorage.setItem('theme', root.dataset.theme); } catch (e) { /* storage blocked */ }
  };

  return (
    <button className="icon-btn" type="button" aria-label="Switch colour theme" onClick={toggle}>◐</button>
  );
}
