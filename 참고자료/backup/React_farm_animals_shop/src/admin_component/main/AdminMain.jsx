import React, { useState } from 'react'

import { Link, Outlet } from 'react-router-dom'
import AdminHeader from './AdminHeader'
import AdminSideMenu from './AdminSideMenu'
import '../Admin.css'

const AdminMain = () => {
  // 관리자 메인 페이지
  return (
    
    <div className='container'>
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