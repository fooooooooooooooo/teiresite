'use strict';

const extensions = ["ods", "xls", "xlsx", "csv", "ics", "vcf",
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

document.title = `teire.${extensions[Math.floor(Math.random() * extensions.length)]}`

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

document.addEventListener('DOMContentLoaded', function () {
  let burgerButton = document.getElementById('menu-button');

  burgerButton.addEventListener('click', () => {
    let menu = document.getElementById('menu');

    menu.classList.toggle('is-visible');
  });

  burger();
  widepeepoify();
  fooify();
});