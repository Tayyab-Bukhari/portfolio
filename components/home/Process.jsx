import Reveal from '@/components/effects/Reveal';
import Section from '@/components/common/Section';
import { home } from '@/data/home';

export default function Process() {
  return (
    <Section eyebrow="Process" title="From idea to app">
      <div className="grid four">
        {home.process.map(({ title, text }, index) => (
          <Reveal as="article" key={title} className="card" index={index}>
            <span className="num">{String(index + 1).padStart(2, '0')}</span>
            <h3>{title}</h3>
            <p>{text}</p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
