import { BrowserRouter, Routes, Route } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import RouterPath from '@pages/router'

import ImageDiff from './image-diff'

export default function CanvasHome() {
  return (
    <Routes>
      <Route path={RouterPath.canvas.imageDiff} element={<ImageDiff />} />
    </Routes>
  )
}
