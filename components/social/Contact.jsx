import Reveal from '@/components/effects/Reveal';
import Clock from '@/components/common/Clock';
import ContactForm from '@/components/common/ContactForm';
import ContactLinks from '@/components/common/ContactLinks';
import Dropdown from '@/components/common/Dropdown';
import { social } from '@/data/social';
import { site } from '@/data/site';
import CountrySelect from './CountrySelect';

const clocks = [
  ['New York', 'America/New_York'],
  ['London', 'Europe/London'],
  ['Dubai', 'Asia/Dubai'],
  ['Sydney', 'Australia/Sydney'],
  ['Lahore', 'Asia/Karachi'],
];

export default function Contact() {
  return (
    <section id="contact" className="wrap">
      <Reveal className="contact">
        <h2>Ready for more clients?<br /><span className="grad">Request a free audit.</span></h2>
        <p>Share your page or store link and I'll review it.</p>
        <ul className="clocks" aria-label="Current local times">
          {clocks.map(([city, zone]) => <li key={city}>{city} <Clock timeZone={zone} /></li>)}
        </ul>
        <ContactLinks />
        {site.contact.email && (
          <ContactForm subject="Marketing audit request" messageLabel="Your goals">
            <Dropdown label="Business type" name="Business type" options={social.businessTypes} placeholder="Select your business" />
            <CountrySelect />
            <label className="full">Page or store link<input name="Link" type="url" placeholder="https://" /></label>
          </ContactForm>
        )}
      </Reveal>
    </section>
  );
}
