import '@/styles/variables.css';
import '@/styles/base.css';
import '@/styles/components.css';
import '@/styles/sections.css';
import '@/styles/animations.css';
import '@/styles/responsive.css';
import '@/styles/social.css';

export const viewport = { themeColor: '#070b14' };

// Runs before the page is drawn: enables animations and applies the saved theme.
const boot = `document.documentElement.classList.add('js');
try { var t = localStorage.getItem('theme'); if (t) document.documentElement.dataset.theme = t; } catch (e) {}`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: boot }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Sora:wght@600;700;800&family=Inter:wght@400;500;600&family=Space+Grotesk:wght@500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
