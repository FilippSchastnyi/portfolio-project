const timingFunction = (t, b, c, d) => {
  if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
  return c / 2 * ((t -= 2) * t * t + 2) + b;
};

class ScrollAnimationTo {
  static startAnimation(targetElement) {
    const duration = 600,
      startPos = window.pageYOffset,
      targetPos = targetElement.getBoundingClientRect().top - 70,
      startTime = performance.now();

    raf(animation);

    function animation(currentTime) {
      const
        elapsedTime = currentTime - startTime,
        nextStep = timingFunction(
          elapsedTime, startPos, targetPos, duration,
        );

      scrollTo(0, nextStep);

      if (elapsedTime < duration) raf(animation);
    }
  }

}


function currentYPosition() {
  // Firefox, Chrome, Opera, Safari
  if (self.pageYOffset) return self.pageYOffset;
  // Internet Explorer 6 - standards mode
  if (document.documentElement && document.documentElement.scrollTop)
    return document.documentElement.scrollTop;
  // Internet Explorer 6, 7 and 8
  if (document.body.scrollTop) return document.body.scrollTop;
  return 0;
}

function smoothScroll(stopY) {
  var startY = currentYPosition();
  var distance = stopY > startY ? stopY - startY : startY - stopY;
  if (distance < 100) {
    scrollTo(0, stopY);
    return;
  }
  var speed = Math.round(distance / 100);
  if (speed >= 20) speed = 20;
  var step = Math.round(distance / 25);
  var leapY = stopY > startY ? startY + step : startY - step;
  var timer = 0;
  if (stopY > startY) {
    for (var i = startY; i < stopY; i += step) {
      setTimeout('window.scrollTo(0, ' + leapY + ')', timer * speed);
      leapY += step;
      if (leapY > stopY) leapY = stopY;
      timer++;
    }
    return;
  }
  for (var i = startY; i > stopY; i -= step) {
    setTimeout('window.scrollTo(0, ' + leapY + ')', timer * speed);
    leapY -= step;
    if (leapY < stopY) leapY = stopY;
    timer++;
  }
  return false;
}


class ScrollTo {
  constructor(nodeElement) {
    this.nodeElement = nodeElement;

    this.init();
  }

  getElementOffset(element) {
    let y = element.offsetTop;
    let node = element;

    while (node.offsetParent && node.offsetParent !== document.body) {
      node = node.offsetParent;
      y += node.offsetTop;
    }

    return y;
  }

  setInactiveWidgets(element) {
    const widgets = document.querySelectorAll('.widget');
    if(!widgets) {
      return;
    }
    widgets.forEach(widget => {
      widget.classList.add('inactive');
      element.classList.remove('inactive');

      widget.addEventListener('animationend', () => {
        widget.classList.remove('inactive');
      })
    })
  }

  addAnimate(element) {
    element.classList.add('animate');
  }

  removeAnimate(element) {
    element.classList.remove('animate');
  }

  updateAnimate(element) {
    this.setInactiveWidgets(element);
    this.addAnimate(element);

    element.addEventListener('animationend', () => {
      this.removeAnimate(element);
    })
  }

  init() {
    this.nodeElement.addEventListener('click', e => {
      const target = e.target.getAttribute('data-scroll-to');
      if(!target) return;

      const targetElement = document.querySelector(`[data-id="${target}"]`);
      if (!targetElement) {
        return;
      }

      e.preventDefault();

      const paddingTop = parseInt(window.getComputedStyle(targetElement, null).getPropertyValue('padding-top'));

      smoothScroll(this.getElementOffset(targetElement) + paddingTop - 100);

      this.updateAnimate(targetElement);
    });
  }
}

class ScrollToManager {
  static init() {
    document.querySelectorAll('.js-scroll-to').forEach(element => new ScrollTo(element));
  }

  static scrollToElement(element) {
    ScrollAnimationTo.startAnimation(element);
  }

  static scrollToY(y) {
    smoothScroll(y);
  }
}

document.addEventListener('DOMContentLoaded', () => ScrollToManager.init());
window.ScrollTo = ScrollToManager;
