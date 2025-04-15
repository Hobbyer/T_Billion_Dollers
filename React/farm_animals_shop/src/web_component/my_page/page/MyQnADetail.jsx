import React from "react";
import { Button, Modal } from "react-bootstrap";
import cow from "../../../../public/imgs/cow (1).png";

const MyQnADetail = ({ onHide, isShow, title }) => {
  return (
    <>
      <Modal
        show={isShow}
        onHide={onHide}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton />
        <Modal.Body closeButton>
          <div>
            <div className="mb-2">
              <div>문의 제목 : 배송문의 드립니다. </div>
              <div style={{ fontSize: "15px" }}>작성일 : 2025.04.15 </div>
            </div>
            <span
              className="p-1"
              style={{
                fontSize: "15px",
                border: "1px solid #3D8D7A",
                color: "#3D8D7A",
              }}
            >
              답변완료
            </span>
          </div>
          <hr></hr>
          <div className="d-flex gap-3">
            <img src={cow} alt="" style={{ width: "100px", height: "100px" }} />
            <p>등심 A++ 맛좋은 소고기</p>
          </div>
          <hr />
          <div className="d-flex justify-content-end">
            <p className="border w-60 p-4 rounded">
              제 소고기는 언제쯤 배송될까요?
            </p>
          </div>
          <div className="d-flex">
            <p className="border p-4 rounded w-60">그건.. 안타깝게 됐습니다.</p>
          </div>
          <div className="d-flex justify-content-center gap-2 m-4">
            <Button
              style={{
                width: "20%",
                backgroundColor: "#3D8D7A",
                border: "none",
              }}
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
    </>
  );
};

export default MyQnADetail;
