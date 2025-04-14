import React, { useEffect, useState } from "react";
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
  // 기본적으로 첫 번째 탭을 활성화
  const [activeKey, setActiveKey] = useState("#my-orders"); 

  // 페이지 새로 고침 시 activeKey 상태를 localStorage에서 불러오기
  useEffect(() => {
    const savedTab = localStorage.getItem("selectedTab");
    if (savedTab) {
      // 저장된 탭이 있으면 해당 탭을 활성화
      setActiveKey(savedTab); 
    }
  }, []);

  // 탭 선택 시 activeKey를 업데이트하고 localStorage에 저장
  const handleSelect = (selectedKey) => {
    setActiveKey(selectedKey);
    // 선택된 탭을 localStorage에 저장
    localStorage.setItem("selectedTab", selectedKey); 
  };

  return (
    <Tab.Container id="list-group-tabs-example" activeKey={activeKey} onSelect={handleSelect}>
    <Row>
      <Col sm={3}>
        <ListGroup>
          {menuItems.map((item, i) => (
            <ListGroup.Item key={i} action eventKey={item.href}>
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
