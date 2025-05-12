import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import {
  Button,
  Figure,
  Form,
  OverlayTrigger,
  Popover,
  Stack,
  Container,
  Row,
  Col
} from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { GET } from "../apis/CRUD";
import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL;

const WebItemDetail = () => {
  const nav = useNavigate();
  const params = useParams();
  const [loading, setLoading] = useState(true);

  const member = sessionStorage.getItem("accessToken")
    ? jwtDecode(sessionStorage.getItem("accessToken")).sub
    : null;

  const formatPrice = (price) => {
    if (!price && price !== 0) return "";
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const [itemCount, setItemCount] = useState(1);

  const itemToCart = () => {
    if (member === null) {
      alert("로그인 후 장바구니에 담을 수 있습니다.");
    } else {
      axios
        .post(
          `${baseURL}/farmdas/cart/${member}/add?itemCode=${params.itemCode}&quantity=${itemCount}`
        )
        .then((res) => {
          const confirmText = res.data === false
            ? "이미 장바구니에 담긴 상품입니다. 장바구니로 이동하시겠습니까?"
            : "장바구니에 담겼습니다. 장바구니로 이동하시겠습니까?";
          if (confirm(confirmText)) {
            nav(`/farmdas/cart/${member}`);
          }
        })
        .catch((err) => {
          console.error(err);
          alert("장바구니에 담기 실패했습니다.");
        });
    }
  };

  const popover = (
    <Popover>
      <Popover.Body style={{ fontSize: "0.7rem", width: "100%" }}>
        <strong>
          총 상품금액에 <span style={{ color: "#FB9B2A" }}>배송비는 포함되어 있지 않습니다.</span><br />
          결제시 배송비가 추가될 수 있습니다.
        </strong>
      </Popover.Body>
    </Popover>
  );

  const itemCode = params.itemCode;
  const [itemData, setItemData] = useState({});

  useEffect(() => {
    GET(`${baseURL}/farmdas/items/${itemCode}`)
      .then((res) => {
        setItemData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <style>
        {`
          @media (max-width: 768px) {
            .detail-container {
              flex-direction: column !important;
            }
            .item-image, .item-info {
              width: 100% !important;
            }
            .item-info {
              padding: 10px !important;
            }
          }
          .custom-number-input {
            width: 60px;
            height: 30px;
            border: 1px solid lightgray;
            border-radius: 5px;
            text-align: center;
          }
          .custom-number-input:focus {
            outline: none;
            box-shadow: none;
            border-color: green;
          }
          input[type=number]::-webkit-inner-spin-button {
            opacity: 1;
            display: inline-block;
            appearance: auto;
          }
        `}
      </style>

      {loading ? (
        <Container>
          <h3>Loading...</h3>
          <div className='d-flex justify-content-center align-items-center'>
            <img
              src="/imgs/cow (1).png"
              alt="로딩중"
              style={{ width: "60px", height: "60px", animation: "spin 1s linear infinite" }}
            />
          </div>
        </Container>
      ) : (
        <Container fluid>
          <div className="d-flex detail-container" style={{ display: "flex" }}>
            <div className="item-image text-center" style={{ width: "50%" }}>
              <Figure.Image width="100%" height="100%" alt="상품 사진" src={itemData.imagePath} />
            </div>

            <div className="item-info" style={{ width: "50%", padding: "20px" }}>
              <Stack gap={3} style={{ textAlign: "left" }}>
                <h3 className="fw-bold">{itemData.itemName}</h3>
                <h4>{formatPrice(itemData.price)}원</h4>

                {!member && (
                  <div className="p-3 border bg-white">
                    <img src="/imgs/fast.png" style={{ width: "50px" }} />
                    <span className="ms-2">
                      <span className="login fw-bold text-warning" onClick={() => nav("/farmdas/login")}>
                        로그인 후
                      </span> 서비스를 이용해주세요.
                    </span>
                  </div>
                )}

                <div>
                  <span className="fw-bold" style={{ fontSize: "0.9rem" }}>우체국택배 : 3,000</span>원
                  <span className="text-warning ms-2" style={{ fontSize: "0.9rem" }}>(주문시 결제)</span>
                  <p className="text-muted" style={{ fontSize: "0.8rem", borderBottom: "1px solid lightgray" }}>
                    30,000원 이상 구매 시 무료
                  </p>
                </div>

                <p style={{ fontSize: "0.9rem" }}>{itemData.itemName}</p>

                <div className="d-flex justify-content-between border p-2 align-items-center">
                  <div>
                    <Button variant="outline-dark" size="sm" onClick={() => itemCount > 1 && setItemCount(itemCount - 1)}>-</Button>
                    <span className="mx-2">{itemCount}</span>
                    <Button variant="outline-dark" size="sm" onClick={() => setItemCount(itemCount + 1)}>+</Button>
                  </div>
                  <span>{formatPrice(itemCount * itemData.price)}원</span>
                </div>

                <div className="d-flex flex-column flex-md-row justify-content-between align-items-center border-top pt-3">
                  <div>
                    <span className="fw-bold me-2">총 상품 금액</span>
                    <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
                      <Button variant="light" size="sm">?</Button>
                    </OverlayTrigger>
                  </div>
                  <div className="mt-2 mt-md-0 d-flex gap-2">
                    <span className="text-muted">총 수량 {itemCount}개</span>
                    <span className="fw-bold text-danger fs-5">{formatPrice(itemData.price * itemCount)}원</span>
                  </div>
                </div>

                <div className="d-grid mt-4 gap-2">
                  <Button variant="success" size="lg" className="d-flex justify-content-center gap-2" onClick={itemToCart}>
                    <i className="bi bi-cart4"></i>
                    장바구니 담기
                  </Button>
                  <Button variant="primary" size="lg" className="d-flex justify-content-center gap-2">
                    <i className="bi bi-bag-check"></i>
                    바로 구매하기
                  </Button>
                </div>
              </Stack>
            </div>
          </div>
        </Container>
      )}
    </>
  );
};

export default WebItemDetail;
