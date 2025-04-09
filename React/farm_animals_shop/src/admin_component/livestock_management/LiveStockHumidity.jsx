import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import { GET } from '../../apis/CRUD';

const baseURL = import.meta.env.VITE_API_URL;

// Chart.js 모듈을 등록
ChartJS.register(ArcElement, Tooltip, Legend, Title); // ✔ Chart.js 모듈 등록
// ✔ Chart.js 모듈 사용법 : https://www.chartjs.org/docs/latest/getting-started/usage.html#basic-usage

const LiveStockHumidity = () => {
  const [humidity, setHumidity] = useState(null);

  useEffect(() => {
    GET(`${baseURL}/admin/humidity`)
      .then((res) => {
        console.log('Received humidity list:', res.data);
        const lastHumidity = res.data[0].humidity; // 가장 최근 습도 값
          setHumidity(lastHumidity); // 습도 상태 업데이트
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
        data: [humidity, 100 - humidity],  // ✔ 습도와 나머지 구성
        backgroundColor: ['#36A2EB', '#FF6384'],
        hoverBackgroundColor: ['#36A2EB', '#FF6384'],
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
      ctx.fillStyle = '#000'; // 중앙 텍스트 색상
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
        borderWidth: 5,
      },
    },
  };

  return (
    <>
      <div>
        {humidity !== null && (
          <Doughnut data={data} options={{...options, maintainAspectRatio: false}} plugins={[centerTextPlugin]} />
        )}
      </div>
    </>
  );
};

export default LiveStockHumidity;
