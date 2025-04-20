// src/components/TemperatureCard.js
import React, { useEffect, useState } from 'react';
import { GET } from '../../apis/CRUD';
import { position, WEATHER_KEY } from '../../constant/mapData';
import axios from 'axios';

const baseURL = import.meta.env.VITE_BASE_URL;

const WeatherCard = () => {
  const [weatherData, setWeatherData] = useState(null);
  // 5일치 날씨 데이터
  const [forecastList, setForecastList] = useState([]);

 
  // 오늘 날씨 데이터 
  useEffect(() => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${position.lat}&lon=${position.lon}&appid=${WEATHER_KEY}&units=metric&lang=kr`)
      .then(res => {
        console.log(res.data);
        setWeatherData(res.data);
      })
      .catch(e => console.error(e));

    // 5일 날씨 데이터 
    axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${position.lat}&lon=${position.lon}&appid=${WEATHER_KEY}&units=metric&lang=kr`)
      .then(res => {
        const filteredData = res.data.list.filter((_, index) => index % 8 === 0).slice(0, 5);
        setForecastList(filteredData);
      })
      .catch(e => console.error(e));
  }, []);

  return (
    <div className='d-flex flex-column flex-md-row gap-5 align-items-center'>
  <div>
    {weatherData && weatherData.main ? (
      <>
        <h2 style={{ fontWeight: 'bold' }}>{weatherData.name}</h2>
        <img
          src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
          alt="weather icon"
          className="mx-auto"
        />
        <p>{weatherData.weather[0].description}</p>
        <p>{weatherData.main.temp.toFixed(1)}°C</p>
      </>
    ) : (
      <p>날씨 정보를 불러오는 중...</p>
    )}
  </div>
  <div>
    <table className='text-center'>
      <thead>
        <tr>
          <th>날짜</th>
          <th>날씨</th>
          <th>기온/습도</th>
        </tr>
      </thead>
      <tbody>
        {forecastList.length > 0 ? (
          forecastList.map((item, i) => {
            const date = new Date(item.dt_txt);
            const isTomorrow = i === 0;

            return (
              <tr key={i} style={{ borderBottom: '1px solid #ddd' }}>
                <td style={{ padding: "5px 10px", textAlign: 'center' }}>
                  {isTomorrow
                    ? '내일'
                    : date.toLocaleDateString('ko-KR', {
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric',
                      })}
                </td>
                <td style={{ padding: '10px', textAlign: 'center' }}>
                  <img
                    src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                    alt="weather icon"
                    width={30}
                    style={{ marginRight: '10px' }}
                  />
                  {item.weather[0].description}
                </td>
                <td style={{ padding: '10px', textAlign: 'center' }}>
                  {item.main.temp.toFixed(1)}°C / {item.main.humidity}%
                </td>
              </tr>
            );
          })
        ) : (
          <tr>
            <td colSpan="3" style={{ padding: '10px', textAlign: 'center' }}>
              5일 예보 불러오는 중...
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
</div>

    
  );
};

export default WeatherCard;
