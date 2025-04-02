import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Stack,
  Button,
  Modal,
  Form,
  FormLabel,
  FormText,
} from "react-bootstrap";

const SalesQnADetail = () => {
  const { questionNum } = useParams();

  //조회한 상세 정보를 저장할 state 변수
  const [question, setQuestion] = useState({});

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //해당 게시글의 답글 목록을 저장할 state 변수

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
          <Form.Group className="mb-3" controlId="formTitle">
            <FormText
              style={{ fontWeight: "bold", fontSize: "24px", color: "#000" }}
            >
              1번 게시물의 제목
            </FormText>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formAuthor">
            <FormLabel style={{ fontWeight: "bold", fontSize: "20px" }}>
              작성자
            </FormLabel>
            <FormText
              style={{
                display: "block",
                fontSize: "16px",
                marginBottom: "10px",
              }}
            >
              작성자 이름
            </FormText>
          </Form.Group>
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
              게시물의 내용이 여기에 표시됩니다.
            </FormText>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formAttachment">
            <FormLabel style={{ fontWeight: "bold", fontSize: "20px" }}>
              첨부파일
            </FormLabel>
            <FormText
              style={{
                display: "block",
                fontSize: "16px",
                marginBottom: "10px",
              }}
            >
              첨부파일 이름 또는 다운로드 링크
            </FormText>
          </Form.Group>
          <Stack direction="horizontal" gap={3} className="md-4">
            <Button
              variant="primary"
              style={{
                backgroundColor: "rgba(0, 123, 255, 0.8)",
                border: "none",
              }}
            >
              수정
            </Button>
            <Button
              variant="secondary"
              style={{
                backgroundColor: "rgba(108, 117, 125, 0.8)",
                border: "none",
              }}
            >
              취소
            </Button>
          </Stack>
        </Form>
      </Container>
    </>
  );
};

export default SalesQnADetail;
