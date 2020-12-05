class ScrollTo {
  static startAnimation (targetElem, animationTime = 1200) {
    let targetPos;
    if (targetElem === document.querySelector('#form')) {
      targetPos = targetElem.getBoundingClientRect().top - 25 - document.querySelector('.js-header').getBoundingClientRect().height;
    } else {
      targetPos = targetElem.getBoundingClientRect().top;
    }

    // if (noAnimate) {
    //   ScrollTo.respond(targetElem);
    //   return scrollTo(0, targetPos);
    // }

    if ('scrollBehavior' in document.body.style) {
      ScrollTo.respond(targetElem);
      return scrollBy({
        top: targetPos,
        behavior: 'smooth',
      });
    }


    const duration = animationTime;
    const startPos = getScrollPos();
    const startTime = performance.now();

    raf(animation);

    function animation (currentTime) {
      const elapsedTime = currentTime - startTime;
      const nextStep = ScrollTo.timingFunction(
        elapsedTime, startPos, targetPos, duration,
      );

      scrollTo(0, nextStep);

      if (elapsedTime < duration) raf(animation);
      else ScrollTo.respond(targetElem);
    }
  }

  static timingFunction (t, b, c, d) {
    if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
    return c / 2 * ((t -= 2) * t * t + 2) + b;
  }

  static respond (targetElem) {
    const event = new CustomEvent(
      'endScroll', {
        detail: { targetElem },
      });

    document.dispatchEvent(event);
  }
}

window.startScrollTo = ScrollTo.startAnimation;
