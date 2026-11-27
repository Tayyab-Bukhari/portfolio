import PageShell from '@/components/layout/PageShell';
import Marquee from '@/components/common/Marquee';
import CursorFX from '@/components/effects/CursorFX';
import About from '@/components/home/About';
import Contact from '@/components/home/Contact';
import Education from '@/components/home/Education';
import Experience from '@/components/home/Experience';
import Gallery from '@/components/home/Gallery';
import Hero from '@/components/home/Hero';
import Process from '@/components/home/Process';
import Projects from '@/components/home/Projects';
import Services from '@/components/home/Services';
import { home } from '@/data/home';

export const metadata = {
  title: 'Syed Tayyab Raza — Mobile App Developer | React Native, Flutter, Android & iOS',
  description: 'Syed Tayyab Raza is a mobile app developer building Android and iOS apps with React Native, Flutter, Kotlin and Java for clients worldwide.',
  openGraph: { title: 'Syed Tayyab Raza — Mobile App Developer', description: 'React Native, Flutter, Android and iOS apps, from idea to release.', type: 'website' },
};

const links = [
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
];

export default function HomePage() {
  return (
    <PageShell className="dev" links={links} switchTo={{ href: '/social-media/', label: 'Social Media' }}>
      <CursorFX />
      <Hero />
      <Marquee items={home.skills} />
      <About />
      <Services />
      <Projects />
      <Experience />
      <Education />
      <Gallery />
      <Process />
      <Contact />
    </PageShell>
  );
}
