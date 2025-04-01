import React from "react";
import LiveStockTemperature from "./LiveStockTemperature";
import LiveStockHumidity from "./LiveStockHumidity";

const LiveStockInfo = () => {
  // 축산 환경 상세 페이지
  return (
    <div>
      <div>LiveStockInfo</div>
      <div>
        <LiveStockTemperature/>
        <LiveStockHumidity/>
        <div>
          오늘 날씨
        </div>
      </div>
    </div>
  );
};

export default LiveStockInfo;
