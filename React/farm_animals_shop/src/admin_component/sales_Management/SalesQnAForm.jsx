import React from 'react'

// Q&A 등록 게시판
const SalesQnAForm = () => {
  return (
    <>
      <div>Q&A</div>
      {/* 질문 제목 */}
      <p>제목</p>

      {/* 작성자 */}
      <div>
        <span>작성자</span>
        <span>홍혜원</span>
      </div>

      {/* 작성일 */}
      <div>
        <span>작성일 </span>
        <span>2025.03.25 17:38</span>
      </div>

      {/* 조회 */}
      <div>
        <span>조회</span>
        <span>13</span>
      </div>

      {/* 설명 */}
      <p>설명</p>

      {/* 버튼 클릭 시 질문 리스트 목록으로 이동 */}
      <button type='button'>목록</button>

      {/* 버튼 클릭 시 수정하는 페이지로 이동 */}
      <button type="button">수정하기</button>
    </>
  )
}

export default SalesQnAForm