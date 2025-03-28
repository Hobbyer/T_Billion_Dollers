import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../Admin.module.css";

const SalesQuestions = () => {
  // 질의 응답 페이지
  const nav = useNavigate();
  const [questions, setQuestions] = useState([]);

  return (
    <div className={styles.list_container}>

      <h2>Q&A게시판</h2>

      {/* 검색input단 */}
      <div className={styles.search_container}>
        <div>
          <span>총 {questions.length}개의 게시물</span>
        </div>
        <div>
          <select>
            <option>제목</option>
            <option>작성자</option>
          </select>
          <input type="text" />
          <button type="button">검색</button>
        </div>
      </div>

      {/* 테이블 */}
      <div>
        
          <table className={styles.list_table}>
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
              {questions.length === 0 ? (
                <tr>
                  <td className={styles.no_post} colSpan={5}>등록된 게시물이 없습니다.</td>
                </tr>
              ) : (
                questions.map((question, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{question.title}</td>
                    <td>{question.userId}</td>
                    <td>{question.regDate}</td>
                    <td>{question.readCnt}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        

        <div className={styles.list_btn}>
          {/* 버튼 클릭시 새로 글 작성하는 등록 페이지로 이동 */}
          <button type="button" onClick={() => nav("/admin/sales-qnaform")}>
            글쓰기
          </button>
        </div>
      </div>
    </div>
  );
};

export default SalesQuestions;
