import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { usePathname, useRouter } from "expo-router";
import { ActivityIndicator, View } from "react-native";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // 초기엔 null
  const router = useRouter();
  const pathname = usePathname(); // 현재 pathname을 가져옴
  
  const checkTokenExpiration = (token) => {
    try {
      const decoded = jwtDecode(token);
      const now = Math.floor(Date.now() / 1000); // 초 단위
      return decoded.exp < now; // 만료되었으면 true 반환
    } catch (e) {
      console.error("토큰 디코딩 실패:", e);
      return true; // 디코딩 실패도 만료로 간주
    }
  };

  const checkLogin = async () => {
  // 저장소에서 accessToken 가져오기
  const token = await AsyncStorage.getItem("accessToken");
  const refreshToken = await AsyncStorage.getItem("refreshToken");

  // 토큰이 존재하면 만료 여부 검사, 없으면 만료된 것으로 간주
  const isTokenExpired = token ? checkTokenExpiration(token) : true;
  const isRefreshExpired = refreshToken ? checkTokenExpiration(refreshToken) : true;

  // 토큰이 없거나 만료되었을 경우
  if (!token || isTokenExpired) {
    // 인증 상태를 false로 설정
    setIsAuthenticated(false);

    // 현재 경로가 /auth로 시작하지 않으면 로그인 페이지로 이동
    if (!pathname.startsWith("/auth")) {
      router.replace("/auth/login");
    }

    return; // 더 이상 실행하지 않고 종료
  }

  // 토큰이 유효한 경우 인증 상태를 true로 설정
  setIsAuthenticated(true);

  // 이미 로그인되어 있는데 경로가 로그인 페이지일 경우, 홈으로 리디렉션
  if (pathname === "/auth/login") {
    router.replace("/");
  }
};


  useEffect(() => {
    if (pathname) {
      checkLogin();
    }
  }, [pathname]);

  // useEffect(() => {
  //   const checkLogin = async () => {
  //     const token = await AsyncStorage.getItem("accessToken");
  //     console.log('@@' + token)
  //     const isTokenExpired = token ? checkTokenExpiration(token) : true;
  
  //     if (!token || isTokenExpired) {
  //       console.log('아직 로그인 안됨')
  //       // 로그아웃 처리
  //       setIsAuthenticated(false);
  
  //       // 이미 auth 페이지면 이동할 필요 없음
  //       if (!pathname.startsWith("/auth")) {
  //         router.replace("/auth/login");
  //       }
  
  //       return; // 이후 코드 실행 막기
  //     }
  
  //     // 로그인 상태
  //     setIsAuthenticated(true);
  
  //     // 로그인 상태인데 로그인 페이지에 있을 경우만 홈으로 이동
  //     if (pathname === "/auth/login") {
  //       router.replace("/");
  //     }
  //   };
  
  //   if (pathname) {
  //     checkLogin();
  //   }
  // }, [pathname]);
  

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, checkLogin }}>
      {isAuthenticated === null ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" />
        </View>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
