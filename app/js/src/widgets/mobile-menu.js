
class MobileMenu {
  constructor(nodeElement) {
    this.$container = nodeElement
    this.$burgerButton = this.$container.querySelector('.js-burger-button')
    this.$asideMenu = document.querySelector('.js-aside')

    this.menuOpen = this.menuOpen.bind(this)
    this.menuClose = this.menuClose.bind(this)

    this.init()
  }


  menuClose() {
    this.$burgerButton.classList.remove('open')
    this.$container.classList.remove('open')
    this.$asideMenu.classList.remove('open')
  }

  menuOpen(event) {
    const optionElement = event.target.closest('.js-burger-button')
    if (optionElement.classList.contains('open')) {
      this.menuClose()
    } else {
      this.$burgerButton.classList.add('open')
      this.$container.classList.add('open')
      this.$asideMenu.classList.add('open')
    }
  }

  init() {
    this.$burgerButton.addEventListener('click', this.menuOpen)
  }
}


document.addEventListener('DOMContentLoaded', e => {
  document.querySelectorAll('.js-header').forEach(item => {
    new MobileMenu(item)
  })
})
