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

import { DELETE, GET, POST } from "../../apis/CRUD";
import { jwtDecode } from "jwt-decode";

const SalesQnADetail = () => {
  const userId = jwtDecode(sessionStorage.getItem("accessToken")).sub; // JWT에서 userId 추출

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
      setAnswer(e.target.value); // 입력된 답변 내용 저장
    };

  const handleSubmit = () => {
    // 여기서 서버로 답변을 보내는 로직을 추가
    alert("답변이 서버로 전송되었습니다!");
  };

  const [loading, setLoading] = useState(true); //로딩 상태를 관리하기 위한 state 변수

  //조회한 상세 정보를 저장할 state 변수
  const [question, setQuestion] = useState({});

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

  const [answerData, setAnswerData] = useState([]); //답변 목록을 저장할 state 변수

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

    GET(`${baseURL}/admin/answers/${questionNum}`)
      .then((res) => {
        console.log(res.data)
        setAnswerData(res.data); //답변 목록 저장
      })
      .catch((err) => {console.log(err)})
  }, []);

  const insertAnswer = () => {
    if (question.answerStatus !== "ANSWERED" && answer !== "") {
      //답변 작성 API 호출
      const data = {
        content: answer
      };
      POST(`${baseURL}/admin/answers/${questionNum}?userId=${userId}`, data)
        .then((res) => {
          alert("답변이 등록되었습니다.");
          nav("/admin/sales-questions"); //답변 등록 후 목록 페이지로 이동
        })
        .catch((err) => {
          console.log(err);
          alert("답변 등록에 실패했습니다.");
        });
      } else {
        null
      }
  };

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
            <Accordion defaultActiveKey={question.answerStatus === "ANSWERED" ? "1" : "0"}>
              <Card>
                <Card.Header>
                  <ContextAwareToggle eventKey="0">
                    <div onClick={()=>{
                      insertAnswer();
                    }}>답변하기</div>
                  </ContextAwareToggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>
                    { question.answerStatus === "ANSWERED" ? (
                      <Form.Control
                      as="textarea"
                      value={answerData[0].content}
                      onChange={handleAnswerChange}
                    />
                    )
                    :
                    (
                    <Form.Control
                      as="textarea"
                      placeholder="답변을 입력해주세요."
                      onChange={handleAnswerChange}
                    />
                    )}
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>

            {/* 삭제 버튼 */}
            <div className="d-flex justify-content-between mt-5">
            <Button
                variant="secondary"
                onClick={() => {
                  nav("/admin/sales-questions");
                }}
              >
                목록
              </Button>

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
