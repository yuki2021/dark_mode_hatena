const COLOR_SCHEME = 'color-scheme';

class WebStorage {
  constructor(type) {
    this.storage = type === 'local' ? localStorage : sessionStorage;
  }

  get(key) {
    return this.storage.getItem(key);
  }

  set(key, value) {
    this.storage.setItem(key, value);
  }
}

function getColorScheme() {
  const storage = new WebStorage('local');
  const stored = storage.get(COLOR_SCHEME);
  if (stored == null) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return stored;
}

function setColorScheme(type) {
  const storage = new WebStorage('local');
  storage.set(COLOR_SCHEME, type);
  toggleDarkMode(type === 'dark');
}

function toggleDarkMode(isDark) {
  document.body.classList.toggle('dark-mode', isDark);
  document.documentElement.style.backgroundColor = isDark ? '#1e1e1e' : '';

  // theme-color を更新（iOS Safari 対応）
  updateThemeColor(isDark);

  // アイコン切り替え（背景色は CSS に任せる）
  const trigger = document.querySelector('.darkMode .darkMode_trigger');
  if (trigger) {
    const moon = trigger.querySelector('.fa-moon');
    const bulb = trigger.querySelector('.fa-lightbulb');
    if (moon) moon.style.display = isDark ? 'none' : 'block';
    if (bulb) bulb.style.display = isDark ? 'block' : 'none';
  }

  // タイトルバナーの変更
  const titleInner = document.getElementById('blog-title-inner');
  if (titleInner) {
    const banner = isDark
      ? 'https://cdn-ak.f.st-hatena.com/images/fotolife/y/yuki_2021/20260504/20260504124016_original.png'
      : 'https://cdn-ak.f.st-hatena.com/images/fotolife/y/yuki_2021/20180613/20180613170013.png';
    titleInner.style.setProperty('background-image', `url("${banner}")`, 'important');
    titleInner.style.setProperty('background-position', 'center 0px', 'important');
  }
}

function updateThemeColor(isDark) {
  const color = isDark ? '#1e1e1e' : '#ffffff';
  let meta = document.querySelector('meta[name="theme-color"]');

  if (meta) {
    meta.setAttribute('content', color);
  } else {
    meta = document.createElement('meta');
    meta.name = 'theme-color';
    meta.content = color;
    document.head.appendChild(meta);
  }
}

// 両ボタンの表示/非表示を同じタイミングで管理
function updateButtonVisibility() {
  const trigger = document.querySelector('.darkMode .darkMode_trigger');
  const pageTop = document.getElementById('page-top');
  const visible = window.scrollY > 500;
  if (trigger) trigger.style.display = visible ? 'flex' : 'none';
  if (pageTop) pageTop.style.display = visible ? 'block' : 'none';
}

// 初期適用（フラッシュ防止：DOMContentLoadedを待たずに即実行）
;(function() {
  var stored = localStorage.getItem(COLOR_SCHEME);
  var isDark = stored != null ? stored === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (isDark) {
    document.documentElement.style.backgroundColor = '#1e1e1e';
    if (document.body) document.body.classList.add('dark-mode');
  }
})();

document.addEventListener('DOMContentLoaded', () => {
  const colorMode = getColorScheme();
  setColorScheme(colorMode);
  updateButtonVisibility();
});

// トリガーボタンのクリックイベント
document.addEventListener('click', (e) => {
  if (e.target.closest('.darkMode_trigger')) {
    const current = getColorScheme();
    const newMode = current === 'dark' ? 'light' : 'dark';
    setColorScheme(newMode);
  }
});

// 他タブでの変更をリアルタイム同期
window.addEventListener('storage', (e) => {
  if (e.key === COLOR_SCHEME && e.newValue != null) {
    toggleDarkMode(e.newValue === 'dark');
  }
});

// スクロールで両ボタンを同時に表示/非表示
window.addEventListener('scroll', updateButtonVisibility);
