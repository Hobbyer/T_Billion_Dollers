// app/stock/LiveStockTemperature.jsx

import React, { useEffect, useState } from 'react';
import { View, Dimensions, ActivityIndicator } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { GET } from '../../apis/CRUD';

const baseURL = 'http://192.168.204.19:8080'; // PC의 LAN IP (테스트용)

export default function LiveStockTemperature() {
  const [temps, setTemps]     = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const fetchTemp = async () => {
      try {
        const res = await GET(`${baseURL}/admin/temp`);
        if (mounted) setTemps(res.data);
      } catch (e) {
        console.error(e);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchTemp();
    const iv = setInterval(fetchTemp, 60000);
    return () => { mounted = false; clearInterval(iv); };
  }, []);

  if (loading) {
    return <ActivityIndicator style={{ marginTop: 50 }} />;
  }

  const data = {
    labels: temps.map(t =>
      new Date(t.timeLine).toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })
    ),
    datasets: [{ data: temps.map(t => t.temp) }],
  };
  const chartConfig = {
    backgroundGradientFrom: '#fff',
    backgroundGradientTo:   '#fff',
    decimalPlaces: 1,
    color:        (opacity = 1) => `rgba(63,125,88,${opacity})`,
    labelColor:   (opacity = 1) => `rgba(85,85,85,${opacity})`,
    style:        { borderRadius: 8 },
  };
  const width = Dimensions.get('window').width * 0.65;

  return (
    <View>
      <LineChart
        data={data}
        width={width}
        height={220}
        chartConfig={chartConfig}
        bezier
        style={{ borderRadius: 8 }}
      />
    </View>
  );
}
