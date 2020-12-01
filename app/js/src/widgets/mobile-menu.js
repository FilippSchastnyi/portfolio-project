
class MobileMenu {
  constructor(nodeElement) {
    this.$container = nodeElement
    this.$burgerButton = this.$container.querySelector('.js-burger-button')

    this.menuOpen = this.menuOpen.bind(this)
    this.menuClose = this.menuClose.bind(this)

    this.init()
  }


  menuClose() {
    this.$burgerButton.classList.remove('open')
    this.$container.classList.remove('open')
    document.body.style.overflow = "";
  }

  menuOpen(event) {
    const optionElement = event.target.closest('.js-burger-button')
    console.log(optionElement)
    if (optionElement.classList.contains('open')) {
      this.menuClose()
    } else {
      this.$burgerButton.classList.add('open')
      this.$container.classList.add('open')
      document.body.style.overflow = "hidden";
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
