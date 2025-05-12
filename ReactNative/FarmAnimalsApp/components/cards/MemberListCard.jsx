import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import InfoCard from '../common/InfoCard'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMembers } from '../../redux/memberSlice'
import { MaterialCommunityIcons } from '@expo/vector-icons'

const MemberListCard = () => {
  const dispatch =  useDispatch();
  const memberlist =  useSelector(state=>state.members.list)

  useEffect(()=>{
    dispatch(fetchMembers());
  },[dispatch])

  return (
  <InfoCard 
    icon={
    <MaterialCommunityIcons      
      name="account-group" 
      size={24} 
      color="#ffffff" 
    />} 
    label="회원 수" 
    value={`${memberlist.length}명`} />
  )
}

export default MemberListCard

const styles = StyleSheet.create({})