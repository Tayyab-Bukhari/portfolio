import ChatBot from '@/components/common/ChatBot';
import CursorGlow from '@/components/effects/CursorGlow';
import Header from './Header';
import Footer from './Footer';

/** Frame shared by all pages: background, navigation, content and footer. */
export default function PageShell({ className, links, switchTo, children }) {
  return (
    <div className={className}>
      <a className="skip" href="#main">Skip to content</a>
      <div className="aurora" aria-hidden="true"><span /><span /><span /></div>
      <CursorGlow />
      <Header links={links} switchTo={switchTo} />
      <main id="main">{children}</main>
      <Footer />
      <ChatBot />
    </div>
  );
}
