// src/components/TemperatureCard.js
import React, { useEffect, useState } from 'react';
import { GET } from '../../apis/CRUD';
import axios from 'axios';

const WeatherCard = () => {

const [weatherData,setWeatherData] = useState([]);

// useEffect(()=>{
// 	// GET('/api/admin/weather')
// 	.then(res=>console.log(res.data)
// 	)
// 	.catch(e=>console.error(e))
// },[])

return (
	<div className="card p-3 text-center">
			<div>
      <h2>기상 데이터</h2>
      {weatherData.length > 0 ? (
        <table border="1">
          <thead>
            <tr>
              <th>날짜</th>
              <th>시간</th>
              <th>기온</th>
            </tr>
          </thead>
          <tbody>
            {weatherData.map((item, index) => (
              <tr key={index}>
                <td>{item.fcstDate}</td>
                <td>{item.fcstTime}</td>
                <td>{item.fcstValue}°C</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Loading...</p>
      )}
    </div>
	</div>
);
};

export default WeatherCard;