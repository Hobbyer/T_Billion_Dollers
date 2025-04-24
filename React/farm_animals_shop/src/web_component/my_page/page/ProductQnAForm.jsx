import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { POST } from "../../../apis/CRUD";
import { jwtDecode } from "jwt-decode";
import cow from "../../../../public/imgs/cow (1).png";

const baseURL = import.meta.env.VITE_API_URL;

const ProductQnAForm = ({ isShow, onHide, item,setActiveKey }) => {
  const userId = jwtDecode(sessionStorage.getItem("accessToken")).sub;
  

  const [productQnA,setProductQnA]= useState({
    userId:userId,
    title:'',
    content:'',
    itemCode: '',
    itemName: '',
    imagePath: cow
  });

    // item이 업데이트되었을 때 상태 변경
    useEffect(() => {
      if (item) {
        setProductQnA({
          userId: userId,
          title: '',
          content: '',
          itemCode: item.itemCode,
          itemName: item.itemName,
          imagePath: item.imagePath || cow,
        });
      }
    }, [item, userId]); // item이 변경될 때마다 실행

  const handleSubmit = async () => {
    if (!productQnA.title || !productQnA.content) {
      alert("제목과 내용을 입력해주세요.");
      return;
    }

    try {
      await POST(`${baseURL}/questions`, productQnA);

      alert("문의가 등록되었습니다.");
      onHide(); // 모달 닫기
    } catch (err) {
      console.error(err);
      alert("문의 등록에 실패했습니다.");
    }
   
    // 폼 초기화
    setProductQnA({
      userId: userId,
      title: "",
      content: "",
      itemCode: item ? item.itemCode : "",
      itemName: item ? item.itemName : "",
      imagePath: item ? item.imagePath : cow,
    });
  };

  if (!item) return null;

  const changeProductQnAData = (e)=>{
    setProductQnA({
      ...productQnA,
      [e.target.name]:e.target.value
    })
  }

  return (
    <Modal
      show={isShow}
      onHide={onHide}
      dialogClassName="modal-90w"
      aria-labelledby="product-qna-form"
    >
      <Modal.Header closeButton>
        <Modal.Title>상품 문의하기</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* 상품 정보 */}
        <div className="d-flex gap-3 mb-3">
          <img
            src={item.imagePath || cow}
            alt="상품 이미지"
            style={{ width: "100px", height: "100px", objectFit: "cover" }}
          />
          <p className="m-0">상품명: {item.itemName}</p>
        </div>

        {/* 문의 제목 */}
        <Form.Group className="mb-3">
          <Form.Label>제목</Form.Label>
          <Form.Control
            type="text"
            placeholder="문의 제목을 입력하세요"
            name="title"
            value={productQnA.title}
            onChange={(e) => changeProductQnAData(e)}
          />
        </Form.Group>

        {/* 문의 내용 */}
        <Form.Group className="mb-3">
          <Form.Label>내용</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            placeholder="문의 내용을 입력하세요"
            name="content"
            value={productQnA.content}
            onChange={(e) => changeProductQnAData(e)}
          />
        </Form.Group>

        {/* 버튼 */}
        <div className="d-flex justify-content-center gap-3">
          <Button
            style={{ backgroundColor: "#3D8D7A", border: "none", width: "30%" }}
            onClick={handleSubmit}
          >
            등록
          </Button>
          <Button
            style={{ border: "2px solid #3D8D7A", color: "#3D8D7A", width: "30%" }}
            onClick={onHide}
            variant="light"
          >
            닫기
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ProductQnAForm;
