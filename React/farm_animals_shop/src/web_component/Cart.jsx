import React from 'react'
import { Col, Form, Row, Table } from 'react-bootstrap'

const Cart = () => {
  return (
    <>
    <style>
      {`
        .custom-checkbox .form-check-input {
          border: 2px solid gray;
        }
        .custom-checkbox .form-check-input:checked {
          background-color: #3F7D58;
        }
        .custom-checkbox .form-check-input:focus {
          box-shadow: none;
        }

        .custom-number {
          text-align: center;
        }

        .cartList > tbody tr {
          height: 120px;
        }

        td {
          text-align: center;
          vertical-align: middle;
        }

        td:first-child {
          width: 50px;
        }
        td:nth-child(2){
          width: 150px;
        }
        td:nth-child(3) {
          text-align: left;
          width: 250px;
        }
        td:nth-child(4) {
          font-weight: bold;
          width: 100px;
        }
        td:nth-child(5) {
          font-weight: bold;
          width: 100px;
        }
        td:nth-child(6) {
          width: 100px;
        }
        td:nth-child(7) {
          font-weight: bold;
        }
        td:nth-child(8) {
          width: 100px;
        }

        div.col {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 30px;
        }
        div.col > div {
          display: flex;
          flex-direction: column;
        }

        .cart-row {
          // background-color:rgb(236, 237, 237);
          border-top: 1px solid #3F7D58;
          border-bottom: 1px solid #3F7D58;
          padding: 20px;
          with: 100%;
        }

        .btn-area button {
          width: 200px;
          height: 50px;
        }
        
        .btn-area button:first-child:hover {
          background-color:rgb(241, 241, 241);
          color: #3F7D58;
        }
      `}
    </style>
      <div style={{ padding: "0 100px", minWidth: "800px" }}>
        <div className='d-flex justify-content-between align-items-center mb-3'>
          <div>
            <h3>장바구니</h3>
          </div>
          <div>
            <span>장바구니 &gt;</span>
            <span> 주문결제 &gt;</span>
            <span> 주문완료</span>
          </div>
        </div>
        <div>
          <Table className='cartList' striped bordered hover style={{ textAlign: "center" }}>
            <thead>
              <tr>
                <th style={{ width: "50px" }}>
                  <Form.Check className='custom-checkbox' type='checkbox' style={{ textAlign: "center" }} />
                </th>
                <th colSpan={2}>상품정보</th>
                <th>가격</th>
                <th>수량</th>
                <th>할인금액</th>
                <th>구매예정금액</th>
                <th>선택</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><Form.Check className='custom-checkbox' type='checkbox'  /></td>
                <td>
                  <img src="https://via.placeholder.com/100" alt="상품 이미지" style={{ width: "50px", height: "50px" }} />
                </td>
                <td>상품명</td>
                <td>50,000원</td>
                <td>
                  <Form.Control className='custom-number' type="number" min={1} defaultValue={1} onChange={(e)=>{
                    if (e.target.value < 1) e.target.value = 1;
                  }} />
                </td>
                <td>10,000원</td>
                <td>40,000원</td>
                <td><button className='btn btn-danger'>삭제</button></td>
              </tr>
            </tbody>
            <tfoot>
              <tr style={{ borderBottom: "none"}}>
                <td colSpan={8} style={{ textAlign: "right" }}>
                  <span>ㅁ</span>
                  <span>선택상품 삭제</span>
                </td>
              </tr>
              <tr style={{ borderTop: "none"}}>
                <td colSpan={8} style={{ textAlign: "right" }}>
                  <span>ㅁ</span>
                  <span>전체상품 삭제</span>
                </td>
              </tr>
            </tfoot>
          </Table>
        </div>
        <div style={{ overflowX: "hidden" }}>
          <Row className='cart-row mb-3' style={{ fontSize: "20px", alignItems: "center" }}>
            <Col>
              <div>
                <span>총 상품금액</span>
                <span style={{ fontWeight: "bold" }}>50,000원</span>
              </div>
            </Col>
            <Col>
              <span className="fs-3">-</span>
              <div>
                <span>총 할인금액</span>
                <span style={{ fontWeight: "bold" }}>10,000원</span>
              </div>
            </Col>
            <Col>
              <span className="fs-4">=</span>
              <div>
                <span>총 결제금액</span>
                <span style={{ fontWeight: "bold", color: "green" }}>40,000원</span>
              </div>
            </Col>
          </Row>
        </div>
        <div className='btn-area d-flex justify-content-center align-items-center gap-3'>
          <button className='btn btn-outline-success'>쇼핑 계속하기</button>
          <button className='btn btn-success'>주문하기</button>
        </div>
      </div>  
    </>
  )
}

export default Cart