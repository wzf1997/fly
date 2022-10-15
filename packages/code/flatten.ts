const target = [1, [2, [3, [4, 5]]], 6]

/**
 *  这一题考察的是递归 和剪枝
 */
function flatten(target: Array<any>, _deep = 1) {
  const result: any = []

  let count = 0
  function recursion(arg: any) {
    arg.forEach((item: any) => {
      if (Array.isArray(item) && count < _deep) {
        count++
        recursion(item)
      } else {
        result.push(item)
      }
    })
  }

  recursion(target)

  return result
}

console.error(flatten(target, 1), target.flat(1))
