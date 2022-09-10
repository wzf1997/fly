import { BrowserRouter, Routes, Route } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import RouterPath from '../router'
import CanvasHome from './canvas'
import ImageDiff from './canvas/image-diff'

import { Button } from 'antd'

function Home() {
  return <div>我是home 页</div>
}

function NotFound() {
  return (
    <div>
      我是404 页<Button>点击</Button>
    </div>
  )
}

export default function Entry() {
  return (
    // <BrowserRouter basename="fly">
    //   <Routes>
    //     <Route path={RouterPath.canvas.home} element={<CanvasHome />} />
    //     <Route path="*" element={<NotFound />} />
    //   </Routes>
    // </BrowserRouter>
    <Home />
  )
}
