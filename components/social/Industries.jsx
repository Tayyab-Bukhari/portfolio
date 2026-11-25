import Reveal from '@/components/effects/Reveal';
import Section from '@/components/common/Section';
import { social } from '@/data/social';
import Ticks from './Ticks';

export default function Industries() {
  return (
    <Section id="industries" eyebrow="Industries" title="Strategies for your business">
      <div className="grid two">
        {social.industries.map(({ icon, name, goal, ideas, note }, index) => (
          <Reveal as="article" key={name} className="card" index={index}>
            <span className="ico">{icon}</span>
            <h3>{name}</h3>
            <p className="date">Goal: {goal}</p>
            <Ticks items={ideas} />
            <p className="tip">{note}</p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
