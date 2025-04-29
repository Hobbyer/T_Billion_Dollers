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

import AsyncStorage from "@react-native-async-storage/async-storage";
import TemperatureInfo from "../../components/TemperatureInfo";

const screenWidth = Dimensions.get("window").width;

const TemperatureTab = () => {
  const [isEnvironmentOn, setIsEnvironmentOn] = useState(true);
  const [isMotionOn, setIsMotionOn] = useState(true);

  const toggleEnvironmentSensor = async () => {
    const token = await AsyncStorage.getItem('accessToken');
    const nextState = !isEnvironmentOn;
    setIsEnvironmentOn(nextState);

    try {
      await axios.post('http://192.168.30.76:8080/sensor/environment/toggle', 
        { sensor: nextState }, 
        { headers: { Authorization: token ? `Bearer ${token}` : '' } }
      );
      console.log(`환경 센서 ${nextState ? '켜짐' : '꺼짐'}`);
    } catch (error) {
      console.error('환경 센서 제어 실패 ❌', error);
    }
  };

  const toggleMotionSensor = async () => {
    const token = await AsyncStorage.getItem('accessToken');
    const nextState = !isMotionOn;
    setIsMotionOn(nextState);

    try {
      await axios.post('http://192.168.30.76:8080/sensor/environment/toggle', 
        { motion: nextState }, 
        { headers: { Authorization: token ? `Bearer ${token}` : '' } }
      );
      console.log(`모션 센서 ${nextState ? '켜짐' : '꺼짐'}`);
    } catch (error) {
      console.error('모션 센서 제어 실패 ❌', error);
    }
  };
  

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>🌡️ 환경 관리</Text>

      {/* 환경(온습도) 센서 리모컨 */}
      <Card title="environment 센서">
        <Switch value={isEnvironmentOn} onValueChange={toggleEnvironmentSensor} />
        <Text>{isEnvironmentOn ? "🐮 온/습도 켜짐" : "❌ 온/습도 꺼짐"}</Text>
      </Card>

      {/* 모션 감지 센서 리모컨 */}
      <Card title="motion 센서">
        <Switch value={isMotionOn} onValueChange={toggleMotionSensor} />
        <Text>{isMotionOn ? "🐮 모션감지 켜짐" : "❌ 모션감지 꺼짐"}</Text>
      </Card>

      {/* 온도 그래프 */}
      <Card>
        <TemperatureInfo chartConfig={chartConfig}/>
      </Card>
      {/* 습도 도넛 차트 */}
      <Card>
        <Text style={styles.label}>💧 현재 습도</Text>
        <View style={styles.graphBox}>
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
  graphBox: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#d0e8d0',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
    marginBottom: 20,
    alignItems: 'center',
  },
  
});
