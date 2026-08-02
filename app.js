document.addEventListener('DOMContentLoaded', () => {
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

  // 4. Live GitHub API Sync with VISIT WEBSITE CTA
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

      // Fetch Recent Repos
      const reposRes = await fetch('https://api.github.com/users/neloy559/repos?sort=updated&per_page=4');
      if (reposRes.ok) {
        const repos = await reposRes.json();
        const grid = document.getElementById('liveActivityGrid');
        if (grid && repos.length > 0) {
          grid.innerHTML = repos.map(repo => {
            const liveUrl = repo.homepage || `https://github.com/neloy559/${repo.name}`;
            return `
              <article class="feature">
                <div class="feature-head">
                  <div class="feature-badge">
                    <span class="dot"></span>
                    ${repo.language ? repo.language.toUpperCase() : 'REPOSITORY'}
                  </div>
                  <span class="feature-year">UPDATED ${new Date(repo.updated_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                </div>
                <div class="feature-headline">
                  <h3 class="feature-title">${repo.name}</h3>
                  <p class="feature-pitch">${repo.description || 'Public GitHub repository by FS Neloy.'}</p>
                </div>
                <div class="feature-stack">
                  <span>⭐ ${repo.stargazers_count} Stars</span>
                  <span>🍴 ${repo.forks_count} Forks</span>
                  <span>${repo.language || 'Code'}</span>
                </div>
                <div class="feature-actions">
                  <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" class="btn btn-ghost">VIEW REPOSITORY <span class="arrow"></span></a>
                  <a href="${liveUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">VISIT WEBSITE ↗</a>
                </div>
              </article>
            `;
          }).join('');
        }
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
