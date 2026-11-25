import MagneticLink from '@/components/effects/MagneticLink';
import Reveal from '@/components/effects/Reveal';
import Tilt from '@/components/effects/Tilt';
import Stats from '@/components/common/Stats';
import { social } from '@/data/social';
import { site } from '@/data/site';
import PlatformIcon from './PlatformIcon';

// Words that take turns in the headline. The animation in social.css expects four.
const outcomes = ['clients', 'bookings', 'orders', 'calls'];

const floating = ['📸 Reels', '🎯 Paid ads', '🍔 Uber Eats', '📈 Reporting'];

export default function Hero() {
  return (
    <section id="home" className="hero wrap">
      <div>
        <Reveal as="p" className="badge"><i /> Taking new clients worldwide</Reveal>
        <Reveal as="h1" index={1} aria-label="Social media that brings clients">
          <span aria-hidden="true">
            Social media that brings
            <span className="rotator">
              {outcomes.map((word) => <span key={word} className="grad-word">{word}</span>)}
            </span>
          </span>
        </Reveal>
        <Reveal as="p" className="lead" index={2}>
          I'm {site.name}. For more than 3 years I've worked in social media marketing, helping parlors,
          doctors, lawyers and restaurants get found online, including Uber Eats store management.
        </Reveal>
        <Reveal className="cta" index={3}>
          <MagneticLink className="btn primary" href="#contact">Get a free audit</MagneticLink>
          <MagneticLink className="btn ghost" href="#playbooks">Explore playbooks</MagneticLink>
        </Reveal>
        <Stats items={social.stats} />
      </div>

      <Reveal className="stage" index={1}>
        <div className="ring-line outer" aria-hidden="true" />
        <div className="ring-line inner" aria-hidden="true" />
        <Tilt className="core">
          <img src="/images/social.jpg" alt={site.name} width="800" height="800" />
        </Tilt>
        <ul className="orbiters" aria-hidden="true">
          {social.platforms.map(({ name, badge, color }, index) => (
            <li key={name} style={{ '--a': `${index * (360 / social.platforms.length)}deg`, '--brand': color }}>
              <PlatformIcon badge={badge} />
            </li>
          ))}
        </ul>
        {floating.map((chip, index) => (
          <span key={chip} className={`chip c${index + 1}`} aria-hidden="true">{chip}</span>
        ))}
        <div className="hearts" aria-hidden="true">
          {['❤️', '👍', '💬', '❤️', '✨'].map((emoji, index) => (
            <span key={index} style={{ '--i': index }}>{emoji}</span>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
