'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { bot } from '@/data/bot';
import { reply } from '@/hooks/bot';
import { prefersReducedMotion, hasFinePointer } from '@/hooks/media';
import { pageFor } from '@/hooks/theme';

const BotIcon = () => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 3v4M6 7h12a3 3 0 0 1 3 3v7a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3v-7a3 3 0 0 1 3-3zM1 12v3M23 12v3M9 16.5h6" />
    <circle cx="9" cy="12" r="1" /><circle cx="15" cy="12" r="1" />
  </svg>
);

/** A button under an answer: scrolls within the page, changes page or opens another site. */
function Action({ label, href, onLeave }) {
  if (href.startsWith('/')) return <Link href={href} prefetch={false} onClick={onLeave}>{label}</Link>;
  const external = href.startsWith('http') ? { target: '_blank', rel: 'noopener' } : {};
  return <a href={href} onClick={href.startsWith('#') ? onLeave : undefined} {...external}>{label}</a>;
}

/** Floating chat assistant. The conversation stays in the browser and resets on reload. */
export default function ChatBot() {
  const page = pageFor(usePathname());
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [draft, setDraft] = useState('');
  const [typing, setTyping] = useState(false);
  const log = useRef(null);
  const input = useRef(null);
  const panel = useRef(null);
  const launcher = useRef(null);
  const timer = useRef(null);

  const welcome = { from: 'bot', text: bot.welcome[page], chips: bot.starters[page] };
  const all = [welcome, ...messages];

  useEffect(() => () => clearTimeout(timer.current), []);

  // On touch screens, focus the window instead so the keyboard does not cover it.
  useEffect(() => {
    if (open) (hasFinePointer() ? input.current : panel.current).focus({ preventScroll: true });
  }, [open]);

  useEffect(() => {
    const box = log.current;
    if (!box) return;
    // Show the start of a new answer, or the bottom while waiting for one.
    const last = box.querySelector('.msg:last-of-type');
    const top = typing || !last ? box.scrollHeight : last.offsetTop - 12;
    box.scrollTo({ top, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
  }, [messages, typing, open]);

  const close = () => {
    setOpen(false);
    launcher.current.focus({ preventScroll: true });
  };

  const ask = (text) => {
    const question = text.trim();
    if (!question || typing) return;
    setMessages((list) => [...list, { from: 'user', text: question }]);
    setDraft('');
    setTyping(true);
    timer.current = setTimeout(() => {
      setMessages((list) => [...list, { from: 'bot', ...reply(question, page) }]);
      setTyping(false);
    }, 550);
  };

  // On small screens the window covers the page, so close it after following a link.
  const leave = () => { if (window.innerWidth <= 560) setOpen(false); };

  return (
    <div className="chatbot">
      {open && (
        <div
          ref={panel}
          className="bot-panel"
          role="dialog"
          aria-label={`${bot.name} chat`}
          tabIndex={-1}
          onKeyDown={(event) => { if (event.key === 'Escape') close(); }}
        >
          <header className="bot-head">
            <span className="bot-avatar"><BotIcon /></span>
            <div><strong>{bot.name}</strong><small>{bot.tagline}</small></div>
            <button type="button" onClick={close} aria-label="Close chat">✕</button>
          </header>

          <div ref={log} className="bot-log" role="log" aria-live="polite">
            {all.map((message, index) => (
              <div key={index} className={`msg ${message.from}`}>
                <div className="bubble-text">
                  <p>{message.text}</p>
                  {message.list && <ul>{message.list.map((item) => <li key={item}>{item}</li>)}</ul>}
                </div>
                {message.actions?.length > 0 && (
                  <div className="bot-actions">
                    {message.actions.map((action) => <Action key={action.label} {...action} onLeave={leave} />)}
                  </div>
                )}
                {/* Quick replies appear only under the latest answer. */}
                {message.chips && index === all.length - 1 && !typing && (
                  <div className="bot-chips">
                    {message.chips.map((chip) => <button key={chip} type="button" onClick={() => ask(chip)}>{chip}</button>)}
                  </div>
                )}
              </div>
            ))}
            {typing && <div className="bot-typing" aria-label={`${bot.name} is typing`}><i /><i /><i /></div>}
          </div>

          <form className="bot-form" onSubmit={(event) => { event.preventDefault(); ask(draft); }}>
            <input
              ref={input}
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder="Type your question…"
              aria-label="Your question"
              maxLength={300}
              autoComplete="off"
            />
            <button type="submit" disabled={!draft.trim() || typing} aria-label="Send">➤</button>
          </form>
        </div>
      )}

      <button
        ref={launcher}
        type="button"
        className={`bot-launch${open ? ' open' : ''}`}
        onClick={() => (open ? close() : setOpen(true))}
        aria-expanded={open}
        aria-label={open ? 'Close chat' : `Chat with ${bot.name}`}
      >
        {open ? <span aria-hidden="true">✕</span> : <><BotIcon /><span>{bot.name}</span></>}
      </button>
    </div>
  );
}
