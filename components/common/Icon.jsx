import { brandPaths } from './brandPaths';

// Simple outline icons for subjects that have no brand logo.
const linePaths = {
  wrench: 'M14.7 6.3a4 4 0 0 0-5.4 5.2L3.5 17.3a1.8 1.8 0 0 0 0 2.6l.6.6a1.8 1.8 0 0 0 2.6 0l5.8-5.8a4 4 0 0 0 5.2-5.4l-2.6 2.6-2.5-.5-.5-2.5z',
  pin: 'M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11z M12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z',
  graduation: 'M2 9l10-5 10 5-10 5z M6 11.5V16c3.5 3 8.5 3 12 0v-4.5 M22 9v6',
  chat: 'M4 5h16v11H9l-5 4z',
  bell: 'M6 16V11a6 6 0 0 1 12 0v5l2 2H4z M10 21h4',
  home: 'M3 11l9-8 9 8 M5 9.5V21h14V9.5 M10 21v-6h4v6',
  users: 'M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M2 21c0-4 3-6 7-6s7 2 7 6 M16 3.5a4 4 0 0 1 0 7.5 M18 15c2.5.7 4 2.8 4 6',
  layers: 'M12 3l9 5-9 5-9-5z M3 13l9 5 9-5',
  truck: 'M2 6h12v11H2z M14 10h4l4 4v3h-8 M6 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4z M18 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4z',
  calendar: 'M4 5h16v16H4z M4 10h16 M8 3v4 M16 3v4',
  chart: 'M4 4v16h16 M8 16v-5 M12 16V8 M16 16v-3',
  cpu: 'M6 6h12v12H6z M10 10h4v4h-4z M9 2v4 M15 2v4 M9 18v4 M15 18v4 M2 9h4 M2 15h4 M18 9h4 M18 15h4',
  battery: 'M3 8h15v8H3z M21 11v2 M6 11v2 M9 11v2 M12 11v2',
};

/** True when `name` is one of the drawn icons, as opposed to plain text or an emoji. */
export const isIcon = (name) => Object.hasOwn(brandPaths, name) || Object.hasOwn(linePaths, name);

/** A brand logo or outline icon in the surrounding text colour. */
export default function Icon({ name, size = '1em' }) {
  const brand = brandPaths[name];
  const style = brand
    ? { fill: 'currentColor' }
    : { fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' };

  return (
    <svg className="icon" viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" focusable="false" {...style}>
      <path d={brand || linePaths[name]} />
    </svg>
  );
}
