import React, { useState, useEffect } from "react";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import { GET, PUT, POST } from "../../../apis/CRUD";
import { useNavigate } from "react-router-dom";

const baseURL = import.meta.env.VITE_API_URL;

const MyInfo = () => {
  const nav = useNavigate();

  const [userInfo, setUserInfo] = useState({});
  const [originalUserInfo, setOriginalUserInfo] = useState({});
  const [isEditing, setEditing] = useState(false);

  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    newPasswordCheck: "",
  });

  // 회원 정보 변경 핸들러
  const changeInfo = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  // 비밀번호 변경 입력 핸들러
  const changePassword = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  // 저장 핸들러: 회원 정보 + 비밀번호 변경
  const handleSave = async () => {
    try {
      // 1. 회원 정보 수정
      await PUT(`${baseURL}/members/me/update`, userInfo);

      // 2. 비밀번호 변경 조건 확인
      const { oldPassword, newPassword, newPasswordCheck } = passwordData;
      if (oldPassword || newPassword || newPasswordCheck) {
        if (!oldPassword || !newPassword || !newPasswordCheck) {
          alert("모든 비밀번호 입력란을 채워주세요.");
          return;
        }

        if (newPassword !== newPasswordCheck) {
          alert("새 비밀번호와 확인이 일치하지 않습니다.");
          return;
        }

        await POST(`${baseURL}/members/password`, {
          userId: userInfo.userId,
          ...passwordData,
        });

        alert("회원 정보와 비밀번호가 모두 변경되었습니다.");
        setPasswordData({
          oldPassword: "",
          newPassword: "",
          newPasswordCheck: "",
        });
      } else {
        alert("회원 정보가 변경되었습니다.");
      }

      setEditing(false);
    } catch (err) {
      console.error(err);
      alert("저장 중 오류가 발생했습니다.");
    }
  };

  // 취소
  const handleCancel = () => {
    setUserInfo(originalUserInfo);
    setPasswordData({
      oldPassword: "",
      newPassword: "",
      newPasswordCheck: "",
    });
    setEditing(false);
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const res = await GET(`${baseURL}/members/me`);
        setUserInfo(res.data);
        setOriginalUserInfo(res.data);
      } catch (err) {
        console.log("Error occurred:", err);
      }
    };

    fetchUserInfo();
  }, []);

  return (
    <Container className="mt-5 mb-5 text-start">
      <h2 className="mb-4 fw-bold">회원 정보 수정</h2>
      <hr />
      <Form>
        {/* 아이디 */}
        <Form.Group className="mb-4">
          <Form.Label>ID</Form.Label>
          <Form.Control
            type="text"
            name="userId"
            value={userInfo.userId || ""}
            onChange={changeInfo}
            disabled
          />
        </Form.Group>
        {/* 이메일 */}
        <Form.Group className="mb-4">
          <Form.Label>E-MAIL</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={userInfo.email || ""}
            onChange={changeInfo}
            disabled={!isEditing}
          />
        </Form.Group>

        {/* 이름 */}
        <Form.Group className="mb-4">
          <Form.Label>NAME</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={userInfo.name || ""}
            onChange={changeInfo}
            disabled={!isEditing}
          />
        </Form.Group>

        {/* 주소 */}
        <Form.Group className="mb-4">
          <Form.Label>ADDRESS</Form.Label>
          <Form.Control
            type="text"
            name="address"
            value={userInfo.address || ""}
            onChange={changeInfo}
            disabled={!isEditing}
          />
        </Form.Group>

        {/* 전화번호 */}
        <Form.Group className="mb-5">
          <Form.Label>PHONE-NUMBER</Form.Label>
          <Row>
            <Col xs={8}>
              <Form.Control
                type="text"
                name="phoneNumber"
                value={userInfo.phoneNumber || ""}
                onChange={changeInfo}
                disabled={!isEditing}
              />
            </Col>
            {isEditing && (
              <Col xs={4}>
                <Button className="w-100">인증번호</Button>
              </Col>
            )}
          </Row>
        </Form.Group>

        {/* 비밀번호 변경 폼 */}
        {isEditing && (
          <>
            <hr />
            <h5 className="fw-bold mb-3">비밀번호 변경</h5>
            <Form.Group className="mb-3">
              <Form.Label>현재 비밀번호</Form.Label>
              <Form.Control
                type="password"
                name="oldPassword"
                value={passwordData.oldPassword}
                onChange={changePassword}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>새 비밀번호</Form.Label>
              <Form.Control
                type="password"
                name="newPassword"
                value={passwordData.newPassword}
                onChange={changePassword}
              />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label>새 비밀번호 확인</Form.Label>
              <Form.Control
                type="password"
                name="newPasswordCheck"
                value={passwordData.newPasswordCheck}
                onChange={changePassword}
              />
            </Form.Group>
          </>
        )}

        {/* 버튼 영역 */}
        {!isEditing ? (
          <Button
            className="w-100"
            variant="primary"
            onClick={() => setEditing(true)}
          >
            수정
          </Button>
        ) : (
          <div className="d-flex gap-4">
            <Button className="w-100" onClick={handleSave}>
              저장
            </Button>
            <Button
              className="w-100"
              variant="secondary"
              onClick={handleCancel}
            >
              취소
            </Button>
          </div>
        )}
      </Form>
    </Container>
  );
};

export default MyInfo;
