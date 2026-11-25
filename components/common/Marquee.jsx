/** Endless scrolling strip. Items are repeated so the loop has no gap. */
export default function Marquee({ items }) {
  return (
    <div className="marquee" aria-hidden="true">
      <div className="track">
        {[...items, ...items].map((item, index) => <span key={`${item}-${index}`}>{item}</span>)}
      </div>
    </div>
  );
}
