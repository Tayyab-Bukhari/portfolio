import Reveal from '@/components/effects/Reveal';
import Tilt from '@/components/effects/Tilt';
import Section from '@/components/common/Section';
import Tags from '@/components/common/Tags';
import { home } from '@/data/home';
import { mockups } from './Mockup';

const number = (value) => String(value).padStart(2, '0');

/** Phone preview with floating labels. Opens the store page when the project has one. */
function Preview({ title, mockup, badges, link }) {
  const Frame = link ? 'a' : 'div';
  const props = link
    ? { href: link.url, target: '_blank', rel: 'noopener', 'data-cursor': 'Open ↗', 'aria-label': `${title} on ${link.label}` }
    : { 'aria-hidden': true };

  return (
    <Frame className="visual" {...props}>
      <span className="halo" />
      <span className="orbit-line" />
      <Tilt className="mini">{mockups[mockup]}</Tilt>
      {badges.map((badge, index) => <span key={badge} className={`float depth f${index + 1}`}>{badge}</span>)}
    </Frame>
  );
}

/** Project cards that stack on top of each other while scrolling. */
export default function Projects() {
  const total = home.projects.length;

  return (
    <Section id="projects" eyebrow="Selected work" title="Featured projects">
      <div className="cases">
        {home.projects.map(({ title, period, text, highlights, badges, tags, mockup, colors, links }, index) => (
          <Reveal
            as="article"
            key={title}
            className="card case"
            style={{ '--i': index, '--after': total - 1 - index, '--c1': colors[0], '--c2': colors[1] }}
          >
            <div className="info">
              <p className="count"><b>{number(index + 1)}</b> / {number(total)}</p>
              <p className="date">{period}</p>
              <h3>{title}</h3>
              <p>{text}</p>
              <ul className="highlights">
                {highlights.map((item) => <li key={item}>{item}</li>)}
              </ul>
              <Tags items={tags} />
              {links && (
                <div className="cta">
                  {links.map(({ label, url }) => (
                    <a key={url} className="btn primary" href={url} target="_blank" rel="noopener">{label} ↗</a>
                  ))}
                </div>
              )}
            </div>
            <Preview title={title} mockup={mockup} badges={badges} link={links?.[0]} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
