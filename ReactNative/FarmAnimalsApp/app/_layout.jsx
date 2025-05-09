import React, { useEffect, useState } from "react";
import { Stack, router } from "expo-router";
import { SafeAreaView, ActivityIndicator, View } from "react-native";
import { AuthProvider } from "../contexts/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function RootLayout() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await AsyncStorage.getItem("accessToken");
        console.log(token);
        
        if (!token) {
          console.log(11111);
          
          // router.replace("/auth/login"); // 로그인 화면으로 이동
        }
      } catch (e) {
        console.error("토큰 확인 중 오류", e);
        router.replace("/auth/login");
      } finally {
        setIsLoading(false); // 로딩 완료
      }
    };

    checkAuth();
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#3F7D58" />
      </View>
    );
  }

  return (
    <AuthProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <Stack
          screenOptions={{
            headerShown: false,
            animation: "slide_from_right",
          }}
        />
      </SafeAreaView>
    </AuthProvider>
  );
}
