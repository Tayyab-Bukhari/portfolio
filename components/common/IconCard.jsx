import Reveal from '@/components/effects/Reveal';
import Icon, { isIcon } from './Icon';

/** `icon` is a name from Icon.jsx, or an emoji. */

export default function IconCard({ icon, title, text, index }) {
  return (
    <Reveal as="article" className="card" index={index}>
      {isIcon(icon)
        ? <span className="ico logo-tile" data-icon={icon}><Icon name={icon} size="30px" /></span>
        : <span className="ico">{icon}</span>}
      <h3>{title}</h3>
      <p>{text}</p>
    </Reveal>
  );
}
