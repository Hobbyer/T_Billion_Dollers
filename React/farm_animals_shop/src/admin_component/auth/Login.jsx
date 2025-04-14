import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Form, Button, Container, Stack, Col, Row, Image } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { GET } from '../../apis/CRUD';
import { useDispatch } from 'react-redux';
import { setMember } from '../../redux/memberSlice.js';

const baseURL = import.meta.env.VITE_API_URL;


const Login = () => {

  const nav = useNavigate();
  sessionStorage.clear();

  const dispatch = useDispatch();

 
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

  const submitLogin = async () => {
    const PostRes = await axios.post(`${baseURL}/auth/login`, user);
      sessionStorage.setItem('accessToken', PostRes.data.accessToken);
      sessionStorage.setItem('refreshToken', PostRes.data.refreshToken);

    const userRes = await GET(`${baseURL}/members/me`);
      dispatch(setMember({
        authority: userRes.data.authority,
        userId : userRes.data.userId,
        userName : userRes.data.name
      }));

    nav('/admin')
  }
 
  return (
    <>
      <Container className='d-flex justify-content-center align-items-center' style={{ minHeight: '100vh' }}>
        <div>
          <div className='text-center mb-5'>
          <Image src='/imgs/setting_icon.jpg' width="120px" className='mb-3' />
          <h1>Farmdas</h1>
          </div>
          <Form style={{ width: '300px', marginTop: '20px' }} onSubmit={(e) => {
              e.preventDefault(); // 새로고침 방지
              submitLogin();      // 로그인 함수 실행
            }}>
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
              <Button type='submit' variant="success" >
                로그인
              </Button>
            </Stack>
          </Form>
        </div>
      </Container>
    </>
  )
 }
 
 export default Login