import throttle from 'lodash.throttle'

let register = []

const onScroll = (event) => {
  register.forEach((value) => {
    if (value[0] === event.currentTarget) {
      value[1].handleScroller()
    }
  })
}

const registerScrollListener = (dom = window, instance) => {
  dom.addEventListener('scroll', throttle(onScroll, 16))
  // cache dom
  register.push([dom, instance])
}

const unregisterScrollListener = (dom, instance) => {
  register = register.filter((value) => value[1] !== instance)
  const haveDom = register.filter((value) => value[0] !== dom)
  if (haveDom.length < 1) {
    dom.removeEventListener('scroll', throttle(onScroll, 16))
  }
}

export {
  registerScrollListener,
  unregisterScrollListener,
}
