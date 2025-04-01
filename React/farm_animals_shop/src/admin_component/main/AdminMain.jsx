import React, { useEffect, useState } from 'react'

import { Link, Outlet } from 'react-router-dom'
import AdminHeader from './AdminHeader'
import AdminSideMenu from './AdminSideMenu'
import '../Admin.css'
import axios from 'axios'
import ItemBox from '../../common_components/ItemBox'

const AdminMain = () => {
  
  const [userAuth,setUserAuth] = useState()

  useEffect(()=>{
    // 세션 스토리지에 accessToken이 없으면 로그인 페이지로 이동
    if (!sessionStorage.getItem('accessToken')){
      window.location.href = '/auth/login'      
    } else {
      axios.get('/api/members/me', {headers: {Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`}})
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
      <div>
        <div>
          <h1>관리자 권한이 없습니다.</h1>
        </div>
      </div>
      :
      <div className='container'>
        <div>
          <AdminSideMenu/>
        </div>
        <div>
          <div>
            <AdminHeader/>
          </div>
          <div>
            <Outlet/>
          </div>
        </div>
      </div>
    }
      
    </>
   
  )
}

export default AdminMain