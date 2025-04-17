import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL;

export const SEARCH_GET = (url) => {
  const result = axios.get(`${baseURL}/farmdas${url}`);
  return result;
};
