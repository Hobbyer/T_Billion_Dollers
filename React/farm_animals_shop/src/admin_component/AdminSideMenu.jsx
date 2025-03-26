import React from "react";
import { Link } from "react-router-dom";

const AdminSideMenu = () => {
  return (
    <div>
      <p>SIDE MENU</p>
      <ul>
        <li>
          <p>
            <Link to={"/admin"}>HOME</Link>
          </p>
          {/* 축산관련 핵심내용,판매관련 핵심내용 화면에 띄우기 */}
        </li>
        <li>
          <p>
            <Link to={"stock-detail"}>STOCK</Link>
          </p>
          {/* 추가 하위 메뉴 : 온도관련 세부 페이지(실시간 온도,오늘날씨 기준 적정온도 알려주기), 모니터링 세부 페이지*/}
          <ul>
            <li>
              <Link to={"stock-detail"}>축산 상세 페이지</Link>
            </li>
          </ul>
        </li>
        <li>
          <p><Link to={'sales-paymentInfo'}>SALES</Link></p>
          {/* 추가 하위 메뉴 : 등록된 상품등록 및 수정페이지, QnA 페이지 */}
          <ul>
            <li>
              <Link to={"sales-memberInfo"}>
                회원 정보
              </Link>
            </li>
            <li>
              <Link to={"sales-paymentInfo"}>
                매출 정보
              </Link>
            </li>
            <li>
              <Link to={"sales-questions"}>
                질의응답
              </Link>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default AdminSideMenu;
