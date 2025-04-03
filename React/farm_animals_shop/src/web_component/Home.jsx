import { color } from 'chart.js/helpers'
import React, { useEffect, useState } from 'react'
import { Container, Image, Nav, Navbar, Form, Row, Col, Button, Dropdown } from 'react-bootstrap'

const Home = () => {
  const [myPage, setMyPage] = useState("/public/imgs/black_face.jpg")

  const [selectedIndex, setSelectedIndex] = useState(0);
  const dropdownItems = [{ name: "Action" }, { name: "Another action" }, { name: "Something else" }];

  const bannerImages = [
    "/public/imgs/animal.png",
    "/public/imgs/customer.png",
    "/public/imgs/black_face.jpg",
    "/public/imgs/white_face.jpg",
    "/public/imgs/basket.jpg",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setSelectedIndex((prevIndex) => (prevIndex + 1) % dropdownItems.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <style type="text/css">
        {`
      a.nav-link {
        color: black;
      }
      `}
      </style>

      <Container className="text-center mt-3 mx-auto">
        <div style={{ padding: "0 100px" }}>
          <article className="text-end mb-4" style={{ fontSize: "13px" }}>
            <Nav className="justify-content-end">
              <Nav.Item>
                <Nav.Link href="/farmdas/login" className="px-2">
                  로그인
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="/" className="px-2">
                  회원가입
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="/" className="px-2">
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
          <div>
            <Navbar expand="lg" className="bg-body-tertiary">
              <Container>
                <Navbar.Brand href="#home">Category</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="me-auto">
                    <Nav.Link href="#home">Cate1</Nav.Link>
                    <Nav.Link href="#link">Cate2</Nav.Link>
                    <Nav.Link href="#link">Cate3</Nav.Link>
                  </Nav>
                </Navbar.Collapse>
              </Container>
            </Navbar>
          </div>
          <div className="d-flex justify-content-between mt-3 mb-2">
            <div style={{ width: "50%" }}>
              <Dropdown className="d-flex">
                <Dropdown.Toggle
                  variant="success"
                  id="dropdown-basic"
                  style={{ minWidth: "200px" }} // Set a fixed minimum width
                >
                  <Image src="" alt="상품" />
                  {dropdownItems[selectedIndex].name}
                </Dropdown.Toggle>

                <Dropdown.Menu style={{ width: "200px" }}>
                  {dropdownItems.map((item, i) => (
                    <Dropdown.Item
                      key={i}
                      active={i === selectedIndex}
                    >
                      <Image src="" alt="상품" />
                      {item.name}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </div>
            <div style={{ width: "50%", position: "relative" }}>
              <Form.Control
                type="text"
                size="md"
                style={{
                  borderRadius: "20px",
                  padding: "10px 20px",
                  height: "40px",
                }}
              />
              <Image
                src="/public/imgs/search_icon.jpg"
                style={{
                  position: "absolute",
                  top: "8px",
                  right: "16px",
                  width: "20px",
                }}
              />
            </div>
          </div>
        </div>
        <div className="image-container" width="100%">
          <Image
            src={bannerImages[selectedIndex]}
            style={{
              width: "100%",
              maxHeight: "250px",
              margin: "20px 0",
            }}
          />
        </div>
      </Container>
    </>
  );
}

export default Home