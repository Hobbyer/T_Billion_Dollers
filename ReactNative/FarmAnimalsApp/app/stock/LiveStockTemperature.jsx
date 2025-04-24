// app/stock/LiveStockTemperature.jsx

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Dimensions,
  ActivityIndicator,
  StyleSheet
} from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { GET } from '../../apis/CRUD';

const baseURL = 'http://192.168.204.19:8080'; // PC의 LAN IP (테스트용)

export default function LiveStockTemperature() {
  const [temps, setTemps]     = useState([]);
  const [loading, setLoading] = useState(true);
  const screenWidth           = Dimensions.get('window').width;

  useEffect(() => {
    let mounted = true;
    const fetchTemp = async () => {
      try {
        const res = await GET(`${baseURL}/admin/temp`);
        if (mounted) setTemps(res.data);
      } catch (e) {
        console.error('Error fetching temp:', e);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchTemp();
    const iv = setInterval(fetchTemp, 60000);
    return () => {
      mounted = false;
      clearInterval(iv);
    };
  }, []);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#3F7D58" />
      </View>
    );
  }

  // 시간 레이블, 온도값
  const labels = temps.map(t =>
    new Date(t.timeLine).toLocaleTimeString('ko-KR', {
      hour: '2-digit',
      minute: '2-digit'
    })
  );
  const dataSet = temps.map(t => t.temp);

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>최근 온도 추이</Text>
      <LineChart
        data={{ labels, datasets: [{ data: dataSet }] }}
        width={screenWidth - 32}      // 좌우 16씩 패딩 고려
        height={220}
        yAxisSuffix="°C"
        fromZero
        chartConfig={{
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo:   '#ffffff',
          decimalPlaces: 1,
          color:        (opacity = 1) => `rgba(63,125,88,${opacity})`,
          labelColor:   (opacity = 1) => `rgba(85,85,85,${opacity})`,
          propsForDots: {
            r: '0',                  // 점 숨김
          },
          propsForBackgroundLines: {
            stroke: '#e0e0e0',
            strokeDasharray: '',     // 실선 그리드
          },
        }}
        bezier
        style={styles.chart}
        verticalLabelRotation={45}
        withInnerLines={false}
        withOuterLines={false}
        withShadow={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  loader: {
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginVertical: 8,
    marginHorizontal: 16,
    // iOS shadow
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width:0, height:2 },
    // Android shadow
    elevation: 3,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#3F7D58',
    textAlign: 'center'
  },
  chart: {
    borderRadius: 12,
  },
});
