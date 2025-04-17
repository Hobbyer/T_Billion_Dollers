import React, { useEffect, useState } from 'react'

import { Button, Container, Figure, Form, InputGroup, Modal, Nav, Navbar, Pagination, Table } from 'react-bootstrap'
import SalesQuestions from './SalesQuestions';
import SalesInfo from './SalesInfo';
import ItemList from './ItemList';
import { useNavigate, useOutletContext } from 'react-router-dom';
import OrdersInfo from './OrdersInfo';
import MembersInfo from './MembersInfo';



const SalesManage = () => {
  const nav = useNavigate();

  // Tab의 초기 hash값 설정
  const getInitialTab = () => {
    const hash = window.location.hash.substring(1); // '#' 제거
    if (hash) {
      return hash; // URL에 hash값이 있으면 해당 Tab로 설정
    }
    // URL에 hash값이 없으면 기본값으로 설정
    return 'salesInfo'; // 기본적으로 salesInfo로 설정
  }

  const [activeTab, setActiveTab] = useState(getInitialTab()); // 초기 Tab 설정

  // Tab이 바뀔 때마다 URL에 hash값을 업데이트
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    window.location.hash = tab; // URL에 hash값 업데이트
  }

  return (
    <>
    <style>
      {`
        .nav-link {
          margin: 0 10px;
        }
        .nav-link.active {
          font-weight: bold;
        }
      `}
    </style>

      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Nav className="me-auto">
            <Nav.Link href="#salesInfo" onClick={() => handleTabChange('salesInfo')} active = {activeTab === 'salesInfo'}>매출액 정보</Nav.Link>
            <Nav.Link href="#itemManage" onClick={() => handleTabChange('itemManage')} >상품 관리</Nav.Link>
            <Nav.Link href="#ordersInfo" onClick={() => handleTabChange('ordersInfo')} >주문 정보</Nav.Link>
            <Nav.Link href="#membersInfo" onClick={() => handleTabChange('membersInfo')}>회원 정보</Nav.Link>
            <Nav.Link href="#QnA" onClick={() => handleTabChange('QnA')} >QnA</Nav.Link>
          </Nav>
          <Nav className="ml-auto">
            <Button variant="outline-success" className='mx-2' onClick={()=>{
              nav('/farmdas/')
            }} >
              쇼핑몰 바로가기
            </Button>
          </Nav>
        </Container>
      </Navbar>

      {activeTab === 'salesInfo' && (
        <SalesInfo />
      )}

      {activeTab === 'itemManage' && (
        <ItemList />
      )}

      {activeTab === 'QnA' && (
        <SalesQuestions />
      )}

      {activeTab === 'ordersInfo' && (
        <OrdersInfo />
      )}

      {activeTab === 'membersInfo' && (
        <MembersInfo />
      )}

    </>
  )
}

export default SalesManage