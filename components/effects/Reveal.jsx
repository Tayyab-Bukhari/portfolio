'use client';

import { useEffect, useState } from 'react';
import { useInView } from '@/hooks/useInView';

/** Moves the card highlight to follow the mouse. */
function spotlight(event) {
  const card = event.currentTarget;
  const rect = card.getBoundingClientRect();
  card.style.setProperty('--mx', `${event.clientX - rect.left}px`);
  card.style.setProperty('--my', `${event.clientY - rect.top}px`);
}

/**
 * Fades an element in on scroll. `index` staggers neighbouring items.
 * Elements with the "card" class also get the mouse spotlight.
 */
export default function Reveal({ as: Tag = 'div', className = '', index = 0, style, children, ...props }) {
  const [ref, inView] = useInView();
  const [settled, setSettled] = useState(false);

  // Drop the stagger delay afterwards so hover effects stay instant.
  useEffect(() => {
    if (!inView) return undefined;
    const timer = setTimeout(() => setSettled(true), 1400);
    return () => clearTimeout(timer);
  }, [inView]);

  const isCard = className.split(' ').includes('card');

  return (
    <Tag
      ref={ref}
      className={`${className} reveal${inView ? ' in' : ''}`.trim()}
      style={settled ? style : { ...style, transitionDelay: `${Math.min(index, 6) * 90}ms` }}
      onPointerMove={isCard ? spotlight : undefined}
      {...props}
    >
      {children}
    </Tag>
  );
}
