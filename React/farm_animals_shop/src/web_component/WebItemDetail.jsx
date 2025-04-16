import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import {
  Button,
  Figure,
  Form,
  OverlayTrigger,
  Popover,
  Stack,
} from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { GET, POST } from "../apis/CRUD";
import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL; // API URL

const WebItemDetail = () => {
  const nav = useNavigate(); // 네비게이션 훅
  const params = useParams(); // URL 파라미터 가져오기

  const [loading, setLoading] = useState(true); // 로딩 상태

  if (sessionStorage.getItem("accessToken")) {
    var member = jwtDecode(sessionStorage.getItem("accessToken")).sub; // JWT 디코딩
  } else {
    member = null;
  }

  const formatPrice = (price) => {
    if (!price && price !== 0) return "";
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const [itemCount, setItemCount] = useState(1); // 상품 수량 상태

  const itemToCart = () => {
    if (member === null) {
      alert("로그인 후 장바구니에 담을 수 있습니다.");
    } else {
      // 장바구니에 담기 API 호출
      axios.post(`${baseURL}/farmdas/cart/${member}/add?itemCode=${params.itemCode}&quantity=${itemCount}`)
        .then((res) => {
          if(res.data === false) {
            confirm("이미 장바구니에 담긴 상품입니다. \n장바구니로 이동하시겠습니까?") &&
            nav("/farmdas/cart/:userId");
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

  const popover = (
    <Popover>
      <Popover.Body style={{ fontSize: "0.7rem", width: "500px" }}>
        <strong>
          총 상품금액에{" "}
          <span style={{ color: "#FB9B2A" }}>
            배송비는 포함되어 있지 않습니다.
          </span>
          <br />
          결제시 배송비가 추가될 수 있습니다.
        </strong>
      </Popover.Body>
    </Popover>
  );

  const itemCode = params.itemCode; // URL에서 상품 코드 가져오기

  const [itemData, setItemData] = useState({}); // 상품 데이터 상태

  useEffect(() => {
    GET(`${baseURL}/farmdas/items/${itemCode}`)
      .then((res) => {
        setItemData(res.data); // 상품 데이터 설정
        setLoading(false); // 로딩 완료
      })
      .catch((err) => {
        console.error(err); // 에러 처리
        setLoading(false); // 로딩 완료
      });
  }, []);


  return (
    <>
      <style>
        {`
      @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }

      .login {
        color: #FB9B2A;
      }
      .login:hover {
        text-decoration: underline;
        cursor: pointer;
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

        /* 스핀 버튼 강제 노출 (크롬, 사파리 기준) */
      input[type=number]::-webkit-inner-spin-button {
        opacity: 1;
        display: inline-block;
        appearance: auto;
      }

      `}
      </style>
      
      { loading ? (
      <div style={{ padding: "0 100px" }}>
        <h3>Loading...</h3>
        <div className='d-flex justify-content-center align-items-center'>
          <img
            className='loading-img mt-3'
            src="/imgs/cow (1).png" // 원하는 로딩 이미지 경로
            alt="로딩중"
            style={{
              width: "60px",
              height: "60px",
              animation: "spin 1s linear infinite"
            }}
          />
        </div>
      </div>
      ) 
      : 
      <div
        style={{
          width: "100%",
          height: "100vh",
          backgroundColor: "white",
        }}
      >
        <div style={{ display: "flex" }}>
          <div
            style={{
              textAlign: "center",
              width: "50%",
            }}
          >
            <Figure.Image
              style={{}}
              width={"100%"}
              height={"100%"}
              alt="상품 사진"
              src={itemData.imagePath}
            />
          </div>

          {/* 상품 정보 */}
          <div
            style={{
              width: "50%",
              padding: "20px",
            }}
          >
            <Stack gap={3} style={{ padding: "20px", textAlign: "left" }}>
              {/* 상품 이름 */}
              <h3 className="p-2" style={{ fontWeight: "bold" }}>
                {itemData.itemName}
              </h3>

              {/* 상품 가격 */}
              <h4 className="p-2" style={{ marginLeft: "auto" }}>
                {formatPrice(itemData.price)}원
              </h4>

              {!(member === null) ? null : (
                <>
                  <div
                    className="p-3"
                    style={{
                      border: "1px solid lightgray",
                      backgroundColor: "white",
                    }}
                  >
                    <img src="/imgs/fast.png" style={{ width: "50px" }} />
                    <span>
                      <span
                        className="login"
                        style={{
                          fontWeight: "bold",
                          textDecoration: "underline",
                          marginLeft: "5px",
                        }}
                        onClick={(e) => {
                          nav("/farmdas/login");
                        }}
                      >
                        로그인 후
                      </span>{" "}
                      서비스를 이용해주세요.
                    </span>
                  </div>
                </>
              )}

              {/* 택배비 안내 */}
              <div>
                <span style={{ fontWeight: "bold", fontSize: "0.9rem" }}>
                  우체국택배 : 3,000
                </span>
                원
                <span style={{ color: "#FB9B2A", fontSize: "0.9rem" }}>
                  (주문시 결제)
                </span>
                <p
                  style={{
                    color: "gray",
                    fontSize: "0.8rem",
                    paddingBottom: "20px",
                    borderBottom: "1px solid lightgray",
                  }}
                >
                  30,000원 이상 구매 시 무료
                </p>
              </div>

              {/* 선택한상품명 */}
              <div>
                <p style={{ fontSize: "0.9rem" }}>{itemData.itemName}</p>
              </div>

              {/* 상품수량버튼 */}
              <div
                className="d-flex justify-content-between p-2"
                style={{ alignItems: "center", border: "1px solid lightgray" }}
              >
                {/* 은엽쓰의 인풋수량 */}
                {/* <Form.Control className="custom-number-input" type="number" min={1} defaultValue={1} onChange={(e) => {
                  if (e.target.value < 1) {
                    e.target.value = 1;
                  }
                }} /> */}
                <div>
                  <Button
                    variant="outline-dark"
                    size="sm"
                    style={{ fontWeight: "bold", border: "1px solid #5a5a5a" }}
                    onClick={(e) => {
                      if (itemCount > 1) {
                        setItemCount(itemCount - 1);
                      }
                    }}
                  >
                    -
                  </Button>
                  <span style={{ margin: "0 10px" }}>{itemCount}</span>
                  <Button
                    variant="outline-dark"
                    size="sm"
                    style={{ fontWeight: "bold", border: "1px solid #5a5a5a" }}
                    onClick={(e) => {
                      setItemCount(itemCount + 1);
                    }}
                  >
                    +
                  </Button>
                </div>
                {/* 선택한 상품 금액 */}
                <span>{formatPrice(itemCount * itemData.price)}원</span>
              </div>

              {/* 최종금액 */}
              <div
                className="d-flex justify-content-between p-2"
                style={{ alignItems: "center"}}
              >
                <div
                  
                  style={{ width: "100%" }}
                >
                  <span style={{ fontSize: "0.7rem", fontWeight: "bold", width:"40%" }}>
                    총 상품 금액
                  </span>
                  {/* 물음표 클릭하면 안내메세지 */}
                  <OverlayTrigger
                    trigger="click"
                    placement={"bottom"}
                    rootClose={true}
                    overlay={popover}
                    style={{ cursor: "pointer", marginLeft: "15px" }}
                  >
                    <Button
                      variant="light"
                      style={{
                        fontSize: "10px",
                        height: "20px",
                        padding: "0 7px",
                        border: "1px solid lightgray",
                        marginLeft: "5px"
                      }}
                    >
                      ?
                    </Button>
                  </OverlayTrigger>
                </div>
                <div
                  className="d-flex justify-content-between align-items-center"
                  style={{ width: "100%" }}
                >
                  <span style={{ fontSize: "0.8rem", color: "gray" }}>
                    총 수량 {itemCount}개{" "}

                  </span>
                  <span>|</span>
                  <span
                    style={{
                      fontSize: "1.3rem",
                      color: "#CF0F47",
                      fontWeight: "bold",
                    }}
                  >
                    {formatPrice(itemData.price * itemCount)}원
                  </span>
                </div>
              </div>

              {/* 장바구니 담기 */}
              <div className="d-grid mt-5 gap-2">
                <Button
                  variant="success"
                  size="lg"
                  className="d-flex justify-content-center align-items-center gap-2"
                  onClick={(e) => {itemToCart()}}
                >
                  <i className="bi bi-cart4"></i>
                  <span>장바구니 담기</span>
                </Button>
                <Button
                  variant="primary"
                  size="lg"
                  className="d-flex justify-content-center align-items-center gap-2"
                  style={{marginTop: "10px"}}
                >
                  <i className="bi bi-bag-check"></i>
                  <span>바로 구매하기</span>
                </Button>
              </div>
            </Stack>
          </div>
        </div>
      </div>
      }
    </>
  );
};

export default WebItemDetail;
