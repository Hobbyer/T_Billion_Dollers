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
  const [isSensorOn, setIsSensorOn] = useState(true);

  const toggleSensor = async () => {
    const token = await AsyncStorage.getItem('accessToken');
    const nextState = !isSensorOn;
    setIsSensorOn(nextState);

    try {
      await axios.post('http://192.168.30.151:8080/sensor/environment/toggle', { 
        state: nextState,
      }, {headers: { Authorization: token ? `Bearer ${token}` : '' }});
      console.log(`센서 ${nextState ? '켜짐' : '꺼짐'}`);
    } catch (error) {
      console.error('센서 제어 실패 ?', error);
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
