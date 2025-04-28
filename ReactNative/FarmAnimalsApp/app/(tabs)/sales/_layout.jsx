// app/sales/_layout.jsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Stack } from 'expo-router';

import SalesManageScreen from './index';

const stack = createNativeStackNavigator();

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
