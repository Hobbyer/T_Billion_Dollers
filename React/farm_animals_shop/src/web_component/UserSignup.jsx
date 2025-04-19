import React, { useState } from "react";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Image,
  Modal,
} from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Postcode from "react-daum-postcode";

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
    firstAddress: "",
    detailedAddress: "",
    isAgreed: false,
  });

  const [codeSent, setCodeSent] = useState(false); // 인증번호 발송 여부
  const [isPopupOpen, setIsPopupOpen] = useState(false); // 팝업창 열기 여부
  const [isUserIdValid, setIsUserIdValid] = useState(false); // 아이디 중복 여부

  // 주소 검색 팝업창 열기
  const openPostCode = () => {
    setIsPopupOpen(true); // 모달 열기
  };

  // 주소 검색 팝업창 닫기
  const closePostCode = () => {
    setIsPopupOpen(false); // 모달 닫기
  };

  // 주소 검색 완료 후 선택된 주소를 formData에 저장
  const handlePostCodeComplete = (data) => {
    setFormData((prevData) => ({
      ...prevData,
      firstAddress: data.roadAddress, // 선택된 주소를 formData에 저장
    }));
    setValidation((prevValidation) => ({
      ...prevValidation,
      firstAddress: data.roadAddress.length > 0, // 주소가 들어갔는지 확인
    }));
    closePostCode(); // 모달 닫기
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const updatedFormData = {
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    };

    // 주소가 입력되면 유효성 검사 추가
    if (name === "firstAddress") {
      // 첫번째 주소가 비어있지 않으면 유효성 검증 성공
      setValidation((prevValidation) => ({
        ...prevValidation,
        firstAddress: value.length > 0, // 주소가 들어갔는지 확인
      }));
    }

    updatedFormData.email = `${updatedFormData.emailFirst}${updatedFormData.emailSecond}`;
    updatedFormData.address = `${updatedFormData.firstAddress} ${updatedFormData.detailedAddress}`;

    setFormData(updatedFormData);
  };

  // 중복확인 버튼 클릭 시 아이디 중복 확인
  const validateUserId = () => {
    if (!formData.userId.trim()) {
      alert("아이디를 입력해주세요.");
      return; // 아이디가 비어있으면 중복확인 요청을 보내지 않음
    }

    // 아이디 중복 확인 API 요청
    axios
      .post(`${baseURL}/auth/check-user-id`, { userId: formData.userId })
      .then((res) => {
        if (res.data.exists) {
          alert("이미 사용중인 아이디입니다.");
          setValidation((prevValidation) => ({
            ...prevValidation,
            userId: true, // 아이디 중복시 유효성 검사 실패
          }));
        } else {
          alert("사용 가능한 아이디입니다.");
          setValidation((prevValidation) => ({
            ...prevValidation,
            userId: true, // 아이디가 사용 가능하면 유효성 검사 성공
          }));
        }
      })
      .catch((err) => {
        console.error(err);
        alert("아이디 중복 확인에 실패했습니다.");
      });
  };

  const signupSubmit = (e) => {
    if (formData.isAgreed === true && validation) {
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
    firstAddress: false,
    detailedAddress: false,
  });

  const idRegex = /^[a-z]{4,12}$|^[a-z0-9]{4,12}$/; // 4~12자 영문 소문자, 숫자 조합
  const pwRegex =
    /^(?=.*[a-z])(?=.*\d)[a-z\d]{8,20}$|^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[a-z\d!@#$%^&*]{8,20}$/; // 8~20자 영문 소문자, 숫자 조합 + 특수문자 포함
  const nameRegex = /^[가-힣]{2,8}$/; // 2~8자 한글
  const emailFirstRegex = /^[a-zA-Z0-9._%+-]{4,15}$/; // 이메일 형식
  const phoneRegex = /^(?:\d{3}-\d{4}-\d{4}|\d{11})$/; // 010-1234-5678 or 01012345678
  const detailedAddressRegex = /^[가-힣0-9\s]+$/; // 주소 형식 (한글, 숫자, 공백 포함)

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
    } else if (name === "detailedAddress") {
      return detailedAddressRegex.test(value);
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

  const idValid = !validation.userId || formData.userId.length < 0

  console.log(formData);
  console.log(validation);

  return (
    <>
      <Container
        className="mt-5 mb-5 px-5 d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >
        <div style={{ width: "500px" }}>
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
            <h1>회원 가입</h1>
          </div>

          {/* 아이디 */}
          <Form className="w-100">
            <Form.Label>아이디</Form.Label>
            <Row className="mb-2">
              <Col xs={9}>
                <Form.Control
                  type="text"
                  placeholder="ID"
                  name="userId"
                  value={formData.userId}
                  onChange={(e) => {
                    handleChange(e);
                    tagCheck(e);
                  }}
                  isValid={validation.userId && formData.userId.length > 0} // validation.userId를 사용
                  isInvalid={!validation.userId && formData.userId.length > 0} // validation.userId가 false일 경우 invalid
                />
              </Col>
              <Col xs={3} className="d-flex justify-content-end">
                <Button
                  variant="outline-success"
                  type="button"
                  style={{ 
                    backgroundColor:( idValid ? "#fff" : "#198754" ) 
                    , color: ( idValid ? "#3B755F" : "#fff" )
                  }}
                  onClick={validateUserId}
                  disabled={
                    idValid
                  }
                >
                  중복확인
                </Button>
              </Col>

              <Form.Control.Feedback type="invalid" className="px-3">
                4~12자 영문 소문자, 숫자 조합
              </Form.Control.Feedback>
            </Row>

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

                    formData.password === e.target.value
                      ? setValidation((prevValidation) => ({
                          ...prevValidation,
                          passwordCheck: true,
                        }))
                      : setValidation((prevValidation) => ({
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
                  isValid={
                    validation.emailFirst && formData.emailFirst.length > 0
                  }
                  isInvalid={
                    !validation.emailFirst && formData.emailFirst.length > 0
                  }
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

              <Form.Group xs={9} as={Col} controlId="formGridPhone">
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

              <Form.Group
                xs={3}
                as={Col}
                className="d-flex justify-content-end"
              >
                <Button
                  variant="success"
                  type="button"
                  onClick={sendVerificationCode}
                  style={{ width: "100%" }}
                >
                  인증번호
                </Button>
              </Form.Group>
            </Row>

            {/* 발송 완료 후 인증번호 입력창 + 확인 버튼 나타남 */}
            {codeSent && (
              <Row className="mb-2">
                {codeCompleted === false ? (
                  <Form.Group xs={9} as={Col} controlId="formGridPhoneCheck">
                    <Form.Control
                      type="text"
                      placeholder="인증번호"
                      name="phoneCheck"
                      value={formData.phoneCheck}
                      onChange={handleChange}
                    />
                  </Form.Group>
                ) : (
                  <Form.Group xs={9} as={Col} controlId="formGridPhoneCheck">
                    <Form.Control
                      disabled={true}
                      type="text"
                      name="phoneCheck"
                      value={formData.phoneCheck}
                      readOnly
                    />
                  </Form.Group>
                )}
                <Form.Group
                  xs={3}
                  as={Col}
                  className="d-flex justify-content-end"
                >
                  <Button variant="success" type="button" onClick={verifyCode}>
                    확인
                  </Button>
                </Form.Group>
              </Row>
            )}

            {/* 주소 검색 + 상세주소 입력창 */}
            <Row className="mb-2">
              <Form.Label>주소</Form.Label>
              <Col xs={9}>
                <Form.Control
                  placeholder="주소를 입력해주세요."
                  name="firstAddress"
                  value={formData.firstAddress}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  readOnly
                  isValid={validation.firstAddress && formData.firstAddress.length > 0}
                  isInvalid={
                    !validation.firstAddress && formData.firstAddress.length > 0
                  }
                />
              </Col>
              <Col xs={3} className="d-flex justify-content-end">
                <Button variant="outline-success" onClick={openPostCode}>
                  주소찾기
                </Button>
              </Col>
            </Row>

            {/* 주소 검색 모달창 */}
            <Modal
              show={isPopupOpen}
              onHide={closePostCode}
              size="lg"
              aria-labelledby="contained-modal-title-vcenter"
              centered
            >
              <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                  주소 검색
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Postcode onComplete={handlePostCodeComplete} />{" "}
                {/* 주소 검색 컴포넌트 */}
              </Modal.Body>
              <Modal.Footer>
                <Button variant="outline-success" onClick={closePostCode}>
                  확인
                </Button>
              </Modal.Footer>
            </Modal>

            <Form.Group className="mb-4" controlId="formGridAddress2">
              <Form.Label>상세 주소</Form.Label>
              <Form.Control
                name="detailedAddress"
                value={formData.detailedAddress}
                onChange={(e) => {
                  handleChange(e);
                  tagCheck(e); // 상세주소 유효성 검사
                }}
                isValid={
                  validation.detailedAddress &&
                  formData.detailedAddress.length > 0
                }
                isInvalid={
                  !validation.detailedAddress &&
                  formData.detailedAddress.length > 0
                }
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
                  !validation.firstAddress ||
                  !validation.detailedAddress ||
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
