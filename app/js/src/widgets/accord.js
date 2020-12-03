class Accord {
  constructor(nodeElement) {
    this.$container = nodeElement
    this.$optionButton = this.$container.querySelectorAll('.js-accord-button')
    this.optionClick = this.optionClick.bind(this)
    this.init()
  }

  optionClick(e) {
    const optionElement = e.target.closest('.js-accord-option')
    const optionContent = optionElement.lastElementChild
    if (!optionElement) return
    else {
      if (optionElement.classList.contains('open')) {
        optionElement.classList.remove('open')
        optionContent.style.height = "0px";
      }
      else {
        optionElement.classList.add('open')
        optionContent.style.height = optionElement.lastElementChild.scrollHeight + "px";
      }
    }
  }

  init() {
    this.$optionButton.forEach(item => {
      item.addEventListener('click', this.optionClick)
    })
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.js-accord').forEach(item => {
    new Accord(item)
  })
})
