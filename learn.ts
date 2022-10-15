// 加载图片
function loadImage(url: string) {
  return new Promise((res, rej) => {
    const image = new Image()
    image.src = url
    image.onload = () => {
      res(image)
    }
    image.onerror = (e) => {
      rej(e)
    }
  })
}

class AsyncTaskManager {
  limit: number
  tasks: Array<() => Promise<any>>
  runTasks: Array<() => Promise<any>>
  restTasks: Array<() => Promise<any>>
  constructor(length: number) {
    this.tasks = []
    this.runTasks = []
    this.restTasks = []
    this.limit = length
  }

  addTasks(tasks: Array<() => Promise<any>>) {
    this.tasks = tasks
    this.runTasks = tasks.slice(0, this.limit)
    this.restTasks = tasks.slice(this.limit)
  }

  static generateTask(ms = 1000, order: any) {
    return () =>
      new Promise((res) => {
        setTimeout(() => {
          console.log(order)
          res(void 0)
        }, ms)
      })
  }
  // 异步带限制的 最大串行
  run() {
    if (this.runTasks.length === 0) {
      return
    }
    for (let i = 0; i < this.limit; i++) {
      const task = this.runTasks.shift()
      if (!task) {
        return
      }
      task().then((res) => {
        this.runTasks.push(this.restTasks.shift()!)
        this.run()
      })
    }
  }

  // 异步串行
  runSingle() {
    if (this.tasks.length === 0) {
      return
    }

    let curTask = this.tasks.shift()
    if (!curTask) {
      return
    }
    curTask().then((res) => {
      this.runSingle()
    })
  }
}

const task1 = AsyncTaskManager.generateTask(1000, '1')
const task2 = AsyncTaskManager.generateTask(500, '2')
const task3 = AsyncTaskManager.generateTask(300, '3')
const task4 = AsyncTaskManager.generateTask(400, '4')

const sceduler = new AsyncTaskManager(2)
sceduler.addTasks([task1, task2, task3, task4])
// sceduler.run()

sceduler.runSingle()

// 手写 compose
function compose(...funs: Array<(...args: any) => void>) {
  if (funs.length === 1) {
    return funs[0]
  }
  if (funs.length === 0) {
    return (arg: any) => arg
  }
  return funs.reduce((pre, cur) => {
    return (...args: any) => pre(cur(...args))
  })
}

// js  对象扁平化  flatten

function isObject(value: any) {
  return typeof value === 'object' && value !== null
}

function flatten(obj: Record<string, any>, result = {} as Record<string, any>) {
  function process(key: any, value: any) {
    if (!isObject(value)) {
      result[key] = value
      return
    }

    if (value === null) {
      result[key] = value
      return
    }

    if (Array.isArray(value)) {
      value.forEach((item, index) => {
        process(`${key}[${index}]`, item)
      })
      return
    }

    if (isObject(value)) {
      Object.keys(value).forEach((item) => {
        process(key === '' ? `${item}` : `${key}.${item}`, value[item])
      })
    }
  }
  process('', obj)
  console.error(result)
  return result
}

const obj = {
  a: 1,
  b: [1, 2, { c: true }],
  c: { e: 2, f: 3 },
  g: null,
}

// flatten(obj)  函数科利华

function add(...args: any) {
  let total = [...args]
  function fn(...others: any) {
    if (!others.length) {
      return total.reduce((pre, cur) => pre + cur)
    }
    total.push(...others)
    return fn
  }
  return fn
}

const res = add(1)(2)(3)()
console.error(res)

/// 合并数组 排序去重
