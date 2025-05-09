// src/apis/auth.js

import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosInstance from './axiosInstance';


// 로그인 요청 (로그인 성공 시 accessToken, refreshToken 반환)
export const login = async (loginForm) => {
  try {
    // 직접 axiosInstance.post를 사용
    const response = await axiosInstance.post('/auth/login', loginForm); // 수정된 부분
    const { accessToken, refreshToken } = response.data;
    console.log(accessToken, refreshToken);

    // 로그인 성공 시 토큰을 AsyncStorage에 저장
    await AsyncStorage.setItem('accessToken', accessToken);
    await AsyncStorage.setItem('refreshToken', refreshToken);

    return response.data; // 성공한 데이터를 반환
  } catch (error) {
    console.error('로그인 실패:', error);
    throw error; // 실패 시 에러 반환
  }
};

// accessToken 갱신 (refreshToken을 사용하여 새 accessToken 발급)
export const refreshAccessToken = async (refreshToken) => {
  try {
    const response = await axiosInstance.post('/auth/refresh', { refreshToken }); // 수정된 부분
    console.log(response.data);
    
    return response.data; // 갱신된 토큰 반환
  } catch (error) {
    console.log(444)
    console.error('리프레시 토큰 실패:', error);
    throw error; // 리프레시 토큰 실패 시 에러 반환
  }
};


