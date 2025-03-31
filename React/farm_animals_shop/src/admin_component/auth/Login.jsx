import axios from 'axios'
import React, { useState } from 'react'

const Login = () => {

  const [user,setUser] = useState({
    userId: '',
    password: ''
  })

  const saveData = (e) => {
    setUser({
      ...user,
      [e.target.name] : e.target.value
    })
  }

  const submitLogin = () => {
    axios.post('/api/auth/login', user)
      .then(res => {
        sessionStorage.setItem('accessToken', res.data.accessToken)
        // sessionStorage.setItem('authority', res.data.authority)
      })
      .catch(err => {
        console.error(err)
      })
  }

  return (
    <>
      <div>Login</div>
      <div>
        <input type="text" name='userId' onChange={(e)=>{
          saveData(e)
        }} />
        <input type="password" name='password' onChange={(e)=>{
          saveData(e)
        }} />
        <button type='button' onClick={(e)=>{
          submitLogin()
        }}>Login</button>
        <button type='button' onClick={(e)=>{
          sessionStorage.clear()
        }}>로그아웃</button>
      </div>
    </>
  )
}

export default Login