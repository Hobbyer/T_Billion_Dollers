import { useEffect, useState } from "react";
import { Button, Container, Form, Pagination, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import MyQnADetail from "./MyQnADetail";
import { DELETE, GET } from "../../../apis/CRUD";
import { jwtDecode } from "jwt-decode";
import dayjs from "dayjs";

const baseURL = import.meta.env.VITE_API_URL;

const MyQnA = () => {
  const nav = useNavigate();
  // 문의 목록 불러오기
  const [questions, setQuestions] = useState([]);
  // 모달 보여주기
  const [isShow, setIsShow] = useState(false);

  //로그인한 유저의 id를 가져오는 로직직
  const userId = jwtDecode(sessionStorage.getItem("accessToken")).sub;

  const fetchQuestions = async () => {
    try {
      const res = await GET(`${baseURL}/questions?userId=${userId}&page=1&size=10`); // API 경로 수정 필요
      setQuestions(res.data);
      console.log(res.data);
      
    } catch (error) {
      console.error("문의 목록을 불러오는 데 실패했습니다.", error);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  return (
    <Container className="mt-5">
      <div className="text-start">
        <h2 className="fw-bold">나의 문의 내역</h2>
      </div>
      <hr />
      <Table>
        <thead>
          <tr>
            <th>작성일</th>
            <th>상품명</th>
            <th>문의 제목</th>
            <th>답변 여부</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((question,i)=>{
            return(
              <tr key={i}>
              {/* 문의글 작성일 */}
              <td>{dayjs(question.regDate).format('YY-MM-DD HH:mm')}</td>
              {/* 주문한 상품/상품의 원래 링크 연결 */}
              <td>{question.itemName === null ? '1:1 문의' : question.itemName}</td> 
              {/* 문의글에 등록한 제목 */}
              <td>{question.title}</td>
              <td>
                {/* 관리자 답변여부에 따라 완료/미완료 변경 */}
                <Button
                  variant="success"
                  onClick={(e) => {
                    setIsShow(true);
                  }}
                >
                  답변 완료
                </Button>{" "}
                <MyQnADetail
                  isShow={isShow}
                  onHide={() => {
                    setIsShow(false);
                  }}
                />
              </td>
            </tr>
            )
           
          })}
          
        </tbody>
      </Table>
      <div className="d-flex justify-content-end m-4">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => {
            nav("/farmdas/qna");
          }}
        >
          문의글 등록
        </Button>
      </div>
      <div className="d-flex justify-content-center mt-5">
        <Pagination>
          <Pagination.First />
          <Pagination.Prev />
          <Pagination.Item active>{1}</Pagination.Item>
          <Pagination.Item>{2}</Pagination.Item>
          <Pagination.Item>{3}</Pagination.Item>
          <Pagination.Item>{4}</Pagination.Item>
          <Pagination.Item>{5}</Pagination.Item>

          <Pagination.Next />
          <Pagination.Last />
        </Pagination>
      </div>
    </Container>
  );
};

export default MyQnA;
