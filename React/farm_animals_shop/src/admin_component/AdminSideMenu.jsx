import React from 'react'
import { Link } from 'react-router-dom'

const AdminSideMenu = () => {
  return (
    <div>
      <p>SIDE MENU</p>
      <ul>
        <li>
          <p>HOME</p>
          {/* admin main화면으로 이동하는 링크 걸기 */}
          {/* 축산관련 핵심내용,판매관련 핵심내용 화면에 띄우기 */}
        </li>
        <li>
          <p>STOCK</p>
          {/* 축산 디테일 화면으로 이동하는 링크 걸기 */}
          {/* 추가 하위 메뉴 : 온도관련 세부 페이지(실시간 온도,오늘날씨 기준 적정온도 알려주기), 모니터링 세부 페이지*/}
          <ul>
            <li><Link to={'stock-temperature'}>온도 상세 페이지</Link></li>
          </ul>
        </li>
        <li>
          <p>SALES</p>
          {/* 판매 디테일 화면으로 이동하는 링크 걸기 */}
          {/* 추가 하위 메뉴 : 등록된 상품등록 및 수정페이지, QnA 페이지 */}
          <ul>
            <li>
              <Link to={'sales-questions'}>질의응답</Link>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  )
}

export default AdminSideMenu