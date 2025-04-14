import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import SalesQuestions from './admin_component/sales_Management/SalesQuestions'
import LiveStockInfo from './admin_component/livestock_management/LiveStockInfo'
import AdminMain from './admin_component/main/AdminMain'
import Login from './admin_component/auth/Login'
import SalesQnADetail from './admin_component/sales_Management/SalesQnADetail'

import 'bootstrap/dist/css/bootstrap.min.css'
import Signup from './admin_component/auth/Signup'
import Home from './web_component/Home'
import UserLogin from './web_component/UserLogin'
import UserSignup from './web_component/UserSignup'
import QnA from './web_component/QnA'
import SalesManage from './admin_component/sales_Management/SalesManage'
import { useEffect, useState } from 'react'
import { startTokenRefreshScheduler } from './apis/TokenService'
import { GET } from './apis/CRUD'
import { useDispatch } from 'react-redux'

import FarmdasLayout from './web_component/FarmdasLayout'
import Cart from './web_component/Cart'

import MyPageLayout from './web_component/my_page/page/MyPageLayout'

import { clearMember, setMember } from './redux/memberSlice'


const baseURL = import.meta.env.VITE_API_URL;

function App() {
  const dispatch = useDispatch();

  // 토큰 만료 시간 체크 및 갱신 로직을 여기에 추가할 수 있습니다.
  useEffect(() => {
    
    const token = sessionStorage.getItem('accessToken');

    if (token) {
      startTokenRefreshScheduler();
    } else {
      dispatch(clearMember());
    }
  }, [])

  
  return (
    <>
      <Routes>
        <Route path='/' element={<Navigate to='/farmdas' replace />} />

        <Route path='/admin' element={<AdminMain/>}>
         
          {/* 축산 상세 페이지 */}
          <Route path='' element={<LiveStockInfo/>}/>

          {/* SalesManage */}
          <Route path='sales-manage' element={<SalesManage />}/>

          {/* 회원 정보 페이지 */}

          {/* 매출정보및 결제현황 정보 페이지 */}

          {/* 질의응답 페이지 */}
          <Route path='sales-questions' element={<SalesQuestions/>}/>
          {/* Q&A 상세페이지 */}
          <Route path='sales-questions/:questionNum' element={<SalesQnADetail />} />
          {/* Q&A 답글 작성 페이지 */}

        </Route>

        {/* 관리자 회원처리 */}
        <Route path='/auth/login' element={<Login/>}/>
        {/* <Route path='/auth/signup' element={<Signup/>}/> */}

        
        {/* 일반 회원처리 */}
        <Route path='/farmdas/login' element={<UserLogin />} />

        {/* 일반 회원가입 */}
        <Route path='/farmdas/signup' element={<UserSignup />} />


        <Route path='/farmdas' element={<FarmdasLayout />}>
          <Route index element={<Home /> } />
          {/* 고객센터 */}
          <Route path='qna' element={<QnA />} />
          {/* 장바구니 */}
          <Route path='cart/:userId' element={<Cart />} />

          {/* 페이지 생성 및 구현해야되는 컴포넌트들 */}
          {/* 주문내역 */}
          <Route path='order' element={<div>주문내역</div>} />
          {/* 마이페이지 */}
          <Route path='mypage/:userId' element={<MyPageLayout/>} />
          {/* 상품상세 */}
          <Route path='product/:productId' element={<div>상품상세</div>} />
          {/* 상품리스트 */}
          <Route path='product' element={<div>상품리스트</div>} />
          {/* 카테고리별 상품리스트 */}
          <Route path='product/:category' element={<div>상품리스트</div>} />

        </Route>
      </Routes>
    </>
  )
}

export default App
