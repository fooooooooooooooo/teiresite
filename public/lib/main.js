'use strict';

document.addEventListener('DOMContentLoaded', function () {
  let burger = document.getElementById('menu-button');

  burger.addEventListener('click', () => {
    let menu = document.getElementById('menu');

    menu.classList.toggle('is-visible');
  });
});