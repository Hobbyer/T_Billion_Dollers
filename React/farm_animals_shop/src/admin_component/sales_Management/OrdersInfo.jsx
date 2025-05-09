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
import { GET } from '../../apis/CRUD';
import dayjs from 'dayjs';

const baseURL = import.meta.env.VITE_API_URL;

const OrdersInfo = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [showOffcanvas, setShowOffcanvas] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState(null)

  useEffect(() => {
    
    setLoading(true);

  Promise.all([
    GET(`${baseURL}/orders`),
    GET(`${baseURL}/admin/members`),
    
  ])
    .then(([ordersRes, membersRes]) => {
      const orders = ordersRes.data;
      const members = membersRes.data;

      const enrichedOrders = orders.map((order) => {
        const member = members.find((m) => m.userId === order.userId);
        return {
          ...order,
          userName: member?.name ?? 'Unknown',
          contact: member?.phoneNumber ?? 'Unknown',
          address: member?.address ?? 'Unknown',
        };
      });

      setOrders(enrichedOrders);
    })
    .catch((err) => {
      console.error('데이터 로딩 실패:', err);
    })
    .finally(() => {
      setLoading(false);
    })

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
            <tr key={idx}>
              <td>{dayjs(o.orderDate).format('YYYY-MM-DD HH:mm:ss')}</td>
              <td>
                <Button variant="link" className="p-0" onClick={() => handleShow(o)}>
                  {o.orderId}
                </Button>
              </td>
              <td>{o.userId}</td>
              <td>{o.userName}</td>
              <td>{o.contact}</td>
              <td>{o.address}</td>
              <td>{o.totalPrice.toLocaleString()}원</td>
              <td>
                <Badge bg={
                  o.orderStatus === 'CREATED'
                    ? 'success'
                    : o.orderStatus === '취소'
                    ? 'danger'
                    : 'secondary'
                }>
                  {
                  o.orderStatus === 'CREATED'
                    ? '결제완료'
                    : o.orderStatus === '취소'
                  }
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
