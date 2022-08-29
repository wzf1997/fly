// iife
// let js = 'alert("我是FLY")'

// let out = require('esbuild').transformSync(js, {
//   format: 'iife',
// })
// process.stdout.write(out.code)

// let js = 'export default "test"'
// let out = require('esbuild').transformSync(js, {
//   format: 'cjs',
// })
// process.stdout.write(out.code)

// let js = 'module.exports = "test"'
// let out = require('esbuild').transformSync(js, {
//   format: 'esm',
//   outfile: './out.ts',

// })

const parser = require('@babel/parser')

// import {parse} from
// import parser from "@babel/parser";

import traverse from '@babel/traverse'
import * as types from '@babel/types'
const { addSideEffect } = require('@babel/helper-module-imports')
import generate from '@babel/generator'

const source = `import { BrowserRouter, Routes, Route } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import RouterPath from '../router'
import CanvasHome from './canvas'
import ImageDiff from './canvas/image-diff'

import { Button } from 'antd'

function Home() {
  return <div>我是home 页</div>
}`

const ast = parser.parse(source, { sourceType: 'module', plugins: ['jsx', 'typescript'] })

const res: any = ast

const opts = {
  library: 'antd',
  customName: (name: string) => {
    return `antd/lib/${name}`
  },
  customStyle: (name: string) => {
    return `antd/lib/${name}/style`
  },
}

traverse(res, {
  ImportDeclaration: function (path) {
    let node = path.node
    let specifiers = node.specifiers
    const { library, customName, customStyle } = opts
    if (library == node.source.value && !types.isImportDeclaration(specifiers[0])) {
      let newImport: any[] = []
      specifiers.forEach((specifier) => {
        newImport.push(
          types.importDeclaration(
            [types.importDefaultSpecifier(specifier.local as types.Identifier)],
            types.stringLiteral(customName(specifier.local.name)),
          ),
        )
        addSideEffect(path, `${customStyle(specifier.local.name)}`)
      })
      path.replaceWithMultiple(newImport)
    }
  },
})

const output = generate(res)
console.error(output)
