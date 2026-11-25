'use client';

import { hasFinePointer, prefersReducedMotion } from '@/hooks/media';

/** A link button that leans towards the mouse. */
export default function MagneticLink({ className = '', children, ...props }) {
  const move = (event) => {
    if (!hasFinePointer() || prefersReducedMotion()) return;
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = (event.clientX - rect.left - rect.width / 2) * 0.18;
    const y = (event.clientY - rect.top - rect.height / 2) * 0.3;
    button.style.transform = `translate(${x}px, ${y}px)`;
  };
  const reset = (event) => { event.currentTarget.style.transform = ''; };

  return (
    <a className={`${className} magnetic`} onPointerMove={move} onPointerLeave={reset} {...props}>
      {children}
    </a>
  );
}
