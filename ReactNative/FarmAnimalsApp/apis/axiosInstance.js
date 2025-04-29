// src/apis/axiosInstance.js

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const baseURL = "http://10.0.2.2:8080";

const api = axios.create({
  baseURL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.log('accessToken 만료! 리프레시 필요');
      // 여기서 자동 토큰 재발급 가능
    }
    return Promise.reject(error);
  }
);

export default api;
