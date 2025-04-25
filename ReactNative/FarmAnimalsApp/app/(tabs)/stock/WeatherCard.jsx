// app/stock/WeatherCard.jsx

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import Constants from 'expo-constants';

const {
  extra: { WEATHER_KEY, LAT, LON } = {},
} = Constants.expoConfig || {};

export default function WeatherCard() {
  const [today, setToday]     = useState(null);
  const [forecast, setForecast] = useState([]);

  // useEffect(() => {
  //   async function fetchWeather() {
  //     try {
  //       const tRes = await fetch(
  //         `https://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LON}&appid=${WEATHER_KEY}&units=metric&lang=kr`
  //       );
  //       const tJson = await tRes.json();
  //       setToday(tJson);

  //       const fRes = await fetch(
  //         `https://api.openweathermap.org/data/2.5/forecast?lat=${LAT}&lon=${LON}&appid=${WEATHER_KEY}&units=metric&lang=kr`
  //       );
  //       const fJson = await fRes.json();
  //       const daily = fJson.list.filter((_,i) => i % 8 === 0).slice(0,5);
  //       setForecast(daily);
  //     } catch (e) {
  //       console.error(e);
  //     }
  //   }
  //   fetchWeather();
  // }, []);

  if (!today) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#3F7D58" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* 오늘 날씨 */}
      <View style={styles.current}>
        <Text style={styles.city}>{today.name}</Text>
        <Image
          style={styles.icon}
          source={{
            uri:`https://openweathermap.org/img/wn/${today.weather[0].icon}@2x.png`
          }}
        />
        <Text style={styles.desc}>{today.weather[0].description}</Text>
        <Text style={styles.temp}>{today.main.temp.toFixed(1)}°C</Text>
      </View>
      {/* 5일 예보 */}
      <FlatList
        data={forecast}
        keyExtractor={(_,i)=>i.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.forecastList}
        renderItem={({ item, index })=>{
          const d = new Date(item.dt_txt);
          const label = index === 0
            ? '내일'
            : d.toLocaleDateString('ko-KR', { month:'numeric', day:'numeric' });
          return (
            <View style={styles.dayBox}>
              <Text style={styles.dayLabel}>{label}</Text>
              <Image
                style={styles.dayIcon}
                source={{
                  uri:`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`
                }}
              />
              <Text style={styles.dayTemp}>{item.main.temp.toFixed(1)}°C</Text>
              <Text style={styles.dayHum}>{item.main.humidity}%</Text>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  loading:      { flex:1, justifyContent:'center', alignItems:'center' },
  container:    { flexDirection:'row', padding:16, backgroundColor:'#fff', alignItems:'center' },
  current:      { flex:1, alignItems:'center' },
  city:         { fontSize:18, fontWeight:'bold' },
  icon:         { width:60, height:60 },
  desc:         { fontSize:14, marginVertical:4 },
  temp:         { fontSize:16, fontWeight:'600' },
  forecastList: { paddingLeft:16 },
  dayBox:       { alignItems:'center', marginRight:16 },
  dayLabel:     { fontSize:14, fontWeight:'500', marginBottom:4 },
  dayIcon:      { width:40, height:40 },
  dayTemp:      { fontSize:14, marginTop:4 },
  dayHum:       { fontSize:12, color:'#666' },
});
