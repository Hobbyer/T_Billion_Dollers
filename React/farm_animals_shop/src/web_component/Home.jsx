import React, { useEffect, useState } from "react";
import WebItemList from "./WebItemList";
import { GET } from "../apis/CRUD";
import { jwtDecode } from "jwt-decode";
import {
  Container,
  Image,
  Nav,
  Navbar,
  Form,
  Row,
  Col,
  Button,
  Dropdown,
  Carousel,
} from "react-bootstrap";
import Menu from "./search/page/Menu";
import SearchBar from "./search/page/SearchBar";

const baseURL = import.meta.env.VITE_API_URL;

const Home = () => {
  const [selectedDropdown, setSelectedDropdown] = useState(0);
  const dropdownItems = [
    { name: "Action" },
    { name: "Another action" },
    { name: "Something else" },
  ];

  const bannerImages = [
    "/imgs/banner1.jpg",
    "/imgs/banner2.jpg",
    "/imgs/banner3.jpg",
  ];

  useEffect(() => {
    // 토글 드랍다운 아이템을 3초마다 변경하는 타이머 설정
    const interval = setInterval(() => {
      setSelectedDropdown(
        (prevIndex) => (prevIndex + 1) % dropdownItems.length
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <style type="text/css">
        {`
          .carousel-control-prev-icon,
          .carousel-control-next-icon {
            background-color: rgba(0, 0, 0, 0.5); /* 반투명 배경 */
            border-radius: 50%;
            width: 50px;
            height: 50px;
            background-size: 60% 60%;
            background-position: center;
            background-repeat: no-repeat;
          }

          /* 버튼 위치도 조금 조절 가능해요 */
          .carousel-control-prev,
          .carousel-control-next {
            top: 50%;
            transform: translateY(-50%);
            opacity: 1; /* 항상 보이게 */
          }
        `}
      </style>
      <div>
        <div className="d-flex justify-content-end mt-3 mb-2">
          <Menu/>
          <SearchBar/>
        </div>
      </div>
      <div className="image-container mb-5 mt-4" width="100%">
        <Carousel data-bs-theme="dark">
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={bannerImages[0]}
              alt="First slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={bannerImages[1]}
              alt="Second slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={bannerImages[2]}
              alt="Third slide"
            />
          </Carousel.Item>
        </Carousel>
      </div>
      <div>
        <WebItemList />
      </div>
    </>
  );
};

export default Home;
