// app/sales/_layout.jsx
import React from 'react';
import { Stack } from 'expo-router';

export default function SalesLayout() {
  return (
    <Stack
      screenOptions={{
        headerTitleAlign: 'center',
        headerStyle: { backgroundColor: '#fff' },
      }}
    >
      <Stack.Screen name="index" options={{ title: 'Sales' }} />
      <Stack.Screen name="details" options={{ title: 'Sales Details' }} />
    </Stack>
  );
}
