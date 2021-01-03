export default {
  mounted(el, { value: { fn, params }, modifiers }) {
    const dep = init(fn, params, modifiers)

    Object.keys(dep).forEach(key => {
      el[key] = dep[key]
    })

    el.addEventListener('touchstart', el.touchstartFn, false)
    el.addEventListener('touchmove', el.touchmoveFn, false)
    el.addEventListener('touchend', el.touchendFn, false)
    el.addEventListener('touchcancel', el.touchcancelFn, false)
  },
  beforeUnmount(el) {
    el.removeEventListener('touchstart', el.touchstartFn)
    el.removeEventListener('touchmove', el.touchmoveFn)
    el.removeEventListener('touchend', el.touchendFn)
    el.removeEventListener('touchcancel', el.touchcancelFn)
    el.touchstartFn = el.touchmoveFn = el.touchendFn = el.touchcancelFn = null
  }
}

const init = (handler, params, modifiers) => {
  let tapTimeout = null

  let tapInfo = {
    x1: null,
    y1: null,
    x2: null,
    y2: null
  }

  const _touchstart = function(evt) {
    if (!evt.touches) return

    var touch = evt.touches[0]
    tapInfo.x1 = touch.pageX
    tapInfo.y1 = touch.pageY
  }

  const _touchmove = function(evt) {
    if (!evt.touches) return

    var touch = evt.touches[0]
    tapInfo.x2 = touch.pageX
    tapInfo.y2 = touch.pageY
  }

  const _touchend = function(evt) {
    if (!evt.changedTouches) return

    if (
      (tapInfo.x2 && Math.abx(tapInfo.x1 - tapInfo.x2) > 30) ||
      (tapInfo.y2 && Math.abx(tapInfo.y1 - tapInfo.y2) > 30)
    ) {
      // swipe
    } else {
      tapTimeout = setTimeout(function() {
        handler(params)
      }, 0)
    }

    tapInfo.x1 = tapInfo.y1 = tapInfo.x2 = tapInfo.y2 = null
  }

  const _touchcancel = function() {
    clearTimeout(tapTimeout)
  }

  const touchstartFn = function(e) {
    if (modifiers.stopPropagation) e.stopPropagation()
    if (modifiers.preventDefault) e.preventDefault()
    _touchstart(e)
  }

  const touchmoveFn = function(e) {
    _touchmove(e)
  }

  const touchendFn = function(e) {
    _touchend(e)
  }

  const touchcancelFn = function(e) {
    _touchcancel(e)
  }

  return { touchstartFn, touchmoveFn, touchendFn, touchcancelFn }
}
