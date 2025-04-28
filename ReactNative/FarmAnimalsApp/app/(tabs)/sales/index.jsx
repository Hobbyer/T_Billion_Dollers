import React, { useState, useEffect } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useLocalSearchParams } from 'expo-router';

import SalesInfoScreen from './info';
import ItemManageScreen from './items';
import OrdersInfoScreen from './orders';
import MembersInfoScreen from './members';

const Tab = createMaterialTopTabNavigator();

export default function SalesManageScreen() {
  const { initialTab } = useLocalSearchParams(); // URL 파라미터 읽기
  const [currentTab, setCurrentTab] = useState('info'); // 기본 탭

  useEffect(() => {
    if (initialTab === 'items') setCurrentTab('items');
    else if (initialTab === 'orders') setCurrentTab('orders');
    else if (initialTab === 'members') setCurrentTab('members');
    else setCurrentTab('info');
  }, [initialTab]);

  return (
    <Tab.Navigator
      initialRouteName={currentTab}
      screenOptions={{
        unmountOnBlur: true,
        swipeEnabled: true,
        tabBarScrollEnabled: true,
        tabBarIndicatorStyle: { backgroundColor: '#3F7D58' },
        tabBarLabelStyle: { fontSize: 12, textTransform: 'none' },
        tabBarItemStyle: { width: 100 },
      }}
    >
      <Tab.Screen name="info" component={SalesInfoScreen} options={{ tabBarLabel: '매출정보' }} />
      <Tab.Screen name="items" component={ItemManageScreen} options={{ tabBarLabel: '상품관리' }} />
      <Tab.Screen name="orders" component={OrdersInfoScreen} options={{ tabBarLabel: '주문정보' }} />
      <Tab.Screen name="members" component={MembersInfoScreen} options={{ tabBarLabel: '회원정보' }} />
    </Tab.Navigator>
  );
}
