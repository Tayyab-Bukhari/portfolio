'use client';

import { useEffect, useState } from 'react';

/** Live time in the given time zone. */
export default function Clock({ timeZone }) {
  const [time, setTime] = useState('--:--');

  useEffect(() => {
    const format = new Intl.DateTimeFormat('en-US', { timeZone, hour: 'numeric', minute: '2-digit' });
    const tick = () => setTime(format.format(new Date()));
    tick();
    const timer = setInterval(tick, 30000);
    return () => clearInterval(timer);
  }, [timeZone]);

  return <strong>{time}</strong>;
}
