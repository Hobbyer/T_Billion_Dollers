import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  Container,
  Stack,
  Button,
  Modal,
  Form,
  FormLabel,
  FormText,
} from "react-bootstrap";

const baseURL = import.meta.env.VITE_API_URL;

import { DELETE, GET } from "../../apis/CRUD";

const SalesQnADetail = () => {
  const nav = useNavigate();
  const { questionNum } = useParams();
  const location = useLocation(); //이전 페이지에서 전달된 상태를 가져오기 위한 useLocation 훅 사용

  //조회한 상세 정보를 저장할 state 변수
  const [question, setQuestion] = useState({});

  //답글 작성 시 필요한 state 변수
  const [replyContent, setReplyContent] = useState({}); //답글 내용

  //해당 게시글의 답글 목록을 저장할 state 변수

  

  useEffect(() => {
    //서버에서 게시글 상세 정보 받아오기
    GET(`${baseURL}/questions/${questionNum}`)
      .then((res) => {
        setQuestion(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [])

  const deleteQuestion = () => {
    if(window.confirm("정말 삭제하시겠습니까?")){
      DELETE(`${baseURL}/questions/${questionNum}`)
      .then(() => {
        alert("삭제되었습니다.");
        nav("/admin/sales-questions");
      })
      .catch((err) => {
        console.log(err);
        alert("삭제에 실패했습니다.");
      })
    }
  }

  return (
    <>
      <Container
        style={{
          border: "none",
          margin: "0",
          padding: "0",
          display: "flex",
          justifyContent: "center"
        }}
      >
        <Form style={{ padding: "30px", width: "100%", maxWidth: "600px" }}>

          {/* 제목 */}
          <Form.Group className="mb-3" controlId="formTitle" style={{marginBottom: "20px", borderBottom: "1px solid #000"}}>
            <FormText
              style={{ fontWeight: "bold", fontSize: "24px", color: "#000"}}
            >
              {location.state?.title || question.title || "제목이 없습니다."} 
            </FormText>
          </Form.Group>

          {/* 작성자 */}
          <Form.Group className="mb-3" controlId="formAuthor">
            <FormLabel style={{ fontWeight: "bold", fontSize: "20px", }}>
            작성자
            </FormLabel>
            <FormText
              style={{
                display: "block",
                fontSize: "16px",
                marginBottom: "10px",
              }}
            >
              {location.state?.userId || question.userId || "작성자 정보 없음"}
            </FormText>
          </Form.Group>

          {/* 내용 */}
          <Form.Group className="mb-3" controlId="formContent">
            <FormLabel style={{ fontWeight: "bold", fontSize: "20px" }}>
              내용
            </FormLabel>
            <FormText
              style={{
                display: "block",
                fontSize: "16px",
                marginBottom: "10px",
              }}
            >
              {question.content || "내용이 없습니다."}
            </FormText>
          </Form.Group>
          <div className="d-flex justify-content-end mt-5">
            <Button type="button" variant="danger" onClick={deleteQuestion}>
                삭제
            </Button>
          </div>
        </Form>
      </Container>
    </>
  );
};

export default SalesQnADetail;
