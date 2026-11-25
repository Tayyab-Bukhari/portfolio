export default function Ticks({ items }) {
  return <ul className="ticks">{items.map((item) => <li key={item}>{item}</li>)}</ul>;
}
