import PageShell from '@/components/layout/PageShell';
import Marquee from '@/components/common/Marquee';
import Contact from '@/components/social/Contact';
import Hero from '@/components/social/Hero';
import Industries from '@/components/social/Industries';
import Planning from '@/components/social/Planning';
import Playbooks from '@/components/social/Playbooks';
import Platforms from '@/components/social/Platforms';
import Strategy from '@/components/social/Strategy';
import UberEats from '@/components/social/UberEats';
import { social } from '@/data/social';

export const metadata = {
  title: 'Social Media Marketing & Uber Eats Management — Syed Tayyab Raza',
  description: 'Social media marketing and Uber Eats restaurant management for salons, doctors, lawyers and restaurants worldwide.',
  openGraph: { title: 'Social Media Marketing — Syed Tayyab Raza', description: 'Facebook, Instagram, LinkedIn, YouTube, X and Uber Eats management.', type: 'website' },
};

const links = [
  { id: 'industries', label: 'Industries' },
  { id: 'ubereats', label: 'Uber Eats' },
  { id: 'strategy', label: 'Strategy' },
  { id: 'playbooks', label: 'Playbooks' },
  { id: 'contact', label: 'Contact' },
];

export default function SocialMediaPage() {
  return (
    <PageShell className="social" links={links} switchTo={{ href: '/', label: 'App Development' }}>
      <Hero />
      <div className="ribbons">
        <Marquee items={social.keywords} />
        <Marquee items={[...social.keywords].reverse()} />
      </div>
      <Platforms />
      <Industries />
      <UberEats />
      <Strategy />
      <Playbooks />
      <Planning />
      <Contact />
    </PageShell>
  );
}
