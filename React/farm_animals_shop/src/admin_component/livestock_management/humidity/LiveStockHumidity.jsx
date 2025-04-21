import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import { GET } from '../../../apis/CRUD';

const baseURL = import.meta.env.VITE_API_URL;

// Chart.js 모듈 등록
ChartJS.register(ArcElement, Tooltip, Legend, Title);

const LiveStockHumidity = () => {
  const [latest, setLatest] = useState(null); // 가장 최근 데이터만 저장

  useEffect(() => {
    GET(`${baseURL}/admin/humidity`)
      .then((res) => {
        if (res.data.length > 0) {
          // 최신 데이터를 추출 (시간순 정렬)
          const sorted = res.data.sort((a, b) => new Date(b.timeLine) - new Date(a.timeLine));
          setLatest(sorted[0]);
        }
      })
      .catch((error) => {
        console.error('Error fetching humidity:', error);
      });
  }, []);

  // 가장 최근 습도 값값
  const latestHumidity = latest?.humidity ?? null;

  // 한국 시간 기준  최근 측정 시간 포맷팅팅
  const formattedTime = latest?.timeLine
    ? new Date(latest.timeLine).toLocaleString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    : '';

  const data = {
    labels: ['습도', '나머지'],
    datasets: [
      {
        label: '습도 상태',
        data: [latestHumidity, 100 - latestHumidity],
        backgroundColor: ['#4fb1a0', '#b2e2b1'],
        hoverBackgroundColor: ['#4fb1a0', '#b2e2b1'],
      },
    ],
  };

  // 차트 중앙에 습도 값을 텍스트로 표시하는 커스텀 플러그인인
  const centerTextPlugin = {
    id: 'centerTextPlugin',
    afterDraw: (chart) => {
      const { width, height, ctx } = chart;
      ctx.restore();

      const value = chart.data.datasets[0].data[0];
      const text = `${value.toFixed(1)}%`;

      ctx.font = '30px BMJUA';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = '#198754';
      const textX = (width - ctx.measureText(text).width) / 2;
      const textY = height / 2;
      ctx.fillText(text, textX, textY);

      ctx.save();
    },
  };

  const options = {
    responsive: true,// 반응형 설정정
    plugins: {
      tooltip: { enabled: false },// 툴팁 비활성화
      legend: { display: false },//범례 제거
    },
    elements: {
      arc: {
        borderWidth: 6, //테두리 두께
      },
    },
    cutout: '60%',
  };

  return (
    <div
      style={{
        maxWidth: '100%',
        width: '100%',
        padding: '1rem',
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '360px',
          margin: '0 auto',
          aspectRatio: '1 / 1',
          position: 'relative',
        }}
      >
        {latestHumidity !== null && (
          <>
            <Doughnut
              data={data}
              options={options}
              plugins={[centerTextPlugin]}
            />
            <p
              style={{
                textAlign: 'center',
                marginTop: '12px',
                fontSize: '14px',
                color: '#666',
              }}
            >
              최근 측정 시간: {formattedTime}
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default LiveStockHumidity;
