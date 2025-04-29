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

import Card from "@/components/common/Card";
import WeatherInfo from "@/components/weather/WeatherInfo";
import axios from "axios";

import AsyncStorage from "@react-native-async-storage/async-storage";
import TemperatureInfo from "../../components/temperature/TemperatureInfo";
import HumidityInfo from "../../components/humidity/HumidityInfo";
import HumidityCard from "../../components/humidity/HumidityCard";
import TemperatureCard from "../../components/temperature/TemperatureCard";
import { LABEL } from "../../styles/graghStyles";

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

      <Card>
        <Text style={LABEL.label}> 🏡 현재 축사 상태</Text>
        <HumidityCard/>
        <TemperatureCard/>
      </Card>

      {/* 온도 그래프 */}
      <Card>
        <TemperatureInfo />
      </Card>

      {/* 습도 도넛 차트 */}
      <Card>
        <HumidityInfo />
      </Card>

      {/* 날씨 데이터 */}
      <Card>
        <WeatherInfo/>
      </Card>
    </ScrollView>
  );
};

export default TemperatureTab;



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
   
});
