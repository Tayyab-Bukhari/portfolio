/** Finds the best answer for a typed question. Everything runs in the visitor's browser. */
import { bot, shortcuts, toApps, topics } from '@/data/bot';

const clean = (text) => ` ${text.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim()} `;

// A phrase matches whole words only, with or without a plural ending.
const has = (question, phrase) => {
  const wanted = clean(phrase).trimEnd();
  return [' ', 's ', 'es '].some((ending) => question.includes(wanted + ending));
};

function score(topic, question, page) {
  const length = (phrase) => phrase.split(' ').length;
  let points = 0;
  (topic.words ?? []).forEach((phrase) => { if (has(question, phrase)) points += 4 * length(phrase); });
  (topic.weak ?? []).forEach((phrase) => { if (has(question, phrase)) points += length(phrase); });
  if (!points) return 0;
  // Clear matches get the topic's extra priority; ties go to the page being viewed.
  if (points >= 4) points += topic.boost ?? 0;
  return points + (topic.group === page ? 0.5 : 0);
}

export function reply(text, page) {
  const question = clean(text);
  const shortcut = shortcuts[question.trim()];
  const direct = shortcut && topics.find((topic) => topic.id === (shortcut[page] ?? shortcut));

  const best = direct || topics
    .map((topic) => ({ topic, points: score(topic, question, page) }))
    .filter(({ points }) => points > 0)
    .sort((a, b) => b.points - a.points)[0]?.topic;

  if (!best) {
    // Pass the unanswered question along so the visitor need not retype it.
    const actions = bot.fallback.actions.map((action) => (
      action.label === 'WhatsApp' ? { ...action, href: `${action.href}?text=${encodeURIComponent(text)}` } : action
    ));
    return { ...bot.fallback, actions, chips: bot.starters[page], id: 'fallback' };
  }

  const answer = best.answer(page);
  // App answers shown on the marketing page link back to the app page.
  const away = page === 'social' && best.group === 'home';
  return { ...answer, id: best.id, actions: away ? [...(answer.actions ?? []), toApps] : answer.actions };
}
