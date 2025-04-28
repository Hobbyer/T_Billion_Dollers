import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, Switch } from 'react-native';
import { LineChart, ProgressChart } from 'react-native-chart-kit';
import axios from 'axios';

const screenWidth = Dimensions.get('window').width;

const TemperatureTab = () => {
  const [isSensorOn, setIsSensorOn] = useState(true);
  const [weather, setWeather] = useState(null);

  const toggleSensor = async () => {
    const nextState = !isSensorOn;
    setIsSensorOn(nextState);
  
    try {
      await axios.post('http://localhost:8080/sensor/environment/toggle', {
        state: nextState,
      });
      console.log(`센서 ${nextState ? '켜짐' : '꺼짐'}`);
    } catch (error) {
      console.error('센서 제어 실패 ❌', error);
    }
  };
  

  const fetchWeather = async () => {
    try {
      const apiKey = 'YOUR_API_KEY'; // 🔑 실제 키 넣어야 함
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=Seoul&appid=${apiKey}&units=metric`
      );
      setWeather(res.data);
    } catch (err) {
      console.log('날씨 API 에러 😵', err);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>🌡️ 환경 관리</Text>

      {/* 센서 리모컨 */}
      <View style={styles.card}>
        <Text style={styles.label}>센서 전원</Text>
        <Switch value={isSensorOn} onValueChange={toggleSensor} />
        <Text>{isSensorOn ? '🐮 센서 켜짐' : '❌ 센서 꺼짐'}</Text>
      </View>

      {/* 온도 그래프 */}
      <View style={styles.card}>
        <Text style={styles.label}>📈 온도 그래프</Text>
        <LineChart
          data={{
            labels: ['9시', '12시', '15시', '18시'],
            datasets: [{ data: [22.1, 24.3, 25.2, 23.9] }],
          }}
          width={screenWidth - 32}
          height={220}
          chartConfig={chartConfig}
          bezier
        />
      </View>

      {/* 습도 도넛 차트 */}
      <View style={styles.card}>
        <Text style={styles.label}>💧 현재 습도</Text>
        <View style={styles.donutContainer}>
          <ProgressChart
            data={{ data: [0.64] }}
            width={screenWidth - 100}
            height={200}
            strokeWidth={16}
            radius={48}
            chartConfig={chartConfig}
            hideLegend={true}
          />
          <View style={styles.donutCenter}>
            <Text style={styles.donutText}>64%</Text>
          </View>
        </View>
      </View>

      {/* 날씨 정보 */}
      <View style={styles.card}>
        <Text style={styles.label}>🌤️ 현재 날씨</Text>
        {weather ? (
          <Text>
            온도: {weather.main.temp}℃ / 상태: {weather.weather[0].description}
          </Text>
        ) : (
          <Text>불러오는 중...</Text>
        )}
      </View>
    </ScrollView>
  );
};

export default TemperatureTab;

const chartConfig = {
  backgroundGradientFrom: '#ffffff',
  backgroundGradientTo: '#ffffff',
  decimalPlaces: 1,
  color: (opacity = 1) => `rgba(34, 139, 34, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 100, 0, ${opacity})`,
  propsForDots: {
    r: '5',
    strokeWidth: '2',
    stroke: '#32CD32',
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f0fff0',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#006400',
  },
  card: {
    marginBottom: 24,
    padding: 16,
    backgroundColor: '#e6f5e6',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#90ee90',
    shadowColor: '#006400',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    color: '#228B22',
  },
  humidityText: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 8,
    color: '#2e8b57',
  },
  donutContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  donutCenter: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  donutText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#228B22',
  },
});
