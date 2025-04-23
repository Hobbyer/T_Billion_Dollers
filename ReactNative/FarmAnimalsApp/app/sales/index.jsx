import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  useWindowDimensions,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { GET } from '../../apis/CRUD';  // 경로는 프로젝트 구조에 맞게 수정하세요

export default function SalesScreen() {
  const [data, setData] = useState([]);
  const { width } = useWindowDimensions();
  const [chartWidth, setChartWidth] = useState(0);

  useEffect(() => {
    GET('http://10.0.2.2:8080/admin/daily-orders')
      .then(res => setData(Array.isArray(res.data) ? res.data : []))
      .catch(err => console.error(err));
  }, []);

  // 날짜 오름차순 정렬
  const sorted = [...data].sort(
    (a, b) => new Date(a.orderDate) - new Date(b.orderDate)
  );

  // 차트 레이블 & 데이터
  const labels = sorted.map(item => item.orderDate);
  const values = sorted.map(item => item.totalPriceSum || 0);

  const chartConfig = {
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(63,125,88, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(85,85,85, ${opacity})`,
    style: { borderRadius: 8 },
    propsForBackgroundLines: { strokeDasharray: '' },
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>최근 매출 추이</Text>

        {/* 차트 영역: 컨테이너 폭 측정 후 렌더 */}
        <View
          style={{ width: '100%' }}
          onLayout={e => {
            const w = e.nativeEvent.layout.width - 32;  // padding 16 * 2
            setChartWidth(Math.max(w, 0));
          }}
        >
          {chartWidth > 0 && (
            <BarChart
              data={{ labels, datasets: [{ data: values }] }}
              width={chartWidth}
              height={220}
              yAxisLabel=""
              yAxisSuffix="원"
              chartConfig={chartConfig}
              verticalLabelRotation={45}
              style={styles.chart}
            />
          )}
        </View>

        {/* 주문 내역 리스트 */}
        <View style={styles.listContainer}>
          <Text style={styles.subTitle}>일자별 주문 내역</Text>
          <FlatList
            data={sorted}
            keyExtractor={(_, idx) => idx.toString()}
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
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  container: { padding: 16 },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3F7D58',
    marginBottom: 8,
    alignSelf: 'center'
  },
  chart: { marginVertical: 8, borderRadius: 8 },
  listContainer: {
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    maxHeight: 400,
  },
  subTitle: { fontSize: 16, fontWeight: '600', marginBottom: 8 },
  row: { flexDirection: 'row', marginBottom: 6 },
  cellDate: { flex: 2, fontSize: 14 },
  cellCount: { flex: 1, fontSize: 14, textAlign: 'center' },
  cellPrice: { flex: 2, fontSize: 14, textAlign: 'right' },
  empty: { textAlign: 'center', color: '#888', marginTop: 20 },
});
