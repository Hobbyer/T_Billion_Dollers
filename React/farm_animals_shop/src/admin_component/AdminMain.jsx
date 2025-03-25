import React from 'react'
import AdminHeader from './AdminHeader'
import AdminSideMenu from './AdminSideMenu'
import { Link, Outlet } from 'react-router-dom'
import LiveStockTemperature from './livestock_management/LiveStockTemperature'

const AdminMain = () => {
  // 관리자 메인 페이지
  return (
    
    <div>
      <div>
        <AdminHeader/>
      </div>
      <div>
        <div>
          <AdminSideMenu/>
        </div>
        <div>
          <Outlet/>
        </div>
      </div>
    </div>
    
  )
}

export default AdminMain