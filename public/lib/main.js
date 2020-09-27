'use strict';

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