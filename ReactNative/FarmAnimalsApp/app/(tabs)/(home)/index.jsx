import { StyleSheet, View, ScrollView, Text } from 'react-native';
import React from 'react';
import StatusCard from '../stock/StatusCard';

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <Text style={styles.title}>👋 Farmdas 관리자님 환영합니다!</Text>

      <View style={styles.cardGroup}>
        <StatusCard
          title="🌡️ 현재 온도"
          value="26.5℃"
          statusMessage="정상"
          tooltipMessage="25~27℃ 유지 중입니다!"
          borderColor="#32CD32"
        />
        <StatusCard
          title="💧 현재 습도"
          value="64%"
          statusMessage="주의"
          tooltipMessage="가습기 점검 필요"
          borderColor="#FFA500"
        />
        <StatusCard
          title="🌤️ 현재 날씨"
          value="맑음"
          statusMessage="좋음"
          tooltipMessage="오늘 최고기온 27℃"
          borderColor="#1E90FF"
        />
        <StatusCard
          title="💸 오늘 매출"
          value="120,000원"
          statusMessage="목표 달성!"
          tooltipMessage="목표 초과 달성! 축하합니다!"
          borderColor="#32CD32"
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0fff0',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100,
    alignItems: 'center',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#006400',
    marginBottom: 30,
  },
  cardGroup: {
    width: '100%',
    gap: 20,
  },
});
