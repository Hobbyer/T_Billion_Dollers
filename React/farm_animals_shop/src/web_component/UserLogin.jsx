import axios from 'axios'
import React, { useState } from 'react'
import { Form, Button, Container, Stack, Col, Row, Image } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const baseURL = import.meta.env.VITE_API_URL;
 
 
const UserLogin = () => {
  const nav = useNavigate();
  sessionStorage.clear();
 
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
    axios.post(`${baseURL}/auth/login`, user)
      .then(res => {
        sessionStorage.setItem('accessToken', res.data.accessToken)
        nav('/farmdas')
      })
      .catch(err => {
        console.error(err)
      })
  }
 
  return (
    <>
      <Container className='d-flex justify-content-center align-items-center' style={{ minHeight: '100vh' }}>
        <div>
          <div className='text-center mb-5'>
            <Image src='/public/imgs/animal.png' width="100px" className='mb-3' />
            <h1>Farmdas</h1>
          </div>
          <Form style={{ width: '300px', marginTop: '20px' }} onSubmit={(e) => {
              e.preventDefault(); // 새로고침 방지
              submitLogin();      // 로그인 함수 실행
            }
          }>
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <Form.Label>아이디</Form.Label>
              <Form.Control type="text" name='userId' placeholder="User ID" onChange={(e) => {
                saveData(e)
              }} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Label>비밀번호</Form.Label>
              <Form.Control type="password" name='password' placeholder="Password" autoComplete='off' onChange={(e) => {
                saveData(e)
              }} />
            </Form.Group>
            <Stack>
              <Button type='submit' variant="success">
                로그인
              </Button>
            </Stack>
          </Form>
        </div>
      </Container>
    </>
  )
 }
 
 export default UserLogin