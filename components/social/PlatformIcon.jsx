/** Badge shown for a platform: a drawn icon for Instagram, a symbol for the others. */
export default function PlatformIcon({ badge }) {
  if (badge !== 'instagram') return badge;

  return (
    <svg viewBox="0 0 24 24" width="1.25em" height="1.25em" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="18" height="18" rx="5.5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.3" cy="6.7" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  );
}
