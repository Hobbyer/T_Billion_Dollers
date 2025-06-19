// src/apis/CRUD.js

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Platform } from 'react-native';

/**
 * Android 에뮬레이터에서는 PC의 localhost를 10.0.2.2로 바라봐야 합니다.
 * iOS 시뮬레이터나 expo-web, 실제 기기(같은 와이파이망)에서는
 * 로컬호스트 또는 PC의 LAN IP(예: 192.168.204.19)를 쓸 수 있습니다.
 */
// const HOST =
//   Platform.OS === 'android'
//     ? '10.0.2.2'      // Android Emulator → PC localhost
//     : 'localhost';    // iOS Simulator / Expo Web / 실제 기기(테스트용)

// /** 
//  * 백엔드는 반드시 8080 포트(스프링부트 기본)에서 실행되어 있어야 합니다. 
//  * axios 인스턴스를 한 번만 생성해 두면 편합니다.
//  */
// export const api = axios.create({
//   baseURL: `http://${HOST}:8080`,
//   timeout: 5000,
// });

export const baseURL =
 Platform.OS === 'android'
 ? "http://10.0.2.2:8080"
 : "http://192.168.204.19:8080"; // PC의 LAN IP (테스트용)

// 편의 함수: POST('/auth/login', data)
export async function POST(path, data = {}) {
  try {
    const token = await AsyncStorage.getItem('accessToken');
    const response = await axios.post(path, data, {
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
        'Content-Type': 'application/json',
      },
    });
    return response.data;  // ? 추가: 호출한 쪽에서 바로 응답 data를 쓸 수 있게
  } catch (error) {
    console.error('POST 요청 에러 ?', error);
    throw error;
  }
}

export async function GET(path) {
  const token = await AsyncStorage.getItem('accessToken');
  console.log('accessToken',token);
  
  return axios.get(path, {
    headers: { Authorization: token ? `Bearer ${token}` : '' }
  });
}

export async function PUT(path, data) {
  const token = await AsyncStorage.getItem('accessToken');
  return axios.put(path, data, {
    headers: { Authorization: token ? `Bearer ${token}` : '' }
  });
}

export async function DEL(path) {
  const token = await AsyncStorage.getItem('accessToken');
  return axios.delete(path, {
    headers: { Authorization: token ? `Bearer ${token}` : '' }
  });
}
