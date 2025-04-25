import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { FontAwesome } from "@expo/vector-icons";


const TabLayout = () => {
  return (
    <Tabs
    screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: '#2f95dc',
    }}
  >
    <Tabs.Screen
      name="(home)"
      options={{
        title: 'Home',
        tabBarIcon: ({ color, size }) => <FontAwesome name="home" size={size} color={color} />,
      }}
    />
    <Tabs.Screen
      name="stock"
      options={{
        title: 'Farm',
        tabBarIcon: ({ color, size }) => (
          <FontAwesome name="tree" size={size} color={color} />
        ),
      }}
    />
    <Tabs.Screen
      name="sales"
      options={{
        title: 'Sales',
        tabBarIcon: ({ color, size }) => <FontAwesome name="money" size={size} color={color} />,
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