import React, { useState } from "react";
import { Button, Form, Stack } from "react-bootstrap";

const OrderList = () => {
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
  return (
    <>
      <style>
        {`.date-btn {
            border-radius: 50px;
            width: 90px;
            color: black;
            font-weight: bold;
            border: 1px solid rgb(7, 218, 60);
            margin-left: 10px;
            }
            .date-btn:hover {
              color: black;
            }

            .date-input {
              width: 150px;
              height: 40px;
              margin-left: 10px;
            }
            `}
      </style>

      <div style={{ margin: "50px 0 90px 0" }}>
        {/* 주문/배송 현황 */}
        <Stack>
          <div className="d-flex align-items-end">
            <p style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
              주문/배송 현황
            </p>
            <p>
              주문하신 상품의 배송 진행사항 및 결제내역을 확인 하실 수 있습니다.
            </p>
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <div className="p-2">
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
            </div>
            <div className="p-2 d-flex align-items-center">
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
            </div>
          </div>

          {/* 입금대기중 ~ 배송완료 */}
          <div className="p-2 d-flex justify-content-evenly align-items-center">
            <div className="p-2">
              <p>입금대기중</p>
              <p>0건</p>
            </div>
            <div>
              <i class="bi bi-chevron-right"></i>
            </div>
            <div className="p-2">
              <p>결제완료</p>
              <p>0건</p>
            </div>
            <div>
              <i class="bi bi-chevron-right"></i>
            </div>
            <div className="p-2">
              <p>상품준비중</p>
              <p>0건</p>
            </div>
            <div>
              <i class="bi bi-chevron-right"></i>
            </div>
            <div className="p-2">
              <p>배송중</p>
              <p>0건</p>
            </div>
            <div>
              <i class="bi bi-chevron-right"></i>
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
            <div style={{ textAlign: "center", margin: "50px" }}>
              <p style={{ fontSize: "4rem", color: "lightgray" }}>
                <i class="bi bi-exclamation-circle"></i>
              </p>
              <span style={{ fontSize: "0.9rem", color: "gray" }}>
                해당기간 내에 주문배송 <br /> 내역이 없습니다.
              </span>
            </div>
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
                  <i class="bi bi-hourglass"></i>
                  <p>입금대기중</p>
                </div>
                <div>
                  <i class="bi bi-chevron-right"></i>
                </div>
                <div className="p-2 d-flex flex-column align-items-center">
                  <p>02</p>
                  <i class="bi bi-credit-card"></i>
                  <p>결제완료</p>
                </div>
                <div>
                  <i class="bi bi-chevron-right"></i>
                </div>
                <div className="p-2 d-flex flex-column align-items-center">
                  <p>03</p>
                  <i class="bi bi-box-seam"></i>
                  <p>상품준비중</p>
                </div>
                <div>
                  <i class="bi bi-chevron-right"></i>
                </div>
                <div className="p-2 d-flex flex-column align-items-center">
                  <p>04</p>
                  <i class="bi bi-truck"></i>
                  <p>배송중</p>
                </div>
                <div>
                  <i class="bi bi-chevron-right"></i>
                </div>
                <div className="p-2 d-flex flex-column align-items-center">
                  <p>05</p>
                  <i class="bi bi-gift"></i>
                  <p>배송완료</p>
                </div>
                <div>
                  <i class="bi bi-chevron-right"></i>
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
