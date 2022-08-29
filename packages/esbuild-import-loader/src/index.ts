const parser = require('@babel/parser')
const { addSideEffect } = require('@babel/helper-module-imports')
import generate from '@babel/generator'
import { LoaderContext } from 'webpack'
import { EsbuildImportLoader } from '../type'
import { transform } from 'esbuild'
import traverse from '@babel/traverse'
import * as types from '@babel/types'

async function EsbuildImportIoader(this: LoaderContext<EsbuildImportLoader>, source: string) {
  // 1. 获取异步回调函数
  this.cacheable && this.cacheable()
  const callback = this.async()
  // 获取loader 选项
  const options: EsbuildImportLoader = this.getOptions()
  const { customStyle, customName, libraryName, ...esbuildTransformOptions } = options
  const transformOptions = {
    ...esbuildTransformOptions,
    target: options.target ?? 'es2015',
    loader: options.loader ?? 'js',
    sourcemap: this.sourceMap,
    sourcefile: this.resourcePath,
  }
  try {
    if (libraryName && source.includes(libraryName)) {
      const ast = parser.parse(source, { sourceType: 'module', plugins: ['jsx', 'typescript'] })
      traverse(ast, {
        ImportDeclaration: function (path) {
          let node = path.node
          let specifiers = node.specifiers
          if (libraryName == node.source.value && !types.isImportDeclaration(specifiers[0])) {
            let newImport: any[] = []
            specifiers.forEach((specifier) => {
              newImport.push(
                types.importDeclaration(
                  [types.importDefaultSpecifier(specifier.local as types.Identifier)],
                  types.stringLiteral(customName?.(specifier.local.name) ?? ''),
                ),
              )
              if (customStyle) {
                addSideEffect(path, `${customStyle(specifier.local.name)}`)
              }
            })
            path.replaceWithMultiple(newImport)
          }
        },
      })
      const { code } = generate(ast)
      source = code
    }
    const { code, map } = await transform(source, transformOptions)
    callback(null, code, map && JSON.parse(map))
  } catch (error) {
    callback(error)
  }
}

module.exports = EsbuildImportIoader
