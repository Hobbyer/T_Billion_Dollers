import React, { useState, useEffect } from "react";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import { GET, PUT } from "../../../apis/CRUD";

const baseURL = import.meta.env.VITE_API_URL;

const MyInfo = () => {
  
  const [userInfo, setUserInfo] = useState({}); // 사용자 정보 상태

  

  const changeInfo = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  };

  const update = () => {
    PUT(`${baseURL}/members/me/update`, userInfo)
      .then((res) => {
        console.log("성공했나", res.data);
        setUserInfo(res.data)
      })
      .catch();
  };

  useEffect(() => {
    GET(`${baseURL}/members/me`)
      .then((res) => {
        console.log(res.data);
        setUserInfo(res.data);
      })
      .catch();
  }, []);

  return (
    <>
      <Container>
        <h2>회원 정보 수정</h2>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>ID</Form.Label>
            <Form.Control
              type="text"
              name="userId"
              value={userInfo.userId || ''}
              onChange={(e) => {
                changeInfo(e);
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>NAME</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={userInfo.name|| ''}
              onChange={(e) => {
                changeInfo(e);
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>E-MAIL</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={userInfo.email|| ''}
              onChange={(e) => {
                changeInfo(e);
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>ADDRESS</Form.Label>
            <Form.Control
              type="text"
              name="address"
              value={userInfo.address|| ''}
              onChange={(e) => {
                changeInfo(e);
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>PHONE-NUMBER</Form.Label>
            <Form.Control
              type="text"
              name="phoneNumber"
              value={userInfo.phoneNumber|| ''}
              onChange={(e) => {
                changeInfo(e);
              }}
            />
          </Form.Group>

          <Button
            variant="primary"
            type="button"
            onClick={(e) => {
              update();
            }}
          >
            수정
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default MyInfo;
