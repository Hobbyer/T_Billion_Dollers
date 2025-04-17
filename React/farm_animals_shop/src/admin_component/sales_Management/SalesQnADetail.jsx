import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  Container,
  Stack,
  Button,
  Modal,
  Form,
  FormLabel,
  FormText,
  Accordion,
  Card,
  useAccordionButton,
  AccordionContext,
} from "react-bootstrap";

const baseURL = import.meta.env.VITE_API_URL;

import { DELETE, GET } from "../../apis/CRUD";

const SalesQnADetail = () => {
  const nav = useNavigate();
  const { questionNum } = useParams();
  const location = useLocation(); //이전 페이지에서 전달된 상태를 가져오기 위한 useLocation 훅 사용

  //로딩 상태를 관리하기 위한 state 변수
  const [isOpen, setIsOpen] = useState(false);
  const [answer, setAnswer] = useState("");   // 답변 내용 관리

   // 아코디언 열기/닫기 상태 토글
   const handleAccordionToggle = () => {
    setIsOpen(!isOpen); // 상태 반전
  };

    // 답변 내용 관리
    const handleAnswerChange = (e) => {
      setAnswer(e.target.value);
    };

  const handleSubmit = () => {
    // 여기서 서버로 답변을 보내는 로직을 추가
    alert("답변이 서버로 전송되었습니다!");
  };

  const [loading, setLoading] = useState(true); //로딩 상태를 관리하기 위한 state 변수

  //조회한 상세 정보를 저장할 state 변수
  const [question, setQuestion] = useState({});

  //답글 작성 시 필요한 state 변수
  const [replyContent, setReplyContent] = useState({}); //답글 내용

  //해당 게시글의 답글 목록을 저장할 state 변수

  const ContextAwareToggle = ({ children, eventKey, callback }) => {
    const { activeEventKey } = useContext(AccordionContext);

    const decoratedOnClick = useAccordionButton(
      eventKey,
      () => callback && callback(eventKey)
    );

    const isCurrentEventKey = activeEventKey === eventKey;

    //서버에서 답변 목록을 가져오는 로직
    useEffect(() => {
      GET(`${baseURL}/questions/${questionNum}`)
        .then((res) => {
          setQuestion(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }, []);

    return (
      <button
        type="button"
        className={
          isCurrentEventKey
            ? "css-button-fully-rounded--yellow"
            : "css-button-fully-rounded--green"
        }
        onClick={decoratedOnClick}
      >
        {children}
      </button>
    );
  };

  useEffect(() => {
    //서버에서 게시글 상세 정보 받아오기
    GET(`${baseURL}/questions/${questionNum}`)
      .then((res) => {
        setQuestion(res.data);
        setLoading(false); //로딩 완료
      })
      .catch((err) => {
        console.log(err);
        setLoading(false); //로딩 완료
      });
  }, []);

  const deleteQuestion = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      DELETE(`${baseURL}/questions/${questionNum}`)
        .then(() => {
          alert("삭제되었습니다.");
          nav("/admin/sales-questions");
        })
        .catch((err) => {
          console.log(err);
          alert("삭제에 실패했습니다.");
        });
    }
  };

  return (
    <>
      <style>
        {`
          @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
          }

          .css-button-fully-rounded--yellow {
            min-width: 130px;
            height: 35px;
            font-size: 14px;
            color: #FEB904;
            padding: 5px 10px;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.3s ease;
            position: relative;
            display: inline-block;
            outline: none;
            border-radius: 20px;
            border: 2px solid #FEB904;
            background: #fff;
          }

          .css-button-fully-rounded--green {
            min-width: 130px;
            height: 35px;
            font-size: 14px;
            color: #32B67A;
            padding: 5px 10px;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.3s ease;
            position: relative;
            display: inline-block;
            outline: none;
            border-radius: 20px;
            border: 2px solid #32B67A;
            background: #fff;
          }

          textarea {
            resize: none;
            width: 100%;
            height: 100px;
        `}
      </style>

      {loading ? (
        <div style={{ padding: "0 100px" }}>
          <h3>Loading...</h3>
          <div className="d-flex justify-content-center align-items-center">
            <img
              className="loading-img mt-3"
              src="/imgs/cow (1).png" // 원하는 로딩 이미지 경로
              alt="로딩중"
              style={{
                width: "60px",
                height: "60px",
                animation: "spin 1s linear infinite",
              }}
            />
          </div>
        </div>
      ) : (
        <Container
          style={{
            border: "none",
            margin: "0",
            padding: "0",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Form style={{ padding: "30px", width: "100%", maxWidth: "600px" }}>
            {/* 제목 */}
            <Form.Group
              className="mb-3"
              controlId="formTitle"
              style={{ marginBottom: "20px", borderBottom: "1px solid #000" }}
            >
              <FormText
                style={{ fontWeight: "bold", fontSize: "24px", color: "#000" }}
              >
                {location.state?.title || question.title || "제목이 없습니다."}
              </FormText>
            </Form.Group>

            {/* 작성자 */}
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
                {location.state?.userId ||
                  question.userId ||
                  "작성자 정보 없음"}
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
                  marginBottom: "70px",
                }}
              >
                {question.content || "내용이 없습니다."}
              </FormText>
            </Form.Group>

{/* 답변 */}
<Accordion defaultActiveKey="0">
              <Card>
                <Card.Header>
                  <ContextAwareToggle eventKey="0">답변하기</ContextAwareToggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>
                    <Form.Control
                      as="textarea"
                      placeholder="답변을 입력해주세요."
                    />
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>

            {/* 삭제 버튼 */}
            <div className="d-flex justify-content-end mt-5">
              <Button type="button" variant="danger" onClick={deleteQuestion}>
                삭제
              </Button>
            </div>
          </Form>
        </Container>
      )}
    </>
  );
};

export default SalesQnADetail;
