import Icon, { isIcon } from '@/components/common/Icon';

// The Uber Eats logo is lettering, so it needs more room to stay readable.
const sizes = { ubereats: '1.7em' };

/** Platform logo, or the badge text where there is no logo (LinkedIn's "in"). */
export default function PlatformIcon({ badge }) {
  return isIcon(badge) ? <Icon name={badge} size={sizes[badge] || '1.15em'} /> : badge;
}
