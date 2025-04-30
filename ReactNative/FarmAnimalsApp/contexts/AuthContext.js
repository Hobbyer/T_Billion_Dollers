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

  useEffect(() => {
    const checkLogin = async () => {
      const token = await AsyncStorage.getItem("accessToken");
      if (!token) {
        setIsAuthenticated(false);
        if (!pathname.startsWith("/auth")) {
          router.replace("/auth/login"); // 비로그인 시 로그인 화면으로
        }
      } else {
        setIsAuthenticated(true);
        if (pathname === "/auth/login") {
          router.replace("/"); // 로그인 상태인데 로그인 페이지면 홈으로
        }

        // 추가적으로 만료된 토큰이 아닌지 체크하고 만료되었으면 로그인으로 리다이렉트
        const isTokenExpired = await checkTokenExpiration(token);
        if (isTokenExpired) {
          setIsAuthenticated(false);
          router.replace("/auth/login"); // 만료된 토큰이면 로그인 페이지로
        }
      }
    };

    // `pathname`이 준비될 때까지 기다리기
    if (pathname) {
      checkLogin();
    }
  }, [pathname]); // `pathname`이 변경될 때마다 호출

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
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
