/**
 * 防抖 点击一次后 重新计时  节流 是在特定时间 只执行一次
 */
function debounce(fn: () => void, time: number, immediate = false) {
  let timer: NodeJS.Timeout
  return function (this: any, ...args: any[]) {
    // 保存调用时候的上下文
    if (timer) {
      clearTimeout(timer)
    }
    let context = this
    if (immediate) {
      fn.apply(context, args)
      immediate = false
      return
    }
    timer = setTimeout(() => {
      fn.apply(context, args)
      immediate = false
    }, time)
  }
}

function throttle(fn: () => void, time: number) {
  let timer: NodeJS.Timeout
  return function (this: any, ...args: any[]) {
    // 如果有定时器就不执行
    if (timer) {
      return
    }
    let context = this
    timer = setTimeout(() => {
      fn.apply(context, args)
    }, time)
  }
}

// const testFn = debounce(() => {
//   console.error(1)
// }, 1000)
