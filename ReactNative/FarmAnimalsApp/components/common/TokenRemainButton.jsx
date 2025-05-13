import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {jwtDecode} from 'jwt-decode';
import { StyleSheet, View, Text, Pressable, Alert, Modal } from 'react-native';
import { refreshAccessToken } from '../../apis/auth'; // 정확한 경로에 맞게 수정
import { useRouter } from 'expo-router';


const TokenRemainButton = () => {
  const [remaining, setRemaining] = useState(null);
  const [extendSuccessVisible, setExtendSuccessVisible] = useState(false);
const [extendErrorVisible, setExtendErrorVisible] = useState(false);

const router = useRouter();


  const updateRemainingTime = async () => {
    const token = await AsyncStorage.getItem('accessToken');
    
    if (!token) {
      setRemaining('토큰 없음');
      return;
    }

    try {
      const decoded = jwtDecode(token);
      const now = Math.floor(Date.now() / 1000);
      const exp = decoded.exp;
      const diff = exp - now;

      if (diff <= 0) {
        setRemaining('만료됨');
        router.navigate('/auth/login'); // 만료된 경우 로그인 화면으로 이동
      } else {
        const min = Math.floor(diff / 60);
        const sec = diff % 60;
        setRemaining(`${min}분 ${sec}초 남음`);
      }
    } catch (e) {
      console.error('토큰 디코딩 실패', e);
      setRemaining('유효하지 않은 토큰');
    }
  };

  useEffect(() => {
    updateRemainingTime();
    const interval = setInterval(updateRemainingTime, 1000);
    return () => clearInterval(interval);
  }, []);

   // "연장하기" 버튼 눌렀을 때 실행
   const handleRefresh = async () => {
    try {
      const refreshToken = await AsyncStorage.getItem('refreshToken');
      if (!refreshToken) {
        throw new Error('refreshToken 없음');
      }

      // refreshAccessToken은 refreshToken을 받아 accessToken을 새로 반환해야 함
      const response = await refreshAccessToken(refreshToken);
      console.log(response);
      
      if (!response || !response.accessToken) {
        throw new Error('응답에서 accessToken 없음');
      }

      const newAccessToken = response.accessToken;

      await AsyncStorage.setItem('accessToken', newAccessToken);
      await updateRemainingTime();

      setExtendSuccessVisible(true); // 연장 성공 시 알림
    } catch (e) {
      console.error('리프레시 실패', e);
      setExtendErrorVisible(true); // 연장 실패 시 알림
    }
  };
  return (
    <View style={{ padding: 20 }}>
    <View style={styles.tokenBox}>
  <Text style={styles.tokenText}>🔒 남은 시간: {remaining}</Text>
  <Pressable style={styles.tokenButton} onPress={handleRefresh}>
    <Text style={styles.tokenButtonText}>⏳ 연장</Text>
  </Pressable>
</View>


    {/* ✅ 성공 모달 */}
    <Modal transparent visible={extendSuccessVisible} animationType="fade">
        <View style={styles.overlay}>
          <View style={styles.modalBox}>
            <View style={styles.iconBoxSuccess}>
              <Text style={styles.iconText}>🐮</Text>
            </View>
            <Text style={styles.modalTitleSuccess}>연장 성공</Text>
            <Text style={styles.modalMessage}>AccessToken이 성공적으로 갱신되었습니다.</Text>
            <Pressable style={styles.successBtn} onPress={() => setExtendSuccessVisible(false)}>
              <Text style={styles.successBtnText}>확인</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {/* ❌ 실패 모달 */}
      <Modal transparent visible={extendErrorVisible} animationType="fade">
        <View style={styles.overlay}>
          <View style={styles.modalBox}>
            <View style={styles.iconBoxError}>
              <Text style={styles.iconText}>❌</Text>
            </View>
            <Text style={styles.modalTitleError}>연장 실패</Text>
            <Text style={styles.modalMessage}>AccessToken 연장에 실패했습니다.</Text>
            <Pressable style={styles.errorBtn} onPress={() => setExtendErrorVisible(false)}>
              <Text style={styles.errorBtnText}>닫기</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
  </View>
  )
}

export default TokenRemainButton

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    elevation: 6,
  },
  iconBoxSuccess: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#D1FAE5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconBoxError: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#FEE2E2',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconText: {
    fontSize: 30,
  },
  modalTitleSuccess: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#10B981',
    marginBottom: 6,
  },
  modalTitleError: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#DC2626',
    marginBottom: 6,
  },
  modalMessage: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
  },
  successBtn: {
    backgroundColor: '#10B981',
    paddingVertical: 10,
    width: '100%',
    borderRadius: 8,
    alignItems: 'center',
  },
  successBtnText: {
    fontWeight: 'bold',
    color: 'white',
  },
  errorBtn: {
    backgroundColor: '#DC2626',
    paddingVertical: 10,
    width: '100%',
    borderRadius: 8,
    alignItems: 'center',
  },
  errorBtnText: {
    fontWeight: 'bold',
    color: 'white',
  },
  
  tokenBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F1F8E9',
    borderWidth: 1,
    borderColor: '#C5E1A5',
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 14,
    marginBottom: 12,
  },
  tokenText: {
    fontSize: 14,
    color: '#33691E',
  },
  tokenButton: {
    backgroundColor: '#C8E6C9',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  tokenButtonText: {
    fontWeight: 'bold',
    color: '#2E7D32',
    fontSize: 13,
    fontWeight: '600',
  },

})