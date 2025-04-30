import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {jwtDecode} from 'jwt-decode';
import { StyleSheet, View, Text, Pressable, Alert } from 'react-native';
import { refreshAccessToken } from '../../apis/auth'; // 정확한 경로에 맞게 수정


const TokenRemainButton = () => {
  const [remaining, setRemaining] = useState(null);

  const updateRemainingTime = async () => {
    const token = await AsyncStorage.getItem('accessToken');
    
    if (!token) {
      setRemaining('토큰 없음');
      return;
    }

    try {
      const decoded = jwtDecode(token);
      const now = Math.floor(Date.now() / 1000);
      const exp = decoded.exp;
      const diff = exp - now;

      if (diff <= 0) {
        setRemaining('만료됨');
      } else {
        const min = Math.floor(diff / 60);
        const sec = diff % 60;
        setRemaining(`${min}분 ${sec}초 남음`);
      }
    } catch (e) {
      console.error('토큰 디코딩 실패', e);
      setRemaining('유효하지 않은 토큰');
    }
  };

  useEffect(() => {
    updateRemainingTime();
    const interval = setInterval(updateRemainingTime, 1000);
    return () => clearInterval(interval);
  }, []);

   // "연장하기" 버튼 눌렀을 때 실행
   const handleRefresh = async () => {
    try {
      const refreshToken = await AsyncStorage.getItem('refreshToken');
      if (!refreshToken) {
        throw new Error('refreshToken 없음');
      }

      // refreshAccessToken은 refreshToken을 받아 accessToken을 새로 반환해야 함
      const response = await refreshAccessToken(refreshToken);
      console.log(response);
      
      if (!response || !response.accessToken) {
        throw new Error('응답에서 accessToken 없음');
      }

      const newAccessToken = response.accessToken;

      await AsyncStorage.setItem('accessToken', newAccessToken);
      await updateRemainingTime();

      Alert.alert('성공', 'AccessToken이 연장되었습니다.');
    } catch (e) {
      console.error('리프레시 실패', e);
      Alert.alert('실패', 'AccessToken 연장 실패');
    }
  };
  return (
    <View style={{ padding: 20 }}>
    <Text style={{ fontSize: 16, marginBottom: 10 }}>
      남은 시간: {remaining}
    </Text>

    <Pressable
      onPress={handleRefresh}
      style={{
        padding: 10,
        backgroundColor: '#3F7D58',
        borderRadius: 8,
        alignItems: 'center',
      }}
    >
      <Text style={{ color: 'white' }}>연장하기</Text>
    </Pressable>
  </View>
  )
}

export default TokenRemainButton

const styles = StyleSheet.create({})