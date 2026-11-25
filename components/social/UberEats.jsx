import Reveal from '@/components/effects/Reveal';
import IconCard from '@/components/common/IconCard';
import Section from '@/components/common/Section';
import { social } from '@/data/social';

export default function UberEats() {
  return (
    <Section id="ubereats" eyebrow="Restaurant growth" title="Uber Eats restaurant management">
      <Reveal as="p" className="intro">
        The goal is to help your store rank higher and turn more views into orders. Uber doesn't publish its
        full ranking formula and no one can guarantee a position, so I focus on what a restaurant can control:
        reliable fulfilment, ratings, a strong menu and smart promotion.
      </Reveal>
      <div className="grid three">
        {social.uber.map((item, index) => <IconCard key={item.title} {...item} index={index} />)}
      </div>
      <p className="note">Independent service. Not affiliated with or endorsed by Uber.</p>
    </Section>
  );
}
