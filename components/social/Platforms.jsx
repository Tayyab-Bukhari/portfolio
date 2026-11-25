import Reveal from '@/components/effects/Reveal';
import Section from '@/components/common/Section';
import Tags from '@/components/common/Tags';
import { social } from '@/data/social';
import PlatformIcon from './PlatformIcon';

export default function Platforms() {
  return (
    <Section id="platforms" eyebrow="Platforms" title="Where I manage your brand">
      <div className="grid three">
        {social.platforms.map(({ badge, color, name, text, tags }, index) => (
          <Reveal as="article" key={name} className="card brand" style={{ '--brand': color }} index={index}>
            <span className="platform" aria-hidden="true"><PlatformIcon badge={badge} /></span>
            <h3>{name}</h3>
            <p>{text}</p>
            <Tags items={tags} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
