import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GET } from "../../apis/CRUD";
import { Container } from "react-bootstrap";

const baseURL = import.meta.env.VITE_API_URL;

// ★ 질의 응답 페이지 ★

const SalesQuestions = () => {
  const nav = useNavigate();
  //조회한 게시글 목록 데이터를 저장할 state 변수
  const [questionList, setQuestionList] = useState([]);

  //서버에서 게시글 목록 받아오기
  useEffect(() => {
    GET(`${baseURL}/questions`)
      .then((res) => setQuestionList(res.data))
      .catch((error) => console.log(error));
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
    GET(`${baseURL}/questions?searchKeyword=${searchData.searchKeyword}&searchValue=${searchData.searchValue}`)
      .then((res) => setQuestionList(res.data))
      .catch((error) => console.log(error));
  };

  return (
    <Container className='mt-3' style={{ maxHeight: '400px', overflowY: 'auto' }}>
      <h2>Q&A게시판</h2>

      {/* 검색input단 */}
      <div>
        <div>
          <span>총 {questionList.length}개의 게시물</span>
        </div>
        <div>
          <select
            value={searchData.searchKeyword}
            name="searchKeyword"
            onChange={(e) => changeSearchData(e)}
          >
            <option value="TITLE">제목</option>
            <option value="USER_ID">작성자</option>
          </select>
          <input
            type="text"
            name="searchValue"
            value={searchData.searchValue}
            onChange={(e) => changeSearchData(e)}
          />
          <button type="button" onClick={(e) => searchList()}>
            검색
          </button>
        </div>
      </div>

      {/* 테이블 */}
      <div>
        <table>
          <thead>
            <tr>
              <td>번호</td>
              <td>제목</td>
              <td>작성자</td>
              <td>작성일</td>
              <td>조회수</td>
            </tr>
          </thead>
          <tbody>
            {questionList.length === 0 ? (
              <tr>
                <td colSpan={5}>등록된 게시물이 없습니다.</td>
              </tr>
            ) : (
              questionList.map((question, i) => {
                return (
                  <tr key={i}>
                    <td>{questionList.length - i}</td>
                    <td>
                      <span
                        onClick={(e) =>
                          nav(`/admin/sales-questions/${question.questionNum}`)
                        }
                      >
                        {question.title}
                      </span>
                    </td>
                    <td>{question.userId}</td>
                    <td>{dayjs(question.regDate).format("YYYY년 MM월 DD일")}</td>
                    <td>{question.readCnt}</td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>

        <div>
          {/* 버튼 클릭시 새로 글 작성하는 등록 페이지로 이동 */}
          <button type="button" onClick={() => nav("/admin/sales-qnaform")}>
            글쓰기
          </button>
        </div>
      </div>
    </Container>
  );
};

export default SalesQuestions;
