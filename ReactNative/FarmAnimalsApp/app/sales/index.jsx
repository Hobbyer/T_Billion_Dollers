import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import SalesInfoScreen        from './info';
import ItemManageScreen       from './items';
import OrdersInfoScreen       from './orders';
import MembersInfoScreen      from './members';

const Tab = createMaterialTopTabNavigator();

export default function SalesManageScreen() {
  return (
    <Tab.Navigator
      screenOptions={{
        unmountOnBlur: true,
        tabBarScrollEnabled: true,
        tabBarIndicatorStyle: { backgroundColor: '#3F7D58' },
        tabBarLabelStyle: { fontSize: 12, textTransform: 'none' },
        tabBarItemStyle: { width: 100 },
      }}
    >
      <Tab.Screen name="info"    component={SalesInfoScreen}      options={{ tabBarLabel: '매출정보' }} />
      <Tab.Screen name="items"   component={ItemManageScreen}     options={{ tabBarLabel: '상품관리' }} />
      <Tab.Screen name="orders"  component={OrdersInfoScreen}     options={{ tabBarLabel: '주문정보' }} />
      <Tab.Screen name="members" component={MembersInfoScreen}    options={{ tabBarLabel: '회원정보' }} />
    </Tab.Navigator>
  );
}
