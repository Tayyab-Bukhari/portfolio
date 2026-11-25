'use client';

import { site } from '@/data/site';

const basics = ['name', 'email', 'message'];

/** Opens the visitor's email app with the message filled in. */
export default function ContactForm({ subject = 'Project enquiry', messageLabel = 'Project details', children }) {
  const send = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // Extra fields (any name other than the three basics) are listed in the email.
    const extras = [...new Set(data.keys())]
      .filter((key) => !basics.includes(key))
      .map((key) => `${key}: ${data.getAll(key).join(', ')}`);
    const body = [data.get('message'), extras.join('\n'), `${data.get('name')}\n${data.get('email')}`]
      .filter(Boolean)
      .join('\n\n');
    const title = `${subject} from ${data.get('name')}`;
    window.location.href = `mailto:${site.contact.email}?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <form id="form" onSubmit={send}>
      <label>Your name<input name="name" required autoComplete="name" /></label>
      <label>Your email<input name="email" type="email" required autoComplete="email" /></label>
      {children}
      <label className="full">{messageLabel}<textarea name="message" rows={4} required /></label>
      <button className="btn primary full" type="submit">Open in email app</button>
    </form>
  );
}
