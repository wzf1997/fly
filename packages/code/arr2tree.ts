const result = [
  {
    id: 1,
    name: '部门1',
    pid: 0,
    children: [
      {
        id: 2,
        name: '部门2',
        pid: 1,
        children: [],
      },
      {
        id: 3,
        name: '部门3',
        pid: 1,
        children: [
          {
            id: 4,
            name: '部门4',
            pid: 3,
            children: [
              {
                id: 5,
                name: '部门5',
                pid: 4,
                children: [],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 1,
    name: '部门1',
    pid: 0,
    children: [
      {
        id: 2,
        name: '部门2',
        pid: 1,
        children: [],
      },
      {
        id: 3,
        name: '部门3',
        pid: 1,
        children: [
          {
            id: 4,
            name: '部门4',
            pid: 3,
            children: [
              {
                id: 5,
                name: '部门5',
                pid: 4,
                children: [],
              },
            ],
          },
        ],
      },
    ],
  },
]

/**
 * 
 * [
  {id: 1, name: '部门1', pid: 0},
  {id: 2, name: '部门2', pid: 1},
  {id: 3, name: '部门3', pid: 1},
  {id: 4, name: '部门4', pid: 3},
  {id: 5, name: '部门5', pid: 4},
]
 考察的是递归
 */

function arr2Tree(target: any) {
  const result: any = []

  function getData(item: any) {
    const { id, name, pid, children } = item
    result.push({
      id,
      name,
      pid,
    })
    if (children.length > 0) {
      children.forEach((child: any) => {
        getData(child)
      })
    }
  }

  target.forEach((item: any) => {
    getData(item)
  })
  return result
}

console.error(arr2Tree(result))
