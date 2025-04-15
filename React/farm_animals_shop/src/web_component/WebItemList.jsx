import axios from "axios";
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import { CardGroup, Card, ButtonGroup, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const baseURL = import.meta.env.VITE_API_URL;

const WebItemList = () => {
  if (!sessionStorage.getItem("accessToken")) {
    var member = null; // 로그인하지 않은 경우
  } else {
    member = jwtDecode(sessionStorage.getItem("accessToken")).sub; // 로그인한 유저의 아이디
  }

  const nav = useNavigate();

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

  useEffect(() => {
    axios
      .get(`${baseURL}/farmdas/items`)
      .then((res) => {
        setItemList(res.data || []);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <>
      <style>
        {`
        .card img {
          width: 100%;
          height: 150px;
          object-fit: cover;
          border-radius: 0px;
        }
        .card-title {
          font-size: 0.7rem;
          font-weight: bold;
        }
        .card-body {
          font-size: 0.7rem;
          text-align: center;
        }
      `}
      </style>

      <Row className="g-4 px-3">
        {itemList.map((itemData, i) => (
          <Col key={i} xs={6} sm={4} md={3} lg={3}>
            <Card className="h-100 shadow-sm">
              <Card.Img
                variant="top"
                src={itemData.imagePath}
                style={{
                  height: "270px",
                  objectFit: "cover",
                  cursor: "pointer",
                }}
                onClick={() => nav(`/farmdas/item/${itemData.itemCode}`)}
              />
              <Card.Body className="d-flex flex-column justify-content-between">
                <Card.Title
                  style={{ fontSize: "0.8rem", cursor: "pointer" }}
                >
                  {itemData.itemName}
                </Card.Title>
                <Card.Text style={{ fontSize: "1.2rem" }}>{formatPrice(itemData.price)}원</Card.Text>
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
                    onClick={() => addToCart(itemData.itemCode, 1)}
                  >
                    장바구니
                  </Button>
                </ButtonGroup>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default WebItemList;
