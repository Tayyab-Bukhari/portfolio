import MagneticLink from '@/components/effects/MagneticLink';
import { site } from '@/data/site';

/** Contact buttons. Empty values in data/site.js are hidden. */
export default function ContactLinks() {
  const { phone, phoneLabel, email, whatsapp, github, playStore, cv } = site.contact;
  const buttons = [
    ['Email me', email && `mailto:${email}`],
    [`Call ${phoneLabel}`, phone && `tel:${phone}`],
    ['WhatsApp', whatsapp && `https://wa.me/${whatsapp}`],
    ['GitHub', github],
    ['Google Play', playStore],
    ['Download CV', cv],
  ].filter(([, href]) => href);

  const external = (href) => (href.startsWith('http') ? { target: '_blank', rel: 'noopener' } : {});

  return (
    <div className="cta center" id="links">
      <MagneticLink className="btn primary" href={site.linkedin} {...external(site.linkedin)}>
        Connect on LinkedIn
      </MagneticLink>
      {buttons.map(([label, href]) => (
        <MagneticLink key={label} className="btn ghost" href={href} {...external(href)}>{label}</MagneticLink>
      ))}
    </div>
  );
}
