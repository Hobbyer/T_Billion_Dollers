import React, { useEffect, useState } from 'react'

import { Link, Outlet } from 'react-router-dom'
import AdminSideMenu from './AdminSideMenu'
import { GET } from '../../apis/CRUD'
import Header from './Header'

const AdminMain = () => {
  
  const [userAuth,setUserAuth] = useState()

  useEffect(()=>{
    // 세션 스토리지에 accessToken이 없으면 로그인 페이지로 이동
    if (!sessionStorage.getItem('accessToken')){
      window.location.href = '/auth/login'      
    } else {
      GET('/api/members/me')
        .then(res => {
          setUserAuth(res.data.authority)
        })
        .catch(err => {
          console.error(err)
        })
    }
  },[])
  
  return (
    <>
    { userAuth !== 'ROLE_ADMIN' ?
      null
      :
      <div className='container' style={{minWidth:'1000px'}}>
        <Header/>
        <div className="d-flex rounded-4 mb-5 p-3" style={{
          borderWidth:'10px'
          ,borderStyle:'solid'
          ,borderColor:'#3F7D58'
        }}>
        <div>
          <AdminSideMenu/>
        </div>
        <div className="flex-grow-1 px-3">
          <Outlet /> 
        </div>
      </div>
   </div>
}
    </>
   
  )
}

export default AdminMain