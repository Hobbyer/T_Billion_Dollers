import React, { useEffect, useState } from 'react'

import { Link, Outlet, useOutletContext } from 'react-router-dom'
import AdminSideMenu from './AdminSideMenu'
import { GET } from '../../apis/CRUD'
import Header from './Header'

const baseURL = import.meta.env.VITE_API_URL;

const AdminMain = () => {

  const [userAuth,setUserAuth] = useState({
    authority: '',
    userId: ''
  })

  useEffect(()=>{
    // 세션 스토리지에 accessToken이 없으면 로그인 페이지로 이동
    if (!sessionStorage.getItem('accessToken')){
      window.location.href = '/auth/login'      
    } else {
      GET(`${baseURL}/members/me`)
        .then(res => {
          setUserAuth({
            authority: res.data.authority,
            userId: res.data.userId
          })
        })
        .catch(err => {
          console.error(err)
        })
    }
  },[])
  
  return (
    <>
    { userAuth.authority !== 'ROLE_ADMIN' ?
      null
      :
      <div className='mb-5 container' style={{minWidth:'1000px', maxHeight:'700px'}}>
        <Header />
        <div className="d-flex rounded-4 mb-5 p-3 shadow-lg" style={{
          borderWidth:'10px'
          ,borderStyle:'solid'
          ,borderColor:'#3F7D58'
        }}>
        <div>
          <AdminSideMenu/>
        </div>
        <div className="flex-grow-1 px-3">
          <Outlet context={{userAuth}}/> 
        </div>
      </div>
   </div>
}
    </>
   
  )
}

export default AdminMain