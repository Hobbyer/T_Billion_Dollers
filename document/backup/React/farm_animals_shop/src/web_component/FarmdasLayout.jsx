import React from 'react'
import WebHeader from './WebHeader'
import { Outlet } from 'react-router-dom'
import { Container } from 'react-bootstrap'

const FarmdasLayout = () => {
  return (
    <>
      <Container className="text-center mt-3 mx-auto">
        <div style={{ padding: "0 100px", minWidth: "800px", }}>
          <WebHeader />
        </div>
        <Outlet />
      </Container>
    </>
  )
}

export default FarmdasLayout