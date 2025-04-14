import React, { useState } from "react";
import { Nav, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const WebHeader = () => {
  const nav = useNavigate();

  const [reload, setReload] = useState(false);

  if (sessionStorage.getItem("accessToken") !== null) {
    var user = jwtDecode(sessionStorage.getItem("accessToken"));
  } else {
    user = "비회원";
  }
  const dispatch = useDispatch();

  const [myPage, setMyPage] = useState("/public/imgs/black_face.jpg");

  const userValidate = () => {
    if (sessionStorage.getItem("accessToken") === null) {
      alert("로그인 후 이용 가능합니다.");
      setReload(!reload);
      return false;
    } else {
      return true;
    }
  };

  return (
    <>
      <style type="text/css">
        {`
          a.nav-link {
            color: black;
          }
          a.nav-link:focus {
            color: black;
          }
        `}
      </style>

      <article className="text-end" style={{ fontSize: "13px" }}>
        <Nav className="justify-content-end">
          {sessionStorage.getItem("accessToken") ? (
            <>
              <Nav.Item>
                <Nav.Link className="px-2">{user.sub} 님</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  className="px-2"
                  onClick={() => {
                    sessionStorage.clear();
                    setReload(!reload);
                  }}
                >
                  로그아웃
                </Nav.Link>
              </Nav.Item>
            </>
          ) : (
            <>
              <Nav.Item>
                <Nav.Link href="/farmdas/login" className="px-2">
                  로그인
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="/farmdas/signup" className="px-2">
                  회원가입
                </Nav.Link>
              </Nav.Item>
            </>
          )}
          <Nav.Item>
            <Nav.Link
              className="px-2"
              onClick={() => {
                userValidate() ? nav("/farmdas/qna") : setReload(!reload);
              }}
            >
              고객센터
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </article>
      <header className="mb-3 d-flex align-items-center justify-content-between">
        <div className="display-6 align-items-center d-flex">
          <img
            alt=""
            src="/imgs/animal.png"
            width="50"
            height="50"
            className="d-inline-block align-top me-2"
            onClick={() => {
              nav("/farmdas/");
            }}
            style={{ cursor: "pointer" }}
          />
          <span
            style={{ fontWeight: "bold", color: "#3D8D7A",cursor:"pointer"}}
            onClick={() => {
              nav("/farmdas/");
            }}
          >
            FARMDAS
          </span>
        </div>
        <Nav className="justify-content-end" style={{ fontSize: "14px" }}>
          <Nav.Item>
            <Nav.Link
              onClick={() => {
                nav(`/farmdas/cart/${user.sub}`);
              }}
              className="px-2"
            >
              <Image
                src="/imgs/basket.jpg"
                roundedCircle
                style={{
                  border: "1px solid black",
                  width: "40px",
                  height: "40px",
                }}
              />
              <p>장바구니</p>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="link-1" className="px-2">
              <Image
                src="/imgs/recipe.jpg"
                roundedCircle
                style={{
                  border: "1px solid black",
                  width: "40px",
                  height: "40px",
                }}
              />
              <p>결제내역</p>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href={`/farmdas/mypage/${user.sub}`} className="px-2">
              <Image
                src={myPage}
                roundedCircle
                style={{
                  border: "1px solid black",
                  width: "40px",
                  height: "40px",
                }}
                onMouseOver={() => setMyPage("/public/imgs/white_face.jpg")}
                onMouseOut={() => setMyPage("/public/imgs/black_face.jpg")}
              />
              <p>마이페이지</p>
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </header>
    </>
  );
};

export default WebHeader;
