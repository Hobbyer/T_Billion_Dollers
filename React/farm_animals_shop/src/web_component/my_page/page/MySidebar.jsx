import React from "react";
import { Col, ListGroup, Row, Tab, TabPane } from "react-bootstrap";
import OrderList from "./OrderList";
import Refund from "./Refund";
import MyQnA from "./MyQnA";
import MyInfo from "./MyInfo";

const menuItems = [
  { label: "주문 내역", href: "#my-orders", content: <OrderList/> },
  {
    label: "취소/환불 내역",
    href: "#my-refund",
    content: <Refund/>,
  },
  { label: "문의 내역", href: "#my-qna", content: <MyQnA/> },
  { label: "개인정보 수정", href: "#my-page", content: <MyInfo/> },
];

const MySidebar = () => {
  return (
    <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
      <Row>
        <Col sm={3}>
          <ListGroup>
            {menuItems.map((item, i) => (
              <ListGroup.Item key={i} action href={item.href}>
                {item.label}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>

        <Col sm={9}>
          <Tab.Content>
            {menuItems.map((item, i) => (
              <Tab.Pane key={i} eventKey={item.href}>
                {/*  */}
                {item.content} 
              </Tab.Pane>
            ))}
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
  );
};

export default MySidebar;
