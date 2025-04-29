import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { CHART_CONFIG, GRAPH_BOX, LABEL } from "../../styles/graghStyles";
import { ProgressChart } from "react-native-chart-kit";
import { SCREEN_WIDTH, SCREEN_HEIGHT } from "../../constants/dimensions";
import { GET_API } from "../../apis/testcrud";

const HumidityInfo = () => {
  const [latest, setLatest] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const fetchHum = async () => {
      try {
        const res = await GET_API(`/admin/humidity`);
        if (mounted && Array.isArray(res) && res.length) {
          const sorted = res.sort(
            (a, b) => new Date(b.timeLine) - new Date(a.timeLine)
          ); // 내림차순 정렬
          setLatest(sorted[0]); // 최신데이터 하나만 따로 빼서 저장
        }
      } catch (e) {
        console.error("Error fetching humidity:", e);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchHum();
    return () => {
      mounted = false;
    };
  }, []);

  if (loading || !latest) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#3F7D58" />
      </View>
    );
  }

  // 한국 시간 기준  최근 측정 시간 포맷팅팅
  const formattedTime = latest?.timeLine
    ? new Date(latest.timeLine).toLocaleString("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

  return (
    <>
      <Text style={LABEL.label}>💧 현재 습도</Text>
      <View style={GRAPH_BOX.graphBox}>
        <View style={styles.donutContainer}>
          <ProgressChart
            data={{ data: [latest.humidity / 100] }}
            width={SCREEN_WIDTH - 100}
            height={200}
            strokeWidth={16}
            radius={48}
            chartConfig={CHART_CONFIG}
            hideLegend={true}
          />
          <View style={styles.donutCenter}>
            <Text style={styles.donutText}>{latest.humidity}%</Text>
          </View>
        </View>
        <View>
          <Text>최근 측정 시간: {formattedTime}</Text>
        </View>
      </View>
    </>
  );
};

export default HumidityInfo;

const styles = StyleSheet.create({
  humidityText: {
    textAlign: "center",
    fontSize: 16,
    marginTop: 8,
    color: "#2e8b57",
  },
  donutContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  donutCenter: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  donutText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#228B22",
  },
});
