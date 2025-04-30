// src/apis/user.js

import axiosInstance from './axiosInstance';

// 사용자 정보 가져오기 (accessToken을 사용하여 인증된 사용자 정보 요청)
export const getUserInfoFromApi = async () => {
  try {
    const response = await axiosInstance.get('/auth/me'); // /auth/me는 인증된 사용자 정보 API
    return response.data;
  } catch (error) {
    console.error('사용자 정보 가져오기 실패:', error);
    throw error;
  }
};
