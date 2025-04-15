import React from 'react'
import WebHeader from './WebHeader'
import { Outlet } from 'react-router-dom'
import { Container, Row } from 'react-bootstrap'

const FarmdasLayout = () => {
  return (
    <>
      <Container className="text-center mt-3">
        <div style={{ width:"100%",borderBottom:"1px solid lightgray" }}>
          <WebHeader />
        </div>
        <div style={{width:"100%"}}>
         <Outlet />
        </div>
      </Container>
    </>
  )
}

export default FarmdasLayout