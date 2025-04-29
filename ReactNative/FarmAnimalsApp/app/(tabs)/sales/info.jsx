import React, { useEffect, useState } from 'react';
import {
  SafeAreaView, View, Text, FlatList,
  useWindowDimensions, StyleSheet, ActivityIndicator,
} from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { GET_API } from '../../../apis/testcrud';

// const baseUrl = 'http://192.168.204.19:8080'; // Replace with your actual base URL

export default function SalesInfoScreen() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { width } = useWindowDimensions();
  const chartWidth = width - 70;

  useEffect(() => {
    (async () => {
      try {
        const res = await GET_API(`/admin/daily-orders`);
        setData(Array.isArray(res) ? res : []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.safe}>
        <ActivityIndicator size="large" color="#3F7D58" style={styles.center} />
      </SafeAreaView>
    );
  }

  const sorted = [...data].sort((a, b) => new Date(a.orderDate) - new Date(b.orderDate));
  const labels = sorted.map(i => i.orderDate);
  const values = sorted.map(i => i.totalPriceSum || 0);

  return (
    <SafeAreaView style={styles.safe}>
      <FlatList
        data={sorted}
        keyExtractor={(_, i) => i.toString()}
        ListHeaderComponent={
          <View style={styles.headerContainer}>
            <Text style={styles.title}>📈 최근 매출 추이</Text>
            <View style={styles.chartBox}>
              <BarChart
                data={{ labels, datasets: [{ data: values }] }}
                width={chartWidth}
                height={240}
                yAxisSuffix="원"
                chartConfig={chartConfig}
                verticalLabelRotation={45}
                style={styles.chart}
              />
            </View>
            <Text style={styles.subTitle}>🗓️ 일자별 주문 내역</Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text style={styles.dateText}>{item.orderDate}</Text>
            <Text style={styles.orderText}>{item.orders}건</Text>
            <Text style={styles.priceText}>
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

const chartConfig = {
  backgroundGradientFrom: '#ffffff',
  backgroundGradientTo:   '#ffffff',
  decimalPlaces: 0,
  color:        (op = 1) => `rgba(63,125,88,${op})`, // 차트 컬러
  labelColor:   (op = 1) => `rgba(85,85,85,${op})`,
  propsForBackgroundLines: { strokeDasharray: '' },
};

const styles = StyleSheet.create({
  safe:       { flex: 1, backgroundColor: '#f0fff0' },
  center:     { flex: 1, justifyContent: 'center' },
  container:  { padding: 20 },
  headerContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#3F7D58',
    textAlign: 'center',
    marginBottom: 12,
  },
  chartBox: {
    backgroundColor: '#ffffff',
    padding: 12,
    borderRadius: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#d0e8d0',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  chart: {
    borderRadius: 12,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#3F7D58',
  },
  listItem: {
    backgroundColor: '#ffffff',
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#d0e8d0',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateText: {
    flex: 2,
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
  },
  orderText: {
    flex: 1,
    fontSize: 15,
    textAlign: 'center',
    color: '#555',
  },
  priceText: {
    flex: 2,
    fontSize: 15,
    textAlign: 'right',
    fontWeight: '600',
    color: '#3F7D58',
  },
  empty: {
    textAlign: 'center',
    color: '#888',
    marginTop: 20,
    fontSize: 16,
  },
});
