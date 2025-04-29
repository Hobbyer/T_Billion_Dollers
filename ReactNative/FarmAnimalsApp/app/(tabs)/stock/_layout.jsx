// app/stock/_layout.jsx

import React from 'react';
import { Stack } from 'expo-router';

export default function StockLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        headerTitleAlign: 'center',
        headerStyle: { backgroundColor: '#fff' },
      }}
    >
      {/* 이 “index”가 /stock 의 진입점이 됩니다 */}
      <Stack.Screen 
        name="index" 
        options={{ title: 'Farm Status' }} 
      />
      {/* 
        필요하다면 /stock 아래에 추가적인 페이지를
        Stack.Screen 으로 여기에 선언 가능합니다.
      */}
    </Stack>
  );
}
