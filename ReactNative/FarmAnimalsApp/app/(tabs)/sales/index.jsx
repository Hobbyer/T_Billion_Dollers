import React, { useState, useEffect } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useLocalSearchParams } from "expo-router";

import SalesInfoScreen from "./info";
import ItemManageScreen from "./items";
import OrdersInfoScreen from "./orders";
import MembersInfoScreen from "./members";

export default function SalesManageScreen() {
  const Tab = createMaterialTopTabNavigator();
  const { initialTab } = useLocalSearchParams(); // URL 파라미터 읽기
  const [currentTab, setCurrentTab] = useState("info"); // 기본 탭

  useEffect(() => {
    if (initialTab === "items") setCurrentTab("items");
    else if (initialTab === "orders") setCurrentTab("orders");
    else if (initialTab === "members") setCurrentTab("members");
    else setCurrentTab("info");
  }, [initialTab]);

  return (
    <Tab.Navigator
      initialRouteName={currentTab}
      screenOptions={{
        unmountOnBlur: true,
        swipeEnabled: true,
        tabBarScrollEnabled: false,
        tabBarActiveTintColor: "#2E7D32",
        tabBarInactiveTintColor: "#888",
        tabBarPressColor: "transparent",
        tabBarLabelStyle: {
          fontSize: 14,
          fontWeight: "bold",
          textTransform: "none",
        },
        tabBarItemStyle: {
          paddingVertical: 10,
        },
        tabBarIndicatorStyle: {
          backgroundColor: "#2E7D32",
          height: 3,
          borderRadius: 2,
        },
        tabBarStyle: {
          backgroundColor: "#F1F8E9", // 연초록 배경
          borderBottomColor: "#C8E6C9",
          borderBottomWidth: 1,
          shadowColor: "#000",
          shadowOpacity: 0.05,
          shadowOffset: { width: 0, height: 2 },
          elevation: 4,
        },
      }}
    >
      <Tab.Screen
        name="info"
        component={SalesInfoScreen}
        options={{ tabBarLabel: "매출정보" }}
      />
      <Tab.Screen
        name="items"
        component={ItemManageScreen}
        options={{ tabBarLabel: "상품관리" }}
      />
      <Tab.Screen
        name="orders"
        component={OrdersInfoScreen}
        options={{ tabBarLabel: "주문정보" }}
      />
      <Tab.Screen
        name="members"
        component={MembersInfoScreen}
        options={{ tabBarLabel: "회원정보" }}
      />
    </Tab.Navigator>
  );
}
