import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  useWindowDimensions,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { BarChart } from "react-native-chart-kit";
import { GET } from "@/apis/CRUD";

// const baseUrl = 'http://192.168.204.19:8080'; // Replace with your actual base URL

export default function SalesInfoScreen() {
  const baseUrl = "http://10.0.2.2:8080";
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { width } = useWindowDimensions();
  const chartWidth = width - 70;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await GET(`${baseUrl}/admin/daily-orders`);
        console.log("✅ API 응답:", res.data);
        setData(Array.isArray(res.data) ? res.data : []);
      } catch (e) {
        console.error("❌ API 에러:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.safe}>
        <ActivityIndicator size="large" color="#3F7D58" style={styles.center} />
      </SafeAreaView>
    );
  }

  const sorted = [...data].sort(
    (a, b) => new Date(a.orderDate) - new Date(b.orderDate)
  );
  const labels = sorted.map((i) => i.orderDate);
  const values = sorted.map((i) => i.totalPriceSum || 0);

  return (
    <SafeAreaView style={styles.safe}>
      <FlatList
        data={sorted}
        keyExtractor={(_, i) => i.toString()}
        ListHeaderComponent={
          <View style={styles.headerContainer}>
            <Text style={styles.sectionTitle}>📈 최근 매출 추이</Text>
            <View style={styles.chartBox}>
              {labels.length > 0 && values.length > 0 ? (
                <BarChart
                  data={{
                    labels,
                    datasets: [{ data: values }],
                  }}
                  width={chartWidth}
                  height={240}
                  yAxisSuffix="원"
                  fromZero
                  segments={4}
                  chartConfig={chartConfig}
                  verticalLabelRotation={45}
                  style={styles.chart}
                />
              ) : (
                <View>
                  <Text style={{ color: "gray", textAlign: "center" }}>
                    📭 차트 데이터가 없습니다.
                  </Text>
                </View>
              )}
            </View>
            <Text style={styles.sectionTitle}>🗓️ 일자별 주문 내역</Text>
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
        ListEmptyComponent={
          <View>
            <Text style={styles.empty}>데이터가 없습니다.</Text>
          </View>
        }
        contentContainerStyle={styles.container}
      />
    </SafeAreaView>
  );
}

const chartConfig = {
  backgroundGradientFrom: "#FFFFFF", // 💡 전체 배경 흰색
  backgroundGradientTo: "#FFFFFF",
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(56, 142, 60, ${opacity})`, // ✅ 진한 초록
  labelColor: (opacity = 1) => `rgba(27, 94, 32, ${opacity})`,
  useShadowColorFromDataset: false, // ✅ 꼭대기만 색칠되는 문제 해결
  barPercentage: 1.0, // ✅ 꽉 찬 막대 너비
  propsForBackgroundLines: {
    stroke: "#E0E0E0",
    strokeDasharray: "2",
  },
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#E8F5E9",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    padding: 20,
    paddingBottom: 100,
  },
  headerContainer: {
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2E7D32",
    textAlign: "center",
    marginBottom: 16,
  },
  chartBox: {
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 20,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: "#A7F3D0",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  chart: {
    borderRadius: 16,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2E7D32",
    textAlign: "center",
    marginBottom: 14,
  },
  listItem: {
    backgroundColor: "#ffffff",
    padding: 16,
    marginBottom: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#BBF7D0",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
    flexDirection: "row",
    alignItems: "center",
  },
  dateText: {
    flex: 2,
    fontSize: 15,
    fontWeight: "bold",
    color: "#047857",
  },
  orderText: {
    flex: 1,
    fontSize: 15,
    textAlign: "center",
    color: "#059669",
  },
  priceText: {
    flex: 2,
    fontSize: 15,
    textAlign: "right",
    fontWeight: "700",
    color: "#065F46",
  },
  empty: {
    textAlign: "center",
    color: "#94A3B8",
    marginTop: 20,
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1B5E20",
    backgroundColor: "#C8E6C9",
    borderColor: "#81C784", // 또는 '#388E3C' 으로 강조!
    borderWidth: 1.5,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 12,
    alignSelf: "flex-start",
    marginBottom: 14,
  },
});
