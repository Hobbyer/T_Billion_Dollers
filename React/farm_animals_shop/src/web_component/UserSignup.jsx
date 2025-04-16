import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Image } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const baseURL = import.meta.env.VITE_API_URL;

// * 돈나감 주의 !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! 인증번호 발송은 1회에 20원입니다. *
const UserSignup = () => {
  const nav = useNavigate();

  const [formData, setFormData] = useState({
    userId: "",
    password: "",
    passwordCheck: "",
    name: "",
    email: "",
    emailFirst: "",
    emailSecond: "@test.com",
    phoneNumber: "",
    phoneCheck: "",
    address: "",
    isAgreed: false,
  });

  const [codeSent, setCodeSent] = useState(false); // 인증번호 발송 여부

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const updatedFormData = {
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    };

    updatedFormData.email = `${updatedFormData.emailFirst}${updatedFormData.emailSecond}`;
    updatedFormData.address = `${updatedFormData.firstAddress} ${updatedFormData.detailedAddress}`;

    setFormData(updatedFormData);
  };

  const signupSubmit = (e) => {
    if (formData.isAgreed === true) {
      axios
        .post(`${baseURL}/auth/signup`, formData)
        .then((res) => {
          console.log(res.data);
          alert("회원가입이 완료되었습니다.");
          nav("/farmdas/login");
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      alert("회원가입에 대한 모든 내용을 동의해주세요.");
    }
  };

  const sendVerificationCode = () => {
    axios
      .post(`${baseURL}/auth/send`, { phoneNumber: formData.phoneNumber })
      .then((res) => {
        alert("인증번호가 발송되었습니다");
        setCodeSent(true); // 확인창 보여주기!
      })
      .catch((err) => {
        alert("인증번호 발송 실패!");
        console.error(err);
      });
  };

  const [codeCompleted, setCodeCompleted] = useState(false); // 인증번호 확인 여부
  // 인증번호 확인
  const verifyCode = () => {
    axios
      .post(`${baseURL}/auth/verify`, {
        phoneNumber: formData.phoneNumber,
        code: formData.phoneCheck,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.success === true) {
          alert("인증 성공!");
          setCodeCompleted(true); // 인증번호 확인 완료
        } else {
          alert("인증번호가 틀립니다.");
          setFormData({ ...formData, phoneCheck: "" }); // 인증번호 입력창 초기화
        }
      })
      .catch((err) => {
        alert("인증 실패");
      });
  };

  // 유효성 검사
  const [validation, setValidation] = useState({
    userId: false,
    password: false,
    passwordCheck: false,
    name: false,
    emailFirst: false,
    phoneNumber: false,
  });

  const idRegex = /^[a-z]{4,12}$|^[a-z0-9]{4,12}$/; // 4~12자 영문 소문자, 숫자 조합
  const pwRegex =
    /^(?=.*[a-z])(?=.*\d)[a-z\d]{8,20}$|^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[a-z\d!@#$%^&*]{8,20}$/; // 8~20자 영문 소문자, 숫자 조합 + 특수문자 포함
  const nameRegex = /^[가-힣]{2,8}$/; // 2~8자 한글
  const emailFirstRegex = /^[a-zA-Z0-9._%+-]{4,15}$/; // 이메일 형식
  const phoneRegex = /^(?:\d{3}-\d{4}-\d{4}|\d{11})$/; // 010-1234-5678 or 01012345678

  const tagRegex = (name, value) => {
    if (name === "userId") {
      return idRegex.test(value);
    } else if (name === "password") {
      return pwRegex.test(value);
    } else if (name === "name") {
      return nameRegex.test(value);
    } else if (name === "emailFirst") {
      return emailFirstRegex.test(value);
    } else if (name === "phoneNumber") {
      return phoneRegex.test(value);
    }
  };

  const tagCheck = (e) => {
    const { name, value } = e.target;
    if (tagRegex(name, value)) {
      setValidation((prevValidation) => ({
        ...prevValidation,
        [name]: true,
      }));
    } else {
      setValidation((prevValidation) => ({
        ...prevValidation,
        [name]: false,
      }));
    }
  };

  const validate = () => {
    const newErrors = { ...validation };

    // 아이디 유효성 검사
    newErrors.userId = idRegex.test(formData.userId);
    // 비밀번호 유효성 검사
    newErrors.password = pwRegex.test(formData.password);
    // 비밀번호 확인 일치 검사
    newErrors.passwordCheck = formData.password === formData.passwordCheck;
    // 이름 유효성 검사
    newErrors.name = nameRegex.test(formData.name);
    // 휴대폰 번호 유효성 검사
    newErrors.phoneNumber = phoneRegex.test(formData.phoneNumber);
    // 주소 유효성 검사
    newErrors.firstAddress = formData.firstAddress.length > 0;
    newErrors.detailedAddress = formData.detailedAddress.length > 0;
    // 동의 체크
    newErrors.isAgreed = formData.isAgreed;

    setValidation(newErrors);
    return Object.values(newErrors).every(Boolean); // 모든 유효성 검사 통과 여부
  };

  return (
    <>
      <Container
        className="mt-5 mb-5 px-5 d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >
        <div style={{ width: "100%", maxWidth: "600px" }}>
          <div className="text-center mb-5">
            <Image
              src="/imgs/animal.png"
              width="100px"
              className="mb-3"
              onClick={() => {
                nav("/farmdas");
              }}
              style={{ cursor: "pointer" }}
            />
            <h1>Farmdas</h1>
          </div>

          <Form className="w-100">
            <Form.Label>아이디</Form.Label>
            <Form.Group className="mb-2" controlId="formGridEmail">
              <Form.Control
                type="text"
                placeholder="User ID"
                name="userId"
                value={formData.userId}
                onChange={(e) => {
                  handleChange(e);
                  tagCheck(e);
                }}
                isValid={validation.userId && formData.userId.length > 0}
                isInvalid={!validation.userId && formData.userId.length > 0}
              />
              <Form.Control.Feedback type="invalid" className="px-3">
                4~12자 영문 소문자, 숫자 조합
              </Form.Control.Feedback>
            </Form.Group>

            <Row className="mb-2">
              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>비밀번호</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={formData.password}
                  autoComplete="off"
                  onChange={(e) => {
                    handleChange(e);
                    tagCheck(e);
                  }}
                  isValid={validation.password && formData.password.length > 0}
                  isInvalid={
                    !validation.password && formData.password.length > 0
                  }
                />
                <Form.Control.Feedback type="invalid" className="px-3">
                  8~20자 영문 소문자, 숫자 조합 + 특수문자 포함
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPasswordCheck">
                <Form.Label>비밀번호 확인</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password Check"
                  name="passwordCheck"
                  value={formData.passwordCheck}
                  autoComplete="off"
                  onChange={(e) => {
                    handleChange(e);

                    (formData.password === e.target.value) ?
                      setValidation((prevValidation) => ({
                        ...prevValidation,
                        passwordCheck: true,
                      })) :
                      setValidation((prevValidation) => ({
                        ...prevValidation,
                        passwordCheck: false,
                      }));

                  }}
                  isValid={
                    formData.password === formData.passwordCheck &&
                    formData.passwordCheck.length > 0
                  }
                  isInvalid={
                    formData.password !== formData.passwordCheck &&
                    formData.passwordCheck.length > 0
                  }
                />
                <Form.Control.Feedback type="invalid" className="px-3">
                  비밀번호가 일치하지 않습니다.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Form.Label>이름</Form.Label>
            <Form.Group className="mb-2" controlId="formGridName">
              <Form.Control
                type="text"
                placeholder="Name"
                name="name"
                value={formData.name}
                onChange={(e) => {
                  handleChange(e);
                  tagCheck(e);
                }}
                isValid={validation.name && formData.name.length > 0}
                isInvalid={!validation.name && formData.name.length > 0}
              />
              <Form.Control.Feedback type="invalid" className="px-3">
                이름을 제대로 입력해주세요.
              </Form.Control.Feedback>
            </Form.Group>

            <Row className="mb-2">
              <Form.Label>이메일</Form.Label>
              <Form.Group as={Col} controlId="formEmailFirst">
                <Form.Control
                  type="email"
                  placeholder="Email"
                  name="emailFirst"
                  value={formData.emailFirst}
                  onChange={(e) => {
                    handleChange(e);
                    tagCheck(e);
                  }}
                  isValid={validation.emailFirst && formData.email.length > 0}
                  isInvalid={!validation.emailFirst && formData.email.length > 0}
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

            {/* ------------------------------- */}
            {/* 연락처 + 인증번호 발송 버튼 */}
            <Row className="mb-2">
              <Form.Label>연락처</Form.Label>

              <Form.Group as={Col} controlId="formGridPhone">
                <Form.Control
                  type="text"
                  placeholder="010-1234-5678"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={(e) => {
                    handleChange(e);
                    tagCheck(e);
                  }}
                  isValid={
                    validation.phoneNumber && formData.phoneNumber.length > 0
                  }
                  isInvalid={
                    !validation.phoneNumber && formData.phoneNumber.length > 0
                  }
                />
                <Form.Control.Feedback type="invalid" className="px-3">
                  휴대폰 번호가 올바르지 않습니다.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} xs="auto">
                <Button
                  variant="success"
                  type="button"
                  onClick={sendVerificationCode}
                >
                  인증번호 발송
                </Button>
              </Form.Group>
            </Row>

            {/* 발송 완료 후 인증번호 입력창 + 확인 버튼 나타남 */}
            {codeSent && (
              <Row className="mb-2">
                {codeCompleted === false ? (
                  <Form.Group as={Col} controlId="formGridPhoneCheck">
                    <Form.Control
                      type="text"
                      placeholder="인증번호"
                      name="phoneCheck"
                      value={formData.phoneCheck}
                      onChange={handleChange}
                    />
                  </Form.Group>
                ) : (
                  <Form.Group as={Col} controlId="formGridPhoneCheck">
                    <Form.Control
                      disabled={true}
                      type="text"
                      name="phoneCheck"
                      value={formData.phoneCheck}
                      readOnly
                    />
                  </Form.Group>
                )}
                <Form.Group as={Col} xs="auto">
                  <Button variant="success" type="button" onClick={verifyCode}>
                    확인
                  </Button>
                </Form.Group>
              </Row>
            )}

            {/* ------------------------------- */}

            <Form.Group className="mb-2" controlId="formGridCity">
              <Form.Label >주소</Form.Label>
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

            <Form.Group
              className="mb-4 d-flex justify-content-end"
              id="formGridCheckbox"
            >
              <Form.Check
                type="checkbox"
                label="회원가입에 대한 모든 내용을 동의합니다."
                name="isAgreed"
                checked={formData.isAgreed}
                onChange={handleChange}
              />
            </Form.Group>

            {/* 회원가입 버튼 */}
            <div className="d-flex justify-content-center">
              <Button
                variant="success"
                type="button"
                onClick={signupSubmit}
                disabled={
                  !validation.userId ||
                  !validation.password ||
                  !validation.passwordCheck ||
                  !validation.name ||
                  !validation.emailFirst ||
                  !validation.phoneNumber ||
                  !formData.isAgreed ||
                  !codeCompleted
                }
              >
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
