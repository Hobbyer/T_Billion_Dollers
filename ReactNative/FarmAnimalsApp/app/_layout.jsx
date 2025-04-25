// app/_layout.jsx

import React from "react";
import { Stack, Tabs } from "expo-router";
import { SafeAreaView, StatusBar } from "react-native";

export default function RootLayout() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack screenOptions={{ headerShown: false }} />
      <StatusBar style="auto" translucent={false} />
    </SafeAreaView>
  );
}
