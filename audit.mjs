import { readFileSync } from 'fs';

const html = readFileSync('index.html', 'utf8');
const data = readFileSync('src/data.js', 'utf8');

const checks = [
  ['Mahmoud Hatem name present', html.includes('Mahmoud Hatem')],
  ['Front-End Developer title', html.includes('Front-End Developer')],
  ['Cairo Egypt present', html.includes('Cairo, Egypt')],
  ['Email present', html.includes('mahmoudhatem720@gmail.com')],
  ['Phone present', html.includes('+201022485441')],
  ['GitHub profile', html.includes('https://github.com/Mahmoud72207')],
  ['LinkedIn profile', html.includes('https://www.linkedin.com/in/mahmoud-hatem-ai')],
  ['Module script tag', html.includes('type="module"')],
  ['No AI student wording', !html.toLowerCase().includes('ai student')],
  ['No student developer wording', !html.toLowerCase().includes('student developer')],
  ['Avatar and logo referenced', html.includes('mahmoud-avatar.png')],
  ['No-BG portrait referenced', html.includes('mahmoud-nobg.jpg')],
  ['Hero video referenced', html.includes('mahmoud-reel.mp4')],
  ['Favicon present', html.includes('rel="icon"')],
  ['All requested header links present (About, Skills, Projects, Leadership, Education, Contact)',
    html.includes('href="#about"') &&
    html.includes('href="#skills"') &&
    html.includes('href="#projects"') &&
    html.includes('href="#leadership"') &&
    html.includes('href="#education"') &&
    html.includes('href="#contact"')],
  ['E-commerce preview referenced in data or HTML', data.includes('exclusive-ecommerce-preview.jpg') || html.includes('exclusive-ecommerce-preview.jpg')],
  ['Interface Anatomy present', html.includes('deep-dive')],
  ['Contact form present', html.includes('contact-form')],
  ['Skip link present', html.includes('skip-link')],
  ['prefers-reduced-motion in CSS', readFileSync('style.css','utf8').includes('prefers-reduced-motion')],
  ['Live project URL in data', data.includes('https://exclusive-ecommerce-ashy-five.vercel.app/')],
  ['Source URL in data', data.includes('https://github.com/Mahmoud72207/Exclusive-Ecommerce.git')],
  ['DEPI Leadership in data', data.includes('DEPI — React Front-End Track')],
  ['HITU Education in data', data.includes('Helwan International Technological University')],
];

let passed = 0;
checks.forEach(([name, pass]) => {
  console.log((pass ? '✅ PASS' : '❌ FAIL') + '  ' + name);
  if (pass) passed++;
});

console.log('\n' + passed + '/' + checks.length + ' checks passed.');
if (passed < checks.length) process.exit(1);
