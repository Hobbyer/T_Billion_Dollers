import React from "react";
import SalesRevenue from "./SalesRevenue";

const SalesPaymentInfo = () => {
  // 전체 결제 정보 컴포넌트
  return (
    <div>
      <div>전체 매출및 결제정보</div>
      <div>
        <SalesRevenue/>
      </div>
    </div>
  );
};

export default SalesPaymentInfo;
