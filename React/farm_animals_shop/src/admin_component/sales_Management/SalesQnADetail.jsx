
import React, { useState } from 'react'
import { useParams } from 'react-router-dom';

const SalesQnADetail = () => {
  const { questionNum } = useParams();

    //조회한 상세 정보를 저장할 state 변수
    const [question, setQuestion] = useState({});

    //해당 게시글의 답글 목록을 저장할 state 변수
    

  return (
    <div>SalesQnADetail</div>

  )
}

export default SalesQnADetail