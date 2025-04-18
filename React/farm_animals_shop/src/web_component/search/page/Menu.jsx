import React from "react";
import { Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const Menu = () => {
  return (
    <>
      <style>
        {`
          .custom-nav-link:hover {
            color: #198754 !important;
          }
        `}
      </style>
      <Container>
        <Nav activeKey="/farmdas/cate">
          <Nav.Item>
            <Nav.Link as={Link} to="/farmdas/cate" className="custom-nav-link">
              전체 상품
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              as={Link}
              to="/farmdas/cate/beef"
              className="custom-nav-link"
            >
              한우
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              as={Link}
              to="/farmdas/cate/pork"
              className="custom-nav-link"
            >
              양돈
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              as={Link}
              to="/farmdas/cate/set"
              className="custom-nav-link"
            >
              세트 상품
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Container>
    </>
  );
};

export default Menu;
