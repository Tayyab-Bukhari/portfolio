import Reveal from '@/components/effects/Reveal';
import Section from '@/components/common/Section';
import { home } from '@/data/home';

export default function Education() {
  return (
    <Section id="education" eyebrow="Learning" title="Education">
      <div className="grid four">
        {home.education.map(({ title, place, period }, index) => (
          <Reveal as="article" key={title} className="card" index={index}>
            <p className="date">{period}</p>
            <h3>{title}</h3>
            <p>{place}</p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
