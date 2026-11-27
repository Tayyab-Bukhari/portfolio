'use client';

import { useState } from 'react';
import { site } from '@/data/site';

// FormSubmit emails each submission to this address. The site needs no server of its own.
const endpoint = `https://formsubmit.co/ajax/${site.contact.email}`;

/** Sends the visitor's message straight to the site owner's inbox. */
export default function ContactForm({ subject = 'Project enquiry', messageLabel = 'Project details', children }) {
  const [status, setStatus] = useState('idle'); // idle | sending | sent | failed
  const [fallback, setFallback] = useState('');

  const send = async (event) => {
    event.preventDefault();
    if (status === 'sending') return;

    // Every filled field becomes a row in the email.
    const fields = Object.fromEntries([...new FormData(event.currentTarget)].filter(([, value]) => value));
    const title = `${subject} from ${fields.name}`;

    // Used if sending fails, so the typed message is not lost.
    const body = Object.entries(fields).filter(([key]) => key !== '_honey').map(([key, value]) => `${key}: ${value}`);
    setFallback(`mailto:${site.contact.email}?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(body.join('\n'))}`);
    setStatus('sending');

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...fields, _subject: title, _template: 'table' }),
        signal: AbortSignal.timeout(20000),
      });
      const result = await response.json();
      // FormSubmit reports success as the text "true".
      if (!response.ok || String(result.success) !== 'true') throw new Error(result.message);
      setStatus('sent');
    } catch (error) {
      // The reason (for example, that the form still needs activation) shows in the browser console.
      console.warn('Contact form:', error.message);
      setStatus('failed');
    }
  };

  if (status === 'sent') {
    return (
      <div className="sent" role="status">
        <span aria-hidden="true">✓</span>
        <h3>Message sent</h3>
        <p>Thank you for getting in touch. I'll reply to your email soon.</p>
        <button className="btn ghost" type="button" onClick={() => setStatus('idle')}>Send another message</button>
      </div>
    );
  }

  return (
    <form id="form" onSubmit={send}>
      <label>Your name<input name="name" required autoComplete="name" /></label>
      <label>Your email<input name="email" type="email" required autoComplete="email" /></label>
      {children}
      <label className="full">{messageLabel}<textarea name="message" rows={4} required /></label>
      {/* Hidden from people. Spam bots fill it in, and FormSubmit then discards the message. */}
      <input className="trap" name="_honey" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <button className="btn primary full" type="submit" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending…' : 'Send message'}
      </button>
      {status === 'failed' && (
        <p className="full form-error" role="alert">
          Your message could not be sent. Please try again, or <a href={fallback}>send it from your email app</a>.
        </p>
      )}
    </form>
  );
}
