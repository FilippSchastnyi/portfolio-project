class Slider {
  constructor(nodeElement) {
    this.$container = nodeElement;
    this.init();
  }

  init() {
    this.swiper = new Swiper(this.$container , {
      slidesPerView: 'auto',
      centeredSlides: true,
      fadeEffect: true,
      autoplay: {
        delay: 5000,
      },
      loop: true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const element = document.body.querySelector('.js-swiper');
  new Slider(element);
});

