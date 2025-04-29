// src/apis/crud.js

import axiosInstance from './axiosInstance';

// POST 요청 함수
export const POST_API = (path, data = {}) => {
  return axiosInstance.post(path, data).then(res => res.data);
};

// GET 요청 함수
export const GET_API = (path) => {
  return axiosInstance.get(path).then(res => res.data);
};

// PUT 요청 함수
export const PUT_API = (path, data = {}) => {
  return axiosInstance.put(path, data).then(res => res.data);
};

// DELETE 요청 함수
export const DEL_API = (path) => {
  return axiosInstance.delete(path).then(res => res.data);
};


