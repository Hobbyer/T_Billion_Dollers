import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { LineChart } from "react-native-chart-kit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CHART_CONFIG, GRAPH_BOX, LABEL } from "../../styles/graghStyles";
import { SCREEN_WIDTH } from "@/constants/dimensions";
import { baseURL } from "@/apis/CRUD";


const TemperatureInfo = () => {
  const [temp, setTemp] = useState([]);

  useEffect(() => {
    // AsyncStorage에서 토큰 가져오기
    AsyncStorage.getItem("accessToken").then((token) => {
      if (token) {
        // Authorization 헤더에 토큰 포함
        fetch(`${baseURL}/admin/temp`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, // Bearer 토큰 추가
            "Content-Type": "application/json", // 필요 시 Content-Type도 추가
          },
        })
          .then((response) => response.json()) // JSON 형태로 변환
          .then((data) => {
            setTemp(data); // 데이터 상태로 저장
          })
          .catch((err) => {
            console.error("데이터 요청 실패:", err);
          });
      } else {
        console.log("Access Token이 없습니다.");
      }
    });
  }, []);

  // 받은 데이터를 기반으로 timeLine과 tempList 배열 생성
  const timeLine = temp.map((item) => item.timeLine.slice(11, 16)).slice(0, 5);
  const tempList = temp.map((item) => item.temp).slice(0, 5);

  // 디버깅용: timeLine과 tempList 값이 제대로 오는지 확인
  // console.log('Time Line:', timeLine);
  // console.log('Temperature List:', tempList);

  return (
    <>
      <Text style={LABEL.label}>📈 실시간 온도 그래프 </Text>
      <View style={GRAPH_BOX.graphBox}>
        <LineChart
          data={{
            labels: timeLine.length > 0 ? timeLine : ["Loading..."], // 시간이 없을 때는 'Loading...' 텍스트 표시
            datasets: [
              {
                data: tempList.length > 0 ? tempList : [0, 0, 0, 0, 0], // 데이터가 없으면 0으로 채우기
              },
            ],
          }}
          width={SCREEN_WIDTH - 70}
          height={220}
          chartConfig={CHART_CONFIG}
          bezier
        />
      </View>
    </>
  );
};

export default TemperatureInfo;

const styles = StyleSheet.create({});
