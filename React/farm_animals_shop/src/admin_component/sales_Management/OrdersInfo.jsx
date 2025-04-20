// src/admin_component/sales_Management/OrdersInfo.jsx
import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import {
  Container,
  Table,
  Badge,
  Button,
  Spinner,
  Offcanvas,
} from 'react-bootstrap'

const OrdersInfo = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [showOffcanvas, setShowOffcanvas] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState(null)

  useEffect(() => {
    // 실제 API 호출로 교체하세요.
    const mockData = [
      {
        orderDate: '2024-06-01',
        orderNumber: 'TB1001',
        userId: 'user01',
        userName: '홍길동',
        contact: '010-1234-5678',
        address: '서울시 강남구 역삼동',
        totalPrice: 22000,
        orderStatus: '결제완료',
        shippingStatus: '배송준비중',
        items: [
          { productName: '닭 모이', qty: 2, price: 5000 },
          { productName: '소 돼지 사료', qty: 1, price: 12000 },
        ],
      },
      {
        orderDate: '2024-06-02',
        orderNumber: 'TB1002',
        userId: 'user02',
        userName: '김철수',
        contact: '010-8765-4321',
        address: '부산시 해운대구',
        totalPrice: 24000,
        orderStatus: '취소',
        shippingStatus: '-',
        items: [
          { productName: '말 건초', qty: 3, price: 8000 },
        ],
      },
    ]

    setTimeout(() => {
      setOrders(mockData)
      setLoading(false)
    }, 500)
  }, [])

  const handleShow = (order) => {
    setSelectedOrder(order)
    setShowOffcanvas(true)
  }
  const handleClose = () => {
    setShowOffcanvas(false)
    setSelectedOrder(null)
  }

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '60vh' }}>
        <Spinner animation="border" variant="primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    )
  }

  return (
    <Container className="mt-4">
      <h2 className="mb-4">주문 정보 관리</h2>

      <Table striped hover responsive>
        <thead className="table-dark">
          <tr>
            <th>주문일자</th>
            <th>주문번호</th>
            <th>주문자 ID</th>
            <th>주문자 이름</th>
            <th>연락처</th>
            <th>주소</th>
            <th>결제금액</th>
            <th>주문상태</th>
            <th>배송상태</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o, idx) => (
            <tr key={o.orderNumber + idx}>
              <td>{o.orderDate}</td>
              <td>
                <Button variant="link" className="p-0" onClick={() => handleShow(o)}>
                  {o.orderNumber}
                </Button>
              </td>
              <td>{o.userId}</td>
              <td>{o.userName}</td>
              <td>{o.contact}</td>
              <td>{o.address}</td>
              <td>{o.totalPrice.toLocaleString()}원</td>
              <td>
                <Badge bg={
                  o.orderStatus === '결제완료'
                    ? 'success'
                    : o.orderStatus === '취소'
                    ? 'danger'
                    : 'secondary'
                }>
                  {o.orderStatus}
                </Badge>
              </td>
              <td>
                <Badge bg={
                  o.shippingStatus === '배송중'
                    ? 'info'
                    : o.shippingStatus === '배송완료'
                    ? 'success'
                    : 'warning'
                } text={o.shippingStatus === '배송준비중' ? 'dark' : undefined}>
                  {o.shippingStatus}
                </Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Offcanvas show={showOffcanvas} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            주문 상세 {selectedOrder && `(${selectedOrder.orderNumber})`}
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {selectedOrder && (
            <>
              <p><strong>주문일자:</strong> {selectedOrder.orderDate}</p>
              <p><strong>주문자:</strong> {selectedOrder.userName} ({selectedOrder.userId})</p>
              <p><strong>연락처:</strong> {selectedOrder.contact}</p>
              <p><strong>주소:</strong> {selectedOrder.address}</p>
              <p><strong>주문상태:</strong> {selectedOrder.orderStatus}</p>
              <p><strong>배송상태:</strong> {selectedOrder.shippingStatus}</p>

              <h6 className="mt-4">아이템 목록</h6>
              <Table bordered>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>상품명</th>
                    <th>수량</th>
                    <th>가격</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedOrder.items.map((item, i) => (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{item.productName}</td>
                      <td>{item.qty}</td>
                      <td>{item.price.toLocaleString()}원</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </>
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </Container>
  )
}

export default OrdersInfo
