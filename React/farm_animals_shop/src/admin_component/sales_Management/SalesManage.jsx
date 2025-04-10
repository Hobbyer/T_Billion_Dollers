import React, { useEffect, useState } from 'react'

import { Button, Container, Figure, Form, InputGroup, Modal, Nav, Navbar, Pagination, Table } from 'react-bootstrap'
import SalesQuestions from './SalesQuestions';
import SalesInfo from './SalesInfo';
import ItemList from './ItemList';
import { useNavigate, useOutletContext } from 'react-router-dom';

const SalesManage = () => {
  const nav = useNavigate();

  const { userAuth } = useOutletContext();

  const [activeTab, setActiveTab] = useState('salesInfo');

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
          <Nav className="me-auto" defaultActiveKey={'#salesInfo'}>
            <Nav.Link href="#salesInfo" onClick={() => setActiveTab('salesInfo')}>매출액 정보</Nav.Link>
            <Nav.Link href="#itemManage" onClick={() => setActiveTab('itemManage')}>상품 관리</Nav.Link>
            <Nav.Link href="#3">주문 정보</Nav.Link>
            <Nav.Link href="#4">회원 정보</Nav.Link>
            <Nav.Link href="#QnA" onClick={() => setActiveTab('QnA')} >QnA</Nav.Link>
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
        <SalesInfo userAuth={userAuth}/>
      )}

      {activeTab === 'itemManage' && (
        <ItemList userAuth={userAuth}/>
      )}

      {activeTab === 'QnA' && (
        <SalesQuestions userAuth={userAuth}/>
      )}

    </>
  )
}

export default SalesManage