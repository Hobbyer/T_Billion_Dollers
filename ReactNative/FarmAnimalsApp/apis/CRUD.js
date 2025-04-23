// apis/CRUD.js
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';

// 1) Expo 앱 설정(app.json)의 extra.apiUrl에 API URL을 넣어두면 편리합니다.
//    app.json 예시:
//    {
//      "expo": {
//        "extra": {
//          "apiUrl": "http://192.168.0.10:8080/api"
//        }
//      }
//    }
const API_URL = Constants.manifest?.extra?.apiUrl || 'http://10.0.2.2:8080';

const api = axios.create({
  baseURL: API_URL,
  // timeout: 5000,
});

// 2) 요청 전마다 AsyncStorage에서 토큰을 꺼내 헤더에 자동으로 붙여줍니다.
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

// 3) CRUD 유틸 함수
export const GET = (path) => api.get(path);
export const POST = (path, data) => api.post(path, data);
export const PUT = (path, data) => api.put(path, data);
export const DELETE = (path) => api.delete(path);
