/** Content of the home (app development) page. Edit freely. */
export const home = {
  // Rotating titles in the hero.
  roles: [
    'Mobile App Developer',
    'React Native Developer',
    'Flutter Developer',
    'Android App Developer',
    'iOS App Developer',
    'API Integration Specialist',
  ],

  stats: [
    { label: 'Years in mobile apps', since: '2021-01', suffix: '+' },
    { label: 'Featured apps', value: 5 },
    { label: 'Companies', value: 7 },
  ],

  skills: [
    'React Native', 'Flutter', 'Dart', 'Android', 'iOS Development', 'Kotlin', 'Java', 'Android SDK',
    'Jetpack Compose', 'Firebase', 'API Integration', 'Offline Database', 'Google AdMob', 'Git', 'UI / UX',
    'Performance Optimization', 'Testing & Validation', 'App Deployment',
    'Problem Solving', 'Design Thinking', 'Graphic Design', 'Digital Marketing',
  ],

  services: [
    { icon: 'react', title: 'React Native App Development', text: 'One codebase for Android and iOS, from the first screen to store release.' },
    { icon: 'flutter', title: 'Flutter App Development', text: 'Cross-platform apps in Flutter and Dart with a consistent interface on Android and iOS.' },
    { icon: 'android', title: 'Android App Development', text: 'Native apps in Kotlin or Java, including delivery, dating, chat and e-commerce apps.' },
    { icon: 'apple', title: 'iOS App Development', text: 'Apps for iPhone, from interface design through testing and App Store release.' },
    { icon: 'firebase', title: 'Firebase & API Integration', text: 'Connect your app to Firebase and REST APIs with dependable data flow.' },
    { icon: 'sqlite', title: 'Offline Database', text: 'Local storage so your app keeps useful data on the device.' },
    { icon: 'admob', title: 'Google AdMob Integration', text: 'Add Google ads to your app so it can earn revenue.' },
    { icon: 'html5', title: 'Website to Mobile App', text: 'Turn your website into a customised mobile app with a splash screen and ads.' },
    { icon: 'wrench', title: 'Bug Fixing & Optimization', text: 'Find and fix bugs in your existing mobile app, then test and tune it.' },
  ],

  // `mockup` picks a screen from components/home/Mockup.jsx; `colors` tint its card.
  projects: [
    {
      title: 'revDSM — Field Operations App',
      period: 'Latest project · React Native',
      text: 'An enterprise field operations platform for direct-to-consumer home services organizations, built entirely in React Native and available on Android and iOS by invitation.',
      tags: ['React Native', 'Android', 'iOS', 'Business'],
      highlights: ['Built entirely in React Native', 'For direct-to-consumer home services', 'Android and iOS, available by invitation'],
      badges: [{ icon: 'react', label: 'React Native' }, { icon: 'android', label: 'Android & iOS' }],
      mockup: 'field',
      colors: ['#34f5a6', '#0f766e'],
      links: [
        { label: 'Google Play', url: 'https://play.google.com/store/apps/details?id=com.revdsm' },
        { label: 'App Store', url: 'https://apps.apple.com/us/app/revdsm/id6775457391' },
      ],
    },
    {
      title: 'RideArt — Social App',
      period: 'Preesoft · Android (Kotlin)',
      text: 'A social app built natively for Android in Kotlin. My work includes real-time notifications, in-app chat and a redesigned interface with Jetpack Compose.',
      tags: ['Kotlin', 'Jetpack Compose', 'Firebase', 'Chat'],
      highlights: ['Real-time notifications', 'In-app chat', 'Interface redesigned with Jetpack Compose'],
      badges: [{ icon: 'chat', label: 'Live chat' }, { icon: 'bell', label: 'Notifications' }],
      mockup: 'social',
      colors: ['#a78bfa', '#5b21b6'],
      links: [
        { label: 'Google Play', url: 'https://play.google.com/store/apps/details?id=com.rideart.prod' },
      ],
    },
    {
      title: 'Frjar — Construction App',
      period: 'Mar – Dec 2024',
      text: 'An all-in-one construction platform that brings material purchases, consultant hiring, equipment rentals, maintenance services and real estate browsing into a single app.',
      tags: ['Android', 'Marketplace', 'Services', 'Real Estate'],
      highlights: ['Material purchases and equipment rentals', 'Consultant hiring and maintenance services', 'Real estate browsing'],
      badges: [{ icon: 'layers', label: 'Materials' }, { icon: 'home', label: 'Real estate' }],
      mockup: 'construction',
      colors: ['#fbbf24', '#9a3412'],
    },
    {
      title: 'Period Tracker & Ovulation',
      period: 'Jan – Apr 2024',
      text: 'Blood: Period & Cycle Tracker is a science-backed app that gives users personalised insights into their menstrual cycle.',
      tags: ['Android', 'Health', 'Personalisation'],
      highlights: ['Science-backed app', 'Personalised menstrual cycle insights'],
      badges: [{ icon: 'chart', label: 'Insights' }, { icon: 'calendar', label: 'Cycle' }],
      mockup: 'cycle',
      colors: ['#fb7185', '#9d174d'],
    },
    {
      title: 'Device Info: Check System, CPU',
      period: 'Nov – Dec 2023',
      text: 'A diagnostic app showing real-time details about the system, CPU, memory, battery and sensors of an Android device.',
      tags: ['Android', 'Diagnostics', 'Real-time data'],
      highlights: ['System and CPU details', 'Memory and battery status', 'Real-time sensor information'],
      badges: [{ icon: 'cpu', label: 'CPU' }, { icon: 'battery', label: 'Battery' }],
      mockup: 'device',
      colors: ['#38d9ff', '#1e40af'],
    },
  ],

  experience: [
    { role: 'Mobile Application Developer', meta: 'Preesoft · Jan 2026 – Present' },
    { role: 'Android Application Developer', meta: 'Preesoft · Jul 2025 – Jan 2026' },
    { role: 'Freelance Android Developer', meta: 'Fiverr · Jan 2023 – Present', text: 'Custom Android apps in Java and Kotlin, from UI design to deployment, with Firebase, API, offline database and AdMob integration.' },
    { role: 'Android Engineer', meta: 'Coder Crew · Feb 2025 – May 2025' },
    { role: 'Android Developer', meta: 'nFinity Solutions · May 2024 – Dec 2024', text: 'Designing, developing and implementing features for the company’s Android applications.' },
    { role: 'Android Developer', meta: 'Champs Technologies · Mar 2023 – Feb 2024', text: 'Android product development focused on user experience.' },
    { role: 'Android Developer', meta: 'Kodex Technologies · Feb 2022 – Jan 2023', text: 'Developed and enhanced Android apps, designed UI/UX with cross-functional teams, built new features and resolved technical issues.' },
    { role: 'Android Developer', meta: 'DEVXON · Jul 2021 – Jan 2022', text: 'Gathered client requirements, planned project strategy, translated designs and developed app functionality.' },
    { role: 'Android Developer', meta: 'Capitol Technology Solutions · Jan 2021 – Mar 2021', text: 'Designed user interfaces, joined planning for future releases and improved layouts using the Android SDK.' },
  ],

  education: [
    { title: 'BS Computer Science', place: 'Government College University, Faisalabad', period: '2017 – 2021' },
    { title: 'Intermediate, Computer Science', place: 'Govt College Shahdara, Lahore', period: '2014 – 2017' },
    { title: 'Matriculation, Computer Science', place: 'Worker’s Welfare Boys School, Shahdara', period: '2014' },
    { title: 'Digital Marketing Course', place: 'DigiSkills', period: '2020' },
  ],

  gallery: [
    { src: '/images/preesoft-event.jpg', alt: 'Two people holding a Preesoft box on stage', caption: 'At a Preesoft event', width: 1200, height: 907 },
    { src: '/images/speaking.jpg', alt: 'Tayyab speaking at a podium', caption: 'Speaking at Four Points by Sheraton', width: 800, height: 1200 },
  ],

  process: [
    { title: 'Discover', text: 'We agree on your goals, users and must-have features.' },
    { title: 'Design', text: 'Screens and flows are planned before code is written.' },
    { title: 'Develop', text: 'I build in stages so you can try progress and give feedback.' },
    { title: 'Deliver', text: 'Testing, performance tuning and preparation for release.' },
  ],
};
