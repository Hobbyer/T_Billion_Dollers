// app/stock/LiveStockHumidity.jsx

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Dimensions
} from 'react-native';
import * as Progress from 'react-native-progress';
import { GET } from '../../apis/CRUD';

const baseURL = 'http://192.168.204.19:8080'; // PC의 LAN IP (테스트용)

export default function LiveStockHumidity() {
  const [latest, setLatest]   = useState(null);
  const [loading, setLoading] = useState(true);
  const screenWidth           = Dimensions.get('window').width;

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
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchHum();
    return () => { mounted = false; };
  }, []);

  if (loading || !latest) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#3F7D58" />
      </View>
    );
  }

  // 0~1 사이로 clamp
  const raw = latest.humidity / 100;
  const progress = Math.min(Math.max(raw, 0), 1);

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>실시간 습도</Text>
      <Progress.Circle
        size={screenWidth * 0.4}
        progress={progress}
        thickness={12}
        showsText={true}
        formatText={() => `${(progress * 100).toFixed(1)}%`}
        color="#4FB1A0"
        unfilledColor="#e0e0e0"
        borderWidth={0}
      />
      <Text style={styles.timestamp}>
        {new Date(latest.timeLine).toLocaleTimeString('ko-KR', {
          hour: '2-digit',
          minute: '2-digit'
        })}
      </Text>
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
    alignItems: 'center',
    // iOS shadow
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width:0, height:2 },
    // Android elevation
    elevation: 3,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#3F7D58',
    marginBottom: 8,
  },
  timestamp: {
    marginTop: 8,
    fontSize: 12,
    color: '#666',
  },
});
