import Reveal from '@/components/effects/Reveal';
import Section from '@/components/common/Section';
import { social } from '@/data/social';
import Ticks from './Ticks';

/** Posting week, packages, client checklist and questions. */
export default function Planning() {
  return (
    <>
      <Section id="calendar" eyebrow="Content plan" title="Your week on social">
        <div className="week">
          {social.week.map(({ day, icon, type, where }, index) => (
            <Reveal as="article" key={day} className="card" index={index}>
              <p className="date">{day}</p>
              <span className="ico">{icon}</span>
              <h3>{type}</h3>
              <p>{where}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section id="packages" eyebrow="Packages" title="Choose your level of support">
        <div className="grid three">
          {social.packages.map(({ name, for: audience, items, featured }, index) => (
            <Reveal as="article" key={name} className={`card package${featured ? ' featured' : ''}`} index={index}>
              <h3>{name}</h3>
              <p className="date">{audience}</p>
              <Ticks items={items} />
              <a className={`btn ${featured ? 'primary' : 'ghost'}`} href="#contact">Get a quote</a>
            </Reveal>
          ))}
        </div>
        <p className="note">Every package is tailored to your business and goals. Ad spend is billed separately.</p>
      </Section>

      <Section id="checklist" eyebrow="Getting started" title="What I need from you">
        <ul className="checklist">
          {social.checklist.map((item, index) => <Reveal as="li" key={item} index={index}>{item}</Reveal>)}
        </ul>
      </Section>

      <Section id="faq" eyebrow="FAQ" title="Common questions">
        <div className="faq">
          {social.faq.map(({ q, a }, index) => (
            <Reveal as="details" key={q} className="card" index={index}>
              <summary>{q}</summary>
              <p>{a}</p>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}
