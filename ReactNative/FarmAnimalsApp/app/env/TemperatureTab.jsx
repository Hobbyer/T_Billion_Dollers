import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  Switch,
  FlatList,
  Image,
} from "react-native";
import { LineChart, ProgressChart } from "react-native-chart-kit";

import Card from "../../components/common/Card";
import WeatherInfo from "../../components/WeatherInfo";
import axios from "axios";
import { POST } from "../../apis/CRUD";

const screenWidth = Dimensions.get("window").width;

const TemperatureTab = () => {
  const [isSensorOn, setIsSensorOn] = useState(true);

  const toggleSensor = async () => {
    const nextState = !isSensorOn;
    setIsSensorOn(nextState);
  
    try {
      await axios.post('http://192.168.30.151:8080/sensor/environment/toggle', {
        
        state: nextState,
      });
      console.log(`센서 ${nextState ? '켜짐' : '꺼짐'}`);
    } catch (error) {
      console.error('센서 제어 실패 ❌', error);
    }
  };
  

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>🌡️ 환경 관리</Text>

      {/* 센서 리모컨 */}
      <Card title="센서 전원">
        <Switch value={isSensorOn} onValueChange={toggleSensor} />
        <Text>{isSensorOn ? "🐮 센서 켜짐" : "❌ 센서 꺼짐"}</Text>
      </Card>

      {/* 온도 그래프 */}
      <Card>
        <Text style={styles.label}>📈 온도 그래프</Text>
        <LineChart
          data={{
            labels: ["9시", "12시", "15시", "18시"],
            datasets: [{ data: [22.1, 24.3, 25.2, 23.9] }],
          }}
          width={screenWidth - 32}
          height={220}
          chartConfig={chartConfig}
          bezier
        />
      </Card>

      {/* 습도 도넛 차트 */}
      <Card>
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
      </Card>
      
      {/* 날씨 데이터 */}
      <Card>
        <WeatherInfo/>
      </Card>
    </ScrollView>
  );
};

export default TemperatureTab;

const chartConfig = {
  backgroundGradientFrom: "#ffffff",
  backgroundGradientTo: "#ffffff",
  decimalPlaces: 1,
  color: (opacity = 1) => `rgba(34, 139, 34, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 100, 0, ${opacity})`,
  propsForDots: {
    r: "5",
    strokeWidth: "2",
    stroke: "#32CD32",
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f0fff0",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#006400",
  },
  card: {
    marginBottom: 24,
    padding: 16,
    backgroundColor: "#e6f5e6",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#90ee90",
    shadowColor: "#006400",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  label: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
    color: "#228B22",
  },
  humidityText: {
    textAlign: "center",
    fontSize: 16,
    marginTop: 8,
    color: "#2e8b57",
  },
  donutContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  donutCenter: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  donutText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#228B22",
  },
});
