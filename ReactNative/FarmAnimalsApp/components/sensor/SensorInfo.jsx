import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import axios from "axios";

import AsyncStorage from "@react-native-async-storage/async-storage";
import Card from "@/components/common/Card";
import { Switch } from "react-native";

const SensorInfo = () => {
  const [isEnvironmentOn, setIsEnvironmentOn] = useState(true);
  const [isMotionOn, setIsMotionOn] = useState(true);

  const toggleEnvironmentSensor = async () => {
    const token = await AsyncStorage.getItem("accessToken");
    const nextState = !isEnvironmentOn;
    setIsEnvironmentOn(nextState);

    try {
      await axios.post(
        "http://192.168.30.76:8080/sensor/environment/toggle",
        { sensor: nextState },
        { headers: { Authorization: token ? `Bearer ${token}` : "" } }
      );
      console.log(`환경 센서 ${nextState ? "켜짐" : "꺼짐"}`);
    } catch (error) {
      console.error("환경 센서 제어 실패 ❌", error);
    }
  };

  const toggleMotionSensor = async () => {
    const token = await AsyncStorage.getItem("accessToken");
    const nextState = !isMotionOn;
    setIsMotionOn(nextState);

    try {
      await axios.post(
        "http://192.168.30.76:8080/sensor/environment/toggle",
        { motion: nextState },
        { headers: { Authorization: token ? `Bearer ${token}` : "" } }
      );
      console.log(`모션 센서 ${nextState ? "켜짐" : "꺼짐"}`);
    } catch (error) {
      console.error("모션 센서 제어 실패 ❌", error);
    }
  };
  return (
    <>
      {/* 환경(온습도) 센서 리모컨 */}
      <Card title="environment 센서">
        <Switch
          value={isEnvironmentOn}
          onValueChange={toggleEnvironmentSensor}
        />
        <Text>{isEnvironmentOn ? "🐮 온/습도 켜짐" : "❌ 온/습도 꺼짐"}</Text>
      </Card>

      {/* 모션 감지 센서 리모컨 */}
      <Card title="motion 센서">
        <Switch value={isMotionOn} onValueChange={toggleMotionSensor} />
        <Text>{isMotionOn ? "🐮 모션감지 켜짐" : "❌ 모션감지 꺼짐"}</Text>
      </Card>
    </>
  );
};

export default SensorInfo;

const styles = StyleSheet.create({});
