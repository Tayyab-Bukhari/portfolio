import Reveal from '@/components/effects/Reveal';
import ContactForm from '@/components/common/ContactForm';
import ContactLinks from '@/components/common/ContactLinks';
import { site } from '@/data/site';

export default function Contact() {
  return (
    <section id="contact" className="wrap">
      <Reveal className="contact">
        <h2>Have an app idea?<br /><span className="grad">Let's build it.</span></h2>
        <p>Tell me about your project and I'll get back to you.</p>
        <ContactLinks />
        {site.contact.email && <ContactForm />}
      </Reveal>
    </section>
  );
}
