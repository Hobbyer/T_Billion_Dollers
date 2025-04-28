// app.config.js
import dotenv from 'dotenv';

// .env 파일을 로드합니다.
dotenv.config();

export default {
  expo: {
    name: "FarmAnimalsApp",
    slug: "FarmAnimalsApp",
    extra: {
      WEATHER_KEY: process.env.WEATHER_API_KEY, // .env 파일에서 값 읽기
      LAT: process.env.LAT,
      LON: process.env.LON
    }
  }
};
