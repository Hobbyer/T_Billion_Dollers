import React from "react";
import { Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const Menu = () => {
  return (
    <Container>
      <Nav activeKey="/farmdas/cate">
        <Nav.Item>
          <Nav.Link as={Link} to="/farmdas/cate">전체 상품</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/farmdas/cate/beef">한우</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/farmdas/cate/pork">양돈</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/farmdas/cate/set">
            세트 상품
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </Container>
  );
};

export default Menu;
