import React from 'react'
import WebHeader from './WebHeader'
import { Outlet } from 'react-router-dom'

const FarmdasLayout = () => {
  return (
    <>
      <WebHeader />
      <Outlet />
    </>
  )
}

export default FarmdasLayout