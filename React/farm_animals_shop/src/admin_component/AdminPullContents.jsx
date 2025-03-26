import React from "react";
import SalesMember from "./sales_Management/SalesMember";
import SalesRevenue from "./sales_Management/SalesRevenue";
import LiveStockTemperature from "./livestock_management/LiveStockTemperature";
import LiveStockHumidity from "./livestock_management/LiveStockHumidity";
import SalesPayment from "./sales_Management/SalesPayment";
import styles from './Admin.module.css'

const AdminPullContents = () => {
  // 메인 핵심 풀 컨텐츠(축산 환경, 판매)
  return (
    <div className={styles.admin_pull_main} >
      <div>관리자 화면에 제일 처음 뜨는 내용</div>
      <div className={styles.stock_graph}>
        {/* 온도그래프 */}
        <LiveStockTemperature/>
        {/* 습도그래프 */}
        <LiveStockHumidity/>
      </div>
      <div className={styles.sales_graph}>
        {/* 회원 수 그래프 */}
        <SalesMember/>
        {/* 일/월 매출 그래프 */}
        <SalesRevenue/>
        {/* 결제 정보 간략한 목록 */}
        <SalesPayment/>
      </div>
    </div>
  );
};

export default AdminPullContents;
