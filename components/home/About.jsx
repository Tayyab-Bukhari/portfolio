import Reveal from '@/components/effects/Reveal';
import Clock from '@/components/common/Clock';
import Section from '@/components/common/Section';
import Tags from '@/components/common/Tags';
import { home } from '@/data/home';

export default function About() {
  return (
    <Section id="about" eyebrow="About me" title="Apps people enjoy using">
      <div className="bento">
        <Reveal as="article" className="card big">
          <h3>Who I am</h3>
          <p>
            I'm a dedicated and energetic Android developer who writes clean code in fast-paced environments.
            I've built apps for previous employers including e-commerce, delivery and note-taking apps.
          </p>
          <p>I like working in collaborative teams, solving problems proactively and learning continuously.</p>
        </Reveal>
        <Reveal as="figure" className="photo about-photo" index={1}>
          <img src="/images/about.jpg" alt="Syed Tayyab Raza in a navy suit" width="800" height="1200" loading="lazy" />
        </Reveal>
        <Reveal as="article" className="card" index={2}>
          <span className="ico">📍</span>
          <h3>Lahore, Pakistan</h3>
          <p>Local time <Clock timeZone="Asia/Karachi" /></p>
        </Reveal>
        <Reveal as="article" className="card" index={3}>
          <span className="ico">🎓</span>
          <h3>Education</h3>
          <p>BS Computer Science, Government College University, Faisalabad</p>
          <p>Certification: Android Development</p>
        </Reveal>
        <Reveal as="article" className="card wide" index={4}>
          <h3>Toolbox</h3>
          <Tags items={home.skills} />
        </Reveal>
      </div>
    </Section>
  );
}
