import Reveal from '@/components/effects/Reveal';

export default function IconCard({ icon, title, text, index }) {
  return (
    <Reveal as="article" className="card" index={index}>
      <span className="ico">{icon}</span>
      <h3>{title}</h3>
      <p>{text}</p>
    </Reveal>
  );
}
