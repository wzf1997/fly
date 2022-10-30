import { BrowserRouter, Routes, Route } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import ReactDom from 'react-dom'
import RouterPath from '../router'
import CanvasHome from './canvas'
import Test from './test'

export default function Entry() {
  return (
    <BrowserRouter basename="fly">
      <Routes>
        <Route path={RouterPath.canvas.home} element={<CanvasHome />} />
        <Route path={RouterPath.test.home} element={<Test />} />
      </Routes>
    </BrowserRouter>
  )
}
