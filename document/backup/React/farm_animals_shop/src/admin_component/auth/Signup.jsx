import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL; // Vite 환경변수 사용법에 맞게 수정

const Signup = () => {
  const [formData, setFormData] = useState({
    userId: '',
    password: '',
    name: '',
    email: '',
    emailSecond: '@test.com',
    phoneNumber: '',
    address: '',
    authority: '',
    isAgreed: false,
  });


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const updatedFormData = {
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    };

    updatedFormData.email = `${updatedFormData.emailFirst}${updatedFormData.emailSecond}`;
    updatedFormData.address = `${updatedFormData.firstAddress} ${updatedFormData.detailedAddress}`;

    setFormData(updatedFormData);
  };

  const signupSubmit = (e) => {
    axios.post(`${baseURL}/auth/signup`, formData)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <>
      <Container>
        <Form className='w-60' style={{ margin: 'auto' }}>
          <Form.Label>아이디</Form.Label>
          <Form.Group className='mb-2' controlId="formGridEmail">
            <Form.Control
              type="text"
              placeholder="User ID"
              name="userId"
              onChange={handleChange}
            />
          </Form.Group>
          
          <Row className="mb-2">
            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label>비밀번호</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                autoComplete='off'
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridPasswordCheck">
              <Form.Label>비밀번호 확인</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password Check"
                name="passwordCheck"
                autoComplete='off'
                onChange={handleChange}
              />
            </Form.Group>
          </Row>

          <Form.Label>이름</Form.Label>
          <Form.Group className='mb-2' controlId="formGridName">
            <Form.Control
              type="text"
              placeholder="Name"
              name="name"
              onChange={handleChange}
            />
          </Form.Group>

          <Row className="mb-2">
            <Form.Label>이메일</Form.Label>
            <Form.Group as={Col} controlId="formEmailFirst">
              <Form.Control
                type="email"
                placeholder="Email"
                name="emailFirst"
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formEmailSecond">
              <Form.Select
                name="emailSecond"
                onChange={handleChange}
              >
                <option>@test.com</option>
                <option>@gmail.com</option>
                <option>@naver.com</option>
                <option>@kakao.com</option>
              </Form.Select>
            </Form.Group>
          </Row>

          <Row className="mb-2">
            <Form.Label>연락처</Form.Label>
            <Form.Group as={Col} controlId="formGridPhone">
              <Form.Control
                type="text"
                placeholder="010-1234-5678"
                name="phoneNumber"
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridPhoneCheck">
              <Form.Control
                type="text"
                placeholder="인증번호"
                name="phoneCheck"
                onChange={handleChange}
              />
            </Form.Group>
            
            <Form.Group as={Col} controlId="formGridPhoneCheckButton">
              <Button variant="primary" type="submit">
                인증번호 발송
              </Button>
            </Form.Group>
          </Row>

          <Form.Group className='mb-2' controlId="formGridCity">
            <Form.Label>주소</Form.Label>
            <Form.Control
              placeholder="도로명 주소"
              name="firstAddress"
              value={formData.firstAddress}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-4" controlId="formGridAddress2">
            <Form.Label>상세 주소</Form.Label>
            <Form.Control
              name="detailedAddress"
              value={formData.detailedAddress}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="roleSelect" className="mb-5">
            <Form.Select
              name="authority"
              onChange={handleChange}
            >
              <option value="ROLE_ADMIN">관리자</option>
              <option value="ROLE_USER">일반회원</option>
            </Form.Select>
          </Form.Group>

          <div className="d-flex justify-content-center">
            <Button variant="primary" type="button" onClick={signupSubmit}>
              회원가입
            </Button>
          </div>
        </Form>
      </Container>
    </>
  );
};

export default Signup;