/**
 * 函数防抖
 */

export default {
  debounce (fn, delay = 300) {
    let timer
    return function () {
      const args = arguments
      if (timer) {
        clearTimeout(timer)
      }
      timer = setTimeout(() => {
        fn.apply(this, args) // this指向vue
      }, delay)
    }
  }
}
