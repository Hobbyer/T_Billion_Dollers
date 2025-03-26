import { Route, Routes } from 'react-router-dom'
import AdminMain from './admin_component/AdminMain'
import './App.css'
import SalesQuestions from './admin_component/sales_Management/SalesQuestions'
import AdminPullContents from './admin_component/AdminPullContents'
import LiveStockInfo from './admin_component/livestock_management/LiveStockInfo'
import SalesMemberInfo from './admin_component/sales_Management/SalesMemberInfo'
import SalesPaymentInfo from './admin_component/sales_Management/SalesPaymentInfo'

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
          {/* 질의응답 페이지 */}
          <Route path='sales-questions' element={<SalesQuestions/>}/>
        </Route>
      </Routes>
      
    </>
  )
}

export default App
