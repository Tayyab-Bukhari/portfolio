import CountUp from '@/components/effects/CountUp';
import Reveal from '@/components/effects/Reveal';

/** Row of animated numbers. */
export default function Stats({ items }) {
  return (
    <Reveal as="dl" className="stats" index={5}>
      {items.map(({ label, value, since, suffix = '' }) => (
        <div key={label}>
          <dt>{label}</dt>
          <dd><CountUp value={value} since={since} />{suffix}</dd>
        </div>
      ))}
    </Reveal>
  );
}
