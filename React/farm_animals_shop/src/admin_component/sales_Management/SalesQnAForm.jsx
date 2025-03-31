import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Q&A 등록 게시판
const SalesQnAForm = () => {
  const nav = useNavigate();

  // input 태그들에 입력한 데이터를 저장하는 변수
  const [question, setQuestion] = useState({
    title: "",
    userId: "",
    content: "",
  });

  // 선택한 첨부파일을 저장할 변수
  const [file, setFile] = useState(null);

  // 값 입력 시 반복 실행되는 함수
  const changeQuestion = (e) => {
    setQuestion({
      ...question,
      [e.target.name]: e.target.value,
    });
  };

  console.log(question);

  // 등록 버튼 클릭 시 질문 등록 실행
  const regQuestion = () => {
    const regForm = new FormData();
    // 질문 등록 시 (DB에 insert) 필요한 데이터 객체
    regForm.append("title", question.title);
    regForm.append("userId", question.userId);
    regForm.append("content", question.content);

    // 첨부파일 데이터 적재
    regForm.append("file", file);

    axios.post('/api/')
  };

  return (
    <div>
      <h2>Q&A 등록하기</h2>
      <table>
        <colgroup>
          <col style={{ width: "20%" }} />
          <col style={{ width: "80%" }} />
        </colgroup>
        <tbody>
          {/* 글 제목 */}
          <tr>
            <td>
              제목
              <span>*</span>
            </td>
            <td>
              <input
                type="text"
                name="title"
                placeholder="제목을 입력해 주세요"
                onChange={(e) => changeQuestion(e)}
              />
            </td>
          </tr>

          {/* 작성자 */}
          <tr>
            <td>
              작성자
              <span>*</span>
            </td>
            <td>
              <input
                type="text"
                name="userId"
                placeholder="이름을 입력해 주세요"
                onChange={(e) => changeQuestion(e)}
              />
            </td>
          </tr>

          {/* 설명 */}
          <tr>
            <td>
              설명
              <span>*</span>
            </td>
            <td>
              <textarea
                name="content"
                id=""
                onChange={(e) => changeQuestion(e)}
              ></textarea>
            </td>
          </tr>
        </tbody>
      </table>

      {/* 첨부파일 */}
      <div>
        <p>파일첨부</p>
        <input type="file" onChange={(e) => changeQuestion(e)} />
      </div>

      {/* 등록, 목록 버튼 */}
      <div>
        <button type="button" onClick={() => nav("/admin/sales-questions")}>
          목 록
        </button>
        {/* 등록누르면 서버로 갑니다 ! */}
        <button type="button" onClick={(e) => regQuestion()}>
          등 록
        </button>
      </div>
    </div>
  );
};

export default SalesQnAForm;
