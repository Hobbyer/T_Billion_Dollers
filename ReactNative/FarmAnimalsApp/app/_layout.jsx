// app/_layout.jsx

import React, { useEffect, useState } from "react";
import { Stack } from "expo-router";
import { SafeAreaView, ActivityIndicator, View } from "react-native";
import { AuthProvider } from "../contexts/AuthContext";

export default function RootLayout() {

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
