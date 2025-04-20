import React, { useEffect, useState } from 'react'
import { Col, Container, Form, Row, Table } from 'react-bootstrap'
import { DELETE, GET, POST, PUT } from '../apis/CRUD';
import { useSelector } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const baseURL = import.meta.env.VITE_API_URL;



const Cart = () => {
  const nav = useNavigate();

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

  const handleDeleteItem = (cartItemId, itemName) => {
    confirm(`${itemName}을 정말 삭제하시겠습니까?`) &&
      DELETE(`${baseURL}/farmdas/cart/${userId}/${cartItemId}/delete`)
        .then(res => {
          setItems(items.filter(item => item.cartItemId !== cartItemId));
        })
        .catch(err => {
          console.error(err);
        });
  };

  const handleSelectDelete = () => {
    const selectedItems = items.filter(item => item.isChecked);
    if (selectedItems.length === 0) {
      alert("삭제할 상품을 선택해주세요.");
      return;
    }
    if (!confirm(`${selectedItems.length}개의 상품을 삭제하시겠습니까?`)) return;
    const deleteRequests = selectedItems.map(item => {
      DELETE(`${baseURL}/farmdas/cart/${userId}/${item.cartItemId}/delete`)
    });
    Promise.all(deleteRequests)
      .then(() => {
        setItems(items.filter(item => !item.isChecked));
        alert("선택한 상품이 삭제되었습니다.");
        if (items.length === 0) {
          DELETE(`${baseURL}/farmdas/cart/${userId}/clear`)
            .then(() => {
              setItems([]);
            })
            .catch(err => {
              console.error(err);
            });
        }
      })
      .catch(err => {
        console.error(err);
      });
  };

  const handleAllDelete = () => {
    if (items.length === 0) {
      alert("삭제할 상품이 없습니다.");
      return;
    }
    if (!confirm("장바구니를 비우시겠습니까?")) return;
    DELETE(`${baseURL}/farmdas/cart/${userId}/clear`)
      .then(() => {
        setItems([]);
      })
      .catch(err => {
        console.error(err);
      });
  };

  // 주문하기
  const handleOrderSubmit = () => {
    if (selectedItems.length === 0) {
      alert("주문할 상품을 선택해주세요.");
    } else {
      if (!confirm(`${selectedItems.length}개의 상품을 주문하시겠습니까?`)) return;
    }

    const orderItems = selectedItems.map(item => ({
      itemCode: item.itemCode,
      quantity: quantity[item.itemCode] ?? item.quantity,
      price: item.price,
      totalPrice: item.price * (quantity[item.itemCode] ?? item.quantity)
    }));

    const orderData = {
      userId: userId,
      orderItems: orderItems,
      totalPrice: totalPrice,
      paymentMethod: "CREDIT_CARD", // 예시로 카드 결제 방식 사용
    };

    POST(`${baseURL}/orders`, orderData)
      .then(res => {
        alert("주문이 완료되었습니다.");
        nav(`/farmdas/mypage/${userId}`, { state: { orderId: res.data.orderId } });
        const deleteRequests = selectedItems.map(item => {
          DELETE(`${baseURL}/farmdas/cart/${userId}/${item.cartItemId}/delete`)
        });
        Promise.all(deleteRequests)
          .then(() => {
            setItems(items.filter(item => !item.isChecked));
            if (items.length === 0) {
              DELETE(`${baseURL}/farmdas/cart/${userId}/clear`)
                .then(() => {
                  setItems([]);
                })
                .catch(err => {
                  console.error(err);
                });
            }
          })
          .catch(err => {
            console.error(err);
          });
      })
      .catch(err => {
        console.error(err);
        alert("주문 처리 중 오류가 발생했습니다.");
      });
  };


  useEffect(() => {
    GET(`${baseURL}/farmdas/cart/${userId}`)
      .then(res => {
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

        @media (max-width: 768px) {
          table.cartList th,
          table.cartList td {
            font-size: 12px;
            padding: 6px;
          }

          .cartList > tbody tr {
            height: auto !important;
          }

          .cartList img {
            width: 60px;
            height: 60px;
          }

          .cartList .text-start span {
            font-size: 13px;
            margin-top: 4px;
          }

          .cart-row {
            flex-direction: column !important;
            text-align: center;
            gap: 10px;
          }

          .cart-row .col {
            flex-direction: column !important;
            gap: 5px;
          }

          .btn-area {
            flex-direction: column;
          }

          .btn-area button {
            width: 100%;
          }
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
      {loading ?
        <Container className='p-0'>
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
        </Container>
        :
        <Container className='p-0'>
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
                  {/* 데스크탑: 이미지 + 상품명 따로 */}
                  <th className='d-none d-md-table-cell' colSpan={2}>상품정보</th>
                  {/* 모바일: 이미지 + 상품명 한 열에 */}
                  <th className='d-table-cell d-md-none'>상품정보</th>
                  <th>가격</th>
                  <th>수량</th>
                  <th>할인금액</th>
                  <th>구매예정금액</th>
                  <th>선택</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(items) &&
                  items.map((item, i) => {
                    return (
                      <tr key={i}>
                        <td><Form.Check className='custom-checkbox' type='checkbox' checked={item.isChecked} onChange={(e) => handleSelectItem(e, item.cartItemId)} /></td>
                        {/* 데스크탑: 이미지 + 상품명 따로 */}
                        <td className="d-none d-md-table-cell">
                          <img src={item.itemImagePath} alt="상품 이미지" style={{ width: "50px", height: "50px" }} />
                        </td>
                        <td className="d-none d-md-table-cell">
                          {item.itemName}
                        </td>

                        {/* 모바일: 이미지 + 상품명 한 열에 */}
                        <td className="d-table-cell d-md-none text-start">
                          <div className="d-flex flex-column align-items-start">
                            <img src={item.itemImagePath} alt="상품 이미지" style={{ width: "50px", height: "50px" }} />
                            <span style={{ fontSize: "14px", marginTop: "5px" }}>{item.itemName}</span>
                          </div>
                        </td>
                        <td>{formatPrice(item.price)}원</td>
                        <td>
                          <Form.Control className='custom-number' type="number" name={item.itemCode} min={1} defaultValue={item.quantity} onChange={(e) => {
                            const newQty = Math.max(1, Number(e.target.value));
                            setQuantity({ ...quantity, [item.itemCode]: newQty });
                            handleUpdateCart(item.cartItemId, newQty);
                          }}
                            onBlur={(e) => {
                              e.target.value = Math.max(1, Number(e.target.value));
                            }}
                          />
                        </td>
                        <td>-</td>
                        <td>{formatPrice(item.price * (quantity[item.itemCode] ?? item.quantity))}원</td>
                        <td>
                          <button className='btn btn-danger'
                            onClick={() => handleDeleteItem(item.cartItemId, item.itemName)}
                          >삭제</button>
                        </td>
                      </tr>
                    )
                  })
                }
              </tbody>
              <tfoot>
                <tr style={{ borderBottom: "none" }}>
                  <td colSpan={8} style={{ textAlign: "right" }}>
                    <span
                      style={{ cursor: "pointer", color: "red" }}
                      onClick={() => {
                        handleSelectDelete()
                      }}
                    >ㅁ</span>
                    <span>선택상품 삭제</span>
                  </td>
                </tr>
                <tr style={{ borderTop: "none" }}>
                  <td colSpan={8} style={{ textAlign: "right" }}>
                    <span
                      style={{ cursor: "pointer", color: "red" }}
                      onClick={() => {
                        handleAllDelete()
                      }}>ㅁ</span>
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
            <button className='btn btn-success'
              onClick={() => {
                if (items.length === 0) {
                  return;
                }
                handleOrderSubmit();
              }}
            >주문하기</button>
            <button className='btn btn-outline-success'
              onClick={() => {
                nav(-1)
              }}
            >쇼핑 계속하기</button>
          </div>
        </Container>
      }
    </>
  )
}

export default Cart