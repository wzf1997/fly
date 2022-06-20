const { compare } = require('odiff-bin')

compare('./cur1.png', './target1.png', './diff2.png', {
  //   failOnLayoutDiff: true,
  threshold: 0.5,
}).then((match: any) => {
  console.error(match, '查看数据--')
})
