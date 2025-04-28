import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Constants from "expo-constants";

const WeatherInfo = () => {
  const [weather, setWeather] = useState(null); // 현재 날씨
  const [forecast, setForecast] = useState([]); // 주간 예보

  // 5일 날씨 예보 데이터 가져오기
  const fetchWeather = async () => {
    try {
      const apiKey = Constants.expoConfig.extra.WEATHER_KEY;
      const lat = Constants.expoConfig.extra.LAT;
      const lon = Constants.expoConfig.extra.LON;

      // 현재 날씨 API 호출
      const weatherRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=kr`
      );
      setWeather(weatherRes.data);

      // 주간 예보 API 호출
      const forecastRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=kr`
      );

      // 5일 예보 데이터만 필터링 (하루별로 묶기)
      const dailyForecast = [];
      let currentDate = null;
      let dayData = [];

      forecastRes.data.list.forEach((item) => {
        const forecastDate = new Date(item.dt_txt).toLocaleDateString("ko-KR"); // 날짜 형식 맞추기

        // 첫번째 항목 또는 날짜가 바뀌면 새로운 하루의 데이터를 시작
        if (forecastDate !== currentDate) {
          if (dayData.length > 0) {
            dailyForecast.push(dayData[0]); // 하루 중 첫 번째 시간의 데이터를 사용
          }
          currentDate = forecastDate;
          dayData = [item]; // 새로운 날짜 시작
        } else {
          dayData.push(item); // 같은 날의 시간 데이터를 추가
        }
      });

      // 마지막 날짜 데이터 추가
      if (dayData.length > 0) {
        dailyForecast.push(dayData[0]); // 하루 중 첫 번째 시간의 데이터를 사용
      }

      setForecast(dailyForecast); // 5일 간의 예보 저장
    } catch (err) {
      console.log("날씨 API 에러 😵", err);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);
  return (
    <View>
      {/* 날씨 정보 */}
      <Text style={styles.label}>🌤️ 현재 날씨</Text>
      {weather ? (
        <View>
          <Text>
            온도: {weather.main.temp}℃ / 상태: {weather.weather[0].description}
          </Text>
          {/* 5일 예보 표 형식으로 표시 */}
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={styles.tableHeaderText}>날짜</Text>
              <Text style={styles.tableHeaderText}>온도(°C)</Text>
              <Text style={styles.tableHeaderText}>상태</Text>
              <Text style={styles.tableHeaderText}>습도(%)</Text>
            </View>

            {forecast.map((item, index) => {
              const d = new Date(item.dt_txt);
              const label =
                index === 0
                  ? "내일"
                  : d.toLocaleDateString("ko-KR", {
                      month: "numeric",
                      day: "numeric",
                    });

              return (
                <View style={styles.tableRow} key={index}>
                  <Text style={styles.tableCell}>{label}</Text>
                  <Text style={styles.tableCell}>
                    {item.main.temp.toFixed(1)}°C
                  </Text>
                  <Text style={styles.tableCell}>
                    {item.weather[0].description}
                  </Text>
                  <Text style={styles.tableCell}>{item.main.humidity}%</Text>
                </View>
              );
            })}
          </View>
        </View>
      ) : (
        <Text>불러오는 중...</Text>
      )}
    </View>
  );
};

export default WeatherInfo;

const styles = StyleSheet.create({});
