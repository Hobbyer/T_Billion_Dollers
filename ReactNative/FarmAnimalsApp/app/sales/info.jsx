// src/screens/SalesInfoScreen.js

import React, { useEffect, useState } from 'react';
import {
  SafeAreaView, View, Text, FlatList,
  useWindowDimensions, StyleSheet, ActivityIndicator,
} from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { GET } from '../../apis/CRUD';

export default function SalesInfoScreen() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { width } = useWindowDimensions();
  const chartWidth = Math.max(width - 32, 0);

  useEffect(() => {
    (async () => {
      try {
        const res = await GET('http://192.168.204.19:8080/admin/daily-orders');
        setData(Array.isArray(res.data) ? res.data : []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const sorted = [...data].sort(
    (a, b) => new Date(a.orderDate) - new Date(b.orderDate)
  );
  const labels = sorted.map(i => i.orderDate);
  const values = sorted.map(i => i.totalPriceSum || 0);

  const chartConfig = {
    backgroundGradientFrom: '#fff',
    backgroundGradientTo:   '#fff',
    decimalPlaces: 0,
    color:        (op = 1) => `rgba(63,125,88,${op})`,
    labelColor:   (op = 1) => `rgba(85,85,85,${op})`,
    style:        { borderRadius: 8 },
    propsForBackgroundLines: { strokeDasharray: '' },
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.safe}>
        <ActivityIndicator size="large" color="#3F7D58" style={styles.center} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <FlatList
        data={sorted}
        keyExtractor={(_, i) => i.toString()}
        ListHeaderComponent={
          <>
            <Text style={styles.title}>최근 매출 추이</Text>
            <BarChart
              data={{ labels, datasets: [{ data: values }] }}
              width={chartWidth}
              height={220}
              yAxisSuffix="원"
              chartConfig={chartConfig}
              verticalLabelRotation={45}
              style={styles.chart}
            />
            <Text style={styles.subTitle}>일자별 주문 내역</Text>
          </>
        }
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.cellDate}>{item.orderDate}</Text>
            <Text style={styles.cellCount}>{item.orders}</Text>
            <Text style={styles.cellPrice}>
              {(item.totalPriceSum || 0).toLocaleString()}원
            </Text>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.empty}>데이터가 없습니다.</Text>}
        contentContainerStyle={styles.container}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:  { flex: 1, backgroundColor: '#fff' },
  center:{ flex:1, justifyContent:'center' },
  container: { padding:16 },
  title: { fontSize:20, fontWeight:'bold', color:'#3F7D58', textAlign:'center', marginBottom:8 },
  chart: { marginVertical:8, borderRadius:8 },
  subTitle:{ fontSize:16, fontWeight:'600', marginVertical:8 },
  row: { flexDirection:'row', marginBottom:6 },
  cellDate:  { flex:2, fontSize:14 },
  cellCount: { flex:1, fontSize:14, textAlign:'center' },
  cellPrice: { flex:2, fontSize:14, textAlign:'right' },
  empty:{ textAlign:'center', color:'#888', marginTop:20 },
});
