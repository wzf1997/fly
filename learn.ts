// 加载图形
function loadImage(url) {
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

class asyncTaskManager {
  limit: number
  tasks: never[]
  constructor(length: number) {
    this.tasks = []
    this.limit = length
  }

  run(tasks: Array<Promise<void>>) {}
}
