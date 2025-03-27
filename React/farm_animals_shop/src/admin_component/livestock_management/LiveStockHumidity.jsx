import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Chart.js 모듈을 등록
ChartJS.register(ArcElement, Tooltip, Legend);

const LiveStockHumidity = () => {
  // 환경 습도 그래프
  const [humidity, setHumidity] = useState(null);

  useEffect(() => {
    // Flask 서버에서 습도 데이터를 가져옵니다.
    fetch('/api/admin/get-humidity')
      .then((response) => response.json())
      .then((data) => {
        if (data.humidity) {
          setHumidity(data.humidity);
        }
      })
      .catch((error) => {
        console.error('Error fetching humidity:', error);
      });
  }, []);

  const data = {
    labels: ['습도', '나머지'],
    datasets: [
      {
        label: '습도 상태',
        data: [humidity, 100 - humidity], // 습도 값과 나머지 값
        backgroundColor: ['#36A2EB', '#FF6384'],
        hoverBackgroundColor: ['#36A2EB', '#FF6384'],
      },
    ],
  };

  

  return (
    <div>
      <h2>현재 습도</h2>
      {humidity !== null ? (
        <Doughnut data={data} />
      ) : (
        <p>습도 데이터를 불러오는 중...</p>
      )}
    </div>
  );
};

export default LiveStockHumidity