'use client';

import Link from 'next/link';
import Reveal from '@/components/effects/Reveal';
import IconCard from '@/components/common/IconCard';
import Section from '@/components/common/Section';
import { home } from '@/data/home';

export default function Services() {
  return (
    <Section id="services" eyebrow="Services" title="How I can help you">
      <div className="grid three">
        {home.services.map((service, index) => <IconCard key={service.title} {...service} index={index} />)}
      </div>
      <Reveal as={Link} className="banner card" href="/social-media/" prefetch={false}>
        <span>
          <strong>Need social media marketing too?</strong> 3+ years managing Facebook, Instagram, LinkedIn,
          YouTube, X and Uber Eats stores.
        </span>
        <span className="btn primary">See marketing services →</span>
      </Reveal>
    </Section>
  );
}
