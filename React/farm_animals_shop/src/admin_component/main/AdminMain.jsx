import React, { useEffect, useState } from "react";

import { Link, Outlet, useOutletContext } from "react-router-dom";
import AdminSideMenu from "./AdminSideMenu";
import { GET } from "../../apis/CRUD";
import Header from "./Header";

const baseURL = import.meta.env.VITE_API_URL;

const AdminMain = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [menuOpen, setMenuOpen] = useState(false); // Offcanvas 열기 상태

  const [userAuth, setUserAuth] = useState({
    authority: "",
    userId: "",
  });

  useEffect(() => {
    // 세션 스토리지에 accessToken이 없으면 로그인 페이지로 이동
    if (!sessionStorage.getItem("accessToken")) {
      window.location.href = "/auth/login";
    } else {
      GET(`${baseURL}/members/me`)
        .then((res) => {
          setUserAuth({
            authority: res.data.authority,
            userId: res.data.userId,
          });
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {userAuth.authority !== "ROLE_ADMIN" ? null : (
        <div className="mb-5 container">
          <Header />
          {isMobile && (
            <div className="d-flex mb-3">
              <button
                className="btn btn-outline-lightgray"
                onClick={() => setMenuOpen(true)}
                style={{
                  width:"70px",
                  borderWidth: "1px",
                  borderStyle: "solid",
                  borderColor: "#3F7D58",
                }}
              >
                <span style={{color:"#3F7D58"}}>☰</span>
              </button>
            </div>
          )}
          <div
            className="d-flex flex-column flex-md-row rounded-4 mb-5 p-3 shadow-lg"
            style={{
              borderWidth: "10px",
              borderStyle: "solid",
              borderColor: "#3F7D58",
            }}
          >
            {/* PC에서는 항상 보이기, 모바일은 menuVisible이 true일 때만 보이기 */}
            <div className="me-md-3 mb-3 mb-md-0">
              <AdminSideMenu
                show={menuOpen}
                onClose={() => {
                  setMenuOpen(false);
                }}
                isMobile={isMobile}
              />
            </div>
            <div className=" px-3" style={{ width: "100%" }}>
              <Outlet context={{ userAuth }} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminMain;
