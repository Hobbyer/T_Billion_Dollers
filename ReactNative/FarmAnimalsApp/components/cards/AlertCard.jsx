import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import InfoCard from '../common/InfoCard'
import { Ionicons } from '@expo/vector-icons'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSensorData } from '../../redux/sensorSlice'

const AlertCard = () => {
  // 모션 감지 데이터 테이블 저장 필요
  const dispatch = useDispatch();
  const motions = useSelector((state) => state.sensor.motion);

  useEffect(()=>{
    dispatch(fetchSensorData());
  }, [dispatch]);

  if (motions.loading) return <InfoCard label="모션 감지" value="로딩 중..." />;
  if (motions.error) return <InfoCard label="모션 감지" value="에러 발생" />;

  return (
    <InfoCard 
      icon = {<Ionicons 
        name="notifications" 
        size={24} 
        color="#ffffff" 
      />} 
      label="알림" 
      value={`${motions}건`}
    />
  )
}

export default AlertCard

const styles = StyleSheet.create({})