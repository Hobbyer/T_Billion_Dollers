import React from "react";
import styles from "../Admin.module.css";
import { useNavigate } from "react-router-dom";

// Q&A 등록 게시판
const SalesQnAForm = () => {
  const nav = useNavigate();

  return (
    <div className={styles.form_container}>
      <h2>Q&A 등록하기</h2>
      <table className={styles.form_table}>
        <colgroup>
          <col style={{width:"20%"}} />
          <col style={{width:"80%"}} />
        </colgroup>
        <tbody>
          {/* 글 제목 */}
          <tr className={styles.form_title}>
            <td>제목
              <span className={styles.required}>*</span>
            </td>
            <td>
              <input type="text" placeholder="제목을 입력해 주세요" />
            </td>
          </tr>

          {/* 작성자 */}
          <tr className={styles.form_userId}>
            <td>작성자
              <span className={styles.required}>*</span>
            </td>
            <td>
              <input type="text" placeholder="이름을 입력해 주세요" />
            </td>
          </tr>

          {/* 설명 */}
          <tr className={styles.form_content}>
            <td>설명
              <span className={styles.required}>*</span>
            </td>
            <td>
              <input type="text" placeholder="설명을 입력해 주세요" />
            </td>
          </tr>
        </tbody>
      </table>

      {/* 첨부파일 */}
      <table className={styles.form_file}>
        <colgroup>
          <col style={{width:"20%"}} />
          <col style={{width:"80%"}} />
        </colgroup>
        <tr>
          <td>
          <span>파일 첨부</span>
          </td>
          <td>
            <label for="input-file">이곳을 클릭해 첨부파일을 업로드 하세요</label>
            <input type="file" id="input-file" style={{display:"none"}} />
          </td>
        </tr>
      </table>

      {/* 등록, 목록 버튼 */}
      <div className={styles.form_btn}>
        <button type="button" onClick={() => nav("/admin/sales-questions")}>목 록</button>
        <button type="button">등 록</button>
      </div>
    </div>
  );
};

export default SalesQnAForm;
