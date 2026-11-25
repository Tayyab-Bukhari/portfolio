'use client';

import { useEffect, useRef } from 'react';
import { hasFinePointer, prefersReducedMotion } from '@/hooks/media';

/** Tilts its content in 3D as the mouse moves over the surrounding area. */
export default function Tilt({ className = '', children }) {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    const zone = element?.parentElement;
    if (!zone || !hasFinePointer() || prefersReducedMotion()) return undefined;

    const move = (event) => {
      const rect = zone.getBoundingClientRect();
      element.style.setProperty('--ry', `${((event.clientX - rect.left) / rect.width - 0.5) * 22}deg`);
      element.style.setProperty('--rx', `${(0.5 - (event.clientY - rect.top) / rect.height) * 16}deg`);
    };
    const reset = () => {
      element.style.setProperty('--rx', '0deg');
      element.style.setProperty('--ry', '0deg');
    };

    zone.addEventListener('pointermove', move);
    zone.addEventListener('pointerleave', reset);
    return () => {
      zone.removeEventListener('pointermove', move);
      zone.removeEventListener('pointerleave', reset);
    };
  }, []);

  return <div ref={ref} className={`${className} tilt`}>{children}</div>;
}
