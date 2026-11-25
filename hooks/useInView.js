'use client';

import { useEffect, useRef, useState } from 'react';

/** Becomes true the first time the element scrolls into view. */
export function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || !('IntersectionObserver' in window)) {
      setInView(true);
      return undefined;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setInView(true);
      observer.disconnect();
    }, { threshold });

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, inView];
}
