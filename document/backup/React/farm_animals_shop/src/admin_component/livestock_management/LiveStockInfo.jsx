import React from "react";
import LiveStockTemperature from "./LiveStockTemperature";
import LiveStockHumidity from "./LiveStockHumidity";
import WeatherCard from "./WeatherCard";
import { Card, CardBody, CardLink, Col, Row } from "react-bootstrap";
import LiveStockManage from "./LiveStockManage";

const LiveStockInfo = () => {
  // 축산 환경 상세 페이지
  return (
    <>
      <div className="container-fuild">
        <div className="row" style={{ width: "100%", height: "100%" }}>
          <LiveStockManage/>
          {/* 왼쪽 박스들 */}
          <div className="col-md-5 flex-grow-1">
            <Row xs={1} md={2} className="g-3 align-items-stretch">
              <Col sm className="d-flex">
                <Card className="h-100 w-100 shadow-sm">
                  <Card.Text>HUMIDITY</Card.Text>
                  <div className="w-100 h-100">
                    <LiveStockHumidity/>
                  </div>
                </Card>
              </Col>
              <Col sm className="d-flex">
                <Card className="h-100 w-100 shadow-sm">
                  <Card.Text>WEATHER</Card.Text>
                  <div className="w-100 h-100">
                    <WeatherCard/>
                  </div>
                </Card>
              </Col>
              <Col xl className="d-flex">
                <Card className="h-100 w-100 shadow-sm">
                    
                    <CardBody className="d-flex flex-column justify-content-center align-items-stretch">
                      <LiveStockTemperature/>
                    </CardBody>
                   
                </Card>
              </Col>
            </Row>
          </div>

          {/* 오른쪽 핵심 내용 */}
          <div className="col-md-5 flex-grow-1">
          <Row xs={1} md={2} className="g-3 align-items-stretch">
              <Col sm className="d-flex">
                <Card className="h-100 w-100 shadow-sm">
                  <div className="w-100 h-100">
                    부저
                  </div>
                </Card>
              </Col>
              <Col sm className="d-flex">
                <Card className="h-100 w-100 shadow-sm">
                  <div className="w-100 h-100">
                    <WeatherCard/>
                  </div>
                </Card>
              </Col>
              <Col xl className="d-flex">
                <Card className="h-100 w-100 shadow-sm">
                    <LiveStockTemperature/>
                </Card>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </>
  );
};

export default LiveStockInfo;
