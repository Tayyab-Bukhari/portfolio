'use client';

import { useEffect, useState } from 'react';
import { prefersReducedMotion } from '@/hooks/media';

/** Types and deletes each role title in turn. */
export default function TypingRoles({ roles }) {
  const [state, setState] = useState({ role: 0, length: roles[0].length, deleting: true });

  useEffect(() => {
    if (prefersReducedMotion()) return undefined;
    const { role, length, deleting } = state;
    const full = !deleting && length === roles[role].length;
    const empty = deleting && length === 0;
    // Pause on a finished title, and briefly before the next one starts.
    const atStart = deleting && role === 0 && length === roles[0].length;
    const wait = atStart ? 1800 : full ? 1800 : empty ? 300 : deleting ? 35 : 70;

    const timer = setTimeout(() => {
      if (full) setState({ role, length, deleting: true });
      else if (empty) setState({ role: (role + 1) % roles.length, length: 0, deleting: false });
      else setState({ role, length: length + (deleting ? -1 : 1), deleting });
    }, wait);
    return () => clearTimeout(timer);
  }, [state, roles]);

  const title = roles[state.role];

  return (
    <p className="role">
      I'm {/^[AEIOU]/i.test(title) ? 'an' : 'a'} <span id="typed">{title.slice(0, state.length)}</span>
      <span className="caret" aria-hidden="true" />
    </p>
  );
}
