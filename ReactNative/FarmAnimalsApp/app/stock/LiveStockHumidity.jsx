// app/stock/LiveStockHumidity.jsx

import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, Text, StyleSheet, Dimensions } from 'react-native';
import { ProgressChart } from 'react-native-chart-kit';
import { GET } from '../../apis/CRUD';

const baseURL = 'http://192.168.204.19:8080'; // PC의 LAN IP (테스트용)

export default function LiveStockHumidity() {
  const [latest, setLatest] = useState(null);

  useEffect(() => {
    let mounted = true;
    const fetchHum = async () => {
      try {
        const res = await GET(`${baseURL}/admin/humidity`);
        if (mounted && Array.isArray(res.data) && res.data.length) {
          const sorted = res.data.sort(
            (a, b) => new Date(b.timeLine) - new Date(a.timeLine)
          );
          setLatest(sorted[0]);
        }
      } catch (e) {
        console.error('Error fetching humidity:', e);
      }
    };
    fetchHum();
    return () => { mounted = false; };
  }, []);

  if (!latest) {
    return <ActivityIndicator style={{ marginTop: 50 }} />;
  }

  // 원본 습도 비율
  const rawPercent = latest.humidity / 100;

  // 0.01 이상 0.99 이하로 잘라서 Infinity 경로 생성 방지
  const percent = Math.min(Math.max(rawPercent, 0.01), 0.99);

  const data = {
    labels: ['습도'],     // 차트에 표시할 레이블
    data: [percent],     // 클램프된 데이터
  };

  const chartConfig = {
    backgroundGradientFrom: '#fff',
    backgroundGradientTo:   '#fff',
    color:      () => `rgba(79,177,160,1)`,
    strokeWidth: 6,
  };

  const width = Dimensions.get('window').width * 0.3;

  return (
    <View style={styles.wrap}>
      <ProgressChart
        data={data}
        width={width}
        height={180}
        strokeWidth={6}
        radius={width / 4}
        chartConfig={chartConfig}
        hideLegend={false}
      />
      <Text style={styles.time}>
        {new Date(latest.timeLine).toLocaleTimeString('ko-KR', {
          hour: '2-digit',
          minute: '2-digit',
        })}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: 'center' },
  time: { marginTop: 8, fontSize: 12, color: '#666' },
});
