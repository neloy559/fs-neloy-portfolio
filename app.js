document.addEventListener('DOMContentLoaded', () => {
  // 0A. Dynamic Developer Identity & Bio Sync Bridge
  const PROFILE_KEY = "fs_neloy_profile_data";
  function applyProfileData() {
    const savedProf = localStorage.getItem(PROFILE_KEY);
    if (!savedProf) return;

    try {
      const p = JSON.parse(savedProf);
      
      const heroAvailabilityText = document.getElementById('heroAvailabilityText');
      const heroTagline = document.getElementById('heroTagline');
      const nowBody = document.getElementById('nowBody');
      const aboutHeadingName = document.getElementById('aboutHeadingName');
      const aboutEyebrow = document.getElementById('aboutEyebrow');
      const aboutEmail = document.getElementById('aboutEmail');
      const aboutGithub = document.getElementById('aboutGithub');
      const aboutStack = document.getElementById('aboutStack');
      const aboutProseP1 = document.getElementById('aboutProseP1');
      const aboutProseP2 = document.getElementById('aboutProseP2');
      const footerEmailLink = document.getElementById('footerEmailLink');

      if (heroAvailabilityText && p.status) heroAvailabilityText.textContent = p.status.toUpperCase();
      if (heroTagline && p.tagline) heroTagline.textContent = p.tagline;
      if (nowBody && p.building) nowBody.textContent = p.building;
      if (aboutHeadingName && p.name) aboutHeadingName.textContent = p.name.toUpperCase();
      if (aboutEyebrow && p.title) aboutEyebrow.textContent = p.title.toUpperCase();
      if (aboutEmail && p.email) aboutEmail.textContent = p.email;
      if (footerEmailLink && p.email) {
        footerEmailLink.textContent = p.email;
        footerEmailLink.href = `mailto:${p.email}`;
      }
      if (aboutGithub && p.github) {
        aboutGithub.textContent = p.github.startsWith('@') ? p.github : `@${p.github}`;
        aboutGithub.href = `https://github.com/${p.github.replace('@', '')}`;
      }
      if (aboutStack && p.stack) aboutStack.textContent = p.stack;
      if (aboutProseP1 && p.bio1) aboutProseP1.textContent = p.bio1;
      if (aboutProseP2 && p.bio2) aboutProseP2.textContent = p.bio2;
    } catch (e) {
      console.warn('Profile sync fallback:', e);
    }
  }
  applyProfileData();

  // 0B. Dynamic Social Media & Web Handles Sync Bridge
  const SOCIALS_KEY = "fs_neloy_socials_data";
  function applySocialsData() {
    const savedSoc = localStorage.getItem(SOCIALS_KEY);
    if (!savedSoc) return;

    try {
      const s = JSON.parse(savedSoc);
      const footerSocials = document.getElementById('footerSocials');
      if (!footerSocials) return;

      const links = [];
      if (s.github) links.push(`<a href="${s.github}" target="_blank" rel="noopener noreferrer">GitHub</a>`);
      if (s.linkedin) links.push(`<a href="${s.linkedin}" target="_blank" rel="noopener noreferrer">LinkedIn</a>`);
      if (s.twitter) links.push(`<a href="${s.twitter}" target="_blank" rel="noopener noreferrer">Twitter / X</a>`);
      if (s.facebook) links.push(`<a href="${s.facebook}" target="_blank" rel="noopener noreferrer">Facebook</a>`);
      if (s.telegram) links.push(`<a href="${s.telegram}" target="_blank" rel="noopener noreferrer">Telegram</a>`);
      if (s.discord) links.push(`<span>Discord: ${s.discord}</span>`);
      if (s.blog) links.push(`<a href="${s.blog}" target="_blank" rel="noopener noreferrer">Blog</a>`);
      if (s.youtube) links.push(`<a href="${s.youtube}" target="_blank" rel="noopener noreferrer">YouTube</a>`);

      links.push(`<a href="/dashboard" target="_blank" style="color: var(--color-surface-muted);">Admin OS ⚡</a>`);

      footerSocials.innerHTML = links.join('');
    } catch (e) {
      console.warn('Socials sync fallback:', e);
    }
  }
  applySocialsData();

  // 1. Live Digital Clock
  const clockEl = document.getElementById('liveClock');
  
  function updateClock() {
    if (!clockEl) return;
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', {
      hour12: true,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
    clockEl.textContent = `${timeString} EST`;
  }
  
  updateClock();
  setInterval(updateClock, 1000);

  // 2. Hairline Scroll Progress Bar
  const scrollBar = document.getElementById('scrollBar');
  window.addEventListener('scroll', () => {
    if (!scrollBar) return;
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / totalHeight) * 100;
    scrollBar.style.width = `${progress}%`;
  });

  // 3. Command Search Modal (Input & Keyboard ShortCut ⌘K)
  const cmdModal = document.getElementById('cmdModal');
  const cmdToggleBtn = document.getElementById('cmdToggleBtn');
  const cmdCloseBtn = document.getElementById('cmdCloseBtn');
  const cmdOverlay = document.getElementById('cmdOverlay');
  const cmdInput = document.getElementById('cmdInput');
  const cmdResults = document.getElementById('cmdResults');

  function openCmdModal() {
    if (!cmdModal) return;
    cmdModal.classList.add('active');
    cmdModal.setAttribute('aria-hidden', 'false');
    setTimeout(() => cmdInput?.focus(), 50);
  }

  function closeCmdModal() {
    if (!cmdModal) return;
    cmdModal.classList.remove('active');
    cmdModal.setAttribute('aria-hidden', 'true');
  }

  cmdToggleBtn?.addEventListener('click', openCmdModal);
  cmdCloseBtn?.addEventListener('click', closeCmdModal);
  cmdOverlay?.addEventListener('click', closeCmdModal);

  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      if (cmdModal?.classList.contains('active')) {
        closeCmdModal();
      } else {
        openCmdModal();
      }
    }
    if (e.key === 'Escape' && cmdModal?.classList.contains('active')) {
      closeCmdModal();
    }
  });

  // Search filtering in modal
  cmdInput?.addEventListener('input', (e) => {
    const val = e.target.value.toLowerCase();
    const items = cmdResults?.querySelectorAll('.cmd-item');
    items?.forEach((item) => {
      const text = item.textContent?.toLowerCase() || '';
      if (text.includes(val)) {
        item.style.display = 'flex';
      } else {
        item.style.display = 'none';
      }
    });
  });

  cmdResults?.querySelectorAll('.cmd-item').forEach((item) => {
    item.addEventListener('click', () => {
      const url = item.getAttribute('data-url');
      if (url) {
        if (url.startsWith('http')) {
          window.open(url, '_blank');
        } else {
          window.location.hash = url;
        }
        closeCmdModal();
      }
    });
  });

  // 4. Featured Projects & Live Recent Activity Sync with Admin OS Controller
  const DEFAULT_SELECTIVE_REPOS = [
    { name: 'leadscraper-pro', badge: 'SAAS PLATFORM', pitch: 'No-AI BYODB Lead Scraping & Outreach SaaS Platform designed for high-conversion lead generation.', homepage: '', showVisitBtn: false },
    { name: 'rupnogor-project', badge: 'FASHION E-COMMERCE', pitch: 'Premium Bangladeshi fashion e-commerce — sarees, fusion wear, and handcrafted jewelry.', homepage: 'https://rupnogor-project.vercel.app', showVisitBtn: true },
    { name: 'ocr-tools', badge: 'AI DOCUMENT PROCESSING', pitch: 'Intelligent Document Processing with AI-powered text extraction, PDF splitting & Telegram integration.', homepage: '', showVisitBtn: false },
    { name: 'badol-tyre-ghar-v4', badge: 'B2B ENTERPRISE', pitch: 'B2B wholesale tyre dealer management & inventory order platform built with MERN stack.', homepage: '', showVisitBtn: false }
  ];

  async function fetchGitHubData() {
    try {
      // Fetch User Info
      const userRes = await fetch('https://api.github.com/users/neloy559');
      if (userRes.ok) {
        const userData = await userRes.json();
        const repoCountText = document.getElementById('repoCountText');
        const statRepos = document.getElementById('statRepos');
        if (repoCountText) repoCountText.textContent = userData.public_repos || 19;
        if (statRepos) statRepos.innerHTML = `${userData.public_repos || 19}<span class="u">+</span>`;
      }

      // Fetch All Repos from GitHub
      const reposRes = await fetch('https://api.github.com/users/neloy559/repos?sort=updated&per_page=100');
      let githubRepos = [];
      let githubReposMap = {};
      if (reposRes.ok) {
        githubRepos = await reposRes.json();
        githubRepos.forEach(r => githubReposMap[r.name.toLowerCase()] = r);
      }

      // A. Populate FEATURED PROJECTS (#featuredProjectsGrid) from Admin OS
      let savedProjects = localStorage.getItem('fs_neloy_curated_projects');
      let curatedProjects = savedProjects ? JSON.parse(savedProjects) : DEFAULT_SELECTIVE_REPOS;

      const featuredGrid = document.getElementById('featuredProjectsGrid');
      if (featuredGrid && curatedProjects.length > 0) {
        featuredGrid.innerHTML = curatedProjects.map(proj => {
          const repoData = githubReposMap[proj.name.toLowerCase()] || {};
          const liveUrl = proj.homepage || repoData.homepage;
          const showVisitBtn = proj.showVisitBtn !== undefined ? proj.showVisitBtn : (liveUrl && liveUrl.startsWith('http'));
          
          const visitBtnHtml = (showVisitBtn && liveUrl && liveUrl.startsWith('http'))
            ? `<a href="${liveUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">VISIT WEBSITE ↗</a>` 
            : '';

          return `
            <article class="feature">
              <div class="feature-head">
                <div class="feature-badge">
                  <span class="dot" aria-hidden="true"></span>
                  ${(proj.badge || repoData.language || 'FEATURED REPO').toUpperCase()}
                </div>
                <span class="feature-year">2026</span>
              </div>
              <div class="feature-headline">
                <h3 class="feature-title">${proj.name}</h3>
                <p class="feature-pitch">${proj.pitch || repoData.description || 'Curated production project by FS Neloy.'}</p>
              </div>
              <div class="feature-stack">
                <span>⭐ ${repoData.stargazers_count || 0} Stars</span>
                <span>🍴 ${repoData.forks_count || 0} Forks</span>
                <span>${repoData.language || 'TypeScript'}</span>
              </div>
              <div class="feature-actions">
                <a href="${repoData.html_url || 'https://github.com/neloy559/' + proj.name}" target="_blank" rel="noopener noreferrer" class="btn btn-ghost">VIEW REPOSITORY <span class="arrow" aria-hidden="true"></span></a>
                ${visitBtnHtml}
              </div>
            </article>
          `;
        }).join('');
      }

      // B. Populate RECENT ACTIVITY (#liveActivityGrid) with Admin OS Feed Hider Filter
      const hiddenSaved = localStorage.getItem('fs_neloy_hidden_recent_repos');
      const hiddenSet = new Set(hiddenSaved ? JSON.parse(hiddenSaved) : []);

      const visibleRecentRepos = githubRepos.filter(r => !hiddenSet.has(r.name.toLowerCase()));

      const recentGrid = document.getElementById('liveActivityGrid');
      if (recentGrid && visibleRecentRepos.length > 0) {
        recentGrid.innerHTML = visibleRecentRepos.slice(0, 6).map(repo => {
          const hasHomepage = repo.homepage && repo.homepage.startsWith('http');
          const visitBtnHtml = hasHomepage
            ? `<a href="${repo.homepage}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">VISIT WEBSITE ↗</a>`
            : '';

          return `
            <article class="feature">
              <div class="feature-head">
                <div class="feature-badge">
                  <span class="dot" aria-hidden="true"></span>
                  ${(repo.language || 'REPOSITORY').toUpperCase()}
                </div>
                <span class="feature-year">${new Date(repo.updated_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
              </div>
              <div class="feature-headline">
                <h3 class="feature-title">${repo.name}</h3>
                <p class="feature-pitch">${repo.description || 'Public repository by @neloy559.'}</p>
              </div>
              <div class="feature-stack">
                <span>⭐ ${repo.stargazers_count || 0}</span>
                <span>🍴 ${repo.forks_count || 0}</span>
                <span>${repo.language || 'Code'}</span>
              </div>
              <div class="feature-actions">
                <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" class="btn btn-ghost">VIEW REPOSITORY <span class="arrow" aria-hidden="true"></span></a>
                ${visitBtnHtml}
              </div>
            </article>
          `;
        }).join('');
      }
    } catch (err) {
      console.warn('GitHub API fetch fallback engaged:', err);
    }
  }
  fetchGitHubData();

  // 5. Working Contact Form Submission Logic
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');
  const formSubmitBtn = document.getElementById('formSubmitBtn');

  contactForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!formStatus || !formSubmitBtn) return;

    formStatus.className = 'form-status info';
    formStatus.textContent = 'Sending message...';
    formSubmitBtn.disabled = true;

    const formData = new FormData(contactForm);

    try {
      const res = await fetch(contactForm.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (res.ok) {
        formStatus.className = 'form-status success';
        formStatus.textContent = '✓ Message sent successfully! I will reply to you soon.';
        contactForm.reset();
      } else {
        const mailtoUrl = `mailto:seyasbro@gmail.com?subject=Portfolio Inquiry from ${encodeURIComponent(formData.get('name'))}&body=${encodeURIComponent(formData.get('message'))}%0A%0AFrom: ${encodeURIComponent(formData.get('email'))}`;
        window.location.href = mailtoUrl;
        formStatus.className = 'form-status success';
        formStatus.textContent = 'Opening your mail app to send email to seyasbro@gmail.com...';
      }
    } catch (err) {
      const mailtoUrl = `mailto:seyasbro@gmail.com?subject=Portfolio Inquiry from ${encodeURIComponent(formData.get('name'))}&body=${encodeURIComponent(formData.get('message'))}%0A%0AFrom: ${encodeURIComponent(formData.get('email'))}`;
      window.location.href = mailtoUrl;
      formStatus.className = 'form-status success';
      formStatus.textContent = 'Opening email client...';
    } finally {
      formSubmitBtn.disabled = false;
    }
  });

  // 6. Custom Starburst Cursor
  const cursor = document.getElementById('cursor');
  const cursorRing = document.getElementById('cursorRing');

  let mouseX = 0, mouseY = 0;
  let cursorX = 0, cursorY = 0;
  let ringX = 0, ringY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function renderCursor() {
    cursorX += (mouseX - cursorX) * 0.35;
    cursorY += (mouseY - cursorY) * 0.35;
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;

    if (cursor) cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
    if (cursorRing) cursorRing.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;

    requestAnimationFrame(renderCursor);
  }
  renderCursor();

  // Hover Effect triggers
  const bindHover = () => {
    document.querySelectorAll('a, button, .btn, .feature, .cmd-item').forEach((el) => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });
  };
  bindHover();
});
