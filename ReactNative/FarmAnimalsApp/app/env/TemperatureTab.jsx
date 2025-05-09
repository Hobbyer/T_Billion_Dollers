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

import TemperatureInfo from "../../components/temperature/TemperatureInfo";
import HumidityInfo from "../../components/humidity/HumidityInfo";
import HumidityCard from "../../components/humidity/HumidityCard";
import TemperatureCard from "../../components/temperature/TemperatureCard";
import { LABEL } from "../../styles/graghStyles";
import SensorInfo from "../../components/sensor/SensorInfo";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const TemperatureTab = () => {
  const insets = useSafeAreaInsets();
  

  return (
    <ScrollView style={styles.container}contentContainerStyle={{ paddingBottom: insets.bottom + 90 }}>
      <Text style={styles.title}>🌡️ 환경 관리</Text>

      <SensorInfo/>

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
