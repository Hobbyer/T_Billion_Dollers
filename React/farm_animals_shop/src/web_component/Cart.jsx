import React, { useEffect, useState } from 'react'
import { Col, Form, Row, Table } from 'react-bootstrap'
import { GET, PUT } from '../apis/CRUD';
import { useSelector } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL;



const Cart = () => {

  const token = sessionStorage.getItem('accessToken');
  const userId = jwtDecode(token).sub;

  // 체크 박스 컨트롤
  
  const [selectedItems, setSelectedItems] = useState([]);

  const handleSelectAll = (e) => {
    const isChecked = e.target.checked;
    const newSelectedItems = isChecked ? cart.map(item => item.itemCode) : [];
    setSelectedItems(newSelectedItems);
  }

  const handleSelectItem = (e, itemCode) => {
    const isChecked = e.target.checked;
    const newSelectedItems = isChecked ? [...selectedItems, itemCode] : selectedItems.filter(item => item !== itemCode);
    setSelectedItems(newSelectedItems);
  }

  const [cart, setCart] = useState([]);
  const [items, setItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);
  const [quantity, setQuantity] = useState({});

  // 장바구니 데이터 수정
  const handleUpdateCart = (cartItemId, newQuantity) => {
      axios.put(`${baseURL}/farmdas/cart/${userId}/${cartItemId}/update?newQuantity=${newQuantity}`)
      .then(res => {
        
      })
      .catch(err => {
        console.error(err);
      })
  }

  useEffect(() => {
    GET(`${baseURL}/farmdas/cart/${userId}`)
      .then( res => {
        console.log(res.data.cartItems)
        setCart(res.data);
        setItems(res.data.cartItems);
        })
      .catch(err => {
        console.error(err);
      })
  }, [])




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
              { Array.isArray(items) && 
                items.map((item, i) => {
                  return (
                    <tr key={i}>
                      <td><Form.Check className='custom-checkbox' type='checkbox' defaultChecked={item.isChecked} onChange={(e) => handleSelectItem(e, item.itemCode)} /></td>
                      <td>
                        <img src={item.itemImagePath} alt="상품 이미지" style={{ width: "50px", height: "50px" }}  />
                      </td>
                      <td>{item.itemName}</td>
                      <td>{item.price}원</td>
                      <td>
                        <Form.Control className='custom-number' type="number" name={item.itemCode} min={0} defaultValue={item.quantity} onChange={(e) => {
                          if (e.target.value < 1) {
                            e.target.value = 1;
                          }
                          setQuantity({ ...quantity, [e.target.name]: Number(e.target.value) });
                          handleUpdateCart(item.cartItemId, Number(e.target.value));
                        }} />
                      </td>
                      <td>-</td>
                      <td>{item.price * (quantity[item.itemCode] ?? item.quantity)}원</td>
                      <td><button className='btn btn-danger'>삭제</button></td>
                    </tr>
                  )
                })
              }
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