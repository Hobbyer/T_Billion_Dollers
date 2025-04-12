import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { CardGroup, Card } from 'react-bootstrap';

const baseURL = import.meta.env.VITE_API_URL;

const WebItemList = () => {

  const [itemList, setItemList] = useState([]);

  useEffect(() => {
    axios.get(`${baseURL}/farmdas/items`)
      .then(res => {
        setItemList(res.data);
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
          width: 100%;
          height: 200px;
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
      <CardGroup className="mb-3 gap-5">
        <Card>
          <Card.Img variant="top" src='' />
          <Card.Body>
            <Card.Title>Card title</Card.Title>
            <Card.Text>
              This is a wider card with supporting text below as a natural lead-in
              to additional content. This content is a little bit longer.
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">Last updated 3 mins ago</small>
          </Card.Footer>
        </Card>
        <Card>
          <Card.Img variant="top" src='' />
          <Card.Body>
            <Card.Title>Card title</Card.Title>
            <Card.Text>
              This is a wider card with supporting text below as a natural lead-in
              to additional content. This content is a little bit longer.
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">Last updated 3 mins ago</small>
          </Card.Footer>
        </Card>
        <Card>
          <Card.Img variant="top" src="holder.js/100px160" />
          <Card.Body>
            <Card.Title>Card title</Card.Title>
            <Card.Text>
              This is a wider card with supporting text below as a natural lead-in
              to additional content. This content is a little bit longer.
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">Last updated 3 mins ago</small>
          </Card.Footer>
        </Card>
      </CardGroup>
      <CardGroup className="mb-3 gap-5">
        <Card>
          <Card.Img variant="top" src="holder.js/100px160" />
          <Card.Body>
            <Card.Title>Card title</Card.Title>
            <Card.Text>
              This is a wider card with supporting text below as a natural lead-in
              to additional content. This content is a little bit longer.
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">Last updated 3 mins ago</small>
          </Card.Footer>
        </Card>
      </CardGroup>
    </>
  )
}

export default WebItemList