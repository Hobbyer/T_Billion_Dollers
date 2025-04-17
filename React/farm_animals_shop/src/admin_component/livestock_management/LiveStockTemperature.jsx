import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2';
import ChartJS from 'chart.js/auto';
import { CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { GET } from '../../apis/CRUD';
import dayjs from 'dayjs';

const baseURL = import.meta.env.VITE_API_URL;

const LiveStockTemperature = () => {

  ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

  const [temp, setTemp] = useState([]);

  useEffect(()=>{
    const fetchTemperature = async () => {
      try {
        const res = await GET(`${baseURL}/admin/temp`);
        setTemp(res.data);
      } catch (error) {
        console.log(error)
      }
  };

  fetchTemperature();
  const interval = setInterval(fetchTemperature, 60000); // 1분마다 데이터 갱신

  return () => clearInterval(interval);
}, [])


const data = {
  labels: temp.reverse().map(t => dayjs(t.timeLine).format('HH시 mm분')), // 시간
  datasets: [
    {
      label: '온도', // 그래프 라벨
      data: temp.reverse().map(t => t.temp), // 데이터 수치
      borderColor: 'rgba(75, 192, 192, 1)',
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      fill: true, // 선 아래 색칠 여부
    },
  ],
};


const options = {
  responsive: true,
  maintainAspectRatio: false, // 부모 div에 맞춰 자동 조정
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
    },
   
  },
};

return (
  <div style={{ width: '100%', height: '300px' }}>
    <Line data={data} options={options} />
  </div>
);

};

export default LiveStockTemperature