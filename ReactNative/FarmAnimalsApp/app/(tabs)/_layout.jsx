import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import { Platform } from "react-native";


const TabLayout = () => {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarShowLabel: true,
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
          marginBottom: 4,
        },
        tabBarIconStyle: {
          marginTop: Platform.OS === 'ios' ? 4 : 0,
        },
        tabBarActiveTintColor: '#2E7D32',
        tabBarInactiveTintColor: '#A0A0A0',
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: '#ffffff',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          shadowColor: '#000',
          shadowOpacity: 0.1,
          shadowOffset: { width: 0, height: -6 },
          shadowRadius: 16,
          elevation: 20,
          height: 72,
        },
        headerShown: false,
      })}
    >
    <Tabs.Screen
        name="(home)"
        options={{
          title: '홈',
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome5
              name="home"
              size={focused ? 24 : 20}
              color={color}
            />
          ),
        }}
      />
    <Tabs.Screen
      name="stock"
      options={{
        title: 'Farm',
        tabBarIcon: ({ color, focused }) => (
          <FontAwesome5
            name="seedling"
            size={focused ? 22 : 18}
            color={color}
          />
        ),
      }}
    />
    <Tabs.Screen
      name="sales"
      options={{
        title: 'Sales',
        tabBarIcon: ({ color, focused }) => (
          <MaterialCommunityIcons
            name="chart-bar"
            size={focused ? 26 : 22}
            color={color}
          />
        ),
      }}
    />
    {/* <Tabs.Screen
      name="login"
      options={{
        title: 'Login',
        // 로그인 화면은 탭 버튼 숨기기
        tabBarIcon: ({ color, size }) => <FontAwesome name="arrow-circle-up" size={size} color={color} />,
      }}
    /> */}
  </Tabs>
  )
}

export default TabLayout

const styles = StyleSheet.create({})