import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Image } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserSignup = () => {
  const nav = useNavigate();

  const [formData, setFormData] = useState({
    userId: '',
    password: '',
    name: '',
    email: '',
    emailSecond: '@test.com',
    phoneNumber: '',
    phoneCheck: '',
    address: '',
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
    if (formData.isAgreed === true) {
    axios.post('/api/auth/signup', formData)
      .then((res) => {
        console.log(res.data);
        alert('회원가입이 완료되었습니다.')
        nav('/farmdas/login')
      })
      .catch((err) => {
        console.error(err);
      });
    } else {
      alert('회원가입에 대한 모든 내용을 동의해주세요.')
    }
  }

  const sendVerificationCode = () => {
    axios.post('/api/auth/send', { phoneNumber: formData.phoneNumber })
    .then(res => {
      alert('인증번호가 발송되었습니다')
    })
    .catch(err => {
      alert('인증번호 발송 실패!')
      console.error(err)
    })
  }

  const verifyCode = () => {
    axios.post('/api/auth/verify', { phoneNumber: formData.phoneNumber, code: formData.phoneCheck })
    .then(res => {
      alert('인증 성공!')
    })
    .catch(err => {
      alert('인증 실패')
    })
  }

  return (
    <>
      <Container className='mt-5 mb-5 px-5 d-flex justify-content-center align-items-center' style={{ minHeight: '100vh' }}>
        <div style={{ width: '100%', maxWidth: '600px' }}>
          <div className='text-center mb-5'>
            <Image src='/public/imgs/animal.png' width="100px" className='mb-3' onClick={() => { nav('/farmdas') }} style={{ cursor: 'pointer' }} />
            <h1>Farmdas</h1>
          </div>
          <Form className='w-100'>
            <Form.Label>아이디</Form.Label>
            <Form.Group className='mb-2' controlId="formGridEmail">
              <Form.Control
                type="text"
                placeholder="User ID"
                name="userId"
                value={formData.userId}
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
                  value={formData.password}
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
                  value={formData.passwordCheck}
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
                value={formData.name}
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
                  value={formData.emailFirst}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formEmailSecond">
                <Form.Select
                  name="emailSecond"
                  value={formData.emailSecond}
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
                  value={formData.phoneNumber}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPhoneCheck">
                <Form.Control
                  type="text"
                  placeholder="인증번호"
                  name="phoneCheck"
                  value={formData.phoneCheck}
                  onChange={handleChange}
                />
              </Form.Group>
              
              <Form.Group as={Col} controlId="formGridPhoneCheckButton">
                <Button variant='success' type="button" onClick={verifyCode}>
                  확인
                </Button>
                <Button variant="success" type="button" onClick={sendVerificationCode}>
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

            <Form.Group className="mb-4 d-flex justify-content-end" id="formGridCheckbox">
              <Form.Check
                type="checkbox"
                label="회원가입에 대한 모든 내용을 동의합니다."
                name="isAgreed"
                checked={formData.isAgreed}
                onChange={handleChange}
              />
            </Form.Group>

            <div className="d-flex justify-content-center">
              <Button variant="success" type="button" onClick={signupSubmit}>
                회원가입
              </Button>
            </div>
          </Form>
        </div>
      </Container>
    </>
  );
};

export default UserSignup;