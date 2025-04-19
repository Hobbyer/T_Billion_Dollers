import React, { useEffect, useState } from 'react'
import { Col, Row, Table, Form } from 'react-bootstrap'
import { GET, POST } from '../../apis/CRUD'

const baseURL = import.meta.env.VITE_API_URL

const MembersInfo = () => {

  const [members, setMembers] = useState([])

  const [loading, setLoading] = useState(true)

  // 회원 검색
  const [search, setSearch] = useState("")
  const handleSearch = (e) => {
    setSearch(e.target.value)
  }
  const handleSearchSubmit = (e) => {
    GET(`${baseURL}/admin/members/search?keyword=${search}&page=0&size=5`)
      .then((res) => {
        console.log(res.data)
        setMembers(res.data)
      })
      .catch((err) => {
        setLoading(false)
      })
  }
  
  // 회원 정보 가져오기
  useEffect(() => {
    GET(`${baseURL}/admin/members`)
      .then((res) => {
        console.log(res.data)
        setMembers(res.data)
        setLoading(false)
      })
      .catch((err) => {
        console.error(err)
        setLoading(false)
      })
  }, [])

  return (
    <>
      <style>
        {`
          @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
          }
        `}
      </style>

      { loading ? 
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
      :
      <div className='mt-3'>
        <Row className='mb-3'>
          <Col>
            &lt; 회원 수 : {members.length}명 &gt;
          </Col>
          <Col className='text-end'>
            <Form onSubmit={handleSearchSubmit}>
              <input type="text" placeholder='회원 검색' className='form-control' style={{ width: '250px', display: 'inline-block' }} onChange={handleSearch} />
              <button type='submit' className='btn btn-secondary ms-2'>검색</button>
            </Form>
          </Col>
        </Row>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>User ID</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Address</th>
              <th>Authority</th>
            </tr>
          </thead>
          <tbody>
            { members.map((member, index) => {
              return (
                <tr key={index}>
                  <td>{members.length - index}</td>
                  <td>{member.userId}</td>
                  <td>{member.name}</td>
                  <td>{member.phoneNumber}</td>
                  <td>{member.email}</td>
                  <td>{member.address}</td>
                  <td>{member.authority}</td>
                </tr>
              )
            })
            }
          </tbody>
        </Table>
      </div>
      }
    </>
  )
}

export default MembersInfo