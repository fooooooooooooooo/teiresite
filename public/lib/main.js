'use strict';

const extensions = [
  "ods", "xls", "xlsx", "csv", "ics", "vcf",
  "3dm", "3ds", "max", "bmp", "dds", "gif", "jpg", "jpeg", "png", "psd", "xcf", "tga", "thm", "tif", "tiff", "yuv", "ai", "eps", "ps", "svg", "dwg", "dxf", "gpx", "kml", "kmz", "webp",
  "3g2", "3gp", "aaf", "asf", "avchd", "avi", "drc", "flv", "m2v", "m4p", "m4v", "mkv", "mng", "mov", "mp2", "mp4", "mpe", "mpeg", "mpg", "mpv", "mxf", "nsv", "ogg", "ogv", "ogm", "qt", "rm", "rmvb", "roq", "srt", "svi", "vob", "webm", "wmv", "yuv",
  "aac", "aiff", "ape", "au", "flac", "gsm", "it", "m3u", "m4a", "mid", "mod", "mp3", "mpa", "pls", "ra", "s3m", "sid", "wav", "wma", "xm",
  "7z", "a", "apk", "ar", "bz2", "cab", "cpio", "deb", "dmg", "egg", "gz", "iso", "jar", "lha", "mar", "pea", "rar", "rpm", "s7z", "shar", "tar", "tbz2", "tgz", "tlz", "war", "whl", "xpi", "zip", "zipx", "xz", "pak",
  "exe", "msi", "bin", "command", "sh", "bat", "crx",
  "c", "cc", "class", "clj", "cpp", "cs", "cxx", "el", "go", "h", "java", "lua", "m", "m4", "php", "pl", "po", "py", "rb", "rs", "sh", "swift", "vb", "vcxproj", "xcodeproj", "xml", "diff", "patch", "html", "js",
  "html", "htm", "css", "js", "jsx", "less", "scss", "wasm", "php",
  "eot", "otf", "ttf", "woff", "woff2",
  "ppt", "odp",
  "doc", "docx", "ebook", "log", "md", "msg", "odt", "org", "pages", "pdf", "rtf", "rst", "tex", "txt", "wpd", "wps",
  "mobi", "epub", "azw1", "azw3", "azw4", "azw6", "azw", "cbr", "cbz",
  "burger"
]

const colors = [
  "#FFB5E8",
  "#B28DFF",
  "#DCD3FF",
  "#AFF8DB",
  "#BFFCC6",
  "#FFC9DE",
  "#FF9CEE",
  "#C5A3FF",
  "#A79AFF",
  "#C4FAF8",
  "#DBFFD6",
  "#FFABAB",
  "#FFCCF9",
  "#D5AAFF",
  "#B5B9FF",
  "#85E3FF",
  "#F3FFE3",
  "#FFBEBC",
  "#FCC2FF",
  "#ECD4FF",
  "#97A2FF",
  "#ACE7FF",
  "#E7FFAC",
  "#F6A6FF",
  "#FBE4FF",
  "#AFCBFF",
  "#6EB5FF",
  "#FFFFD1",
  "#FFF5BA"
]

let snakeRunning = false;

document.title = `teire.${extensions[Math.floor(Math.random() * extensions.length)]}`

let root = document.documentElement;

function burger() {
  let burger_icon = document.getElementById('burger-icon');

  const rand = Math.random();
  if (rand > 0.9) {
    burger_icon.classList.remove('fa-bars');
    burger_icon.classList.add('fa-hamburger');
  }
}

function widepeepoify() {
  let widepeepo = document.getElementById('widepeepo');

  const rand = Math.random();
  if (rand > 0.9) {
    widepeepo.textContent = 'widepeepoSad';
  }
}

function fooify() {
  let foo = document.getElementById('foo');

  foo.textContent = 'f' + 'o'.repeat(randomNumber(3, 15));
}

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

function luminance(r, g, b) {
  var colorArray = [r, g, b];
  var colorFactor;
  var i;
  for (i = 0; i < colorArray.length; i++) {
    colorFactor = colorArray[i] / 255;
    if (colorFactor <= 0.03928) {
      colorFactor = colorFactor / 12.92;
    } else {
      colorFactor = Math.pow(((colorFactor + 0.055) / 1.055), 2.4);
    }
    colorArray[i] = colorFactor;
  }
  return (colorArray[0] * 0.2126 + colorArray[1] * 0.7152 + colorArray[2] * 0.0722) + 0.05;
}

function getRGB(str) {
  var match = str.match(/rgba?\((\d{1,3}), ?(\d{1,3}), ?(\d{1,3})\)?(?:, ?(\d(?:\.\d?))\))?/);
  return match ? {
    red: match[1],
    green: match[2],
    blue: match[3]
  } : {};
}

function changeColor() {
  var hero = document.getElementById('hero');

  hero.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

  const rgb = getRGB(hero.style.backgroundColor);
  if (luminance(rgb.red, rgb.green, rgb.blue) > 0.6) {
    root.style.setProperty('--primary-text-color', '#000');
  }
}
function stopKeys() {
  var keys = {};
  window.addEventListener("keydown",
    function (e) {
      keys[e.code] = true;
      switch (e.code) {
        case "ArrowUp": case "ArrowDown": case "ArrowLeft": case "ArrowRight": // Arrow keys
        case "Space": // Space
          e.preventDefault();
          if (!snakeRunning) {
            snakeRunning = true;
            init();
            document.getElementById('teire').classList.toggle('snaked');
            document.getElementById('score').classList.toggle('hidden');
          }
          break;
        default: break; // do not block other keys
      }
    },
    false);
  window.addEventListener('keyup',
    function (e) {
      keys[e.code] = false;
    },
    false);
}


document.addEventListener('DOMContentLoaded', function () {
  changeColor();
  let burgerButton = document.getElementById('menu-button');

  burgerButton.addEventListener('click', () => {
    let menu = document.getElementById('menu');

    menu.classList.toggle('is-visible');
  });
  stopKeys();
  burger();
  widepeepoify();
  fooify();
});