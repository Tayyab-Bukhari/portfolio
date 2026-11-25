'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { site } from '@/data/site';
import ThemeToggle from './ThemeToggle';

/** Navigation bar, mobile menu and scroll progress. */
export default function Header({ links, switchTo }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');
  const progress = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      // A scroll can still arrive while the page is being swapped out.
      if (!progress.current) return;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progress.current.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;

      let current = '';
      document.querySelectorAll('main section[id]').forEach((section) => {
        if (section.getBoundingClientRect().top < window.innerHeight * 0.4) current = section.id;
      });
      setActive(current);
    };
    const onKey = (event) => { if (event.key === 'Escape') setOpen(false); };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('keydown', onKey);
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('keydown', onKey);
    };
  }, []);

  return (
    <>
      <div ref={progress} className="progress" aria-hidden="true" />
      <header className="nav">
        <a className="logo" href="#home"><span className="logo-mark">{site.initials}</span> {site.shortName}</a>
        <nav id="menu" aria-label="Main" className={open ? 'open' : ''}>
          {links.map(({ id, label }) => (
            <a key={id} href={`#${id}`} className={active === id ? 'active' : ''} onClick={() => setOpen(false)}>
              {label}
            </a>
          ))}
          <Link className="nav-switch" href={switchTo.href} prefetch={false}>{switchTo.label} ↗</Link>
        </nav>
        <div className="nav-actions">
          <ThemeToggle />
          <button
            id="burger"
            className="icon-btn"
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="menu"
            onClick={() => setOpen(!open)}
          >
            {open ? '✕' : '☰'}
          </button>
        </div>
      </header>
    </>
  );
}
