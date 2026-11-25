import Reveal from '@/components/effects/Reveal';
import IconCard from '@/components/common/IconCard';
import Section from '@/components/common/Section';
import { social } from '@/data/social';

export default function Strategy() {
  return (
    <>
      <Section id="strategy" eyebrow="How I work" title="The client growth system">
        <ol className="timeline">
          {social.strategy.map(({ title, text }) => (
            <Reveal as="li" key={title}>
              <div className="card"><h3>{title}</h3><p>{text}</p></div>
            </Reveal>
          ))}
        </ol>
      </Section>
      <Section id="team" eyebrow="Full coverage" title="Every marketing role covered">
        <div className="grid three">
          {social.roles.map((role, index) => <IconCard key={role.title} {...role} index={index} />)}
        </div>
      </Section>
    </>
  );
}
