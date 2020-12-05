class MobileMenu {
  constructor(nodeElement) {
    this.$container = nodeElement;
    this.$burgerButton = this.$container.querySelector('.js-burger-button');
    this.$asideMenu = document.querySelector('.js-aside');
    this.$asideLink = this.$asideMenu.querySelectorAll('.js-item-bar');

    this.menuOpen = this.menuOpen.bind(this);
    this.menuClose = this.menuClose.bind(this);
    this.showHeaderMenu = this.showHeaderMenu.bind(this);
    this.onAsideLinkClick = this.onAsideLinkClick.bind(this);

    this.init();
  }

  showHeaderMenu() {
    const section = document.body.querySelectorAll('.js-hero');
    for (let i = 0; i <= section.length; i++) {
      if (window.pageYOffset > section[0].scrollHeight - 100) {
        this.$container.classList.add('pre-fixed');
      }
      if (window.pageYOffset < 200) {
        this.$container.classList.remove('pre-fixed');
      }
      if (window.pageYOffset > section[0].scrollHeight - 100) {
        this.$container.classList.add('fixed');
      } else {
        this.$container.classList.remove('fixed');
      }
    }
  }

  onAsideLinkClick(event) {
    this.menuClose();
  }

  menuClose() {
    this.$burgerButton.classList.remove('open');
    this.$container.classList.remove('open');
    this.$asideMenu.classList.remove('open');
  }

  menuOpen(event) {
    const optionElement = event.target.closest('.js-burger-button');
    if (optionElement.classList.contains('open')) {
      this.menuClose();
    } else {
      this.$burgerButton.classList.add('open');
      this.$container.classList.add('open');
      this.$asideMenu.classList.add('open');
    }
  }

  init() {
    this.$burgerButton.addEventListener('click', this.menuOpen);
    this.$asideLink.forEach(item => {
      item.addEventListener('click', this.onAsideLinkClick);
    });
    window.addEventListener('scroll', this.showHeaderMenu);
  }
}


document.addEventListener('DOMContentLoaded', e => {
  document.querySelectorAll('.js-header').forEach(item => {
    new MobileMenu(item);
  });
});
