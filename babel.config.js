module.exports = function (api) {
  //   if (api) api.cache(true)

  return {
    presets: [
      [
        '@babel/preset-env',
        {
          useBuiltIns: 'usage',
          corejs: 3,
          // caller.target 等于 webpack 配置的 target 选项
          targets: api.caller((caller) => caller && caller.target === 'node')
            ? { node: 'current' }
            : { chrome: '58', ie: '11' },
        },
      ],
      [
        '@babel/preset-typescript',
        {
          isTSX: true,
          allExtensions: true,
        },
      ],
      '@babel/preset-react',
    ],
    plugins: [
      [
        '@babel/plugin-transform-runtime',
        {
          regenerator: true,
        },
      ],
    ],
    ignore: ['dist', 'node_modules'],
  }
}
