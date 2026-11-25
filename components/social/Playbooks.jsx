import Reveal from '@/components/effects/Reveal';
import Section from '@/components/common/Section';
import { social } from '@/data/social';
import Ticks from './Ticks';

/** Game plan for each type of business. */
export default function Playbooks() {
  return (
    <Section id="playbooks" eyebrow="Playbooks" title="Growth playbooks for businesses worldwide">
      <Reveal as="p" className="intro">
        Find your business and see the game plan: the goal, the moves and the numbers to track.
      </Reveal>
      <div className="grid three">
        {social.playbooks.map(({ icon, title, goal, plan, track }, index) => (
          <Reveal as="article" key={title} className="card playbook" index={index}>
            <span className="ico">{icon}</span>
            <h3>{title}</h3>
            <p>Goal: {goal}</p>
            <Ticks items={plan} />
            <p className="tip">Track: {track}</p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
