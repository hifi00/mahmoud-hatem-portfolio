const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const js = fs.readFileSync('src/data.js', 'utf8');

const checks = [
  ['Mahmoud Hatem name present', html.includes('Mahmoud Hatem')],
  ['Front-End Developer title', html.includes('Front-End Developer')],
  ['Cairo, Egypt present', html.includes('Cairo, Egypt')],
  ['Email link present', html.includes('mahmoudhatem720@gmail.com')],
  ['Phone link present', html.includes('+201022485441')],
  ['GitHub profile link', html.includes('https://github.com/Mahmoud72207')],
  ['LinkedIn profile link', html.includes('https://www.linkedin.com/in/mahmoud-hatem-ai')],
  ['Module script tag', html.includes('type="module"')],
  ['No student/AI student wording', !html.toLowerCase().includes('ai student') && !html.toLowerCase().includes('student developer')],
  ['Portrait image referenced', html.includes('mahmoud-hatem.jpg')],
  ['E-commerce preview referenced', html.includes('exclusive-ecommerce-preview.jpg')],
  ['Scrollytelling section present', html.includes('deep-dive')],
  ['Contact form present', html.includes('contact-form')],
  ['Skip-to-content link', html.includes('skip-to-content')],
  ['Live project URL in data', js.includes('https://exclusive-ecommerce-ashy-five.vercel.app/')],
  ['Source URL in data', js.includes('https://github.com/Mahmoud72207/Exclusive-Ecommerce.git')],
  ['No student in data.js visible strings', !js.match(/["'`][^"'`]*student[^"'`]*["'`]/i)]
];

let passed = 0;
checks.forEach(([name, pass]) => {
  console.log((pass ? 'PASS' : 'FAIL') + '  ' + name);
  if (pass) passed++;
});

console.log('\n' + passed + '/' + checks.length + ' checks passed.');
if (passed === checks.length) {
  console.log('All compliance checks PASSED.');
} else {
  process.exit(1);
}
