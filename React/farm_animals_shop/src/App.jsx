import { Route, Routes } from 'react-router-dom'
import './App.css'
import SalesQuestions from './admin_component/sales_Management/SalesQuestions'
import LiveStockInfo from './admin_component/livestock_management/LiveStockInfo'
import SalesMemberInfo from './admin_component/sales_Management/SalesMemberInfo'
import SalesPaymentInfo from './admin_component/sales_Management/SalesPaymentInfo'
import SalesQnAForm from './admin_component/sales_Management/SalesQnAForm'
import AdminMain from './admin_component/main/AdminMain'
import AdminPullContents from './admin_component/main/AdminPullContents'
import Login from './admin_component/auth/Login'
import 'bootstrap/dist/css/bootstrap.min.css';
import TestMain from './admin_component/test_components/TestMain'

function App() {
  // 원래 사용한 page가지고 와야함
  return (
    <>
       <Routes>
        <Route path='/admin' element={<AdminMain/>}>
          {/* 화면 첫 페이지 컨텐츠를 보여줌 */}
          <Route path='' element={<AdminPullContents/>}/>
          {/* 축산 상세 페이지 */}
          <Route path='stock-detail' element={<LiveStockInfo/>}/>
          {/* 회원 정보 페이지 */}
          <Route path='sales-memberInfo' element={<SalesMemberInfo/>}/>
          {/* 매출정보및 결제현황 정보 페이지 */}
          <Route path='sales-paymentInfo' element={<SalesPaymentInfo/>}/>
          {/* 질의응답 페이지 */}
          <Route path='sales-questions' element={<SalesQuestions/>}/>
          {/* Q&A 등록하기 페이지 */}
          <Route path='sales-qnaform' element={<SalesQnAForm/>}/>
          {/* Q&A 상세페이지 */}
          <Route path='sales-questions/:questionNum' element={<div></div>} />
        </Route>
        <Route path='/auth/login' element={<Login/>}/>
      </Routes>
    </>
  )
}

export default App
