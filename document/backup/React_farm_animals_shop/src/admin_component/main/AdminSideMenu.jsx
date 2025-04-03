import React, { useState } from "react";
import { Link } from "react-router-dom";

const AdminSideMenu = () => {
  const [activeMenu, setActiveMenu] = useState(null);

  const menuItems = [
    { id: "home", to: "/admin", defaultImg: "/imgs/home.png", activeImg: "/imgs/home-icon-silhouette.png", label: "HOME" },
    { id: "stock", to: "stock-detail", defaultImg: "/imgs/animal.png", activeImg: "/imgs/cow (1).png", label: "STOCK" },
    { id: "sales", to: "sales-paymentInfo", defaultImg: "/imgs/group.png", activeImg: "/imgs/customer.png", label: "SALES" }
  ];

  return (
    <div className="sidemenu">
      <div
        className="d-flex flex-column align-items-center text-white rounded-4"
        style={{
          width: "100px",
          padding: "50px",
          height: "100%",
          backgroundColor: "#3D8D7A",
        }}
      >
        {menuItems.map((item) => (
          <div
            key={item.id}
            className="btn mb-3 p-3"
            onClick={() => setActiveMenu(item.id)}
          >
            <Link to={item.to} style={{textDecoration:'none', color:'inherit'}}>
              <img 
                src={activeMenu === item.id ? item.activeImg : item.defaultImg} 
                alt="" 
                width={50} 
                height={50}
              />
              <span>{item.label}</span>
            </Link>
          </div>
        ))}
      </div>

      {/* 추가 하위 메뉴 언니 이거 navTab 으로  */}
      <ul>
        <li>
          <Link to={"sales-memberInfo"}>회원 정보</Link>
        </li>
        <li>
          <Link to={"sales-paymentInfo"}>매출 정보</Link>
        </li>
        <li>
          <Link to={"sales-questions"}>질의응답</Link>
        </li>
      </ul>
    </div>
  );
};

export default AdminSideMenu;
