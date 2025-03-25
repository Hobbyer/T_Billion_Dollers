import { Route, Routes } from 'react-router-dom'
import AdminMain from './admin_component/AdminMain'
import './App.css'
import LiveStockTemperatrue from './admin_component/livestock_management/LiveStockTemperature'
import SalesQuestions from './admin_component/sales_Management/SalesQuestions'

function App() {
  return (
    <>
      <Routes>
        <Route path='/admin' element={<AdminMain/>}>
          {/* 온도 상세 페이지 */}
          <Route path='stock-temperature' element={<LiveStockTemperatrue/>}/>
          {/* 질의응답 페이지 */}
          <Route path='sales-questions' element={<SalesQuestions/>}/>
        </Route>
      </Routes>
      
    </>
  )
}

export default App
