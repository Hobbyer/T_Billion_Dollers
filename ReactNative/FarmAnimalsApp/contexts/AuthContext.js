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
    const token = await AsyncStorage.getItem("accessToken");
    const isTokenExpired = token ? checkTokenExpiration(token) : true;

    if (!token || isTokenExpired) {
      setIsAuthenticated(false);
      if (!pathname.startsWith("/auth")) {
        router.replace("/auth/login");
      }
      return;
    }

    setIsAuthenticated(true);
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
