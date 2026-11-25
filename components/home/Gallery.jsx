import Reveal from '@/components/effects/Reveal';
import Section from '@/components/common/Section';
import { home } from '@/data/home';

export default function Gallery() {
  return (
    <Section id="moments" eyebrow="Beyond code" title="Moments">
      <div className="gallery">
        {home.gallery.map(({ src, alt, caption, width, height }, index) => (
          <Reveal as="figure" key={src} className="photo" index={index}>
            <img src={src} alt={alt} width={width} height={height} loading="lazy" />
            <figcaption>{caption}</figcaption>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
