import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SalesManageScreen        from './index';

const Stack = createNativeStackNavigator();

export default function SalesLayout() {
  return (
    <Stack.Navigator screenOptions={{ headerTitleAlign: 'center' }}>
      <Stack.Screen name="index"   component={SalesManageScreen}         options={{ title: 'Sales 관리' }} />
    </Stack.Navigator>
  );
}
