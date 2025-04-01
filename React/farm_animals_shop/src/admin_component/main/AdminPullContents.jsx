import React from "react";
import LiveStockTemperature from "../livestock_management/LiveStockTemperature";
import LiveStockHumidity from "../livestock_management/LiveStockHumidity";
import SalesRevenue from "../sales_Management/SalesRevenue";
import SalesMember from "../sales_Management/SalesMember";
import SalesPayment from "../sales_Management/SalesPayment";
import ItemBox from "../../common_components/ItemBox";

const AdminPullContents = () => {
  // 메인 핵심 풀 컨텐츠(축산 환경, 판매)
  return (
    <div className="main-content">
      <div>
        <ItemBox>
            {/* 온도그래프 */}
            <LiveStockTemperature/>
        </ItemBox>
        <div>
          <ItemBox>
              {/* 습도그래프 */}
              <LiveStockHumidity/>
          </ItemBox>
            <ItemBox>
              {/* 오늘의 날씨 */}
              오늘의 날씨
            </ItemBox>
        </div>
      </div>

      <div>
        <div>
          <ItemBox>
            {/* 회원 수 그래프 */}
            <SalesMember/>
          </ItemBox>
          <ItemBox>
            {/* 일/월 매출 그래프 */}
            <SalesRevenue/>
          </ItemBox>
        </div>
        <ItemBox>
          {/* 결제 정보 간략한 목록 */}
          <SalesPayment/>
        </ItemBox>
      </div>
    </div>
  );
};

export default AdminPullContents;
