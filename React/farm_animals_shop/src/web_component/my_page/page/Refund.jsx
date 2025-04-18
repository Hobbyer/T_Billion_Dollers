import { color } from "chart.js/helpers";
import React, { useState } from "react";
import {
  Accordion,
  Button,
  Col,
  Form,
  Nav,
  Row,
  Stack,
  Tab,
  Tabs,
} from "react-bootstrap";
import { useParams } from "react-router-dom";

const Refund = () => {
  const { useId } = useParams();
  const [activeTab, setActiveTab] = useState("home");
  // Accordion (열기/닫기 상태)
  const [activeAccordion, setActiveAccordion] = useState(false);

  // 오늘 날짜를 YYYY-MM-DD 형식으로 설정
  const today = new Date().toISOString().split("T")[0];
  // 날짜 선택을 위한 상태 변수
  const [startDate, setStartDate] = useState("2025-04-01");
  const [endDate, setEndDate] = useState(today);
  // 주문 배송 내역을 위한 상태 변수
  const [loading, setLoading] = useState(true);
  // 주문 배송 내역을 위한 상태 변수
  const [ordersList, setOrdersList] = useState([]);

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
      {/* 기본 파란색 테두리와 배경색 없애기 */}
      <style>
        {`
          @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
          }

          .date-btn {
          border-radius: 50px;
          width: 90px;
          color: #198754;
          font-weight: bold;
          border: 1px solid #198754;
          background-color: white;
          margin-left: 10px;
          }
          .date-btn:hover {
            color: white;
            background-color: #198754;
          }

          .date-input {
            width: 150px;
            height: 40px;
            margin-left: 10px;
            border: 1px solid #198754;
          }
            
        `}
      </style>

      <Stack>
        <div
          className="d-flex align-items-end"
          style={{ margin: "50px 0", borderBottom: "1px solid #000" }}
        >
          <p
            style={{
              fontSize: "1.3rem",
              fontWeight: "bold",
              marginRight: "10px",
            }}
          >
            취소/반품
          </p>
          <p>신청 및 진행 현황을 확인할 수 있습니다.</p>
        </div>
      </Stack>

      <Tabs
        defaultActiveKey="home"
        transition={false}
        className="mb-3 justify-content-center"
      >
        {/* 취소/반품 신청 */}
        <Tab eventKey="home" title="취소/반품 신청">
          <Accordion
            defaultActiveKey="0"
            className=" accordion mb-3"
            onClick={() => setActiveAccordion(!activeAccordion)}
          >
            <Accordion.Item eventKey="1">
              <Accordion.Header className="border-0">
                현재 취소/반품 신청이 가능한 목록만 나타납니다
              </Accordion.Header>
              <Accordion.Body
                style={{ textAlign: "start", fontSize: "0.8rem" }}
              >
                <span>
                  주문하신 상품이{" "}
                  <span style={{ color: "#1d917b", fontWeight: "bold" }}>
                    배송 전 (입금대기 중/결제완료/배송불가)
                  </span>
                  인 경우에는 7일 이내에 즉시 주문취소가 되며,{" "}
                  <span style={{ color: "#1d917b", fontWeight: "bold" }}>
                    배송 전(상품준비 중)
                  </span>
                  인 경우 고객센터[영업시간(09:00~18:00)]의 연락을 통해
                  주문취소가 가능합니다. 배송 중/배송완료 상품은 주문취소가
                  불가하며, 배송완료 후 7일 이내에 반품 신청이 가능합니다.
                  상품별 반품 가능 일이 상이 할 수 있습니다. 정확한 기간은
                  상품 상세설명에서 확인하여 주시기 바랍니다.
                </span>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>

          {/* 달력 */}
          <div
            className="d-flex justify-content-between align-items-center"
            style={{ margin: "70px 0" }}
          >
            <div className="p-2">
              <Button className="date-btn" onClick={() => handleDateRange(7)}>
                1주일
              </Button>
              <Button className="date-btn" onClick={() => handleDateRange(15)}>
                15일
              </Button>
              <Button className="date-btn" onClick={() => handleDateRange(30)}>
                1개월
              </Button>
              <Button className="date-btn" onClick={() => handleDateRange(90)}>
                3개월
              </Button>
              <Button className="date-btn" onClick={() => handleDateRange(180)}>
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

          {/* 주문 배송 내역 */}
          <div>
            <Stack gap={3}>
              {/* 주문배송내역이 없을 때 */}
              <p style={{ fontSize: "0.8rem", margin: "150px 0" }}>
                해당기간 내에 주문배송
                <br />
                내역이 없습니다.
              </p>
            </Stack>
          </div>

          {/* 주문배송내역이 있을 때 */}
        </Tab>

        {/* 취소/반품 현황 */}
        <Tab eventKey="center" title="취소/반품 현황">
          나중에 쓸께예 -ㄻ-
        </Tab>
      </Tabs>







      {/* 아랫단 ! (안내사항) */}
      <Stack>
        <div
          className="d-flex align-items-end"
          style={{ marginTop: "70px", borderBottom: "1px solid #000" }}
        >
          {/* 취소/반품 안내 */}
          <div>
            <p
              style={{
                fontSize: "1.3rem",
                fontWeight: "bold",
                marginRight: "10px",
              }}
            >
              취소/반품 안내
            </p>
          </div>
        </div>
        <div style={{ margin: "30px 0 50px 0" }}>
          <Tab.Container
            id="left-tabs-example"
            defaultActiveKey="first"
            style={{ margin: "30px 0" }}
          >
            <Row>
              <Col sm={3}>
                <Nav variant="pills" className="flex-column">
                  <Nav.Item>
                    <Nav.Link eventKey="first" style={{ fontWeight: "bold" }}>
                      취소신청
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="second" style={{ fontWeight: "bold" }}>
                      반품신청
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
              <Col sm={9}>
                <Tab.Content>
                  <Tab.Pane
                    style={{
                      textAlign: "start",
                      padding: "10px",
                      color: "#000",
                    }}
                    eventKey="first"
                  >
                    01.주문취소 신청입금대기 중, 결제완료, 상품준비 중, 배송불가
                    상태 <br /> <br />
                    02.주문취소 &gt; 신청 정보 입력 <br /> <br />
                    03.즉시취소 완료OR 주문취소 신청 완료
                  </Tab.Pane>
                  <Tab.Pane
                    eventKey="second"
                    style={{
                      textAlign: "start",
                      padding: "10px",
                      color: "#000",
                    }}
                  >
                    01.반품신청 배송완료 상태 <br /> <br />
                    02.반품정보 입력반품방법선택 &gt; 배송 비 및 추가비용 결제{" "}
                    <br /> <br />
                    03.반품신청 완료
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </div>

        <div
          className="d-flex align-items-end"
          style={{ marginTop: "80px", borderBottom: "1px solid #000" }}
        >
          {/* 결제수단별 환불 안내 */}
          <p
            style={{
              fontSize: "1.3rem",
              fontWeight: "bold",
              marginRight: "10px",
            }}
          >
            결제수단별 환불 안내
          </p>
        </div>
        <div style={{ margin: "30px 0 100px 0" }}>
          <Tab.Container id="left-tabs-example" defaultActiveKey="first">
            <Row>
              <Col sm={3}>
                <Nav variant="pills" className="flex-column">
                  <Nav.Item>
                    <Nav.Link eventKey="first" style={{ fontWeight: "bold" }}>
                      신용카드
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="second" style={{ fontWeight: "bold" }}>
                      실시간 계좌이체
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="thd" style={{ fontWeight: "bold" }}>
                      무통장입금
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="fourth" style={{ fontWeight: "bold" }}>
                      휴대폰 결제
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
              <Col sm={9}>
                <Tab.Content>
                  <Tab.Pane
                    style={{
                      textAlign: "start",
                      padding: "10px",
                      color: "#000",
                    }}
                    eventKey="first"
                  >
                    • 승인취소 : 신용카드 승인취소는 매입이 되기 전이기 때문에
                    승인한 당일 취소됩니다. <br /> <br /> • 매입취소 : 신청 후
                    카드사에서 취소 처리가 완료되기까지 1~2주가 소요됩니다.{" "}
                    <br /> <br /> • 매입취소는 카드사 마다 다르기 때문에
                    카드사로 확인해주시기 바랍니다.
                  </Tab.Pane>
                  <Tab.Pane
                    eventKey="second"
                    style={{
                      textAlign: "start",
                      padding: "10px",
                      color: "#000",
                    }}
                  >
                    • 익일(공휴일 제외, 영업일 기준)에 실시간 계좌이체가 진행된
                    본인 계좌로 직접 입금됩니다.
                  </Tab.Pane>
                  <Tab.Pane
                    eventKey="thd"
                    style={{
                      textAlign: "start",
                      padding: "10px",
                      color: "#000",
                    }}
                  >
                    • 본인이 신청 또는 등록한 환불계좌로 입금됩니다.
                  </Tab.Pane>
                  <Tab.Pane
                    eventKey="fourth"
                    style={{
                      textAlign: "start",
                      padding: "10px",
                      color: "#000",
                    }}
                  >
                    • 당일취소/반품 : 당월에 취소/반품 완료되는 경우, 즉시
                    환불됩니다. <br /> (휴대폰 청구서에 미 포함됨. 부분
                    취소/반품인 경우, 환불금액을 뺀 나머지 금액이 휴대폰
                    청구서에 포함됨) <br /> <br /> • 익월취소/반품 : 익월에
                    취소/반품 완료되는 경우, 예치금 혹은 고객계좌로
                    환불됩니다.(휴대폰 청구서에 포함됨)
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </div>
      </Stack>
    </>
  );
};

export default Refund;
