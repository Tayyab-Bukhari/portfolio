/**
 * What STB AI Bot knows. Answers are built from the website's own content,
 * so editing home.js, social.js or site.js updates the bot too.
 *
 * To teach it something new, add a topic:
 *   - `words`: phrases that point to this topic (a longer phrase counts for more)
 *   - `weak`:  common words that should only count when nothing clearer matches
 *   - `answer(page)`: returns { text, list?, actions?, chips? }; `page` is "home" or "social"
 */
import { home } from '@/data/home';
import { social } from '@/data/social';
import { site } from '@/data/site';

const { contact } = site;

// Buttons shown under answers.
const toContact = { label: 'Open contact form', href: '#contact' };
const toWhatsApp = contact.whatsapp && { label: 'WhatsApp', href: `https://wa.me/${contact.whatsapp}` };
const toEmail = contact.email && { label: 'Email', href: `mailto:${contact.email}` };
const toCall = contact.phone && { label: `Call ${contact.phoneLabel}`, href: `tel:${contact.phone}` };
const toApps = { label: 'See app development', href: '/' };
const toMarketing = { label: 'See marketing services', href: '/social-media/' };
const reach = [toContact, toWhatsApp].filter(Boolean);

export const bot = {
  name: 'STB AI Bot',
  tagline: 'Instant answers about services and projects',
  welcome: {
    home: 'Hi! I am STB AI Bot. Ask me about mobile app services, projects, pricing or how to start.',
    social: 'Hi! I am STB AI Bot. Ask me about social media management, Uber Eats, packages or how to start.',
  },
  // Quick buttons under the welcome message.
  starters: {
    home: ['Services', 'Projects', 'Pricing', 'Hire Tayyab', 'Contact'],
    social: ['Services', 'Packages', 'Uber Eats', 'Pricing', 'Contact'],
  },
  fallback: {
    text: 'I do not have an answer for that yet. Send your question to Tayyab directly, or pick a topic below.',
    actions: reach,
  },
};

// ----- Topics for both pages -----
const general = [
  {
    id: 'greeting',
    weak: ['hi', 'hello', 'hey', 'salam', 'assalam', 'aoa', 'good morning', 'good evening', 'good afternoon'],
    answer: (page) => ({ text: 'Hello! How can I help you today?', chips: bot.starters[page] }),
  },
  {
    id: 'thanks',
    weak: ['thanks', 'thank you', 'thankyou', 'great', 'awesome', 'ok', 'okay', 'bye', 'goodbye'],
    answer: () => ({ text: 'You are welcome! If you have a project in mind, Tayyab would be glad to hear about it.', actions: reach }),
  },
  {
    id: 'help',
    weak: ['help', 'menu', 'options', 'what can you do', 'who are you', 'are you a bot', 'are you human'],
    answer: (page) => ({ text: 'I am an automated assistant for this website. I can answer common questions and point you to the right place.', chips: bot.starters[page] }),
  },
  {
    id: 'about',
    words: ['about tayyab', 'who is tayyab', 'about you', 'introduce', 'background', 'tell me about tayyab', 'syed', 'raza'],
    weak: ['tayyab', 'about'],
    answer: () => ({
      text: `${site.name} is a Mobile Application Developer at Preesoft, based in Lahore, Pakistan, and also offers social media marketing.`,
      actions: [{ label: 'LinkedIn profile', href: site.linkedin }],
      chips: ['Services', 'Projects', 'Experience'],
    }),
  },
  {
    id: 'contact',
    words: ['contact', 'reach', 'get in touch', 'talk to', 'speak', 'call', 'phone', 'number', 'email', 'mail', 'message'],
    answer: () => ({
      text: `You can send a message with the contact form, or reach Tayyab at ${contact.email} or ${contact.phoneLabel}.`,
      actions: [toContact, toWhatsApp, toEmail, toCall].filter(Boolean),
    }),
  },
  {
    id: 'whatsapp',
    boost: 1,
    words: ['whatsapp', 'whats app'],
    answer: () => ({ text: `You can chat with Tayyab on WhatsApp at ${contact.phoneLabel}.`, actions: [toWhatsApp, toContact].filter(Boolean) }),
  },
  {
    id: 'linkedin',
    words: ['linkedin profile', 'your linkedin', 'resume', 'cv', 'curriculum'],
    answer: () => ({ text: 'Tayyab’s work history is on this site and on LinkedIn.', actions: [{ label: 'LinkedIn profile', href: site.linkedin }] }),
  },
  {
    id: 'hire',
    words: ['hire', 'start a project', 'get started', 'quote', 'work with', 'i need', 'i want', 'build my', 'freelance', 'available', 'book', 'consultation', 'meeting', 'free audit', 'audit'],
    answer: (page) => ({
      text: page === 'social'
        ? 'Great! Share your page or store link, business type and main goal in the contact form to request a free audit.'
        : 'Great! Describe your app idea, the platforms you need and your main features in the contact form. Tayyab will reply by email.',
      actions: reach,
    }),
  },
  {
    id: 'price',
    boost: 2,
    words: ['price', 'pricing', 'cost', 'how much', 'charge', 'rate', 'budget', 'fee', 'payment', 'quotation', 'cheap', 'expensive'],
    answer: (page) => ({
      text: page === 'social'
        ? 'Every package is tailored to your business and goals, and ad spend is billed separately. Share your details and you will receive a quote.'
        : 'The price depends on your features, platforms and design. Share your project details and you will receive a quote.',
      actions: reach,
    }),
  },
  {
    id: 'timeline',
    boost: 1,
    words: ['how long', 'timeline', 'deadline', 'delivery time', 'duration', 'how soon', 'how many days', 'how many weeks', 'results'],
    answer: (page) => ({
      text: page === 'social'
        ? social.faq[0].a
        : 'The timeline depends on the size of your app and its features. Share your project details to get an estimate of the schedule.',
      actions: reach,
    }),
  },
  {
    id: 'location',
    words: ['where are you', 'location', 'located', 'country', 'city', 'lahore', 'pakistan', 'time zone', 'timezone', 'international', 'worldwide', 'remote', 'abroad'],
    answer: () => ({ text: 'Tayyab is based in Lahore, Pakistan, and works with clients worldwide. Calls are arranged at a time that overlaps with yours.', actions: reach }),
  },
];

// ----- App development -----
const serviceTopic = (title, words) => ({
  id: title,
  group: 'home',
  words,
  answer: () => ({
    text: `${title}: ${home.services.find((service) => service.title === title)?.text ?? ''}`,
    actions: reach,
    chips: ['Pricing', 'Projects'],
  }),
});

const projectTopic = (start, words) => ({
  id: start,
  group: 'home',
  boost: 1,
  words,
  answer: () => {
    const project = home.projects.find(({ title }) => title.startsWith(start));
    if (!project) return bot.fallback;
    return {
      text: `${project.title}. ${project.text}`,
      actions: [...(project.links ?? []).map(({ label, url }) => ({ label, href: url })), toContact],
      chips: ['Projects', 'Pricing'],
    };
  },
});

const apps = [
  {
    id: 'app-services',
    group: 'home',
    words: ['app development', 'mobile app', 'build an app', 'make an app', 'develop an app', 'create an app', 'application'],
    weak: ['services', 'service', 'app', 'offer', 'what do you do'],
    answer: () => ({
      text: 'These are the app development services:',
      list: home.services.map(({ title }) => title),
      actions: [toContact],
      chips: ['Pricing', 'Projects', 'Social media marketing'],
    }),
  },
  serviceTopic('React Native App Development', ['react native', 'react', 'cross platform', 'hybrid']),
  serviceTopic('Flutter App Development', ['flutter', 'dart']),
  serviceTopic('Android App Development', ['android', 'kotlin', 'java', 'play store', 'google play']),
  serviceTopic('iOS App Development', ['ios', 'iphone', 'ipad', 'app store', 'apple']),
  serviceTopic('Firebase & API Integration', ['firebase', 'api', 'backend', 'integration', 'push notification']),
  serviceTopic('Offline Database', ['offline', 'database', 'sqlite', 'local storage']),
  serviceTopic('Google AdMob Integration', ['admob', 'in app ads', 'monetize', 'monetise', 'earn money']),
  serviceTopic('Website to Mobile App', ['website to app', 'website to mobile', 'convert website', 'convert my website', 'webview', 'website into']),
  serviceTopic('Bug Fixing & Optimization', ['bug', 'fix', 'crash', 'crashed', 'crashing', 'not working', 'slow app', 'optimize', 'optimise', 'maintenance', 'existing app', 'update my app']),
  {
    id: 'projects',
    group: 'home',
    words: ['projects', 'project list', 'portfolio', 'previous work', 'past work', 'apps you built', 'your apps', 'examples of work'],
    weak: ['project', 'work'],
    answer: () => ({
      text: 'Here are the featured projects. Tap one to learn more.',
      chips: home.projects.map(({ title }) => title.split(/ — |:/)[0]),
      actions: [{ label: 'View projects', href: '/#projects' }],
    }),
  },
  projectTopic('revDSM', ['revdsm', 'rev dsm', 'field operations']),
  projectTopic('RideArt', ['rideart', 'ride art', 'social app']),
  projectTopic('Frjar', ['frjar', 'construction app']),
  projectTopic('Period Tracker', ['period tracker', 'ovulation', 'cycle tracker']),
  projectTopic('Device Info', ['device info', 'cpu app', 'diagnostic app']),
  {
    id: 'experience',
    group: 'home',
    words: ['experience', 'how many years', 'career', 'companies', 'worked at', 'preesoft', 'fiverr'],
    answer: () => ({
      text: 'Tayyab has built mobile apps since 2021. Recent roles:',
      list: home.experience.slice(0, 4).map(({ role, meta }) => `${role}, ${meta}`),
      actions: [{ label: 'Full experience', href: '/#experience' }],
    }),
  },
  {
    id: 'education',
    group: 'home',
    words: ['education', 'degree', 'university', 'qualification', 'study', 'studied'],
    answer: () => ({ text: 'Education:', list: home.education.map(({ title, place }) => `${title}, ${place}`) }),
  },
  {
    id: 'skills',
    group: 'home',
    words: ['skills', 'technologies', 'tech stack', 'tools', 'languages you use', 'programming'],
    answer: () => ({ text: `Main skills: ${home.skills.slice(0, 14).join(', ')}.`, chips: ['Services', 'Projects'] }),
  },
  {
    id: 'app-process',
    group: 'home',
    words: ['process', 'how do you work', 'how it works', 'steps', 'workflow'],
    answer: () => ({ text: 'An app project goes through these steps:', list: home.process.map(({ title, text }) => `${title}: ${text}`), actions: [toContact] }),
  },
];

// ----- Social media marketing -----
const platformTopic = (name, words) => ({
  id: name,
  group: 'social',
  words,
  answer: () => ({
    text: `${name}: ${social.platforms.find((platform) => platform.name === name)?.text ?? ''}`,
    actions: [...reach, toMarketing],
    chips: ['Packages', 'Pricing'],
  }),
});

const industryTopic = (name, words) => ({
  id: name,
  group: 'social',
  words,
  answer: () => {
    const industry = social.industries.find((item) => item.name === name);
    if (!industry) return bot.fallback;
    return { text: `${name}. Goal: ${industry.goal.toLowerCase()}. Ideas include:`, list: industry.ideas, actions: [...reach, toMarketing] };
  },
});

const faqTopic = (index, words) => ({
  id: `faq-${index}`,
  group: 'social',
  boost: 2,
  words,
  answer: () => ({ text: social.faq[index].a, actions: reach }),
});

const marketing = [
  {
    id: 'marketing-services',
    group: 'social',
    words: ['social media', 'marketing', 'digital marketing', 'manage my page', 'grow my business', 'followers', 'promote'],
    weak: ['services', 'service', 'offer', 'what do you do'],
    answer: () => ({
      text: 'Marketing covers these platforms:',
      list: social.platforms.map(({ name }) => name),
      actions: [toContact, toMarketing],
      chips: ['Packages', 'Uber Eats', 'Pricing'],
    }),
  },
  platformTopic('Facebook', ['facebook', 'fb']),
  platformTopic('Instagram', ['instagram', 'insta', 'reels']),
  platformTopic('LinkedIn', ['linkedin marketing', 'linkedin']),
  platformTopic('YouTube', ['youtube', 'shorts']),
  platformTopic('X (Twitter)', ['twitter', 'tweets']),
  {
    id: 'ubereats',
    group: 'social',
    boost: 1,
    words: ['uber eats', 'ubereats', 'uber', 'food delivery', 'delivery orders', 'menu'],
    answer: () => ({ text: 'Uber Eats store management includes:', list: social.uber.map(({ title }) => title), actions: reach, chips: ['Uber Eats ranking', 'Pricing'] }),
  },
  faqTopic(1, ['guarantee', 'guaranteed', 'rank', 'ranking', 'top rank', 'top position']),
  faqTopic(2, ['password', 'passwords', 'account access', 'login details']),
  faqTopic(4, ['approve', 'approval', 'who approves']),
  industryTopic('Parlors & Salons', ['salon', 'parlor', 'parlour', 'beauty']),
  industryTopic('Doctors & Clinics', ['doctor', 'clinic', 'dentist', 'dental', 'medical']),
  industryTopic('Lawyers & Law Firms', ['lawyer', 'law firm', 'attorney', 'legal']),
  industryTopic('Restaurants', ['restaurant', 'cafe', 'food business']),
  {
    id: 'packages',
    group: 'social',
    words: ['package', 'packages', 'plans', 'subscription', 'monthly plan'],
    answer: () => ({
      text: 'There are three packages:',
      list: social.packages.map(({ name, items }) => `${name}: ${items.join(', ')}`),
      actions: reach,
      chips: ['Pricing'],
    }),
  },
  {
    id: 'marketing-process',
    group: 'social',
    words: ['process', 'strategy', 'how do you work', 'how it works', 'steps', 'workflow'],
    answer: () => ({ text: 'The client growth system:', list: social.strategy.map(({ title }) => title.replace(/^\d+\.\s*/, '')), actions: [toContact] }),
  },
  {
    id: 'checklist',
    group: 'social',
    words: ['what do you need', 'need from me', 'requirements', 'checklist'],
    answer: () => ({ text: 'To get started, please have these ready:', list: social.checklist, actions: [toContact] }),
  },
];

export const topics = [...general, ...apps, ...marketing];

// Button labels that should always open one particular topic.
export const shortcuts = {
  'hire tayyab': 'hire',
  services: { home: 'app-services', social: 'marketing-services' },
  'social media marketing': 'marketing-services',
  'uber eats ranking': 'faq-1',
};
export { toApps };
