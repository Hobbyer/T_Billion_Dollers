import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Form, Table } from "react-bootstrap";
import { GET } from "../../apis/CRUD";

const baseURL = import.meta.env.VITE_API_URL;

// ★ 질의 응답 페이지 ★

const SalesQuestions = () => {
  const nav = useNavigate();
  //조회한 게시글 목록 데이터를 저장할 state 변수
  const [questionList, setQuestionList] = useState([]);

  //서버에서 게시글 목록 받아오기
  useEffect(() => {
    GET(`${baseURL}/questions`)
      .then((res) => {
        setQuestionList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //검색창에 입력한 데이터를 저장할 변수
  const [searchData, setSearchData] = useState({
    searchKeyword: "TITLE",
    searchValue: "",
  });

  //검색창 내용 변경 시 실행되는 함수
  const changeSearchData = (e) => {
    setSearchData({
      ...searchData,
      [e.target.name]: e.target.value,
    });
  };

  //검색 버튼 클릭 시 실행 함수
  const searchList = () => {
    GET(
      `${baseURL}/questions?searchKeyword=${searchData.searchKeyword}&searchValue=${searchData.searchValue}`
    )
      .then((res) => setQuestionList(res.data))
      .catch((error) => console.log(error));
  };

  return (
    <Container
      className="mt-3"
      style={{ maxHeight: "400px", overflowY: "auto" }}
    >
      <h2>Q&A게시판</h2>

      {/* 검색input단 */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          margin: "20px 0",
        }}
      >
        <div>
          <span>총 {questionList.length}개의 게시물</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <select
            value={searchData.searchKeyword}
            name="searchKeyword"
            className="form-select bg-warning text-dark fw-bold border-warning w-auto"
            onChange={(e) => changeSearchData(e)}
          >
            <option value="TITLE">제목</option>
            <option value="USER_ID">작성자</option>
          </select>
          <Form>
            <Form.Control
              type="text"
              id="searchInput"
              name="searchValue"
              value={searchData.searchValue}
              onChange={changeSearchData}
              placeholder="검색어를 입력하세요"
              aria-describedby="searchHelpBlock"
            />
          </Form>
          <Button variant="outline-warning text-dark" onClick={(e) => searchList()}>
            검색
          </Button>
        </div>
      </div>

      {/* 테이블 */}
      <div>
        <Table responsive="md" className="custom-table">
          <thead>
            <tr>
              <th className="text-center">번호</th>
              <th className="text-center">제목</th>
              <th className="text-center">작성자</th>
              <th className="text-center">작성일</th>
              <th className="text-center">조회수</th>
            </tr>
          </thead>
          <tbody>
            {questionList.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center">
                  등록된 게시물이 없습니다.
                </td>
              </tr>
            ) : (
              questionList.map((question, i) => {
                return (
                  <tr key={i}>
                    <td className="text-center">{questionList.length - i}</td>
                    <td>
                      <span
                        onClick={(e) =>
                          nav(`/admin/sales-questions/${question.questionNum}`, {
                            state : {userId : question.userId, title : question.title} //제목, 작성자 정보 상세보기 페이지로 넘겨주기
                          })
                        }
                      >
                        {question.title}
                      </span>
                    </td>
                    <td className="text-center">{question.userId}</td>
                    <td className="text-center">
                      {dayjs(question.regDate).format("YYYY년 MM월 DD일")}
                    </td>
                    <td className="text-center">{question.readCnt}</td>
                  </tr>
                );
              })
            )}
          </tbody>
        </Table>
      </div>

      {/* 글쓰기 버튼 */}
      <Button variant="warning">글등록</Button>
    </Container>
  );
};

export default SalesQuestions;
