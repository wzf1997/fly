import { BrowserRouter, Routes, Route } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import RouterPath from '../router'
import CanvasHome from './canvas'

function Home() {
  return <div>我是home 页</div>
}

function NotFound() {
  return <div>我是404 页</div>
}

export default function Entry() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={RouterPath.canvas.home} element={<CanvasHome />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
