import React, { useState, useEffect } from "react";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import { GET, PUT } from "../../../apis/CRUD";
import { useNavigate } from "react-router-dom";

const baseURL = import.meta.env.VITE_API_URL;

const MyInfo = () => {
  const nav = useNavigate();
  const [userInfo, setUserInfo] = useState({}); // 사용자 정보 상태
  const [originalUserInfo, setOriginalUserInfo] = useState({});
  const [isEditing, setEditing] = useState(false); // 수정 모드 여부

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
        setUserInfo(res.data);
        setOriginalUserInfo(res.data); // 저장 성공시 원본도 갱신
        setEditing(false); // 수정모드 종료
      })
      .catch((err) => console.log(err));
  };

  // 취소 버튼을 누르면 원본 정보 복원시킴
  const handleCancel = () => {
    setUserInfo(originalUserInfo);
    setEditing(false);
  };

  useEffect(() => {
    // 비동기 함수 fetchUserInfo 정의
    const fetchUserInfo = async () => {
      try {
        // GET 요청을 보내서 사용자 정보 가져오기
        const res = await GET(`${baseURL}/members/me`);
  
        // 응답에서 받은 사용자 데이터를 상태에 저장
        setUserInfo(res.data);
        setOriginalUserInfo(res.data); // 원본 사용자 정보도 저장 (수정 취소 시 필요)
      } catch (err) {
        // 오류가 발생했을 때 실행되는 코드
  
        console.log("Error occurred:", err); // 오류 발생 시 콘솔에 에러 로그 출력
      }
    };
  
    // 컴포넌트가 마운트될 때, 사용자 정보를 가져오는 함수 실행
    fetchUserInfo();
  }, []); // 빈 배열로 설정하면, 컴포넌트가 처음 렌더링될 때만 실행됩니다.
  

  return (
    <>
      <Container className="mt-4 text-start">
        <h2 className="mb-4 fw-bold">회원 정보 수정</h2>
        <hr />
        <Form.Group className="mb-4">
          <Form.Label>E-MAIL</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={userInfo.email || ""}
            onChange={(e) => {
              changeInfo(e);
            }}
            disabled
          />
        </Form.Group>
        <Form>
          <Form.Group className="mb-4" controlId="formBasicEmail">
            <Form.Label>ID</Form.Label>
            <Form.Control
              type="text"
              name="userId"
              value={userInfo.userId || ""}
              onChange={(e) => {
                changeInfo(e);
              }}
              disabled={!isEditing}
            />
          </Form.Group>
          <Form.Group className="mb-4" controlId="formBasicEmail">
            <Form.Label>NAME</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={userInfo.name || ""}
              onChange={(e) => {
                changeInfo(e);
              }}
              disabled={!isEditing}
            />
          </Form.Group>

          <Form.Group className="mb-4" controlId="formBasicEmail">
            <Form.Label>ADDRESS</Form.Label>
            <Form.Control
              type="text"
              name="address"
              value={userInfo.address || ""}
              onChange={(e) => {
                changeInfo(e);
              }}
              disabled={!isEditing}
            />
          </Form.Group>
          <Form.Group className="mb-5" controlId="formBasicEmail">
            <Form.Label>PHONE-NUMBER</Form.Label>
            <Row>
              <Col xs={8}>
                <Form.Control
                  type="text"
                  name="phoneNumber"
                  value={userInfo.phoneNumber || ""}
                  onChange={(e) => {
                    changeInfo(e);
                  }}
                  disabled={!isEditing}
                />
              </Col>
              <Col xs={4}>
                <Button className="w-100">인증번호</Button>
              </Col>
            </Row>
          </Form.Group>
          {!isEditing ? (
            <Button
              className="w-100"
              variant="primary"
              type="button"
              onClick={(e) => {
                setEditing(true);
              }}
            >
              수정
            </Button>
          ) : (
            <div className="d-flex gap-4">
              <Button
                className="w-100"
                onClick={() => {
                  update();
                }}
              >
                저장
              </Button>
              <Button
                className="w-100"
                onClick={() => {
                  handleCancel();
                }}
              >
                취소
              </Button>
            </div>
          )}
        </Form>
      </Container>
    </>
  );
};

export default MyInfo;
