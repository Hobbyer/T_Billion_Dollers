import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';

const DetailScreen = () => {
  const router = useRouter();
  const [summary, setSummary] = useState({
    temperature: 24,
    humidity: 60,
    weather: '맑음',
    salesToday: 125000,
  });

  useEffect(() => {
    // TODO: 진짜 데이터 받아오는 API 연결 가능
    // setSummary({ ... });
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>👋 Farmdas 관리자님 환영합니다!</Text>

      <View style={styles.summaryBox}>
        <Text style={styles.summaryText}>🌡️ 온도: {summary.temperature}℃</Text>
        <Text style={styles.summaryText}>💧 습도: {summary.humidity}%</Text>
        <Text style={styles.summaryText}>🌤️ 날씨: {summary.weather}</Text>
        <Text style={styles.summaryText}>💸 오늘 매출: {summary.salesToday.toLocaleString()}원</Text>
      </View>

      <View style={styles.buttonGroup}>
        <HomeButton title="🌡️ 환경 관리" onPress={() => router.push('/(tabs)/env')} />
        <HomeButton title="🛍️ 상품 관리" onPress={() => router.push('/(tabs)/product')} />
        <HomeButton title="📦 주문 관리" onPress={() => router.push('/(tabs)/order')} />
        <HomeButton title="👤 회원 정보" onPress={() => router.push('/(tabs)/member')} />
        <HomeButton title="📊 매출 분석" onPress={() => router.push('/(tabs)/sales')} />
      </View>
    </ScrollView>
  );
};

const HomeButton = ({ title, onPress }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

export default DetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0fff0',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#006400',
  },
  summaryBox: {
    backgroundColor: '#e6f5e6',
    padding: 20,
    borderRadius: 12,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#90ee90',
  },
  summaryText: {
    fontSize: 18,
    marginBottom: 10,
    color: '#228B22',
  },
  buttonGroup: {
    flexDirection: 'column',
    gap: 16,
  },
  button: {
    backgroundColor: '#78b978',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
