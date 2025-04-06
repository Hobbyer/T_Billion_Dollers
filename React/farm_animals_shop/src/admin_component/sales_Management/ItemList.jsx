import React, { useEffect, useState } from 'react'

import { Button, Container, Figure, FloatingLabel, Form, InputGroup, Modal, Nav, Navbar, Pagination, Table } from 'react-bootstrap'
import { DELETE, GET, POST } from '../../apis/CRUD';
import axios from 'axios';
import dayjs from 'dayjs';

const ItemList = () => {

// ★ 상품 관리 ★ //
  // 카테고린 관리 모달창
  const [categoryModal, setCategoryModal] = useState(false);
  //상품 등록 모달창 
  const [itemInsertModal, setItemInsertModal] = useState(false);

  // -- 상품 목록 페이지네이션 -- //
  const [itemListPage, setItemListPage] = useState(1);

  const totalPages = 14; // 총 페이지 수 (예시로 14페이지로 설정)
  const pagesPerGroup = 5; // 한 그룹당 표시할 페이지 수 (예시로 5페이지로 설정)

  // 동적인 페이지 수 계산
  // const totalPages = Math.ceil(totalitems / itemsPerPage);

  // 현재 페이지가 속한 그룹의 시작 번호 계산
  const currentGroupStart = Math.floor((itemListPage - 1) / pagesPerGroup) * pagesPerGroup + 1;

  // 현재 그룹에서 표시할 페이지 목록 만들기
  const pageNumbers = Array.from({ length: pagesPerGroup }, (_, i) => currentGroupStart + i)
    .filter((page) => page <= totalPages);
  // --상품 목록 페이지네이션 -- End //

  

  // ★ 카테고리 및 아이템 관리 ★ //
  const [infoData, setInfoData] = useState({
    cateCode: 0,
    cateName: '',
    itemName: '',
    price: 0,
    stock: 0,
    seller: '',
    description: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInfoData({
      ...infoData,
      [name]: value
    });
  }
  
  // 카테고리 등록 및 관리
  const [categoryList, setCategoryList] = useState([]);

  const getCategoryList = () => {
    GET('/api/admin/categories').then((res) => {
      setCategoryList(res.data)
    }).catch()
  }

  

  const insertCategory = () => {
    POST('/api/admin/categories', {cateName: infoData.cateName})
      .then((res) => {
        alert('카테고리 등록 성공')
        setCategoryModal(false)
      })
      .catch((error) => {
        console.error(error)
        alert('카테고리 등록 실패')
      })
  }

  const deleteCategory = (category) => {
    if (confirm(`"${category.cateName}" 카테고리를 삭제하시겠습니까?`)) {
      POST('/api/admin/categories/delete', {cateCode: category.cateCode})
      .then((res) => {
        alert(`"${category.cateName}" 카테고리가 삭제되었습니다.`)
        setCategoryModal(false)
      })
      .catch((error) => {
        console.error(error)
        alert('카테고리 삭제 실패')
      })
    } 
  }

  // 상품 등록 API 호출
  // -- 상품 이미지 등록 및 미리보기 -- //
  const [itemPreview, setItemPreview] = useState("/imgs/recipe.jpg"); // 초기 이미지 경로

  const [image, setImage] = useState(null); // 이미지 파일 상태

  const handleItemFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const validTypes = ['image/png', 'image/jpeg', 'image/jpg'];
    if (!validTypes.includes(file.type)) {
      alert("jpg 또는 png 형식만 업로드할 수 있습니다.");
      return;
    
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setItemPreview(reader.result); // 이미지 미리보기 설정
    };
    reader.readAsDataURL(file); // base64로 읽어오기

    setImage(file); // 이미지 파일 상태 업데이트
  };
  // -- 상품 이미지 등록 및 미리보기 -- End //

  // 상품 등록 및 관리

  const insertItem = () => {
    const formData = new FormData();
      formData.append('itemName', infoData.itemName);
      formData.append('price', Number(infoData.price));
      formData.append('stock', Number(infoData.stock));
      formData.append('seller', infoData.seller);
      formData.append('description', infoData.description);
      formData.append('cateCode', Number(infoData.cateCode));

      formData.append('image', image); // 이미지 파일 추가

    axios.post('/api/admin/items', formData,{
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
        'Content-Type': 'multipart/form-data' // multipart/form-data로 설정
      }
    })
      .then((res) => {
        alert('상품 등록 성공')
        setItemInsertModal(false)
        setItemPreview("/imgs/recipe.jpg") // 초기 이미지로 되돌리기
      })
      .catch((error) => {
        console.error(error)
        alert('상품 등록 실패')
      })
  }

  // 상품 리스트 조회
  const [itemList, setItemList] = useState([]);

  const getItemListASC = () => {
    GET('/api/admin/items').then(
      (res) => {
        setItemList(res.data)
      }
    ).catch()
  }


  useEffect(() => {
    getCategoryList()
    getItemListASC()
  }, [])

  return (
    <>
    <style>
      {`
        .pagination .page-link:focus {
          box-shadow: none;
          outline: none;
          background-color:white;
        }

        .modal-content {
          width: 700px
        }
        
        .form-control, .form-select {
          border: 1px solid #3F7D58;
          border-radius: 0.25rem;
          font-size: 14px;
        }

        #formFileSm:hover {
          color: var(--bs-body-color);
          background-color: var(--bs-body-bg);
          border-color: #86b7fe;
          box-shadow: 0 0 0 0.2rem rgba(13,110,253,.25);
          outline: none;
        }
        
        #formFileSm:focus {
          box-shadow: none;
          outline: none;
        }
        
        .input-group > input.form-control:focus, .form-select:focus {
          box-shadow: none;
          outline: none;
          border-color: #3F7D58;
          }

        span.input-group-text {
          width: 100px;
          border: 1px solid #3F7D58;
          border-radius: 0.25rem;
        }
        
        .category-input .input-group-text {
          width: 150px;
        }

        td {
          vertical-align: middle;
        }
      `}
    </style>
      <Container className='mt-3'>
        <div className='d-flex justify-content-between align-items-center mb-3'>
          <Button variant='success' onClick={() => {
            getCategoryList()
            setCategoryModal(true)
            }}>
            카테고리 관리
          </Button>

          <Modal
            size="lg"
            show={categoryModal}
            onHide={() => {setCategoryModal(false)}}
            dialogClassName="modal-90w "
          >
            <Modal.Header closeButton >
              <Modal.Title id="category-modal-styling-title">
                카테고리 리스트
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className='px-5'>
              <div>
                <div className='category-input'>
                  <InputGroup className="mb-3">
                    <InputGroup.Text >
                      카테고리명
                    </InputGroup.Text>
                    <Form.Control
                      name='cateName'
                      onChange={(e) => {
                        handleInputChange(e)
                      }}
                    />
                  </InputGroup>
                </div>
                <div className='d-flex justify-content-end align-items-center mt-2 mb-3'>
                  <Button variant="success" onClick={() => {
                    insertCategory()
                  }}>
                    등록
                  </Button>
                </div>
              </div>
              <div style={{ maxHeight: '350px', overflowY: 'auto' }}>
                <Table responsive="sm">
                  <thead>
                    <tr>
                      <th>Code</th>
                      <th>카테고리명</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      categoryList.length === 0 ? (
                        <tr>
                          <td colSpan={3}>등록된 카테고리가 없습니다.</td>
                        </tr>
                      ) : (
                        categoryList.map((category, i) => {
                          return (
                            <tr key={i}>
                              <td>{category.cateCode}</td>
                              <td>{category.cateName}</td>
                              <td className='d-flex justify-content-end align-items-center'>
                                <Button variant="danger" size="sm" onClick={(e) => {
                                  deleteCategory(category)
                                }}>
                                  삭제
                                </Button>
                              </td>
                            </tr>
                          )
                        })
                      )
                    }
                  </tbody>
                </Table>
              </div>
            </Modal.Body>
          </Modal>


          <Button variant="success" onClick={() => setItemInsertModal(true)}>
            상품 등록
          </Button>

          <Modal
            size="lg"
            show={itemInsertModal}
            onHide={() => setItemInsertModal(false)}
            dialogClassName="modal-90w "
            backdrop="static" // 모달 외부 클릭 방지
          >
            <Modal.Header closeButton >
              <Modal.Title id="item-modal-styling-title">
                상품 등록
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className='px-5'>
              <div className='d-flex justify-content-between align-items-center' style={{ width: '100%' }}>
                <div className='d-flex flex-column justify-content-center align-items-center me-3' style={{ width: '40%' }}>
                  <Figure.Image
                    width={'100%'}
                    height={180}
                    alt="미리보기"
                    src={itemPreview}
                    style={{ width: '100%', height: '240px', border: '1px solid black', objectFit: 'cover' }}
                  />
                  <Form.Group controlId="formFileSm" className="mb-3">
                    <Form.Control
                      type="file"
                      name='imagePath'
                      size="sm"
                      accept=".png, .jpg, .jpeg"
                      onChange={(e) => {
                        handleItemFileChange(e)
                      }}
                    />
                  </Form.Group>
                </div>
                <div className='modal-input' style={{ width: '50%' }}>
                  <InputGroup className="mb-3">
                    <InputGroup.Text >
                      카테고리
                    </InputGroup.Text>
                    <Form.Select name='cateCode' onChange={(e) => {
                      handleInputChange(e)
                    }} required defaultValue="" >
                      <option value="" disabled >--- 카테고리 ---</option>
                      {
                        categoryList.map((category, i) => {
                          return (
                            <option key={i} value={category.cateCode}>
                              {category.cateName}
                            </option>
                          )
                        }
                      )}
                    </Form.Select>
                  </InputGroup>

                  <InputGroup className="mb-3">
                    <InputGroup.Text >
                      상품명
                    </InputGroup.Text>
                    <Form.Control
                      name='itemName'
                      required
                      onChange={(e) => {
                        handleInputChange(e)
                      }}
                    />
                  </InputGroup>

                  <InputGroup className="mb-3">
                    <InputGroup.Text >
                      가격
                    </InputGroup.Text>
                    <Form.Control
                      name='price'
                      required
                      onChange={(e) => {
                        handleInputChange(e)
                      }}
                    />
                  </InputGroup>

                  <InputGroup className="mb-3">
                    <InputGroup.Text >
                      재고
                    </InputGroup.Text>
                    <Form.Control
                      name='stock'
                      onChange={(e) => {
                        handleInputChange(e)
                      }}
                    />
                  </InputGroup>

                  <InputGroup className="mb-3">
                    <InputGroup.Text >
                      판매처
                    </InputGroup.Text>
                    <Form.Control
                      name='seller'
                      required
                      onChange={(e) => {
                        handleInputChange(e)
                      }}
                    />
                  </InputGroup>
                  <Form.Group className="mb-3" controlId="descriptionTextarea">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="상품 설명"
                    >
                      <Form.Control as="textarea" name='description' style={{ height: '140px', overflow: 'auto', alignContent: 'center'}} onChange={(e)=>{
                        handleInputChange(e)
                      }}/>
                    </FloatingLabel>
                  </Form.Group>
                </div>
              </div>
              <div className='d-flex justify-content-end align-items-center mt-2 mb-3'>
                <Button variant="success" onClick={() => {
                  console.log(infoData)
                  insertItem()
                }}>
                  등록
                </Button>
              </div>
            </Modal.Body>
          </Modal>
        </div>
        <div style={{ maxHeight: '350px', overflowY: 'auto' }}>
          {
            categoryList.length === 0 ? (null) :
            categoryList.map((category, i) => {
              return (
                <div key={i}>
                  <h6>{category.cateName}</h6>
                  <Table responsive="sm">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>상품이미지</th>
                        <th>상품명</th>
                        <th>단가</th>
                        <th>재고</th>
                        <th>등록일</th>
                        <th>판매처</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        itemList.map((item, j) => {
                          if (item.cateCode === category.cateCode) {
                            return (
                              <tr key={j}>
                                <td>{item.itemCode}</td>
                                <td className='text-center align-middle'>
                                  <img src={`http://localhost:8080${item.imagePath}`} alt="상품 이미지" style={{ width: '50px', height: '50px' }} />
                                </td>
                                <td>{item.itemName}</td>
                                <td>{item.price}</td>
                                <td>{item.stock}</td>
                                <td>{dayjs(item.createdAt).format("YYYY-MM-DD")}</td>
                                <td>{item.seller}</td>
                              </tr>
                            )
                          }
                        })
                      }
                    </tbody>
                  </Table>
                </div>
              )
            })
          }
        </div>
        <Pagination className="justify-content-center mt-4">
          <Pagination.First onClick={() => setItemListPage(1)} linkStyle={{ color: 'black'}}/>
          <Pagination.Prev onClick={() => setItemListPage(Math.max(itemListPage - 1, 1))} linkStyle={{ color: 'black'}}/>

          {pageNumbers.map((page) => (
            <Pagination.Item
              key={page}
              active={page === itemListPage}
              linkStyle={page===itemListPage ? {backgroundColor:'#3F7D58', color:'white'} : { color:'black'}}
              onClick={() => setItemListPage(page)}
            >
              {page}
            </Pagination.Item>
          ))}

          <Pagination.Next onClick={() => setItemListPage(Math.min(itemListPage + 1, totalPages))} linkStyle={{ color: 'black'}}/>
          <Pagination.Last onClick={() => setItemListPage(totalPages)} linkStyle={{ color: 'black'}}/>
        </Pagination>
      </Container>
    </>
  )
}

export default ItemList