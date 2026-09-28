/**
 * src/data.js — Mahmoud Hatem Portfolio
 * Single source of truth. All data verified strictly from official CV.
 * Written in authentic, professional first-person voice ("I", "My").
 */

export const profile = {
  name: 'Mahmoud Hatem',
  title: 'Front-End Developer',
  location: 'Cairo, Egypt',
  email: 'mahmoudhatem720@gmail.com',
  phone: '+201022485441',
  githubUrl: 'https://github.com/Mahmoud72207',
  linkedinUrl: 'https://www.linkedin.com/in/mahmoud-hatem-ai',
  portraitNoBg: './assets/mahmoud-nobg.jpg',
  avatarIcon: './assets/mahmoud-avatar.png',
  heroHeadline: ['Code that thinks', 'in design.'],
  heroParagraph:
    'I design and build responsive digital experiences with clarity, motion, and purpose — from the first layout decision to the final interaction.',
  objective:
    'I am a dedicated React Front-End Developer with strong foundations in programming, computational problem-solving, and modern web development. Proficient in HTML5, CSS3, JavaScript (ES6+), and React.js, with additional experience in C++ and Python. I am passionate about building responsive, user-friendly, and maintainable web interfaces, continuously advancing my technical expertise through personal projects and my coordination as Team Leader in the DEPI React track.',
  aboutQuote:
    'I build responsive digital experiences where structure, motion, and detail work together — translating complex design requirements into clean, semantic, maintainable code.'
};

export const manifesto = {
  statement:
    'I turn interfaces into clear, responsive experiences — from the first layout decision to the final interaction.',
  pillars: [
    {
      number: '01',
      keyword: 'Structure',
      tagline: 'Semantic foundations',
      description:
        'I prioritize clean HTML5 element landmarks that ensure accessibility, clarity, and robust cross-device maintainability.'
    },
    {
      number: '02',
      keyword: 'Motion',
      tagline: 'Kinetic intent',
      description:
        'I craft hardware-accelerated transitions and subtle micro-interactions that guide visual hierarchy without distracting.'
    },
    {
      number: '03',
      keyword: 'Detail',
      tagline: 'Crafted execution',
      description:
        'I test and fine-tune every breakpoint, focus state, touch target, and spacing unit before deploying to production.'
    }
  ]
};

export const projects = [
  {
    number: '01',
    title: 'Exclusive E-commerce',
    category: 'Front-end implementation',
    role: 'Front-End Developer',
    description:
      'A responsive, multi-page e-commerce storefront I engineered by converting detailed Figma specifications into clean, semantic HTML5 and CSS3.',
    bullets: [
      'Developed a responsive, multi-page e-commerce web application by converting a detailed Figma UI/UX design into clean, semantic code.',
      'Ensured cross-browser compatibility and optimized the layout for multiple screen sizes across mobile, tablet, and desktop.',
      'Integrated third-party libraries like Font Awesome for UI icons and deployed the live site via Vercel.'
    ],
    technologies: ['HTML5', 'CSS3', 'Normalize.css', 'Font Awesome', 'Vercel'],
    image: './assets/exclusive-ecommerce-preview.jpg',
    liveUrl: 'https://exclusive-ecommerce-ashy-five.vercel.app/',
    sourceUrl: 'https://github.com/Mahmoud72207/Exclusive-Ecommerce.git',
    architectureLayers: [
      {
        phase: '01',
        title: 'Storefront Presentation',
        description: 'Pixel-accurate Figma translation with clean typography and reusable component tokens.'
      },
      {
        phase: '02',
        title: '12-Column Responsive Grid',
        description: 'Fluid layout breakpoints from 320px mobile to wide desktop, structured with semantic landmarks.'
      },
      {
        phase: '03',
        title: 'Production Tech Stack',
        description: 'HTML5, CSS3, Normalize.css, Font Awesome vector icons, deployed via Vercel with zero console errors.'
      }
    ]
  }
];

export const skillsCategories = [
  {
    category: 'Front-End Development',
    skills: ['HTML5', 'CSS3', 'JavaScript (ES6+)', 'React.js', 'Responsive Design']
  },
  {
    category: 'Programming Languages',
    skills: ['C++', 'Python']
  },
  {
    category: 'Version Control & Tools',
    skills: ['Git', 'GitHub', 'Font Awesome', 'Vercel']
  },
  {
    category: 'CS Fundamentals',
    skills: ['OOP (Object-Oriented Programming)', 'Data Structures & Algorithms', 'Database Fundamentals']
  },
  {
    category: 'Professional Soft Skills',
    skills: ['Problem Solving', 'Time Management', 'Continuous Learning']
  }
];

export const leadership = {
  role: 'Team Leader',
  organization: 'DEPI — React Front-End Track',
  period: 'Active Coordination',
  description:
    'As Team Leader in the DEPI React Front-End Track, I lead and coordinate my front-end development team, organizing shared deliverables, conducting collaborative code reviews, and solving sprint challenges together.'
};

export const education = {
  degree: 'Bachelor of Technology in Artificial Intelligence',
  institution: 'Helwan International Technological University (HITU)',
  location: 'Cairo, Egypt',
  period: 'Sep 2023 – Present',
  note:
    'My academic coursework covers Artificial Intelligence fundamentals, computational logic, data structures, algorithms, and software engineering principles.'
};

export const languages = [
  { language: 'Arabic', level: 'Native' },
  { language: 'English', level: 'Professional Working Proficiency' }
];
