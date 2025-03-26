import React, { useState } from 'react'
import AdminHeader from './AdminHeader'
import AdminSideMenu from './AdminSideMenu'
import { Link, Outlet } from 'react-router-dom'
import AdminPullContents from './AdminPullContents'

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
          {/* 클릭하면 경로에 따라 페이지 변동 */}
          <Outlet/>
        </div>
      </div>
    </div>
    
  )
}

export default AdminMain