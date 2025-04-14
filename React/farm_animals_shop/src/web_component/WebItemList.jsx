import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react'
import { CardGroup, Card, ButtonGroup, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const baseURL = import.meta.env.VITE_API_URL;

const WebItemList = () => {
  if (!sessionStorage.getItem('accessToken')) {
    var member = null; // 로그인하지 않은 경우
  } else {
    member = jwtDecode(sessionStorage.getItem('accessToken')).sub; // 로그인한 유저의 아이디
  }

  const nav = useNavigate();

  const [itemList, setItemList] = useState([]);


  // 상품리스트 4개씩 잘라서 배열로 만드는 함수
  const cardArray = (arr, size) => {
    const result = [];
    for (let i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, i + size)); // 배열의 i ~ i + size까지 잘라서 result에 추가
    }
    return result;
  }

  const cardList = cardArray(itemList, 4); // 4개씩 잘라서 배열로 만듦

  // 장바구니 담기
  const addToCart = (itemCode, quantity) => {
    axios.post(`${baseURL}/farmdas/cart/${member}/add?itemCode=${itemCode}&quantity=${quantity}`)
      .then(res => {
        confirm('장바구니에 담았습니다. 확인하시겠습니까?') ?
          nav(`/farmdas/cart/{}`) : null;
      })
      .catch(err => {
        console.log(itemCode, quantity)
        console.error(err);
        alert('장바구니에 담기 실패!')
      })
  }

  useEffect(() => {
    axios.get(`${baseURL}/farmdas/items`)
      .then(res => {
        setItemList(res.data || []);
      })
      .catch(err => {
        console.error(err);
      })
  }, [])

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
      { cardList.map((item, i) => {
        return (
          <CardGroup className='gap-4' key={i} style={{ borderRadius: '0px'}}>
            {item.map((itemData, j) => {
              return (
                <Card key={j} style={{ width: '150px', height: '330px', borderRadius: '0px' }} className='shadow-sm'>
                  <Card.Img variant="top" src={itemData.imagePath} style={{ cursor: 'pointer'}}
                    onClick={() => {
                      nav(`/farmdas/item/${itemData.itemCode}`)
                    }}
                  />
                  <Card.Body className='d-flex flex-column align-items-between justify-content-between'>
                    <Card.Title style={{ cursor: 'pointer' }}
                      onClick={() => {
                        nav(`/farmdas/item/${itemData.itemCode}`)
                      }}
                    >{itemData.itemName}</Card.Title>
                    <Card.Text>{itemData.price}원</Card.Text>
                  </Card.Body>
                  <Card.Footer>
                    <ButtonGroup className='gap-1'>
                      <Button variant="outline-success" style={{ width: '50%' }}>
                        <small className="text-muted" style={{ fontSize: '10px' }}>구매하기</small>
                      </Button>
                      <Button variant="outline-primary" style={{ width: '50%' }}>
                        <small className="text-muted" style={{ fontSize: '10px' }}
                          onClick={() => {
                            addToCart(itemData.itemCode, 1)
                          }}
                        >장바구니</small>
                      </Button>
                    </ButtonGroup>
                  </Card.Footer>
                </Card>
              )
            })}
          </CardGroup>
        )
      })}
    </>
  )
}

export default WebItemList