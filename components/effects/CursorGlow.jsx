'use client';

import { useEffect, useRef } from 'react';
import { hasFinePointer, prefersReducedMotion } from '@/hooks/media';

/** Soft light that follows the mouse. */
export default function CursorGlow() {
  const ref = useRef(null);

  useEffect(() => {
    if (!hasFinePointer() || prefersReducedMotion()) return undefined;
    const move = (event) => {
      ref.current.style.opacity = 1;
      ref.current.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`;
    };
    window.addEventListener('pointermove', move);
    return () => window.removeEventListener('pointermove', move);
  }, []);

  return <div ref={ref} className="cursor-glow" aria-hidden="true" />;
}
