import React from "react";
import LiveStockTemperature from "../livestock_management/LiveStockTemperature";
import LiveStockHumidity from "../livestock_management/LiveStockHumidity";
import SalesRevenue from "../sales_Management/SalesRevenue";
import SalesMember from "../sales_Management/SalesMember";
import SalesPayment from "../sales_Management/SalesPayment";

const AdminPullContents = () => {
  // 메인 핵심 풀 컨텐츠(축산 환경, 판매)
  return (
    <div className="main-content">
      <div>
       <div>
          {/* 온도그래프 */}
          <LiveStockTemperature/>
       </div>
       <div>
          {/* 습도그래프 */}
          <LiveStockHumidity/>
       </div>
        {/* 오늘의 날씨 */}
        <div>
          오늘의 날씨
        </div>
      </div>
      <div>
      <div>
        {/* 회원 수 그래프 */}
        <SalesMember/>
      </div>
      <div>
        {/* 일/월 매출 그래프 */}
        <SalesRevenue/>
      </div>
      <div>
          {/* 결제 정보 간략한 목록 */}
          <SalesPayment/>
      </div>
      </div>
    </div>
  );
};

export default AdminPullContents;
