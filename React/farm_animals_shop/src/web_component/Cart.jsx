import React, { useEffect, useState } from 'react'
import { Col, Form, Row, Table } from 'react-bootstrap'
import { GET, PUT } from '../apis/CRUD';
import { useSelector } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL;



const Cart = () => {

  // 로그인한 유저의 아이디
  const token = sessionStorage.getItem('accessToken');
  const userId = jwtDecode(token).sub;

  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [quantity, setQuantity] = useState({});

  // 상품 가격 포맷팅 함수
  const formatPrice = (price) => {
    if (!price && price !== 0) return "";
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };


  // 장바구니에서 선택된 상품의 가격 계산
  const selectedItems = items.filter(item => item?.isChecked);
  const totalPrice = selectedItems.reduce(
    (sum, item) => sum + item.price * (quantity[item.itemCode] ?? item.quantity),
    0
  );


  // 장바구니에서 상품 수량 업데이트
  const handleUpdateCart = (cartItemId, newQuantity) => {
    axios.put(`${baseURL}/farmdas/cart/${userId}/${cartItemId}/update?newQuantity=${newQuantity}`)
      .catch(console.error);
  };

  // 장바구니에서 상품 선택 상태 업데이트
  const updatedIsChecked = (cartItemId, isChecked) => {
    axios.put(`${baseURL}/farmdas/cart/${userId}/${cartItemId}/checked?isChecked=${isChecked}`)
      .catch(console.error);
  };

  // 장바구니에서 모든 상품 선택 상태 업데이트
  const handleSelectAll = (e) => {
    const isChecked = e.target.checked;
    const updated = items.map(item => {
      updatedIsChecked(item.cartItemId, isChecked);
      return { ...item, isChecked };
    });
    setItems(updated);
  };

  // 장바구니에서 개별 상품 선택 상태 업데이트
  const handleSelectItem = (e, cartItemId) => {
    const isChecked = e.target.checked;
    const updated = items.map(item =>
      item.cartItemId === cartItemId ? { ...item, isChecked } : item
    );
    setItems(updated);
    updatedIsChecked(cartItemId, isChecked);
  };

  

  useEffect(() => {
    GET(`${baseURL}/farmdas/cart/${userId}`)
      .then( res => {
        const itemsWithChecked = res.data.cartItems.map(item => ({ ...item, isChecked: item.isChecked ?? false }))
        setItems(res.data.cartItems);
        setLoading(false);
        })
      .catch(err => {
        console.error(err);
        setLoading(false);
      })
  }, [])


  return (
    <>
    <style>
      {`
        @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
        }

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
      { loading ?
        <div style={{ padding: "0 100px" }}>
          <h3>Loading...</h3>
          <div className='d-flex justify-content-center align-items-center'>
          <img
            className='loading-img mt-3'
            src="/imgs/cow (1).png" // 원하는 로딩 이미지 경로
            alt="로딩중"
            style={{
              width: "60px",
              height: "60px",
              animation: "spin 1s linear infinite"
            }}
          />
          </div>
        </div> 
        :
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
                    <Form.Check className='custom-checkbox' type='checkbox' style={{ textAlign: "center" }}
                      checked={items.length > 0 && items.every(item => item.isChecked)}
                      onChange={(e) => {
                        handleSelectAll(e)
                      }}
                    />
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
                        <td><Form.Check className='custom-checkbox' type='checkbox' checked={item.isChecked} onChange={(e) => handleSelectItem(e, item.cartItemId)} /></td>
                        <td>
                          <img src={item.itemImagePath} alt="상품 이미지" style={{ width: "50px", height: "50px" }}  />
                        </td>
                        <td>{item.itemName}</td>
                        <td>{formatPrice(item.price)}원</td>
                        <td>
                          <Form.Control className='custom-number' type="number" name={item.itemCode} min={1} defaultValue={item.quantity} onChange={(e) => {
                            const newQty = Math.max(1, Number(e.target.value));
                            setQuantity({ ...quantity, [item.itemCode]: newQty });
                            handleUpdateCart(item.cartItemId, newQty);
                          }} />
                        </td>
                        <td>-</td>
                        <td>{formatPrice(item.price * (quantity[item.itemCode] ?? item.quantity))}원</td>
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
                  <span style={{ fontWeight: "bold" }}>
                    { // 체크 박스 선택된 상품의 가격
                      formatPrice(totalPrice)
                    }원
                  </span>
                </div>
              </Col>
              <Col>
                <span className="fs-3">-</span>
                <div>
                  <span>총 할인금액</span>
                  <span style={{ fontWeight: "bold" }}>0원</span>
                </div>
              </Col>
              <Col>
                <span className="fs-4">=</span>
                <div>
                  <span>총 결제금액</span>
                  <span style={{ fontWeight: "bold", color: "green" }}>
                    {
                      formatPrice(totalPrice)
                    }원
                  </span>
                </div>
              </Col>
            </Row>
          </div>
          <div className='btn-area d-flex justify-content-center align-items-center gap-3'>
            <button className='btn btn-outline-success'>쇼핑 계속하기</button>
            <button className='btn btn-success'>주문하기</button>
          </div>
        </div>  
      }
    </>
  )
}

export default Cart