import React from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { Container } from 'react-bootstrap';
import {
  Chart as ChartJS,
  BarElement,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register( // Chart.js에 필요한 요소들을 등록
  BarElement,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
);


const SalesInfo = ({userAuth}) => {

  // 더미 데이터 예시 (날짜별 매출액)
  const salesData = [
    { date: '2024-04-01', total: 120000 },
    { date: '2024-04-02', total: 98000 },
    { date: '2024-04-03', total: 143000 },
    { date: '2024-04-04', total: 160000 },
    { date: '2024-04-05', total: 110000 },
  ];

  const chartData = {
    labels: salesData.map(item => item.date),
    datasets: [
      {
        label: '일별 매출액 (원)',
        data: salesData.map(item => item.total),
        borderColor: '#3F7D58',
        backgroundColor: 'rgba(63, 125, 88, 0.2)',
        pointBackgroundColor: '#3F7D58',
        pointBorderColor: '#3F7D58',
        pointRadius: 5,
        pointHoverRadius: 5,
        borderWidth: 2,
        fill: false,
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top'
      },
      title: {
        display: true,
        text: '최근 매출 추이',
        font: {
          size: 20,
          weight: 'bold',
        },
        color: '#3F7D58'
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.parsed.y.toLocaleString()}원`
        }
      }
    },
    scales: {
      x: {
        ticks: {
          color: '#555',
          font: { size: 14 }
        },
        grid: {
          display: false
        }
      },
      y: {
        ticks: {
          color: '#555',
          font: { size: 14 },
          callback: value => `${value.toLocaleString()}원`
        },
        grid: {
          color: '#eee'
        }
      }
    },
  };

  return (
    <>
      <Container className='mt-3'>
        <h1>매출액 정보</h1>
        <Bar data={chartData} options={options} />
      </Container>
    </>
  );
};

export default SalesInfo