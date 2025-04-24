import { Nav, Container, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const CategoryNav = () => {
  return (
    <Container className="my-3">
      {/* 데스크탑에서는 Nav 그대로 */}
      <div className="d-none d-md-block">
        <Nav activeKey="/farmdas/cate">
          <Nav.Item>
            <Nav.Link as={Link} to="/farmdas/cate" className="custom-nav-link">전체 상품</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to="/farmdas/cate/beef" className="custom-nav-link">한우</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to="/farmdas/cate/pork" className="custom-nav-link">양돈</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to="/farmdas/cate/set" className="custom-nav-link">세트 상품</Nav.Link>
          </Nav.Item>
        </Nav>
      </div>

      {/* 모바일에서는 Dropdown으로 */}
      <div className="d-md-none" style={{ minWidth: "200px" }}>
        <Dropdown>
          <Dropdown.Toggle variant="outline-success" className='d-flex justify-content-start align-items-center'>
            카테고리 선택
          </Dropdown.Toggle>

          <Dropdown.Menu className="w-100">
            <Dropdown.Item as={Link} to="/farmdas/cate">전체 상품</Dropdown.Item>
            <Dropdown.Item as={Link} to="/farmdas/cate/beef">한우</Dropdown.Item>
            <Dropdown.Item as={Link} to="/farmdas/cate/pork">양돈</Dropdown.Item>
            <Dropdown.Item as={Link} to="/farmdas/cate/set">세트 상품</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </Container>
  );
};

export default CategoryNav;
