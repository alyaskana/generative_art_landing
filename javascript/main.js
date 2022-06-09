let controller = new ScrollMagic.Controller();

const tween = new TimelineMax()
  .to("#animated_circle", 1, {
    width: 3500,
    height: 3500
  }
  )
  .to("#animated_circle", 1, {
    top: "-=700"
  }
  )


let circle = new ScrollMagic.Scene({ triggerElement: "#history", duration: 600, triggerHook: 0.9 })
  .setTween(tween)
  .addTo(controller);

document.querySelector('#what_is_link')
  .addEventListener('click', () => document.querySelector('#what_is')
    .scrollIntoView({ behavior: 'smooth' }))

document.querySelector('#history_link')
  .addEventListener('click', () => document.querySelector('#history_anchor')
    .scrollIntoView({ behavior: 'smooth' }))
document.querySelector('#today_link')
  .addEventListener('click', () => document.querySelector('#today')
    .scrollIntoView({ behavior: 'smooth' }))