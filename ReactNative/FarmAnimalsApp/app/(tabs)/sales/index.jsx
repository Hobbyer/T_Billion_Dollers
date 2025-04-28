import React, { useState, useEffect } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useLocalSearchParams } from 'expo-router'; // ✨ 추가

import SalesInfoScreen from './info';
import ItemManageScreen from './items';
import OrdersInfoScreen from './orders';
import MembersInfoScreen from './members';

const Tab = createMaterialTopTabNavigator();

export default function SalesManageScreen() {
  const { initialTab } = useLocalSearchParams(); // ✨ URL 파라미터 읽기
  const [initialRoute, setInitialRoute] = useState('info'); // 기본은 'info'

  useEffect(() => {
    // 🔥 initialTab에 따라 초기 탭 설정
    if (initialTab === 'items') setInitialRoute('items');
    else if (initialTab === 'orders') setInitialRoute('orders');
    else if (initialTab === 'members') setInitialRoute('members');
    else setInitialRoute('info');
  }, [initialTab]);

  return (
    <Tab.Navigator
      initialRouteName={initialRoute} // ✨ 여기 추가!
      screenOptions={{
        unmountOnBlur: true,
        tabBarScrollEnabled: true,
        tabBarIndicatorStyle: { backgroundColor: '#3F7D58' },
        tabBarLabelStyle: { fontSize: 12, textTransform: 'none' },
        tabBarItemStyle: { width: 100 },
        swipeEnabled: true,
      }}
    >
      <Tab.Screen name="info" component={SalesInfoScreen} options={{ tabBarLabel: '매출정보' }} />
      <Tab.Screen name="items" component={ItemManageScreen} options={{ tabBarLabel: '상품관리' }} />
      <Tab.Screen name="orders" component={OrdersInfoScreen} options={{ tabBarLabel: '주문정보' }} />
      <Tab.Screen name="members" component={MembersInfoScreen} options={{ tabBarLabel: '회원정보' }} />
    </Tab.Navigator>
  );
}
