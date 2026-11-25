import PageShell from '@/components/layout/PageShell';
import Marquee from '@/components/common/Marquee';
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
  title: 'Syed Tayyab Raza — Android App Developer in Lahore',
  description: 'Syed Tayyab Raza is an Android app developer in Lahore building fast, user-friendly apps with Kotlin, Java, Firebase and API integrations.',
  openGraph: { title: 'Syed Tayyab Raza — Android App Developer', description: 'Kotlin and Java Android apps, from idea to release.', type: 'website' },
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
    <PageShell links={links} switchTo={{ href: '/social-media/', label: 'Social Media' }}>
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
