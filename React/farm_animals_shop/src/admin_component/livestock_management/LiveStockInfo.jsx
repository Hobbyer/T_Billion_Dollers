import React from "react";
import LiveStockTemperature from "./LiveStockTemperature";
import LiveStockHumidity from "./LiveStockHumidity";
import WeatherCard from "./WeatherCard";
import {
  Card,
  CardBody,
  CardTitle,
  Col,
  Row,
  Container,
} from "react-bootstrap";

const LiveStockInfo = () => {
  return (
    <Container fluid>
      <Row>
        <Col xs={12} md={12} className=" p-3 d-flex flex-column">
          {/* Temperature Graph */}
          <Card className="w-100 shadow-sm mb-4" style={{ flex: 3 }}>
            <CardTitle>
              <h3 className="text-center mt-3">온도 데이터 (실시간)</h3>
            </CardTitle>
            <CardBody className="d-flex flex-column justify-content-center align-items-stretch">
              <LiveStockTemperature />
            </CardBody>
          </Card>

          {/* Humidity + Weather Cards */}
          <Row className="g-3" style={{ flex: 2 }}>
            <Col xs={12} md={6}>
              <Card className="w-100 shadow-sm p-4 h-100">
                <CardTitle>
                  <h3 className="text-center">습도 (실시간)</h3>
                </CardTitle>
                <CardBody className="p-2 d-flex justify-content-center align-items-center">
                  <LiveStockHumidity />
                </CardBody>
              </Card>
            </Col>
            <Col xs={12} md={6}>
              <Card className="w-100 shadow-sm p-4 h-100">
                <CardTitle>
                  <h3 className="text-center">현재 날씨</h3>
                </CardTitle>
                <CardBody className="p-2 d-flex justify-content-center align-items-center">
                  <WeatherCard />
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
