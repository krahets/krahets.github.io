(() => {
  'use strict';

  const STAR_CACHE_TTL = 6 * 60 * 60 * 1000;
  const STAR_REQUEST_TIMEOUT = 5000;

  // Storage is optional: private browsing and browser policies may disable it.
  function readStorage(key) {
    try { return localStorage.getItem(key); } catch { return null; }
  }

  function writeStorage(key, value) {
    try { localStorage.setItem(key, value); } catch {}
  }

  function initTheme() {
    const root = document.documentElement;
    const button = document.getElementById('theme-toggle');
    const photo = document.querySelector('.about__photo');
    const systemTheme = matchMedia('(prefers-color-scheme: dark)');
    const saved = readStorage('theme');
    let preference = saved === 'light' || saved === 'dark' ? saved : null;

    function applyTheme(theme) {
      root.classList.add('theme-switching');
      root.dataset.theme = theme;
      photo.src = `assets/profile_${theme}.jpg`;
      button.setAttribute('aria-pressed', String(theme === 'dark'));
      // Commit all theme colors together, then restore hover transitions.
      void root.offsetHeight;
      root.classList.remove('theme-switching');
    }

    applyTheme(preference || (systemTheme.matches ? 'dark' : 'light'));

    button.addEventListener('click', () => {
      preference = root.dataset.theme === 'dark' ? 'light' : 'dark';
      applyTheme(preference);
      writeStorage('theme', preference);
    });

    systemTheme.addEventListener('change', (event) => {
      if (!preference) applyTheme(event.matches ? 'dark' : 'light');
    });
  }

  function isStarCount(count) {
    return Number.isSafeInteger(count) && count >= 0;
  }

  function readCachedStars(key) {
    try {
      const cached = JSON.parse(readStorage(key));
      if (cached && isStarCount(cached.count) &&
          Number.isFinite(cached.updatedAt) && cached.updatedAt >= 0) {
        return cached;
      }
    } catch {}
    return null;
  }

  function formatStars(count) {
    if (count < 1000) return String(count);
    const divisor = count >= 1000000 ? 1000000 : 1000;
    const value = count / divisor;
    const rounded = value >= 10 ? Math.round(value) : Math.round(value * 10) / 10;
    return rounded + (divisor === 1000000 ? 'M' : 'k');
  }

  async function loadGithubStars(badge) {
    const repo = badge.dataset.repo;
    const key = `github-stars:${repo}`;
    const countNode = badge.querySelector('.gh-badge__count');
    const cached = readCachedStars(key);

    function showCount(count) {
      countNode.textContent = formatStars(count);
      badge.setAttribute('aria-label', `${repo} has ${count.toLocaleString('en-US')} GitHub stars`);
      badge.hidden = false;
    }

    if (cached) {
      showCount(cached.count);
      const age = Date.now() - cached.updatedAt;
      if (age >= 0 && age < STAR_CACHE_TTL) return;
    }
    if (typeof fetch !== 'function') return;

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), STAR_REQUEST_TIMEOUT);
    try {
      const path = repo.split('/').map(encodeURIComponent).join('/');
      const response = await fetch(`https://api.github.com/repos/${path}`, {
        headers: { Accept: 'application/vnd.github+json' },
        signal: controller.signal
      });
      if (!response.ok) throw new Error('GitHub API error');
      const data = await response.json();
      if (!isStarCount(data.stargazers_count)) throw new Error('Invalid star count');
      showCount(data.stargazers_count);
      writeStorage(key, JSON.stringify({ count: data.stargazers_count, updatedAt: Date.now() }));
    } catch {
      // Keep stale counts if available; otherwise the bubble stays hidden.
      // The static Code link works regardless of API or storage availability.
    } finally {
      clearTimeout(timeout);
    }
  }

  initTheme();
  document.querySelectorAll('.gh-badge[data-repo]').forEach(loadGithubStars);
})();
