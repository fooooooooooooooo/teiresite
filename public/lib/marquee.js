/*
Copyright (c) 2020 by Stephen Zuniga (https://codepen.io/stezu/pen/cmLrI)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

(function ($, window, undefined) {
  $.fn.marqueeify = function (options) {
    var settings = $.extend({
      horizontal: true,
      vertical: true,
      speed: 100, // In pixels per second
      container: $(this).parent(),
      bumpEdge: function () { }
    }, options);

    return this.each(function () {
      var containerWidth, containerHeight, elWidth, elHeight, move, getSizes,
        $el = $(this);

      getSizes = function () {
        // containerWidth = settings.container.outerWidth();
        // containerHeight = settings.container.outerHeight();

        const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
        const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)

        containerWidth = vw;
        containerHeight = vh;

        elWidth = $el.outerWidth();
        elHeight = $el.outerHeight();
      };

      move = {
        right: function () {
          $el.animate({ left: (containerWidth - elWidth) }, {
            duration: ((containerWidth / settings.speed) * 1000), queue: false, easing: "linear", complete: function () {
              settings.bumpEdge();
              move.left();
            }
          });
        },
        left: function () {
          $el.animate({ left: 0 }, {
            duration: ((containerWidth / settings.speed) * 1000), queue: false, easing: "linear", complete: function () {
              settings.bumpEdge();
              move.right();
            }
          });
        },
        down: function () {
          $el.animate({ top: (containerHeight - elHeight) }, {
            duration: ((containerHeight / settings.speed) * 1000), queue: false, easing: "linear", complete: function () {
              settings.bumpEdge();
              move.up();
            }
          });
        },
        up: function () {
          $el.animate({ top: 0 }, {
            duration: ((containerHeight / settings.speed) * 1000), queue: false, easing: "linear", complete: function () {
              settings.bumpEdge();
              move.down();
            }
          });
        }
      };

      getSizes();

      if (settings.horizontal) {
        move.right();
      }
      if (settings.vertical) {
        move.down();
      }

      // Make that shit responsive!
      $(window).resize(function () {
        getSizes();
      });
    });
  };
})(jQuery, window);

$(document).ready(function () {

  $('.marquee').marqueeify({
    speed: 300,
    bumpEdge: function () {
      // var newColor = "hsl(" + Math.floor(Math.random() * 360) + ", 100%, 50%)";
      // $('.marquee .logo').css('fill', newColor);
    }
  });
});