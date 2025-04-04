import React, { useState } from 'react'
import WebHeader from './WebHeader'
import { Button, Container, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const QnA = () => {
  const nav = useNavigate();

  const [saveData, setSaveData] = useState({
    title: "",
    content: "",
  });

  const saveHandler = (e) => {
    setSaveData({
      ...saveData,
      [e.target.name] : e.target.value
    })
  }

  const submitHandler = (e) => {
    if (saveData.title === "" || saveData.content === "") {
      alert("제목과 내용을 입력해주세요.")
    } else {
      alert("문의가 접수되었습니다.")
      nav("/farmdas")
    }
  }

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
          <div className='text-center'>
            <WebHeader />
          </div>
          <div>
            <Form.Group>
              <Form.Label className=''>제목</Form.Label>
              <Form.Control
                type='text'
                name='title'
                className='mb-3'
                style={{ width: "100%", margin: "0 auto" }}
                onChange={(e) => {saveHandler(e)}}
              />
              <Form.Label className=''>문의 내용</Form.Label>
              <Form.Control
                type='text'
                name='content'
                className='mb-3'
                style={{ width: "100%", height: "300px", margin: "0 auto" }}
                onChange={(e) => {saveHandler(e)}}
              />
            </Form.Group>
            <div className='d-flex justify-content-center'>
              <Button variant="success" type="button" className='mb-3' onClick={submitHandler} >
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