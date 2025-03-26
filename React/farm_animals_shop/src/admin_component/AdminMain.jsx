import React, { useState } from 'react'
import AdminHeader from './AdminHeader'
import AdminSideMenu from './AdminSideMenu'
import { Link, Outlet } from 'react-router-dom'
import styles from './Admin.module.css'

const AdminMain = () => {
  // 관리자 메인 페이지
  return (
    
    <div className={styles.admin_main}>
      <div>
        <AdminHeader/>
      </div>
      <div className={styles.admin_main_contents}>
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