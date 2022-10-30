import { BrowserRouter, Routes, Route } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import RouterPath from '@/router'
import { SeqAnimate } from './seqAnimate'

export default function Test() {
  return (
    <Routes>
      <Route path={RouterPath.test.step} element={<SeqAnimate />} />
    </Routes>
  )
}
