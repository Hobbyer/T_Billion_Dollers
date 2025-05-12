import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import InfoCard from '../common/InfoCard'
import { Ionicons } from '@expo/vector-icons'

const AlertCard = () => {
  // 모션 감지 데이터 테이블 저장 필요
  return (
    <InfoCard 
      icon = {<Ionicons 
        name="notifications" 
        size={24} 
        color="#ffffff" 
      />} 
      label="알림" 
      value="3건" 
    />
  )
}

export default AlertCard

const styles = StyleSheet.create({})