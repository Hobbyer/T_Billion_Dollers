import axios from "axios";
import { jwtDecode } from "jwt-decode";

// 액세스 토큰 갱신 임계치 (10초 미만이면 갱신)
const ACCESS_TOKEN_EXPIRATION_THRESHOLD = 10 * 1000; // 10초
const REFRESH_TOKEN_EXPIRATION_THRESHOLD = 60 * 1000; // 1분

// 토큰 만료까지 남은 시간을 계산하는 함수
export const getTokenRemainingTime = (token) => {
  if (!token) return 0;
  try {

    const decode = jwtDecode(token);
    const exp = decode.exp * 1000; // exp는 초 단위로 되어 있으므로 밀리초로 변환
    const now = Date.now();

    return exp - now; // 남은 시간 (밀리초 단위)

  } catch (error) {

    console.error("토큰 디코딩 오류:", error);

    return 0; // 오류 발생 시 남은 시간을 0으로 설정

  }
};

// 토큰 갱신 함수
export const refreshTokenIfNeeded = async () => {
  const accessToken = sessionStorage.getItem("accessToken");
  const refreshToken = sessionStorage.getItem("refreshToken");

  // 토큰이 없으면 아무 작업도 하지 않음.
  if (!accessToken || !refreshToken) return;

  const remaingTime = getTokenRemainingTime(accessToken);

  // 남은 시간이 임계치보다 적으면 갱신 시도
  if (remaingTime < ACCESS_TOKEN_EXPIRATION_THRESHOLD) {
    try {
      // 리프레시 토큰 API 호출
      const response = await axios.post("/api/auth/refresh", {refreshToken});

      // 새 토큰 정보를 세션스토리지에 업데이트
      sessionStorage.setItem("accessToken", response.data.accessToken);
      sessionStorage.setItem("refreshToken", response.data.refreshToken);
      
      console.log("토큰 갱신 성공:");

    } catch (error) {
      alert("로그인 정보가 만료되었습니다. 다시 로그인 해주세요.");

      // 갱신 실패 시 로그아웃 처리 (예: 세션 스토리지 초기화)
      sessionStorage.removeItem("accessToken");
      sessionStorage.removeItem("refreshToken");

    }
  }
};

// 주기적으로 토큰 갱신을 체크하는 함수
export const startTokenRefreshScheduler = () => {
  setInterval(() => {
    refreshTokenIfNeeded();
  }, 3000); // 3초마다 체크
}

