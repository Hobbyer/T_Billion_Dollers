import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import { GET } from '../../../apis/CRUD';

const baseURL = import.meta.env.VITE_API_URL;

// Chart.js 모듈을 등록
ChartJS.register(ArcElement, Tooltip, Legend, Title); // ✔ Chart.js 모듈 등록

const LiveStockHumidity = () => {
  const [humidityList, setHumidityList] = useState([]); // 여러 습도 데이터를 저장할 상태

  useEffect(() => {
    GET(`${baseURL}/admin/humidity`)
      .then((res) => {
        console.log('Received humidity list:', res.data);
        setHumidityList(res.data); // 전체 습도 목록을 저장
      })
      .catch((error) => {
        console.error('Error fetching humidity:', error);
      });
  }, []); // 빈 배열로 설정하여 컴포넌트가 처음 렌더링될 때만 호출

  // 가장 최근 습도 값만 Doughnut 차트에 표시
  const latestHumidity = humidityList.length > 0 ? humidityList[0].humidity : null;

  // 날짜 기준으로 내림차순 정렬 후 최신 5개만 추출
  const latest5Humidity = humidityList
    .sort((a, b) => new Date(b.timeLine) - new Date(a.timeLine)) // 날짜 내림차순 정렬
    .slice(0, 5); // 최신 5개 데이터만 추출

  const data = {
    labels: ['습도', '나머지'],
    datasets: [
      {
        label: '습도 상태',
        data: [latestHumidity, 100 - latestHumidity],  // ✔ 습도와 나머지 구성
        backgroundColor: ['#4fb1a0', '#b2e2b1'],
        hoverBackgroundColor: ['#4fb1a0', '#b2e2b1'],
      },
    ],
  };

  const centerTextPlugin = {
    id: 'centerTextPlugin',
    afterDraw: (chart) => {
      const { width, height, ctx } = chart;
      ctx.restore();

      const value = chart.data.datasets[0].data[0]; // 습도
      const text = `${value.toFixed(1)}%`;

      ctx.font = `${(height / 10).toFixed(0)}px sans-serif`;
      ctx.textBaseline = 'middle';
      ctx.fillStyle = '#198754'; // 중앙 텍스트 색상
      ctx.font = "20px BMJUA"
      const textX = (width - ctx.measureText(text).width) / 2;
      const textY = height / 2;
      ctx.fillText(text, textX, textY);

      ctx.save();
    },
  };

  const options = {
    responsive: true,
    plugins: {
      tooltip: { enabled: true },
      legend: { display: false }, // ✔ 범례 제거
    },
    elements: {
      arc: {
        borderWidth: 3,
      },
      cutout: '70%', // 차트 내부 빈 공간 크기 조정 (여기서 차트 내부 여백을 설정)
    },
  };

  return (
    <>
     <div>
        <div>
          {latestHumidity !== null && (
            <Doughnut data={data} options={{ ...options, maintainAspectRatio: false }} plugins={[centerTextPlugin]} />
          )}
        </div>
        
     </div>
    </>
  );
};

export default LiveStockHumidity;
