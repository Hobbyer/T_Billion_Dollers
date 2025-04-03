// src/components/StatisticsChart.js
import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const data = {
    labels: ['습도'],
    datasets: [{
        data: [56,44],
        backgroundColor: ['#007bff', '#ffcc00'],
    }],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
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


const StatisticsChart = () => {
    return (
        <div className="card p-1">
            <h4>습도</h4>
            <Doughnut data={data} />
        </div>
    );
};

export default StatisticsChart;
