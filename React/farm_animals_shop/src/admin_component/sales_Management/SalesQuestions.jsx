import React, { useState } from "react";

const SalesQuestions = () => {
  // 질의 응답 페이지
const [questions, setQuestions] = useState([]);

  return (
    <>
      <div>Q&A게시판</div>
      <div>
      <span>총 ??개의 게시물</span>
      <select>
        <option>제목</option>
        <option>작성자</option>
      </select>
        <input type="text" />
        <button type="button">검색</button>
      </div>

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
            {
              
            }
          </tbody>
        </table>
      </div>
    </>
  );
};

export default SalesQuestions;
