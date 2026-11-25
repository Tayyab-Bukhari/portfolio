import Reveal from '@/components/effects/Reveal';
import Section from '@/components/common/Section';
import { home } from '@/data/home';

export default function Experience() {
  return (
    <Section id="experience" eyebrow="Career" title="Experience">
      <ol className="timeline">
        {home.experience.map(({ role, meta, text }) => (
          <Reveal as="li" key={meta}>
            <div className="card">
              <h3>{role}</h3>
              <p className="date">{meta}</p>
              {text && <p>{text}</p>}
            </div>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
