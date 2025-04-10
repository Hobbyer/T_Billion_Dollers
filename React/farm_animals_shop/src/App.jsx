import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import SalesQuestions from './admin_component/sales_Management/SalesQuestions'
import LiveStockInfo from './admin_component/livestock_management/LiveStockInfo'
import SalesQnAForm from './admin_component/sales_Management/SalesQnAForm'
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
import { useEffect } from 'react'
import { startTokenRefreshScheduler } from './apis/TokenService'
import { GET } from './apis/CRUD'
import { useDispatch } from 'react-redux'
import { setMember } from './redux/memberSlice'

const baseURL = import.meta.env.VITE_API_URL;

function App() {
  const dispatch = useDispatch();

  // 토큰 만료 시간 체크 및 갱신 로직을 여기에 추가할 수 있습니다.
  useEffect(() => {
    startTokenRefreshScheduler();

    if (sessionStorage.getItem('accessToken')) {
      GET(`${baseURL}/members/me`).then(res => {
        dispatch(setMember)({
          authority: res.data.authority,
          userId : res.data.userId,
          userName : res.data.name
        })
      })
    }
  }, [])
  // 원래 사용한 page가지고 와야함
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
          {/* Q&A 등록하기 페이지 */}
          <Route path='sales-qnaform' element={<SalesQnAForm/>}/>
          {/* Q&A 상세페이지 */}
          <Route path='sales-questions/:questionNum' element={<SalesQnADetail />} />
        </Route>

        {/* 관리자 회원처리 */}
        <Route path='/auth/login' element={<Login/>}/>
        <Route path='/auth/signup' element={<Signup/>}/>

        <Route path='/farmdas' >
          <Route index element={<Home /> } />
            {/* 일반 회원처리 */}
          <Route path='login' element={<UserLogin />} />
          {/* 일반 회원가입 */}
          <Route path='signup' element={<UserSignup />} />
          {/* 고객센터 */}
          <Route path='qna' element={<QnA />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
