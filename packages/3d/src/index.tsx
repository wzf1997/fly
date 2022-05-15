// import React from 'react'
import add from '@fly/util'
import React, { useState } from 'react'
import ReactDom from 'react-dom'

import Baner from './assets/baner.png'

function App() {
  return <div>我是测试的222 </div>
}

ReactDom.render(
  <div>
    <App />
    {add(1, 2)}
    <img src={Baner} alt="" />
  </div>,
  document.getElementById('root'),
)
