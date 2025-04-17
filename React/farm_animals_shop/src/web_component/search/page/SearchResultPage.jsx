// src/web_component/SearchResultPage.jsx

import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Spinner, Alert, ButtonGroup, Button } from "react-bootstrap";
import { jwtDecode } from "jwt-decode";

const baseURL = import.meta.env.VITE_API_URL;
const SearchResultPage = () => {
  const nav = useNavigate();
  const { keyword } = useParams(); // 주소에서 검색어 추출
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  if (!sessionStorage.getItem("accessToken")) {
    var member = null; // 로그인하지 않은 경우
  } else {
    member = jwtDecode(sessionStorage.getItem("accessToken")).sub; // 로그인한 유저의 아이디
  }


  const formatPrice = (price) => {
    if (!price && price !== 0) return "";
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const [itemList, setItemList] = useState([]);

  // 상품리스트 4개씩 잘라서 배열로 만드는 함수
  const cardArray = (arr, size) => {
    const result = [];
    for (let i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, i + size)); // 배열의 i ~ i + size까지 잘라서 result에 추가
    }
    return result;
  };

  const cardList = cardArray(itemList, 4); // 4개씩 잘라서 배열로 만듦

  // 장바구니 담기
  const addToCart = (itemCode, quantity) => {
    if (member === null) {
      alert("로그인 후 장바구니에 담을 수 있습니다.");
    } else {
      // 장바구니에 담기 API 호출
      axios
        .post(
          `${baseURL}/farmdas/cart/${member}/add?itemCode=${itemCode}&quantity=${quantity}`
        )
        .then((res) => {
          if (res.data === false) {
            confirm(
              "이미 장바구니에 담긴 상품입니다. \n장바구니로 이동하시겠습니까?"
            ) && nav("/farmdas/cart/:userId");
          } else {
            confirm("장바구니에 담겼습니다. \n장바구니로 이동하시겠습니까?") &&
              nav("/farmdas/cart/:userId");
          }
        })
        .catch((err) => {
          console.error(err); // 에러 처리
          alert("장바구니에 담기 실패했습니다.");
        });
    }
  };

  // 검색 API 호출
  useEffect(() => {
    const fetchSearchResults = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(
          `${baseURL}/farmdas/search?keyword=${keyword}`
        );
        setItems(res.data);
      } catch (err) {
        setError("검색 결과를 불러오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [keyword]);

  return (
    <Container className="mt-4 mb-4">
      <h3>
        "<span style={{ color: "#007bff" }}>{keyword}</span>" 검색 결과
      </h3>

      {loading && (
        <div className="text-center my-5">
          <Spinner animation="border" variant="primary" />
        </div>
      )}

      {error && (
        <Alert variant="danger" className="mt-4">
          {error}
        </Alert>
      )}

      {!loading && items.length === 0 && (
        <p className="mt-4">검색 결과가 없습니다.</p>
      )}

      <Row className="mt-4">
        {items.map((item,i) => (
          <Col key={i} xs={12} sm={4} md={3} lg={3}>
          <Card className="h-100 shadow-sm">
            <Card.Img
              variant="top"
              src={item.imagePath}
              style={{
                height: "270px",
                objectFit: "cover",
                cursor: "pointer",
              }}
              onClick={() => nav(`/farmdas/item/${item.itemCode}`)}
            />
            <Card.Body className="d-flex flex-column justify-content-between">
              <Card.Title
                style={{ fontSize: "0.8rem", cursor: "pointer" }}
                onClick={() => nav(`/farmdas/item/${item.itemCode}`)}
              >
                {item.itemName}
              </Card.Title>
              <Card.Text style={{ fontSize: "1.2rem" }}>{formatPrice(item.price)}원</Card.Text>
            </Card.Body>
            <Card.Footer className="text-center">
              <ButtonGroup className="w-100">
                <Button
                  size="sm"
                  variant="outline-success"
                  style={{ fontSize: "0.75rem" }}
                >
                  구매하기
                </Button>
                <Button
                  size="sm"
                  variant="outline-primary"
                  style={{ fontSize: "0.75rem" }}
                  onClick={() => addToCart(item.itemCode, 1)}
                >
                  장바구니
                </Button>
              </ButtonGroup>
            </Card.Footer>
          </Card>
        </Col>
        ))}
      </Row>
    </Container>
  );
};

export default SearchResultPage;
