import Reveal from '@/components/effects/Reveal';

/** Page section with a small label and a heading. */
export default function Section({ id, eyebrow, title, children }) {
  return (
    <section id={id} className="wrap">
      <Reveal as="p" className="eyebrow">{eyebrow}</Reveal>
      <Reveal as="h2" index={1}>{title}</Reveal>
      {children}
    </section>
  );
}
