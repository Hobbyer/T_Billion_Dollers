import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { POST } from "../../apis/CRUD";

// Q&A 등록 게시판
const SalesQnAForm = () => {
  const nav = useNavigate();

  // input 태그들에 입력한 데이터를 저장하는 변수
  const [questionData, setQuestionData] = useState({
    title: "",
    userId: "",
    content: "",
  });

  // 값 입력 시 반복 실행되는 함수
  const changeQuestionData = (e) => {
    setQuestionData({
      ...questionData,
      [e.target.name]: e.target.value,
    });
  };

  console.log(questionData);

  // 등록 버튼 클릭 시 서버의 insert api 실행
  const insertquestion = () => {
    POST("/api/questions", questionData)
      .then((res) => {
        alert("질문이 등록 되었습니다.");
        nav("/admin/sales-questions");
      })
      .catch((error) => console.log(error));
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
            <td>제목</td>
            <td>
              <input
                type="text"
                name="title"
                value={questionData.title}
                placeholder="제목을 입력해 주세요"
                onChange={(e) => changeQuestionData(e)}
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
                value={questionData.userId}
                placeholder={questionData.userId}
                onChange={(e) => changeQuestionData(e)}
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
                cols={50}
                rows={5}
                name="content"
                value={questionData.content}
                onChange={(e) => {
                  changeQuestionData(e);
                }}
              ></textarea>
            </td>
          </tr>
        </tbody>
      </table>

      {/* 첨부파일 */}
      <div>
        <p>파일첨부</p>
        <input type="file" onChange={(e) => changeQuestionData(e)} />
      </div>

      {/* 등록, 목록 버튼 */}
      <div>
        <button type="button" onClick={() => nav("/admin/sales-questions")}>
          목 록
        </button>
        {/* 등록누르면 서버로 갑니다 ! */}
        <button type="button" onClick={(e) => insertquestion()}>
          등 록
        </button>
      </div>
    </div>
  );
};

export default SalesQnAForm;
