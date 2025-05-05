import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-web'
import { Stack } from 'expo-router'

const AppLayout = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack screenOptions={{ headerShown: false }} />
    </SafeAreaView>
  )
}

export default AppLayout

const styles = StyleSheet.create({})