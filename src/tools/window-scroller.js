import throttle from 'lodash.throttle'

let register = []

const onScroll = throttle((event) => {
  register.forEach((value) => {
    if (value[0] === event.currentTarget) {
      value[1].handleScroller()
    }
  })
}, 16)

const registerScrollListener = (dom, instance, shortID) => {
  if (!shortID) return
  let d = dom
  if (!dom) d = window
  d.addEventListener('scroll', onScroll)
  // cache dom
  register.push([d, instance, shortID])
}

const unregisterScrollListener = (dom, shortID) => {
  if (!shortID) return
  let d = dom
  if (!dom) d = window
  register = register.filter((value) => value[2] !== shortID)
  const haveDom = register.filter((value) => value[0] !== d)
  if (haveDom.length < 1) {
    d.removeEventListener('scroll', onScroll)
  }
}

const getPostion = (current) => {
  if (!current) return { top: 0, left: 0 }
  const currentRect = current.getBoundingClientRect()
  if (document.documentElement) {
    const docRect = document.documentElement.getBoundingClientRect()
    return {
      top: currentRect.top - docRect.top,
      left: currentRect.left - docRect.left,
    }
  }
  return {
    top: currentRect.top,
    left: currentRect.left,
  }
}

export {
  registerScrollListener,
  unregisterScrollListener,
  getPostion,
}
