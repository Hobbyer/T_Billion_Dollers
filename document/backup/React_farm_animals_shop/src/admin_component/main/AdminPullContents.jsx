import React from "react";
import LiveStockTemperature from "../livestock_management/LiveStockTemperature";
import LiveStockHumidity from "../livestock_management/LiveStockHumidity";
import WeatherCard from "../livestock_management/WeatherCard";


const AdminPullContents = () => {
  // 메인 핵심 풀 컨텐츠(축산 환경, 판매)
  return (
    <div className="container-fuild">
      <div className="row" style={{width:'100%',height:'100%'}}>
        {/* 왼쪽 박스들 */}
        <div className="col-md-5  flex-grow-1">
          <div>
            <h1 style={{ fontWeight: "bold", color: "green" }}>
              TEMPERATURE GRAPH
            </h1>
          </div>
          <div className="row">
            <div className="col-md-full">
              <div
                className="p-4 text-dark text-center rounded"
                style={{ backgroundColor: "#B3D8A8" }}
              >
                <LiveStockTemperature />
              </div>
            </div>
          </div>

          <div className="row mt-3 col-md-full">
            <div className="col-md-5" style={{height:'100%'}}>
              <div>
                <h3 style={{ fontWeight: "bold", color: "green" }}>
                  HUMIDITY GRAPH
                </h3>
              </div>

              <div
                className="p-4 text-dark text-center rounded"
                style={{ backgroundColor: "#A3D1C6", height: "100%" }}
              >
                <LiveStockHumidity />
              </div>
            </div>
            <div className="col-md-7">
              <div>
                <h3 style={{ fontWeight: "bold", color: "green" }}>
                  TODAY WEATHER
                </h3>
              </div>
              <div className="p-4 bg-warning text-dark text-center rounded">
                <WeatherCard />
              </div>
            </div>
          </div>
        </div>

        {/* 오른쪽 핵심 내용 */}
        <div className="col-md-5 flex-grow-1">
          <div
            className="p-4 text-dark text-center rounded"
            style={{ backgroundColor: "#A3D1C6" }}
          >
            <h4>판매 핵심 내용</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPullContents;
