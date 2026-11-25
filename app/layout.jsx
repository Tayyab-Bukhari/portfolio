import { themes } from '@/hooks/theme';
import '@/styles/variables.css';
import '@/styles/base.css';
import '@/styles/components.css';
import '@/styles/sections.css';
import '@/styles/animations.css';
import '@/styles/responsive.css';
import '@/styles/social.css';
import '@/styles/home.css';

export const viewport = { themeColor: '#070b14' };

// Runs before the page is drawn: enables animations and applies this page's theme.
const boot = `document.documentElement.classList.add('js');
(function () {
  var themes = ${JSON.stringify(themes)};
  var page = themes[location.pathname.indexOf('/social-media') === 0 ? 'social' : 'home'];
  var saved = null;
  try { saved = localStorage.getItem(page.key); } catch (e) {}
  document.documentElement.dataset.theme = saved || page.fallback;
})();`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: boot }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@600;700;800&family=Sora:wght@600;700;800&family=Inter:wght@400;500;600&family=Space+Grotesk:wght@500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
