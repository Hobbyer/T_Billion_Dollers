import React, { useState } from 'react'
import { Nav, Image } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const WebHeader = () => {
  const nav = useNavigate();

  const [myPage, setMyPage] = useState("/public/imgs/black_face.jpg")

  return (
    <>
      <style type="text/css">
        {`
          a.nav-link {
            color: black;
          }
        `}
      </style>
      <article className="text-end mb-4" style={{ fontSize: "13px" }}>
        <Nav className="justify-content-end">
          {
            sessionStorage.getItem("accessToken") ? (
              <Nav.Item>
                <Nav.Link href="/farmdas/logout" className="px-2">
                  로그아웃
                </Nav.Link>
              </Nav.Item>
            )
            : (
              <Nav.Item>
                <Nav.Link href="/farmdas/login" className="px-2">
                  로그인
                </Nav.Link>
              </Nav.Item>
            )
          }
          {}
          <Nav.Item>
            <Nav.Link href="/farmdas/signup" className="px-2">
              회원가입
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/farmdas/qna" className="px-2">
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
              nav("/farmdas/")
            }}
            style={{ cursor: "pointer" }}
          />
          FARMDAS
        </div>
        <Nav
          className="justify-content-end"
          style={{ fontSize: "14px" }}
        >
          <Nav.Item>
            <Nav.Link href="/home" className="px-2">
              <Image
                src="/public/imgs/basket.jpg"
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
                src="/public/imgs/recipe.jpg"
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
            <Nav.Link eventKey="link-2" className="px-2">
              <Image
                src={myPage}
                roundedCircle
                style={{
                  border: "1px solid black",
                  width: "40px",
                  height: "40px",
                }}
                onMouseOver={() =>
                  setMyPage("/public/imgs/white_face.jpg")
                }
                onMouseOut={() =>
                  setMyPage("/public/imgs/black_face.jpg")
                }
              />
              <p>마이페이지</p>
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </header>
    </>
  )
}

export default WebHeader