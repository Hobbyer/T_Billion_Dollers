import axios from 'axios'
import React, { useState } from 'react'
import { Form, Button, Container, Stack, Col, Row } from 'react-bootstrap'
 
 
const Login = () => {
  sessionStorage.clear()
 
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
      })
      .catch(err => {
        console.error(err)
      })
  }
 
  return (
    <>
      <Container>
        <Form style={{width: '300px', margin: 'auto'}}>
          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label>아이디</Form.Label>
            <Form.Control type="text" name='userId' placeholder="User ID" onChange={(e)=>{
              saveData(e)
            }}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupPassword">
            <Form.Label>비밀번호</Form.Label>
            <Form.Control type="password" name='password' placeholder="Password" onChange={(e)=>{
              saveData(e)
            }} />
          </Form.Group>
          <Stack>
            <Button variant="success" onClick={
              submitLogin
            }>로그인</Button>
          </Stack>
        </Form>
      </Container>
    </>
  )
 }
 
 export default Login