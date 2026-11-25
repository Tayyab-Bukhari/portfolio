'use client';

import { useEffect, useState } from 'react';
import { useInView } from '@/hooks/useInView';
import { prefersReducedMotion } from '@/hooks/media';

/** Full years passed since a "YYYY-MM" date. */
function yearsSince(date) {
  const [year, month] = date.split('-').map(Number);
  const now = new Date();
  return Math.floor(now.getFullYear() - year + (now.getMonth() + 1 - month) / 12);
}

/** Counts up to `value`, or to the years since `since`, when scrolled into view. */
export default function CountUp({ value, since }) {
  const [ref, inView] = useInView();
  const [shown, setShown] = useState(() => (since ? yearsSince(since) : value));

  useEffect(() => {
    const end = since ? yearsSince(since) : value;
    if (!inView || prefersReducedMotion()) {
      setShown(end);
      return undefined;
    }
    let frame;
    const start = performance.now();
    const step = (time) => {
      const progress = Math.min(Math.max((time - start) / 1200, 0), 1);
      setShown(Math.round(end * (1 - (1 - progress) ** 3)));
      if (progress < 1) frame = requestAnimationFrame(step);
    };
    step(start);
    return () => cancelAnimationFrame(frame);
  }, [inView, value, since]);

  // The year count can differ between build day and visit day.
  return <span ref={ref} suppressHydrationWarning>{shown}</span>;
}
