import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { login } from '../slices/logSlice'

export default function Counter() {
  const log = useSelector(state => state.log)
  const dispatch = useDispatch()

  

  return (
    <div>
      {log.name}
    </div>
  )
}