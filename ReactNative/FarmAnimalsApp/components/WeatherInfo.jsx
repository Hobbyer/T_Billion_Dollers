import { Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Constants from "expo-constants";
import FastImage from "react-native-fast-image";

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

  // 일단 이미지 못받음;;

  const iconUrl = `https://openweathermap.org/img/wn/${weather?.weather[0].icon}.png`;

  return (
    <View>
      {/* 날씨 정보 */}
      <Text style={styles.label}>🌤️ 현재 날씨</Text>
      {weather ? (
        <View style={styles.weatherInfo}>
          <Image
            source={{
              uri: iconUrl,
              priority: FastImage.priority.normal,
            }}
            style={styles.icon}
          />
          <Text style={styles.weatherDetails}>
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
                <View
                  style={[
                    styles.tableRow,
                    index === forecast.length - 1 && styles.tableRowLast,
                  ]}
                  key={index}
                >
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

const styles = StyleSheet.create({
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
    textAlign: "center",
  },
  table: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    overflow: "hidden",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#77b677",
    padding: 10,
    justifyContent: "space-between",
  },
  tableHeaderText: {
    flex: 1,
    textAlign: "center",
    fontWeight: "bold",
    color: "#333",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    padding: 10,
    justifyContent: "space-between",
  },
  tableCell: {
    flex: 1,
    textAlign: "center",
    color: "#555",
  },
  tableRowLast: {
    borderBottomWidth: 0, // 마지막 행에 밑줄 제거
  },
  weatherInfo: {
    marginBottom: 20,
    fontSize: 16,
    textAlign: "center",
  },
  weatherDetails: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
});
