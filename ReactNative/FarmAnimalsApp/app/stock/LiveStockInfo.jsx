// app/stock/LiveStockInfo.jsx

import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import LiveStockTemperature from './LiveStockTemperature';
import LiveStockHumidity    from './LiveStockHumidity';
import TemperatureCard      from './TemperatureCard';
import HumidityCard         from './HumidityCard';
import WeatherCard          from './WeatherCard';

export default function LiveStockInfo() {
  return (
    <ScrollView>
      <View style={s.row}>
        <View style={s.chartBox}>
          <TemperatureCard />
          <LiveStockTemperature />
        </View>
        <View style={s.statusBox}>
          <HumidityCard />
        </View>
      </View>

      <View style={s.bottomRow}>
        <View style={s.humidityBox}>
          <LiveStockHumidity />
        </View>
        <View style={s.weatherBox}>
          <WeatherCard />
        </View>
      </View>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  container:    { padding: 16, backgroundColor: '#fff' },
  row:          { flexDirection: 'row', marginBottom: 16 },
  chartBox:     { flex: 2, marginRight: 8 },
  statusBox:    { flex: 1 },
  bottomRow:    { flexDirection: 'row' },
  humidityBox:  { flex: 1, marginRight: 8 },
  weatherBox:   { flex: 2 },
});
