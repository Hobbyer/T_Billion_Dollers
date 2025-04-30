// app/sales/_layout.jsx
import React from 'react';
import { Stack } from 'expo-router';

export default function SalesLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" /> {/* sales 메인 */}
    </Stack>
  );
}
