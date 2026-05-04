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
  const storage = new WebStorage('session');
  const stored = storage.get(COLOR_SCHEME);
  if (stored == null) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return stored;
}

function setColorScheme(type) {
  const storage = new WebStorage('session');
  storage.set(COLOR_SCHEME, type);
  toggleDarkMode(type === 'dark');
}

function toggleDarkMode(isDark) {
  document.body.classList.toggle('dark-mode', isDark);

  // theme-color を更新（iOS Safari 対応）
  updateThemeColor(isDark);

  // トリガーボタンのスタイル変更
  const trigger = document.querySelector('.darkMode .darkMode_trigger');
  if (trigger) {
    trigger.style.backgroundColor = isDark ? 'white' : 'black';
    const moon = trigger.querySelector('.fa-moon');
    const bulb = trigger.querySelector('.fa-lightbulb');
    if (moon) moon.style.display = isDark ? 'none' : 'block';
    if (bulb) bulb.style.display = isDark ? 'block' : 'none';
    // スクロールによる表示/非表示
    if (window.scrollY < 500) {
      trigger.style.display = 'none';
    }
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

  // 他のスタイルはCSSクラス 'dark-mode' で定義されていると仮定
}

function updateThemeColor(isDark) {
  const color = isDark ? '#1e1e1e' : '#ffffff';
  let meta = document.querySelector('meta[name="theme-color"]');
  
  if (meta) {
    // 既存のメタタグを更新
    meta.setAttribute('content', color);
  } else {
    // 新規作成
    meta = document.createElement('meta');
    meta.name = 'theme-color';
    meta.content = color;
    document.head.appendChild(meta);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const colorMode = getColorScheme();
  setColorScheme(colorMode);
});

// トリガーボタンのクリックイベント
document.addEventListener('click', (e) => {
  console.log('Click detected on:', e.target);
  if (e.target.closest('.darkMode_trigger')) {
    console.log('Dark mode trigger clicked');
    const current = getColorScheme();
    const newMode = current === 'dark' ? 'light' : 'dark';
    setColorScheme(newMode);
  }
});

// スクロールによるトリガーボタンの表示/非表示
window.addEventListener('scroll', () => {
  const trigger = document.querySelector('.darkMode .darkMode_trigger');
  if (trigger) {
    if (window.scrollY > 500) {
      trigger.style.display = 'flex'; // または適切な表示スタイル
    } else {
      trigger.style.display = 'none';
    }
  }
});