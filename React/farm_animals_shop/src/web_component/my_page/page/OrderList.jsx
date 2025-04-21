import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row, Stack } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { GET } from "../../../apis/CRUD";
import dayjs from "dayjs";

const baseURL = import.meta.env.VITE_API_URL;

const OrderList = () => {

  const userId = jwtDecode(sessionStorage.getItem("accessToken")).sub;

  const [loading, setLoading] = useState(true);

  // 오늘 날짜를 YYYY-MM-DD 형식으로 설정
  const today = new Date().toISOString().split("T")[0];

  // 날짜 선택을 위한 상태 변수
  const [startDate, setStartDate] = useState("2025-04-01");
  const [endDate, setEndDate] = useState(today);

  // 날짜 범위 설정 함수
  const handleDateRange = (days) => {
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - days);

    const format = (date) => date.toISOString().split("T")[0];
    setStartDate(format(start));
    setEndDate(format(end));
  };


  const [orders, setOrders] = useState([]);
  // 주문 내역 가져오기
  useEffect(() => {
    GET(`${baseURL}/orders/${userId}`)
      .then((res) => {
        console.log(res.data);
        setOrders(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <style>
        {`
          

          .date-btn {
          border-radius: 50px;
          width: 90px;
          color: black;
          font-weight: bold;
          border: 1px solid #198754;
          margin-left: 10px;
          }
          .date-btn:hover {
            color: black;
          }

          .date-btn:focus, .date-btn:active {
            outline: none !important;
            box-shadow: none !important;  /* 클릭 시 파란색 테두리 없애기 */
          }
          .date-input {
            width: 150px;
            height: 40px;
            margin-left: 10px;
          }
            /* 버튼 클릭 시 배경색이나 색상 바뀌지 않게 하기 */
            .date-btn:focus, .date-btn:active, .date-btn:hover {
              background-color: #198754 !important;  /* 배경색 없애기 */
              color: white !important;  /* 글씨색 유지 */
            }
            `}
      </style>

      <div style={{ margin: "50px 0 90px 0" }}>
        {/* 주문/배송 현황 */}
        <Stack>
          <div className="d-flex align-items-end">
            <p style={{ fontSize: "1.3rem", fontWeight: "bold", marginRight: "10px" }}>
              주문/배송 현황
            </p>
            <p>
              주문하신 상품의 배송 진행사항 및 결제내역을 확인 하실 수 있습니다.
            </p>
          </div>
          <Container>
            <Row className="p-2">
              <Col >
                <Button
                  variant="outline-danger"
                  className="date-btn"
                  onClick={() => handleDateRange(7)}
                >
                  1주일
                </Button>
                <Button
                  variant="outline-danger"
                  className="date-btn"
                  onClick={() => handleDateRange(15)}
                >
                  15일
                </Button>
                <Button
                  variant="outline-danger"
                  className="date-btn"
                  onClick={() => handleDateRange(30)}
                >
                  1개월
                </Button>
                <Button
                  variant="outline-danger"
                  className="date-btn"
                  onClick={() => handleDateRange(90)}
                >
                  3개월
                </Button>
                <Button
                  variant="outline-danger"
                  className="date-btn"
                  onClick={() => handleDateRange(180)}
                >
                  6개월
                </Button>
              </Col>
            </Row>
            <Row className="p-2 d-flex align-items-center">
              <Col className="d-flex justify-content-center align-items-center">
                <Form.Control
                  className="date-input"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />{" "}
                <span style={{ color: "gray" }}>-</span>
                <Form.Control
                  className="date-input"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </Col>
            </Row>
          </Container>

          {/* 입금대기중 ~ 배송완료 */}
          <div className="p-2 d-flex justify-content-evenly align-items-center">
            <div className="p-2">
              <p>입금대기중</p>
              <p>0건</p>
            </div>
            <div>
              <i className="bi bi-chevron-right"></i>
            </div>
            <div className="p-2">
              <p>결제완료</p>
              <p>0건</p>
            </div>
            <div>
              <i className="bi bi-chevron-right"></i>
            </div>
            <div className="p-2">
              <p>상품준비중</p>
              <p>0건</p>
            </div>
            <div>
              <i className="bi bi-chevron-right"></i>
            </div>
            <div className="p-2">
              <p>배송중</p>
              <p>0건</p>
            </div>
            <div>
              <i className="bi bi-chevron-right"></i>
            </div>
            <div className="p-2">
              <p>배송완료</p>
              <p>0건</p>
            </div>
          </div>
        </Stack>

        {/* 주문내역 */}

        <div>
          <Stack gap={3}>
            <div
              className="d-flex align-items-end gap-3"
              style={{ borderBottom: "2px solid black" }}
            >
              <p style={{ fontSize: "1.3rem", fontWeight: "bold" }}>주문내역</p>
              <p>
                주문하신 상품의 배송 진행상황 및 결제내역을 확인 하실 수
                있습니다.
              </p>
            </div>

            { loading ? 
              <div style={{ padding: "0 100px" }}>
                <h3>Loading...</h3>
                <div className='d-flex justify-content-center align-items-center'>
                <img
                  className='loading-img mt-3'
                  // 원하는 로딩 이미지 경로
                  src="/imgs/cow (1).png"
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
                orders.length > 0 ? 
                orders.map(order => (
                <div key={order.orderId} className="card mb-4 shadow-sm">
                  <div className="card-header text-white" style={{backgroundColor:"#73c8a9"}}>
                  <h5 className="mb-0">주문번호: {order.orderId}</h5>
                  </div>
                  <div className="card-body">
                  <p><strong>총 금액:</strong> {order.totalPrice.toLocaleString()}원</p>
                  <p><strong>주문일자:</strong> {dayjs(order.orderDate).format('YYYY-MM-DD HH:mm:ss')}</p>
                  <table className="table table-bordered">
                    <thead className="table-light">
                    <tr>
                      <th>상품명</th>
                      <th>수량</th>
                      <th>가격</th>
                      <th>문의하기</th>
                    </tr>
                    </thead>
                    <tbody>
                    {order.orderItems.map((item, idx) => (
                      <tr key={idx}>
                      <td>{item.itemName}</td>
                      <td>{item.quantity}</td>
                      <td>{item.totalPrice.toLocaleString()}원</td>
                      <td>
                        <Button variant="success" onClick={()=>{}}>문의하기</Button>
                      </td>
                      </tr>
                    ))}
                    </tbody>
                  </table>
                  </div>
                </div>
                ))
                : 
                <div className="text-center my-5">
                <p style={{ fontSize: "4rem", color: "lightgray" }}>
                  <i className="bi bi-exclamation-circle"></i>
                </p>
                <span style={{ fontSize: "0.9rem", color: "gray" }}>
                  해당기간 내에 주문배송 <br /> 내역이 없습니다.
                </span>
                </div>
              }
              </Stack>
            </div>

            {/* 배송 단계 안내 */}
        <div style={{ marginTop: "50px", textAlign: "start" }}>
          <Stack gap={3}>
            <div>
              <p style={{ fontSize: "1.3rem", fontWeight: "bold" }}>
                배송 단계 안내
              </p>
            </div>
            <div
              className="p-2"
              style={{ background: "#EFEFEF", width: "100%", height: "100%" }}
            >
              <div className="p-2 d-flex justify-content-evenly align-items-center">
                <div className="p-2 d-flex flex-column align-items-center">
                  <p>01</p>
                  <i className="bi bi-hourglass"></i>
                  <p>입금대기중</p>
                </div>
                <div>
                  <i className="bi bi-chevron-right"></i>
                </div>
                <div className="p-2 d-flex flex-column align-items-center">
                  <p>02</p>
                  <i className="bi bi-credit-card"></i>
                  <p>결제완료</p>
                </div>
                <div>
                  <i className="bi bi-chevron-right"></i>
                </div>
                <div className="p-2 d-flex flex-column align-items-center">
                  <p>03</p>
                  <i className="bi bi-box-seam"></i>
                  <p>상품준비중</p>
                </div>
                <div>
                  <i className="bi bi-chevron-right"></i>
                </div>
                <div className="p-2 d-flex flex-column align-items-center">
                  <p>04</p>
                  <i className="bi bi-truck"></i>
                  <p>배송중</p>
                </div>
                <div>
                  <i className="bi bi-chevron-right"></i>
                </div>
                <div className="p-2 d-flex flex-column align-items-center">
                  <p>05</p>
                  <i className="bi bi-gift"></i>
                  <p>배송완료</p>
                </div>
                <div>
                  <i className="bi bi-chevron-right"></i>
                </div>
              </div>
            </div>
          </Stack>
        </div>
      </div>
    </>
  );
};

export default OrderList;
