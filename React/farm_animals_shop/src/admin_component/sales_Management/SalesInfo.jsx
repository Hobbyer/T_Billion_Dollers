import React, { useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Container, Row, Col, Table } from 'react-bootstrap';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

const SalesInfo = () => {

  useEffect(() => {
    
  })

  // 더미 데이터 예시 (날짜별 매출액 및 주문 내역)
  const salesData = [
    { date: '2024-04-01', total: 120000, orders: 15 },
    { date: '2024-04-02', total: 98000, orders: 12 },
    { date: '2024-04-03', total: 143000, orders: 18 },
    { date: '2024-04-04', total: 160000, orders: 20 },
    { date: '2024-04-05', total: 110000, orders: 14 },
  ];

  const chartData = {
    labels: salesData.map((item) => item.date),
    datasets: [
      {
        label: '일별 매출액 (원)',
        data: salesData.map((item) => item.total),
        backgroundColor: 'rgba(63, 125, 88, 0.6)',
        borderColor: '#3F7D58',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      title: {
        display: true,
        text: '최근 매출 추이',
        font: {
          size: 20,
          weight: 'bold',
        },
        color: '#3F7D58',
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.parsed.y.toLocaleString()}원`,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#555',
          font: { size: 14 },
        },
        grid: {
          display: false,
        },
      },
      y: {
        ticks: {
          color: '#555',
          font: { size: 14 },
          callback: (value) => `${value.toLocaleString()}원`,
        },
        grid: {
          color: '#eee',
        },
      },
    },
  };

  return (
    <Container className="mt-3">
      <h1>매출액 정보</h1>
      <Row>
        {/* 좌측 차트 */}
        <Col md={8}>
          <Bar data={chartData} options={options} />
        </Col>

        {/* 우측 주문 내역 리스트 */}
        <Col md={4}>
          <div
            style={{
              maxHeight: '400px',
              overflowY: 'auto',
              border: '1px solid #ddd',
              borderRadius: '5px',
              padding: '10px',
            }}
          >
            <h5>일자별 주문 내역</h5>
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>날짜</th>
                  <th>주문 수</th>
                  <th>매출액</th>
                </tr>
              </thead>
              <tbody>
                {salesData.map((item, index) => (
                  <tr key={index}>
                    <td>{item.date}</td>
                    <td>{item.orders}</td>
                    <td>{item.total.toLocaleString()}원</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default SalesInfo;