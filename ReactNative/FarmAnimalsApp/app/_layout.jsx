// app/_layout.jsx

import React, { useEffect } from "react";
import { Stack, Tabs, useRouter } from "expo-router";
import { SafeAreaView, StatusBar, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function RootLayout() {

  const router = useRouter();

  useEffect(() => {
    // 앱 시작 시 로그인 여부를 체크
    const checkLoginStatus = async () => {
      const accessToken = await AsyncStorage.getItem("accessToken");

      if (!accessToken) {
        // 로그인하지 않은 경우 로그인 화면으로 리디렉션
        router.push("/auth/login"); // 로그인 화면으로 이동
      }
    };

    checkLoginStatus();
  }, []);

  
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: "slide_from_right",
        }}
      />

      <StatusBar style="auto" translucent={false} />
    </SafeAreaView>
  );
}
