import React, { useEffect, useState } from 'react'
import { Container, Image, Nav, Navbar, Form, Row, Col, Button, Dropdown } from 'react-bootstrap'
import WebHeader from './WebHeader'
import { GET } from '../apis/CRUD'

const baseURL = import.meta.env.VITE_API_URL;

const Home = () => {

  const [selectedDropdown, setSelectedDropdown] = useState(0);
  const dropdownItems = [{ name: "Action" }, { name: "Another action" }, { name: "Something else" }];

  const bannerImages = [
    "/imgs/animal.png",
    "/imgs/customer.png",
    "/imgs/black_face.jpg",
    "/imgs/white_face.jpg",
    "/imgs/basket.jpg",
  ];

  useEffect(() => {

    // 토글 드랍다운 아이템을 3초마다 변경하는 타이머 설정
    const interval = setInterval(() => {
      setSelectedDropdown((prevIndex) => (prevIndex + 1) % dropdownItems.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Container className="text-center mt-3 mx-auto">
        <div style={{ padding: "0 100px", minWidth: "800px" }}>
          <div>
            <WebHeader />
          </div>
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
                  <Image alt="상품" />
                  {dropdownItems[selectedDropdown].name}
                </Dropdown.Toggle>

                <Dropdown.Menu style={{ width: "200px" }}>
                  {dropdownItems.map((item, i) => (
                    <Dropdown.Item
                      key={i}
                      active={i === selectedDropdown}
                    >
                      <Image alt="상품" />
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
                  cursor: "pointer",
                }}
                onClick={()=> {}}
              />
            </div>
          </div>
        </div>
        <div className="image-container" width="100%">
          <Image
            src={bannerImages[selectedDropdown]} // 수정필요 임시 드랍다운 인덱스로 설정
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