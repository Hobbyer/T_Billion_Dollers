import { useState } from "react";
import { Button, Container, Form, Pagination, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const MyQnA = () => {
  const nav = useNavigate();
  // 문의 목록 불러오기
  const [QnAList,setQnAList]=useState([]);
  
  return (
    <Container className="mt-4">
      <div className="text-start">
        <h2 className="fw-bold">나의 문의 내역</h2>
      </div>
      <hr />
      <div className="d-flex justify-content-end">
        <Form.Control className="w-50 mb-3" />
      </div>
      <Table>
        <thead>
          <tr>
            <th>NO</th>
            <th>제목</th>
            <th>작성자</th>
            <th>작성일</th>
            <th>처리 여부</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>배송문의 드립니다.</td>
            <td>kim</td>
            <td>2025-04-14</td>
            <td>
              <Button>미완료</Button>{" "}
            </td>
          </tr>
        </tbody>
      </Table>
      <div className="d-flex justify-content-end m-4">
        <Button variant="secondary" size="sm" onClick={()=>{nav("/farmdas/qna")}}>
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
