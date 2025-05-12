import { StyleSheet, Text, View } from 'react-native'
import InfoCard from '../common/InfoCard'
import { useDispatch, useSelector } from 'react-redux'
import { Ionicons } from '@expo/vector-icons';
import { useEffect } from 'react';
import { fetchSensorData } from '../../redux/sensorSlice';

const SensorCard = () => {
  const dispatch = useDispatch();
  const sensor = useSelector(state=>state.sensor)

  useEffect(()=>{
    dispatch(fetchSensorData());
  },[dispatch])

  if (sensor.loading) return <InfoCard label="센서 데이터" value="로딩 중..." />;
  if (sensor.error) return <InfoCard label="센서 데이터" value="에러 발생" />

  return (
    <InfoCard 
      icon={<Ionicons 
        name="thermometer" 
        size={24} color="#ffffff" 
      />} 
      label="센서 데이터" 
      value={`${sensor.temperature?.temp}℃/ ${sensor.humidity?.humidity || '-'}% `} />
  )
}

export default SensorCard

const styles = StyleSheet.create({})