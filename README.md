# Mahmoud Hatem — Front-End Developer Portfolio

A cinematic, responsive portfolio website for **Mahmoud Hatem**, a Front-End Developer with academic background in Artificial Intelligence at Helwan International Technological University (HITU), Cairo.

## ✨ Features
- Cinematic video hero with portrait stage & kinetic badges
- Dual light / dark theme (light is default, preference saved in `localStorage`)
- Fully responsive across mobile, tablet, and desktop screens
- Scroll-reveal animations with `IntersectionObserver`
- Downloadable official CV / Resume in PDF format
- Contact form with instant copy-to-clipboard for email and phone
- Project showcase with live demo & source code links (Exclusive E-commerce)
- Leadership, Education, and Categorized Skills sections

## 🛠 Tech Stack
`HTML5` · `CSS3` · `Vanilla JS (ES6+)` · `Node.js` (dev server & build script) · `Vercel`

## 🚀 Instant Deployment to Vercel (Zero Configuration)
This repository is pre-configured with `vercel.json` and `build.js` for seamless, 1-click deployment on Vercel:

1. **Fork or Clone** this repository to your GitHub account.
2. Go to **[vercel.com/new](https://vercel.com/new)** and import your repository.
3. Vercel automatically detects the configuration:
   - **Framework Preset:** `Other`
   - **Build Command:** `node build.js`
   - **Output Directory:** `dist`
4. Click **Deploy**. Your portfolio goes live in seconds with zero manual setup!

## 💻 Run Locally
No build tools or heavy dependencies required:
```bash
# Clone the repository
git clone https://github.com/hifi00/mahmoud-hatem-portfolio.git
cd mahmoud-hatem-portfolio

# Start the local server
node server.js
```
Then open **http://localhost:3000** in your browser.

## 📁 Project Structure
```
├── index.html          # Semantic HTML5 structure
├── style.css           # Dual-theme CSS (dark + light tokens & mobile responsiveness)
├── script.js           # Motion interactions, clipboard copy & form logic
├── src/
│   ├── data.js         # Single source of truth for projects, skills & experience
│   └── navigation.js   # Header, mobile drawer & theme switcher
├── assets/             # Images, video reel & official PDF CV
├── build.js            # Zero-dependency build script generating dist/
├── vercel.json         # Vercel deployment configuration
└── server.js           # Lightweight local Node.js development server
```
