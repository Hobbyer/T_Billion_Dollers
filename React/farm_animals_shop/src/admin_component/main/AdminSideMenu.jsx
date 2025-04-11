// AdminSideMenu.jsx
import React, { useState, useEffect } from 'react';
import { Offcanvas } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

const AdminSideMenu = ({ show, onClose, isMobile }) => {
  const [activeMenu, setActiveMenu] = useState('stock');
  const location = useLocation();

  const menuItems = [
    { id: 'stock', to: '/admin', defaultImg: '/imgs/animal.png', activeImg: '/imgs/cow (1).png', label: 'STOCK' },
    { id: 'sales', to: '/admin/sales-manage', defaultImg: '/imgs/group.png', activeImg: '/imgs/customer.png', label: 'SALES' },
  ];

  useEffect(() => {
    const current = menuItems.find((item) => location.pathname.includes(item.id));
    if (current) setActiveMenu(current.id);
  }, [location]);

  // 📱 모바일용 오프캔버스
  if (isMobile) {
    return (
      <Offcanvas show={show} onHide={onClose} backdrop responsive="lg">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>관리자 메뉴</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {menuItems.map((item) => (
            <Link key={item.id} to={item.to} className="d-flex align-items-center mb-3 text-decoration-none text-dark" onClick={onClose}>
              <img src={activeMenu === item.id ? item.activeImg : item.defaultImg} alt="" width={40} height={40} className="me-2" />
              <span>{item.label}</span>
            </Link>
          ))}
        </Offcanvas.Body>
      </Offcanvas>
    );
  }

  // 💻 데스크탑용 고정 메뉴
  return (
    <div className="sidemenu">
      <div className="d-flex flex-column align-items-center text-white rounded-4 shadow" style={{
        width: "100px",
        padding: "50px",
        backgroundColor: "#3D8D7A",
      }}>
        {menuItems.map((item) => (
          <div key={item.id} className="btn mb-3 p-3" onClick={() => setActiveMenu(item.id)}>
            <Link to={item.to} style={{ textDecoration: 'none', color: 'inherit' }}>
              <img src={activeMenu === item.id ? item.activeImg : item.defaultImg} alt="" width={50} height={50} />
              <div>{item.label}</div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminSideMenu;
