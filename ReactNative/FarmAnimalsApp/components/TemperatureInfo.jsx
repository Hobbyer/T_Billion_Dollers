import { Dimensions, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { LineChart } from 'react-native-chart-kit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const screenWidth = Dimensions.get("window").width;
const baseURL = 'http://10.0.2.2:8080'; // PC의 LAN IP (테스트용)

const TemperatureInfo = ({ chartConfig }) => {
  const [temp, setTemp] = useState([]);

  useEffect(() => {
    // AsyncStorage에서 토큰 가져오기
    AsyncStorage.getItem('accessToken').then((token) => {
      if (token) {
        // Authorization 헤더에 토큰 포함
        fetch(`${baseURL}/admin/temp`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`, // Bearer 토큰 추가
            'Content-Type': 'application/json', // 필요 시 Content-Type도 추가
          }
        })
          .then((response) => response.json()) // JSON 형태로 변환
          .then((data) => {
            setTemp(data); // 데이터 상태로 저장
          })
          .catch((err) => {
            console.error('데이터 요청 실패:', err);
          });
      } else {
        console.log('Access Token이 없습니다.');
      }
    });
  }, []);

  // 받은 데이터를 기반으로 timeLine과 tempList 배열 생성
  const timeLine = temp.map(item => item.timeLine.slice(11,16)).slice(0, 5);
  const tempList = temp.map(item => item.temp).slice(0, 5);
  

  // 디버깅용: timeLine과 tempList 값이 제대로 오는지 확인
  // console.log('Time Line:', timeLine);
  // console.log('Temperature List:', tempList);

  return (
    <View>
      <Text style={styles.label}>📈 실시간 온도 그래프 </Text>
      <LineChart
        data={{
          labels: timeLine.length > 0 ? timeLine: ["Loading..."], // 시간이 없을 때는 'Loading...' 텍스트 표시
          datasets: [{
            data: tempList.length > 0 ? tempList : [0, 0, 0, 0, 0], // 데이터가 없으면 0으로 채우기
          }],
        }}
        width={screenWidth - 32}
        height={220}
        chartConfig={chartConfig}
        bezier
      />
    </View>
  );
};

export default TemperatureInfo;

const styles = StyleSheet.create({
  label: {
    fontSize: 18,
    marginBottom: 8,
    textAlign: 'center',
  },
});
