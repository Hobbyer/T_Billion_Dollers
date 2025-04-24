import React from "react";
import WebHeader from "./WebHeader";
import { Outlet, useLocation } from "react-router-dom";
import { Container, Row } from "react-bootstrap";
import Menu from "./search/page/Menu";
import SearchBar from "./search/page/SearchBar";

const FarmdasLayout = () => {

  const location = useLocation();

  // 숨기고 싶은 경로들
  const hideMenuPaths = ["/farmdas/cart", "/farmdas/mypage"];

  // 현재 경로가 숨김 조건에 맞는지 확인
  const shouldHideMenu = hideMenuPaths.some((path) =>
    location.pathname.startsWith(path)
  );

  return (
    <>
      <Container className="text-center mt-3">
        <div style={{ width: "100%", borderBottom: "1px solid lightgray" }}>
          <WebHeader />
        </div>
        {!shouldHideMenu && (
        <div className="d-flex align-items-center mt-3 mb-2">
          <Menu />
          <SearchBar />
        </div>
      )}
        <div style={{ width: "100%" }}>
          <Outlet />
        </div>
      </Container>
    </>
  );
};

export default FarmdasLayout;
