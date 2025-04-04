// src/components/TemperatureCard.js
import React, { useEffect, useState } from 'react';
import { GET } from '../../apis/CRUD';
import { position } from '../../constant/mapData';

const WeatherCard = () => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    GET(`/weather?lat=${position.lat}&lon=${position.lon}&appid=79bad4162ec9092093d4369bf45b9031&units=metric&lang=kr`)
      .then(res => {
        console.log(res.data);
        setWeatherData(res.data);
      })
      .catch(e => console.error(e));
  }, []);

  return (
    <div className="card p-3 text-center">
      {weatherData && weatherData.main ? (
        <>
          <h2 style={{fontWeight:'bold'}}>{weatherData.name}</h2>
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
  );
};

export default WeatherCard;
