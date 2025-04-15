import { useEffect, useState } from "react";
import { Button, Container, Form, Pagination, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import MyQnADetail from "./MyQnADetail";
import { DELETE, GET } from "../../../apis/CRUD";

const baseURL = import.meta.env.VITE_API_URL;

const MyQnA = () => {
  const nav = useNavigate();
  // 문의 목록 불러오기
  const [QnAList, setQnAList] = useState([]);
  // 모달 보여주기
  const [isShow, setIsShow] = useState(false);
  // 카테고리 조회
  const [categoryList,setCategoryList] = useState([]);
  // 선택된 카테고리 저장용
  const [selectedCategory, setSelectedCategory] = useState(""); 

  // 카테고리 목록조회
  useEffect(()=>{
    GET(`${baseURL}/admin/categories`)
    .then(res=>{setCategoryList(res.data)
    })
    .catch()
  },[])

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    // 여기에 선택한 카테고리에 따라 상품 불러오기 등의 로직 추가
  };

  return (
    <Container className="mt-5">
      <div className="text-start">
        <h2 className="fw-bold">나의 문의 내역</h2>
      </div>
      <hr />
      <div className="d-flex justify-content-end">
        {/* 상품의 카테고리를 가져와 카테고리에 맞는 상품내역 띄워주기 */}
        <Form.Select className="mb-3" style={{width:"30%"}} onChange={(e)=>{handleCategoryChange(e)}} >
          {categoryList.map((cate,i)=>{
            return(
              <option key={i} value={cate.cateCode}>{cate.cateName}</option>
            )
          })}
          
        </Form.Select>
      </div>
      <Table>
        <thead>
          <tr>
            <th>작성일</th>
            <th>상품명</th>
            <th>문의 제목</th>
            <th>답변 여부</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            {/* 문의글 작성일 */}
            <td>2025-04-14</td>
            {/* 주문한 상품/상품의 원래 링크 연결 */}
            <td>등심 A++</td> 
            {/* 문의글에 등록한 제목 */}
            <td>배송문의 드립니다.</td>
            <td>
              {/* 관리자 답변여부에 따라 완료/미완료 변경 */}
              <Button
                onClick={(e) => {
                  setIsShow(true);
                }}
              >
                답변 완료
              </Button>{" "}
              <MyQnADetail
                isShow={isShow}
                onHide={() => {
                  setIsShow(false);
                }}
              />
            </td>
          </tr>
        </tbody>
      </Table>
      <div className="d-flex justify-content-end m-4">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => {
            nav("/farmdas/qna");
          }}
        >
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
