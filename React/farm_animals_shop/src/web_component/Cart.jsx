import React from 'react'
import { Form } from 'react-bootstrap'

const Cart = () => {
  return (
    <>
      <div style={{ padding: "0 100px", minWidth: "800px" }}>
        <div className='d-flex justify-content-between align-items-center'>
          <div>
            <h1>장바구니</h1>
            <p>장바구니 페이지입니다</p>
          </div>
          <div>
            <span>장바구니 &gt;</span>
            <span> 주문결제 &gt;</span>
            <span> 주문완료</span>
          </div>
        </div>
        
        <div>
          <div style={{ textAlign: "left" }}>
            <Form.Check label="전체 선택" />
          </div>
        </div>
      </div>  
    </>
  )
}

export default Cart