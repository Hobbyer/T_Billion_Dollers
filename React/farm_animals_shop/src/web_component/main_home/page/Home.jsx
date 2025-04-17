import React, { useEffect, useState } from "react";
import Menu from "../../search/page/Menu";
import SearchBar from "../../search/page/SearchBar";
import { Outlet } from "react-router-dom";

const baseURL = import.meta.env.VITE_API_URL;

const Home = () => {
  const [selectedDropdown, setSelectedDropdown] = useState(0);
  const dropdownItems = [
    { name: "Action" },
    { name: "Another action" },
    { name: "Something else" },
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
        {/* 헤더 및 메뉴 검색바 */}
        
        <div>
          <Outlet/>
        </div>
      </div>
    </>
  );
};

export default Home;
