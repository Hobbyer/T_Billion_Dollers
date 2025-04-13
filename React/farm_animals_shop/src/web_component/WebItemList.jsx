import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { CardGroup, Card } from 'react-bootstrap';

const baseURL = import.meta.env.VITE_API_URL;

const WebItemList = () => {

  const [itemList, setItemList] = useState([]);

  const cardArray = (arr, size) => {
    const result = [];
    for (let i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, i + size)); // 배열의 i ~ i + size까지 잘라서 result에 추가
    }
    return result;
  }

  const cardList = cardArray(itemList, 4); // 4개씩 잘라서 배열로 만듦

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
        .card {
          width: 100%;
          height: 100%;
        }
        .card img {
          width: 150px;
          height: 150px;
          object-fit: cover;
        }
        .card-title {
          font-size: 1rem;
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
          <CardGroup key={i} style={{ borderRadius: '0px'}}>
            {item.map((itemData, j) => {
              return (
                <Card key={j}>
                  <Card.Img variant="top" src={itemData.imagePath} />
                  <Card.Body>
                    <Card.Title>{itemData.name}</Card.Title>
                    <Card.Text>{itemData.price}원</Card.Text>
                  </Card.Body>
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