import { site } from '@/data/site';

export default function Footer() {
  return (
    <footer className="wrap">
      <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
      <a href="#home">Back to top ↑</a>
    </footer>
  );
}
