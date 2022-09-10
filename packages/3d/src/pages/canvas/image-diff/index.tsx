import React, { FC, useEffect, useRef, useState, useMemo, useCallback } from 'react'
import { Outlet } from 'react-router-dom'

const Child: FC<{
  data?: Array<any>
  style?: React.CSSProperties
  handleClick?: any
}> = ({ data, style, handleClick }) => {
  useEffect(() => {
    console.error('child update')
  })
  return (
    <>
      <div style={style} onClick={handleClick}>
        {3}
      </div>
    </>
  )
}

const MemoChild = React.memo(Child)

export default function ImageDiff() {
  const [value, setValue] = useState(0)
  const ref = useRef({
    width: '200px',
  })
  const data = [1, 2, 3]

  const handleClick = useCallback(() => {
    alert(1)
  }, [])

  return (
    <div>
      {value}
      <span
        onClick={() => {
          setValue((value) => value + 1)
        }}
      >
        {' '}
        我是图片对比
      </span>
      <Child handleClick={handleClick} />
    </div>
  )
}
