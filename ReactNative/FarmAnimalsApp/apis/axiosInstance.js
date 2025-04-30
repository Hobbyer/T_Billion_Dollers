// src/apis/axiosInstance.js
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { refreshAccessToken } from './testcrud'; // refresh 토큰을 갱신하는 함수
import { useNavigation } from '@react-navigation/native'; // 네비게이션을 이용해 로그인 화면으로 이동


const axiosInstance = axios.create({
  baseURL: 'http://10.0.2.2:8080', // 기본 API 주소
  timeout: 5000,
});

// 요청 인터셉터: 모든 요청에 자동으로 accessToken 추가
axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터: 401 Unauthorized 에러 발생 시 refreshToken을 사용하여 자동으로 accessToken 갱신
axiosInstance.interceptors.response.use(
  (response) => response,  // 응답이 정상일 경우 바로 반환
  async (error) => {
    const originalRequest = error.config;
    const navigation = useNavigation(); // 네비게이션 사용

    // 401 에러가 발생하고, 재시도하지 않은 경우
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // refreshToken을 가져와서 새 accessToken 발급 시도
        const refreshToken = await AsyncStorage.getItem('refreshToken');
        const response = await refreshAccessToken(refreshToken);

        const newAccessToken = response.accessToken;
        await AsyncStorage.setItem('accessToken', newAccessToken);

        // 새로운 accessToken으로 원래 요청 재발송
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest); // 재요청
      } catch (refreshError) {
        console.error('리프레시 토큰 실패', refreshError);

        // 리프레시 토큰도 실패하면 로그아웃 처리
        await AsyncStorage.removeItem('accessToken');
        await AsyncStorage.removeItem('refreshToken');

        Alert.alert('로그아웃', '세션이 만료되었습니다. 다시 로그인 해주세요.');

        // 로그인 화면으로 리디렉션
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error); // 다른 에러들은 그대로 처리
  }
);

export default axiosInstance;
