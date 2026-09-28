/**
 * Mahmoud Hatem Portfolio - Main Orchestrator (ES6 Module)
 * Connects data, renders components, initializes navigation, and handles interactions.
 */

import { profile, manifesto, projects, skillsCategories, leadership, education, languages } from './src/data.js';
import { initNavigation } from './src/navigation.js';

document.addEventListener('DOMContentLoaded', () => {
  renderProjects();
  renderSkills();
  setupContactForm();
  setupCopyButtons();
  setupVideoObserver();
  setupScrollReveal();
  initNavigation();
});

/**
 * Render Project Chapters
 */
function renderProjects() {
  const container = document.getElementById('projects-container');
  if (!container) return;

  container.innerHTML = projects.map((p) => `
    <article class="project-chapter js-reveal">
      <div class="proj-meta">
        <span class="proj-num">${p.number}</span>
        <span class="proj-cat">${p.category}</span>
        <div class="proj-role-wrap">
          <span class="role-lbl">Role</span>
          <span class="role-val">${p.role}</span>
        </div>
      </div>

      <div class="proj-body">
        <header class="proj-header">
          <h3 class="proj-title">${p.title}</h3>
          <p class="proj-desc">${p.description}</p>
        </header>

        <ul class="proj-bullets-list">
          ${p.bullets.map(b => `<li>${b}</li>`).join('')}
        </ul>

        <div class="tech-stack" aria-label="Technologies used">
          ${p.technologies.map(t => `<span class="tech-pill">${t}</span>`).join('')}
        </div>

        <div class="proj-visual-frame">
          <img
            src="${p.image}"
            alt="Interface preview of ${p.title}"
            loading="lazy"
            decoding="async"
            class="proj-img"
          />
        </div>

        <div class="proj-actions">
          <a
            href="${p.liveUrl}"
            target="_blank"
            rel="noopener noreferrer"
            class="proj-link primary-link"
            aria-label="View live preview of ${p.title} (opens in new tab)"
          >
            <span>Preview Site</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <line x1="7" y1="17" x2="17" y2="7"></line>
              <polyline points="7 7 17 7 17 17"></polyline>
            </svg>
          </a>

          <a
            href="${p.sourceUrl}"
            target="_blank"
            rel="noopener noreferrer"
            class="proj-link secondary-link"
            aria-label="View source code of ${p.title} on GitHub (opens in new tab)"
          >
            <span>View Code</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
            </svg>
          </a>
        </div>
      </div>
    </article>
  `).join('');
}

/**
 * Render Categorized Skills Groups
 */
function renderSkills() {
  const container = document.getElementById('skills-clusters');
  if (!container) return;

  container.innerHTML = skillsCategories.map((group, idx) => `
    <div class="skill-open-row js-reveal" style="--d:${(idx * 0.06).toFixed(2)}s">
      <div class="skill-row-meta">
        <span class="skill-cat-title">${group.category}</span>
      </div>
      <div class="skill-row-tags">
        <ul class="skills-tag-list" aria-label="${group.category}">
          ${group.skills.map(s => `<li class="skill-tag-pill">${s}</li>`).join('')}
        </ul>
      </div>
    </div>
  `).join('');
}

/**
 * Accessible Contact Form
 */
function setupContactForm() {
  const form = document.getElementById('contact-form');
  const statusMsg = document.getElementById('form-status');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.querySelector('#name')?.value.trim();
    const email = form.querySelector('#email')?.value.trim();
    const message = form.querySelector('#message')?.value.trim();

    if (!name || !email || !message) {
      if (statusMsg) {
        statusMsg.textContent = 'Please fill out all required fields.';
        statusMsg.className = 'form-status err';
      }
      return;
    }

    const subject = encodeURIComponent(`Portfolio Inquiry from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
    const mailtoUrl = `mailto:${profile.email}?subject=${subject}&body=${body}`;

    if (statusMsg) {
      statusMsg.textContent = 'Opening your email client...';
      statusMsg.className = 'form-status ok';
    }

    window.location.href = mailtoUrl;

    setTimeout(() => {
      form.reset();
      if (statusMsg) {
        statusMsg.textContent = 'Thank you! You can also reach out directly via ' + profile.email;
      }
    }, 2500);
  });
}

/**
 * Quick Copy Buttons
 */
function setupCopyButtons() {
  document.querySelectorAll('[data-copy]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const textToCopy = btn.getAttribute('data-copy');
      if (!textToCopy) return;

      try {
        await navigator.clipboard.writeText(textToCopy);
        const originalText = btn.textContent;
        btn.textContent = 'Copied!';
        btn.classList.add('copied');
        setTimeout(() => {
          btn.textContent = originalText;
          btn.classList.remove('copied');
        }, 2000);
      } catch (err) {
        window.prompt('Copy:', textToCopy);
      }
    });
  });
}

/**
 * Pause hero video when offscreen
 */
function setupVideoObserver() {
  const video = document.querySelector('.hero-video');
  if (!video) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  }, { threshold: 0.1 });

  observer.observe(video.closest('.hero') || video);
}

/**
 * Scroll Reveal Animations
 */
function setupScrollReveal() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    document.querySelectorAll('.js-reveal').forEach(el => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      } else if (entry.boundingClientRect.top > 0) {
        entry.target.classList.remove('visible');
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  document.querySelectorAll('.js-reveal').forEach(el => observer.observe(el));
}
