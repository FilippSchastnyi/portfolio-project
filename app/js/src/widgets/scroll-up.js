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


class ScrollUp {
  constructor(nodeElement) {
    this.nodeElement = nodeElement;
    this.visible = false;
    this.init();
  }

  init() {
    this.bindEvents();
    this.update();
  }

  bindEvents() {
    this.nodeElement.addEventListener('click', e => {
      e.preventDefault();
      ScrollTo.scrollToY(0);
    });

    window.addEventListener('scroll', e => {
      this.update();
    });
  }

  show() {
    if (this.visible) {
      return;
    }

    this.nodeElement.classList.add('visible');
    this.visible = true;
  }

  hide() {
    if (!this.visible) {
      return;
    }

    this.nodeElement.classList.remove('visible');
    this.visible = false;
  }

  update() {
    const currentY = currentYPosition();
    if (currentY > window.innerHeight) {
      this.show();
    } else {
      this.hide();
    }
  }
}

class ScrollUpUi {
  static initOnLoad() {
    document.addEventListener('DOMContentLoaded', this.init);
  }

  static init() {
    document.querySelectorAll('.js-scroll-up').forEach(element => {
      if (element.dataset.initialized) {
        return;
      }
      element.dataset.initialized = true;

      new ScrollUp(element);
    });
  }
}

ScrollUpUi.initOnLoad();
window.ScrollUpUi = ScrollUpUi;
