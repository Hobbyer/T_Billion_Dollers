import React, { useState } from 'react'
import WebHeader from './WebHeader'
import { Button, Container, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { POST } from '../apis/CRUD'
import { jwtDecode } from 'jwt-decode'

const baseURL = import.meta.env.VITE_API_URL;

const QnA = () => {
  const nav = useNavigate();
  if (sessionStorage.getItem('accessToken') === null) {
    alert("로그인 후 이용 가능합니다.")
    nav('/farmdas/login')
  } else {
    var user = jwtDecode(sessionStorage.getItem('accessToken'));
  }

  const [saveData, setSaveData] = useState({
    userId: "",
    title: "",
    content: "",
  });

  const saveHandler = (e) => {
    setSaveData({
      ...saveData,
      [e.target.name] : e.target.value,
      userId: user.sub
    })
  }

  const submitHandler = () => {
      if (saveData.title === "" || saveData.content === "") {
        alert("제목과 내용을 입력해주세요.")
      } else {
        POST(`${baseURL}/questions`, saveData)
        .then((res) => {
          alert("질문이 등록 되었습니다.");
          nav("/farmdas");
        })
        .catch((error) => console.log(error));
      }
    };

  return (
    <>
      <style type="text/css">
        {`
          input.form-control {
            border: 1px solid gray;
          }
        `}
      </style>
      <Container className="mt-3 mx-auto">
        <div style={{ padding: "0 100px", minWidth: "800px" }}>
          <div style={{ textAlign: "left"}}>
            <Form.Group>
              <Form.Label className=''>제목</Form.Label>
              <Form.Control
                type='text'
                name='title'
                className='mb-3'
                style={{ width: "100%", margin: "0 auto" }}
                onChange={(e) => {saveHandler(e)}} />
              <Form.Label className=''>문의 내용</Form.Label>
              <Form.Control
                type='text'
                name='content'
                className='mb-3'
                style={{ width: "100%", height: "300px", margin: "0 auto" }}
                onChange={(e) => {saveHandler(e)}} />
            </Form.Group>
            <div className='d-flex justify-content-center'>
              <Button variant="success" type="button" className='mb-3' onClick={()=>{
                submitHandler()
                }} >
                문의하기
              </Button>
            </div>
          </div>
        </div>
      </Container>  
    </>
  )
}

export default QnA