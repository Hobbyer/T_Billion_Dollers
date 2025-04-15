import React from 'react'
import WebHeader from './WebHeader'
import { Outlet } from 'react-router-dom'
import { Container, Row } from 'react-bootstrap'

const FarmdasLayout = () => {
  return (
    <>
      <Container className="text-center mt-3 mx-auto ">
        <div className="shadow-sm rounded" style={{ padding: "0 100px", minWidth: "800px" }}>
          <WebHeader />
        </div>
        <div className=''>
         <Outlet />
        </div>
      </Container>
    </>
  )
}

export default FarmdasLayout