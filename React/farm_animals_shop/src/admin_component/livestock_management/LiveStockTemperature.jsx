import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2';
import ChartJS from 'chart.js/auto';
import { CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import axios from 'axios';

const LiveStockTemperature = () => {

  ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

  const [temp, setTemp] = useState([]);

  useEffect(()=>{
    const fetchTemperature = async () => {
      try {
        const res = await axios.get('/api/admin/temp');
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
  labels: temp.reverse().map(t => t.timeLine), // 시간
  datasets: [
    {
      label: '온도', // 그래프 라벨
      data: temp.reverse().map(t => t.temp), // 데이터 수치
      borderColor: 'rgba(75, 192, 192, 1)',
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
    },
  ],
};


const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: '실시간 온도 데이터',
    },
   
  },
};

return <Line data={data} options={options} />;
};

export default LiveStockTemperature