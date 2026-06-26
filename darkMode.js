const DARK_CLASS = 'dark-mode';

function applyTheme(isDark) {
  document.body.classList.toggle(DARK_CLASS, isDark);
  const btn = document.getElementById('dark-mode-toggle');
  if (btn) btn.textContent = isDark ? '☀️ Light mode' : '🌙 Dark mode';
}

function initDarkMode() {
  const saved = localStorage.getItem('dark');
  const prefersDark = saved !== null ? saved === 'true' : window.matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme(prefersDark);

  document.getElementById('dark-mode-toggle').addEventListener('click', () => {
    const isDark = document.body.classList.toggle(DARK_CLASS);
    localStorage.setItem('dark', isDark);
    document.getElementById('dark-mode-toggle').textContent = isDark ? '☀️ Light mode' : '🌙 Dark mode';
    window.dispatchEvent(new Event('resize'));
  });
}

document.addEventListener('DOMContentLoaded', initDarkMode);
