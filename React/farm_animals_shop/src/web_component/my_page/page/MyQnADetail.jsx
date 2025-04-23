import React from "react";
import { Button, Modal } from "react-bootstrap";
import dayjs from "dayjs";
import cow from "../../../../public/imgs/cow (1).png"; // 필요에 따라 동적 이미지로 교체 가능

const MyQnADetail = ({ onHide, isShow, question }) => {
  if (!question) return null; // 데이터 없을 때 방어

  const isProduct = question.itemName !== null;
  const isAnswered = question.answerStatus === "COMPLETED"; // PENDING 또는 COMPLETED 기준

  return (
    <Modal
      show={isShow}
      onHide={onHide}
      dialogClassName="modal-90w"
      aria-labelledby="qna-detail-modal"
    >
      <Modal.Header closeButton />
      <Modal.Body>
        {/* 제목 및 상태 */}
        <div>
          <div className="mb-2">
            <div>문의 제목: {question.title}</div>
            <div style={{ fontSize: "15px" }}>
              작성일: {dayjs(question.regDate).format("YYYY.MM.DD")}
            </div>
          </div>
          <span
            className="p-1"
            style={{
              fontSize: "15px",
              border: "1px solid #3D8D7A",
              color: "#3D8D7A",
            }}
          >
            {isAnswered ? "답변완료" : "답변 대기 중"}
          </span>
        </div>

        <hr />

        {/* 상품 정보 */}
        {isProduct && (
          <div className="d-flex gap-3">
            <img
              src={question.imagePath || cow}
              alt="상품 이미지"
              style={{ width: "100px", height: "100px", objectFit: "cover" }}
            />
            <p>상품명: {question.itemName}</p>
          </div>
        )}

        <hr />

        {/* 문의 내용 */}
        <div className="d-flex justify-content-end">
          <p className="border w-60 p-4 rounded">
            내용: {question.content}
          </p>
        </div>

        {/* 답변 내용 */}
        {isAnswered && (
          <div className="d-flex">
            <p className="border p-4 rounded w-60">
              답변: {question.answer}
            </p>
          </div>
        )}

        {/* 하단 버튼 */}
        <div className="d-flex justify-content-center gap-2 m-4">
          <Button
            style={{
              width: "20%",
              backgroundColor: "#3D8D7A",
              border: "none",
            }}
            onClick={onHide}
          >
            확인
          </Button>
          <Button
            style={{
              width: "20%",
              backgroundColor: "white",
              color: "#3D8D7A",
              border: "2px solid #3D8D7A",
            }}
          >
            삭제
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default MyQnADetail;
