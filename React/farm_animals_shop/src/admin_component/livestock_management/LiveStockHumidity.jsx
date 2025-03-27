import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';

// Chart.js 모듈을 등록
ChartJS.register(ArcElement, Tooltip, Legend, Title);

const LiveStockHumidity = () => {
  const [humidity, setHumidity] = useState(null);

  useEffect(() => {
    // Spring Boot에서 습도 데이터 받아오기
    fetch('/api/admin/get-humidity')
      .then((response) => response.json())
      .then((data) => {
        console.log('Received humidity:', data.humidity);
        if (data.humidity) {
          setHumidity(data.humidity);
        }
      })
      .catch((error) => {
        console.error('Error fetching humidity:', error);
      });
  }, []); // 빈 배열로 설정하여 컴포넌트가 처음 렌더링될 때만 호출


  const data = {
    labels: ['습도', '나머지'],
    datasets: [
      {
        label: '습도 상태',
        data: [humidity, 100 - humidity], // 습도 값과 나머지 값
        backgroundColor: ['#36A2EB', '#FF6384'], // 색상 설정
        hoverBackgroundColor: ['#36A2EB', '#FF6384'], // 호버 색상
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        enabled: true, // 툴팁 활성화
      },
      legend: {
        position: 'top', // 범례 위치 설정
      },
    },
    elements: {
      arc: {
        borderWidth: 5, // 링 두께 설정
      },
    },
  };

  return (
    <div>
      <h2>현재 습도</h2>
      {humidity !== null ? (
        <Doughnut data={data} options={options} />
      ) : (
        <p>습도 데이터를 불러오는 중...</p>
      )}
    </div>
  );
};

export default LiveStockHumidity;
