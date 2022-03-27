# monorepo 前端工程化项目实践

# eslint

对于 eslint 的配置其实我们可以如法炮制，我们项目的根目录 新建 .eslintrc 然后我们每个子项目 同样继承外部的 .eslintrc

好的下面我们开始安装 **eslint**

```js
yarn add eslint -D -W
```

然后我们生成 eslint 的配置文件

```tsx
npx eslint --init
```

由于我们的项目 是基于 React 和 ts 的 所以在选择的按照下面进行选择

![eslint-config](https://ztifly.oss-cn-hangzhou.aliyuncs.com/image-20220326130441677.png)

这时候在我们的根目录 就会出现**.eslint.yml** 这个配置文件 这里你也可以选择你喜欢的配置文件格式， 个人比较喜欢 YAML 这种方式

```tsx
env:
  browser: true
  node: true
extends:
  - plugin:react/recommended
  - eslint:recommended
  - airbnb
parser: '@typescript-eslint/parser'
parserOptions:
  ecmaFeatures:
    jsx: true
  ecmaVersion: 2020
  sourceType: module
plugins:
  - react
  - '@typescript-eslint'
  - react-hooks
rules:
```

然后就会出现下面这个文件我来一一解读下面每一条的配置文件

## env

1. 表示你在 eslint 想启用的环境 我们是前端嘛 所以 就是 node 和 browser，官网支持的还是比较多的

   ## extends

   单从字面上去理解就是 继承 其他的配置 可以是 **文件路径 形式的** 或者是 下载的插件包的 这里的话 一般 npm 包的 格式

   是下面这样子的

   ```ts
   eslint - config - packagename
   ```

   我们在配置的时候 前面的 **eslint-config** 可以省略， 我这使用的是 airbnb 的配置。

   或者安装的包的名字 是这样子

   ```tsx
   eslint - plugin - packagename
   ```

   然后就可以 **eslint-plugin** 可以省略，然后就可以像下面使用

   ```tsx
   plugin: xxxx / recommended
   ```

   或者 是子目录下继承根目录的 eslint 例如如下：

   ```tsx
   extends:  ../../.eslintrc
   ```

   ## parser

   ESLint 默认使用[Espree](https://github.com/eslint/espree)作为其解析器, 但是由于我们项目是 ts 文件， 所以安装

   ```tsx
   yarn add @typescript-eslint/parser
   ```

   作用 就是将 TypeScript 转换成与 estree 兼容的形式，以便在 ESLint 中使用。eslint 也是对 AST 进行操作，但是对 TS 是不支持的，所以做一层转换成 js.

   ### parserOption

   有了解析器肯定就有解析参数

   ```ts
   ecmaFeatures: jsx: true // 表示支持jsx 语法 但是React 对 ESLint 无法识别的JSX语法应用特定的语义。如果你正在使用 React 并且想要 React 语义支持，我们建议你用 eslint-plugin-react。

   ecmaVersion: 2020 // 默认的js 的版本

   sourceType: module // esm 模式
   ```

   ## plugins

   正如上面所说，在解析参数配置了支持 jsx 语法， 但是 ESLint 无法识别的 JSX 语法应用特定的语义。如果你正在使用 React 并且想要 React 语义支持，我们建议你用 eslint-plugin-react。这就是所谓的插件 ，这里安装了 react 和 react-hooks 两个插件

   ```js
   yarn add eslint-plugin-react  eslint-plugin-react-hooks
   ```

   然后我们就可以 plugins 进行配置了 同样可以省略 **eslint-plugin**

## rules

rules 的定义我们一般看到的就是这样子， 具体的配置可以自己查官方列表

```tsx
---
rules:
  eqeqeq: off
  curly: error
  quotes:
    - error
    - double
```

然后你如果安装了插件

就可以插件名/ 规则 可以对默认的插件配置 进行重写， 比如下面这样子

```
'react-hooks/rules-of-hooks': 2
'react-hooks/exhaustive-deps': 2
```

## 与 VScode 集成

```
 "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true
  }
```

# prettier

prettier 的出现其实为了解决代码格式的问题？ 这是 eslint 无法做到的

Prettier 中文的意思是漂亮的、美丽的，是一个流行的代码格式化的工具，我们来看如何结合 ESLint 来使用。首先我们需要安装三个依赖：

安装 npm 包

```js
yarn add prettier eslint-config-prettier eslint-plugin-prettier  -D -W
```

1. prettier：prettier 插件的核心代码

2. eslint-config-prettier：解决 ESLint 中的样式规范和 prettier 中样式规范的冲突，以 prettier 的样式规范为准，使 ESLint 中的样式规范自动失效

3. eslint-plugin-prettier：将 prettier 作为 ESLint 规范来使用

然后在项目的根目录下创建.prettierrc 文件：

```tsx
{
    "printWidth": 120,
    "semi": false,
    "trailingComma": "all",
    "singleQuote": true,
    "arrowParens": "always"
}
```

接着修改.eslintrc.js 文件，引入 prettier：

```tsx
extends:
  - plugin:react/recommended
  # - plugin:import/recommended
  - eslint:recommended
  - airbnb
  - prettier

plugins:
  - react
  - '@typescript-eslint'
  - react-hooks
  # - import
  - prettier

```

分别在 extends 和 plugins 加入 prettier

# husky 和 lint-staged 构建代码工作流

在这之前我先简单介绍 下 Husky 和 lint-staged 这两个东西 到底是干什么的??

## husky

husky 目前是前端工程哈必备的一个工具了， husky 这个 npm 包 说白了就是在 git 提交前 提供一些钩子 hooks 方便你运行一些脚本命令。下面跟着我可以实操一下

```tsx
yarn add husky -D -W
```

**第二步**：在 packgae.json 中添加 prepare 脚本

```
{
  "scripts": {
    "prepare": "husky install"
  }
}
```

prepare 脚本会在`npm install`（不带参数）之后自动执行。也就是说当我们执行 npm install 安装完项目依赖后会执行 `husky install`命令，该命令会创建.husky/目录并指定该目录为 git hooks 所在的目录。

第三步 添加 git hooks

```
npx husky add .husky/pre-commit "yarn lint-staged"
```

这时候在我们根目录 就会出现 .husky 的目录

![husky](https://ztifly.oss-cn-hangzhou.aliyuncs.com/image-20220327121754561.png)

然后写入 pre-commit 脚本

```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

yarn lint-staged
```

由于我们还没有装 lint-staged ， 直接运行会报错

## lint-staged

```tsx
yarn add lint-staged -D -W
```

Lint-staged 用于对 Git 暂存区中的文件执行代码检测, 然后我们同样也可以做一些操作

我们在 package.json 增加如下配置

```json
 "lint-staged": {
    "*.@(js|ts|tsx)": [
      "eslint --ext .ts,.tsx,.js --fix",
      "prettier --write",
      "git add"
    ],
    "*.@(yml|yaml)": [
      "prettier --parser yaml --write"
    ],
    "*.md": [
      "prettier --parser markdown --write"
    ],
    "*.json": [
      "prettier --parser json --write"
    ]
  },
```

我们看下第一个，当匹配到 以 js 或者 ts 或者是 tsx 结尾的文件时候， 这时候我们就可以 结合 之前 的 eslint 和 prettirer 做一些操作

1. eslint 对这些文件 检测 并自动修复
2. 然后 使用 prettier -- write 进行自动检测
3. 最后添加到 暂存区中

我们 run 一下 看下效果：

![husky 录屏](https://ztifly.oss-cn-hangzhou.aliyuncs.com/husky%20%E5%BD%95%E5%B1%8F.gif)

你会发现好像已经成功了， 但是最后 还是失败了，因为我在 husky 还加了一个 hook 用于在提交命令前 规范 commit-msg

我们输入下面命令

```js
npx husky add .husky/commit-msg 'yarn commitlint --edit "$1"'
```

然后在.husky 的目录 就会出现下面这张图

![commit](https://ztifly.oss-cn-hangzhou.aliyuncs.com/image-20220327123703042.png)

由于运行了这个脚本 commitlint 这个脚本 但是我们 安装 老样子

```js
yarn  add commitlint  @commitlint/config-conventional  @commitlint/config-lerna-scopes -D -W
```

**@commitlint/config-conventional ** 这里会使用默认 angular 团队的提交规范

**@commitlint/config-lerna-scopes** 由于我们是 lerna 多个 packages 主要是用来限制在 packages 里的包 不在的 就会报错，

```js
packages
├── api
├── app
└── web

❯ echo "build(api): change something in api's build" | commitlint
⧗   input: build(api): change something in api's build
✔   found 0 problems, 0 warnings

❯ echo "test(foo): this won't pass" | commitlint
⧗   input: test(foo): this won't pass
✖   scope must be one of [api, app, web] [scope-enum]
✖   found 1 problems, 0 warnings
```

foo 不属于项目中的一个包， 所以 直接 会报错。

在项目的根目录 新建： commitlint.config.js

```js
module.exports = {
  extends: ['@commitlint/config-conventional', '@commitlint/config-lerna-scopes'],
}
```

这样我们提交的时候就会做到我们上面的限制, 项目代码的提交规范 还是很重要的

# 生成 changelog

首先，聊一下什么是 CHANGELOG ，为什么需要 CHANGELOG ？它记录你项目所有的 commit 信息并归类版本，可以快速跳转到该条 commit 记录，甚至可以显示修改人信息一眼发现 bug 的创建者 😂。它能让你方便知道项目里哪个版本做了哪些功能有哪些 bug 等信息。也方便排查 bug，对于提交记录一目了然，不用一个一个去翻去查。

这里我们安装 这个包

```js
yarn  add  standard-version -D -W
```

这里，就直接用 standard-version 来实现自动生成 CHANGELOG 了。 conventional-changelog 咱们就不聊了，毕竟是它推荐咱们用 standard-version （这都是同一个团队的东西，基于 conventional-changelog 实现的）。

semantic-release 还有这个 进行生成

至于这两个的区别？？ 我们看下

> **semantic-release** 自动化整个包发布工作流程，包括：确定下一个版本号、生成发布说明和发布包。

虽然两者都基于结构化提交消息的相同基础，但标准版本采用不同的方法，为您处理版本控制、更改日志生成和 git 标记，而无需自动推送（到 GitHub）或发布（到 npm 注册表）。使用标准版本只会影响您的本地 git 存储库 - 它根本不会影响远程资源。运行标准版本后，您可以查看发布状态、纠正错误并遵循对您的代码库最有意义的发布策略。 我们认为它们都是很棒的工具，如果对他们的用例有意义，我们鼓励人们使用语义发布而不是标准版本

然后我们在 package.json 新增这脚本

```tsx
 "release": "standard-version",
```

为了 让我们的 changeLog 看起来好看一点在项目根目录 新增 **.versionrc.js**

```t's
module.exports = {
  types: [
    { type: 'feat', section: '✨ Features | 新功能' },
    { type: 'fix', section: '🐛 Bug Fixes | Bug 修复' },
    { type: 'init', section: '🎉 Init | 初始化' },
    { type: 'docs', section: '✏️ Documentation | 文档' },
    { type: 'style', section: '💄 Styles | 风格' },
    { type: 'refactor', section: '♻️ Code Refactoring | 代码重构' },
    { type: 'perf', section: '⚡ Performance Improvements | 性能优化' },
    { type: 'test', section: '✅ Tests | 测试' },
    { type: 'revert', section: '⏪ Revert | 回退' },
    { type: 'build', section: '📦‍ Build System | 打包构建' },
    { type: 'chore', section: '🚀 Chore | 构建/工程依赖/工具' },
    { type: 'ci', section: '👷 Continuous Integration | CI 配置' },
  ],
}
```

然后在 husky 新增 pre-push 脚本

```tsx
npx husky add .husky/pre-commit "yarn release"
```

这样我们在 git push 提交代码的时候 就会自动生成 changelog

![changeLog](https://ztifly.oss-cn-hangzhou.aliyuncs.com/changeLog.gif)
