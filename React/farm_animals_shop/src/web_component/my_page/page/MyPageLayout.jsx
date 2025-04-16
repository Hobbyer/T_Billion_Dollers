import React, { useState, useEffect } from "react";
import MySidebar from "./MySidebar";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const MyPageLayout = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 컴포넌트 마운트 시 로그인 여부 확인
  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");
    setIsLoggedIn(token);
  }, []);

  return (
    <div>
      {isLoggedIn ? (
        <div>
          <MySidebar />
        </div>
      ) : (
        <div className="login-required mt-5">
          <h3 className="mb-5 fw-semibold">로그인이 필요한 서비스 입니다.</h3>
          <Button
            style={{ backgroundColor: "#3D8D7A", border: "none" }}
            onClick={() => navigate("/farmdas/login")}
          >
            로그인 하러 가기
          </Button>
        </div>
      )}
    </div>
  );
};

export default MyPageLayout;
