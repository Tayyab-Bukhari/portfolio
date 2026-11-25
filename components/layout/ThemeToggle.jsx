'use client';

import { usePathname } from 'next/navigation';
import { useLayoutEffect } from 'react';
import { applyTheme, pageFor, themes } from '@/hooks/theme';

/** Dark / light switch. Each page has its own default and remembers its own choice. */
export default function ThemeToggle() {
  const path = usePathname();

  // Runs when moving between pages. The first load is handled in app/layout.jsx.
  useLayoutEffect(() => applyTheme(path), [path]);

  const toggle = () => {
    const root = document.documentElement;
    root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    try { localStorage.setItem(themes[pageFor(path)].key, root.dataset.theme); } catch (e) { /* storage blocked */ }
  };

  return (
    <button className="icon-btn" type="button" aria-label="Switch colour theme" onClick={toggle}>◐</button>
  );
}
