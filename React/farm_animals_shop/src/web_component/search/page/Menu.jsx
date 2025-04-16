import React from "react";
import { Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const Menu = () => {
  return (
    <Container>
      <Nav activeKey="/home">
        <Nav.Item>
          <Nav.Link as={Link} to="/farmdas/all-products">전체 상품</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-1">Link</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-2">Link</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-3">
            Disabled
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </Container>
  );
};

export default Menu;
