import Reveal from '@/components/effects/Reveal';
import Tilt from '@/components/effects/Tilt';
import Section from '@/components/common/Section';
import Tags from '@/components/common/Tags';
import { home } from '@/data/home';
import { mockups } from './Mockup';

export default function Projects() {
  return (
    <Section id="projects" eyebrow="Selected work" title="Featured projects">
      {home.projects.map(({ title, period, text, tags, mockup, links }, index) => (
        <Reveal as="article" key={title} className={`project${index % 2 ? ' flip' : ''}`}>
          <div className={`shot ${mockups[mockup].theme}`} aria-hidden="true">
            <Tilt className="mini">{mockups[mockup].screen}</Tilt>
          </div>
          <div className="info">
            <p className="date">{period}</p>
            <h3>{title}</h3>
            <p>{text}</p>
            <Tags items={tags} />
            {links && (
              <div className="cta">
                {links.map(({ label, url }) => (
                  <a key={url} className="btn ghost" href={url} target="_blank" rel="noopener">{label} ↗</a>
                ))}
              </div>
            )}
          </div>
        </Reveal>
      ))}
    </Section>
  );
}
