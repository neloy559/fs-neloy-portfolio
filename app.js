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
        window.location.hash = url;
        closeCmdModal();
      }
    });
  });

  // 4. Custom Starburst Cursor
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

    if (cursor) {
      cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
    }
    if (cursorRing) {
      cursorRing.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
    }

    requestAnimationFrame(renderCursor);
  }
  renderCursor();

  // Hover Effect triggers
  const interactables = document.querySelectorAll('a, button, .btn, .feature, .cmd-item');
  interactables.forEach((el) => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });
});
