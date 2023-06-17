var COLOR_SCHEME = 'color-scheme';
var WebStorage = function WebStorage(type) {
    this.storage = type === 'local'
        ? window.localStorage
        : window.sessionStorage;
};
WebStorage.prototype.get = function get (key) {
    return this.storage.getItem(key);
};
WebStorage.prototype.set = function set (key, value) {
    this.storage.setItem(key, value);
};

// WebStorageに状態を保存する
function getColorScheme() {
  var storage = new WebStorage('session');
  if (storage.get(COLOR_SCHEME) == null) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light';
  }
  else {
      return storage.get(COLOR_SCHEME);
  }
}

// ストレージに保存した上で背景色を変える
function setColorScheme(type) {
    var storage = new WebStorage('session');
    storage.set(COLOR_SCHEME, type);
    if (type === 'dark') {
        changeBgColor(true);
    }
    else {
        changeBgColor(false);
    }
}

// 読み込み時にカラーモードを確認して、違っていれば切り替える
$(function() {
  var color_mode = getColorScheme();
  setColorScheme(color_mode);
});

// 背景色切り替える
function changeBgColor(flg) {
    var black = '#000';
    var white = '#fff';
    var grey = '#222';
    var dark_button_color = '#ffffff47';
    var light_button_color = '#00000066';
    var title_navi_color = '#f0f0f0';
    var more_read_color = '#fffbf5';
    var dark_mode_title_banner = 'https://cdn-ak.f.st-hatena.com/images/fotolife/y/yuki_2021/20220602/20220602202056_original.png';
    var light_mode_title_banner = 'https://cdn-ak.f.st-hatena.com/images/fotolife/y/yuki_2021/20180613/20180613170013.png';

    if (flg) {
        // 背景を暗くする
        $('.darkMode .darkMode_trigger').css('background-color','white');
        $('.darkMode .darkMode_trigger .fa-moon').css('display','none');
        $('.darkMode .darkMode_trigger .fa-lightbulb').css('display','block');
        // ボタンを押すと消えるのの対応
        if($(window).scrollTop() < 500) {
            $(".darkMode .darkMode_trigger").css('display', 'none');
        }
        $('#blog-title-inner').css({'cssText':'background-image :url("' + dark_mode_title_banner + '") !important; background-position: center 0px;'});
        $('#top-box, #content').css('background-color', black);
        $('#recommend-entries').css('background-color', black);
        $('.header-image-only #blog-title').css('background-color', black);
        $('#header-ad').css('background-color', black);
        $('html').css('background-color', black);
        $('body').css('color', white);
        $('.entry-content .emphasize-link').css('background-color', grey);
        $('.entry-content .abstract-link').css('background-color', grey);
        $('h1,h2,h3,h4,h5,h6').css('color', white);
        $('.hatena-module-title').css('color', white);
        $('.hatena-module-category ul li a').css({'cssText':'color: '+ white +' !important'});
        $('blockquote,.entry-content blockquote').css('color', white);
        $('.entry-content h3').css({'background-color':grey,'color':white});
        $('#move-page-top').css('color', dark_button_color);
        $('#move-page-top:hover').css('color', dark_button_color);
        $('.search-form .search-module-input,.search-result .search-result-input').css({'cssText':'background-color:'+ grey + ' !important;color:'+ white + ' !important;'});
        $('.search-form .search-module-input:hover,.search-result-form .search-result-input:hover').css({'cssText':'background-color:'+ grey +' !important;color:'+ white +' !important;'});
        $('.entry-comment .comment-user-name').css({'color':white});
        $('.leave-comment-title').css({'color':white});
    } else {
        // 背景を明るくする
        $('.darkMode .darkMode_trigger').css('background-color','black');
        $('.darkMode .darkMode_trigger .fa-moon').css('display','block');
        $('.darkMode .darkMode_trigger .fa-lightbulb').css('display','none');
        // ボタンを押すと消えるのの対応
        if($(window).scrollTop() < 500) {
            $(".darkMode .darkMode_trigger").css('display', 'none');
        }
        $('#blog-title-inner').css({'cssText':'background-image :url("'+ light_mode_title_banner + '") !important; background-position: center 0px;'});
        $('#top-box, #content').css('background-color', white);
        $('#recommend-entries').css('background-color', white);
        $('.header-image-only #blog-title').css('background-color', white);
        $('#header-ad').css('background-color', white);
        $('html').css('background-color', white);
        $('body').css('color', black);
        $('.entry-content .emphasize-link').css('background-color', more_read_color);
        $('.entry-content .abstract-link').css('background-color', more_read_color);
        $('h1,h2,h3,h4,h5,h6').css('color', black);
        $('.hatena-module-title').css('color', black);
        $('.hatena-module-category ul li a').css({'cssText':'color: '+ black +' !important'});
        $('blockquote,.entry-content blockquote').css('color', grey);
        $('.entry-content h3').css({'background-color':title_navi_color,'color':black});
        $('#move-page-top').css('color', light_button_color);
        $('#move-page-top:hover').css('color', light_button_color);
        $('.search-form .search-module-input,.search-result .search-result-input').css({'cssText':'background-color:'+ white + ' !important;color:'+ black + ' !important;'});
        $('.search-form .search-module-input:hover,.search-result-form .search-result-input:hover').css({'cssText':'background-color:'+ white +' !important;color:'+ black +' !important;'});
        $('.entry-comment .comment-user-name').css({'color':black});
        $('.leave-comment-title').css({'color':black});
    }
}