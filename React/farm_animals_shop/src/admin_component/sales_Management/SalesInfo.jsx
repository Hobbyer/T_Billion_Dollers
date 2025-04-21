import React, { useEffect, useState } from 'react';
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
import { GET } from '../../apis/CRUD';

const baseURL = import.meta.env.VITE_API_URL;

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

const SalesInfo = () => {
  const [salesData, setSalesData] = useState([]);

  useEffect(() => {
    GET(`${baseURL}/admin/daily-orders`)
      .then((res) => {
        console.log(res.data);
        setSalesData(Array.isArray(res.data) ? res.data : []);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const chartData = {
    labels: salesData.slice().reverse().map((item) => item.orderDate),
    datasets: [
      {
        label: '일별 매출액 (원)',
        data: salesData.slice().reverse().map((item) => item.totalPriceSum),
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
                {Array.isArray(salesData) && salesData.length > 0 ? (
                  salesData.map((item, index) => (
                    <tr key={index}>
                      <td>{item.orderDate}</td>
                      <td>{item.orders}</td>
                      <td>{item.totalPriceSum ? item.totalPriceSum.toLocaleString() : null}원</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} style={{ textAlign: 'center' }}>데이터가 없습니다.</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default SalesInfo;