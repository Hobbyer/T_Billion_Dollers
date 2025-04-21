import React from "react";
import LiveStockTemperature from "./temperrature/LiveStockTemperature";
import LiveStockHumidity from "./humidity/LiveStockHumidity";
import WeatherCard from "./WeatherCard";
import {
  Card,
  CardBody,
  CardTitle,
  Col,
  Row,
  Container,
} from "react-bootstrap";
import TemperatureCard from "./temperrature/TemperatureCard";
import HumidityCard from "./humidity/HumidityCard";

// 공통 스타일
const commonCardStyle = {
  borderWidth: "5px",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // 약간의 그림자 효과
  borderColor: "#73c8a9",
  borderRadius:"15px"
};

const LiveStockInfo = () => {
  return (
    <Container fluid>
      <Row>
        <Col xs={12} md={12} className="p-3 d-flex flex-column">
          <Row>
            <Col xs={12} md={8} className="mb-4">
              {/* 온도 그래프 */}
              <Card className="w-100 h-100 shadow" style={commonCardStyle}>
                <CardTitle>
                  <h3 className="text-center mt-3" style={{marginBottom:"none"}}>온도 데이터 (실시간)</h3>
                </CardTitle>
                <CardBody className="d-flex flex-column justify-content-center align-items-stretch">
                  <LiveStockTemperature />
                </CardBody>
              </Card>
            </Col>

            <Col xs={12} md={4}>
              <div>
                <h3>축사의 현재 상태</h3>
                <TemperatureCard />
                <HumidityCard />
              </div>
            </Col>
          </Row>

          {/* Humidity + Weather Cards */}
          <Row className="g-3" style={{ flex: 2 }}>
            <Col xs={12} md={5}>
              <Card className="w-100 shadow p-3 h-100" style={commonCardStyle}>
                <CardTitle>
                  <h3 className="text-center">습도 (실시간)</h3>
                </CardTitle>
                <CardBody className="p-2 d-flex justify-content-center align-items-center">
                  <LiveStockHumidity />
                </CardBody>
              </Card>
            </Col>

            <Col xs={12} md={7}>
              <Card className="w-100 shadow p-3 h-100" style={commonCardStyle}>
                <CardTitle>
                  <h3 className="text-center">현재 날씨 & 5일 예보</h3>
                </CardTitle>
                <CardBody className=" d-flex justify-content-evenly align-items-center p-0">
                  <WeatherCard className="w-100" />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default LiveStockInfo;
