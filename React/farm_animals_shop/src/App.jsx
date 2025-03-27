import { Route, Routes } from 'react-router-dom'
import './App.css'
import SalesQuestions from './admin_component/sales_Management/SalesQuestions'
import LiveStockInfo from './admin_component/livestock_management/LiveStockInfo'
import SalesMemberInfo from './admin_component/sales_Management/SalesMemberInfo'
import SalesPaymentInfo from './admin_component/sales_Management/SalesPaymentInfo'
import SalesQnAForm from './admin_component/sales_Management/SalesQnAForm'
import AdminMain from './admin_component/main/AdminMain'
import AdminPullContents from './admin_component/main/AdminPullContents'

function App() {
  return (
    <>
      <Routes>
        <Route path='/admin' element={<AdminMain/>}>
          <Route path='' element={<AdminPullContents/>}/>
          {/* 축산 상세 페이지 */}
          <Route path='stock-detail' element={<LiveStockInfo/>}/>
          {/* 회원 정보 페이지 */}
          <Route path='sales-memberInfo' element={<SalesMemberInfo/>}/>
          {/* 매출정보및 결제현황 정보 페이지 */}
          <Route path='sales-paymentInfo' element={<SalesPaymentInfo/>}/>
          {/* Q&A 등록하기 페이지 */}
          <Route path='sales-qnaform' element={<SalesQnAForm/>}/>
          {/* 질의응답 페이지 */}
          <Route path='sales-questions' element={<SalesQuestions/>}/>
        </Route>
      </Routes>
      
    </>
  )
}

export default App
