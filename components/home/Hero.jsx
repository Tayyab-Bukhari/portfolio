import MagneticLink from '@/components/effects/MagneticLink';
import Reveal from '@/components/effects/Reveal';
import Tilt from '@/components/effects/Tilt';
import TypingRoles from '@/components/effects/TypingRoles';
import Stats from '@/components/common/Stats';
import { home } from '@/data/home';
import { site } from '@/data/site';

export default function Hero() {
  return (
    <section id="home" className="hero wrap">
      <div className="hero-text">
        <Reveal as="p" className="badge"><i /> Available for freelance projects</Reveal>
        <Reveal as="h1" index={1}>Syed Tayyab <span className="grad">Raza</span></Reveal>
        <Reveal index={2}><TypingRoles roles={home.roles} /></Reveal>
        <Reveal as="p" className="lead" index={3}>
          Mobile Application Developer at Preesoft, based in Lahore. I design and build user-friendly Android
          apps in Kotlin and Java, from the first screen to API integration and release.
        </Reveal>
        <Reveal className="cta" index={4}>
          <MagneticLink className="btn primary" href="#contact">Hire me</MagneticLink>
          <MagneticLink className="btn ghost" href="#projects">View my work</MagneticLink>
        </Reveal>
        <Stats items={home.stats} />
      </div>

      <Reveal className="hero-visual" index={1}>
        <div className="orbit" aria-hidden="true" />
        <Tilt className="phone">
          <div className="notch" />
          <div className="screen">
            <div className="avatar">
              <span>{site.initials}</span>
              <img src="/images/avatar.jpg" alt={`Portrait of ${site.name}`} width="480" height="480" />
            </div>
            <strong>{site.shortName}</strong>
            <small>Android Developer</small>
            <pre className="code" aria-hidden="true">
              <code>
                <b>class</b>{' Developer {\n  '}
                <b>val</b>{' city = '}<em>"Lahore"</em>{'\n  '}
                <b>val</b>{' stack = listOf(\n    '}
                <em>"Kotlin"</em>{', '}<em>"Java"</em>{',\n    '}
                <em>"Firebase"</em>{'\n  )\n  '}
                <b>fun</b>{' build() = '}<em>"🚀"</em>{'\n}'}
              </code>
            </pre>
            <div className="fake-btn">Run ▶</div>
          </div>
        </Tilt>
        {['Kotlin', 'Java', 'Firebase', 'REST APIs'].map((chip, index) => (
          <span key={chip} className={`chip c${index + 1}`}>{chip}</span>
        ))}
      </Reveal>
    </section>
  );
}
