// src/screens/LoginScreen.js
import React, { useEffect, useState } from 'react';
import {
  SafeAreaView, // iOS 노치·안전 영역 고려
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
} from 'react-native';
// AsyncStorage: 토큰 같은 간단한 키-밸류 저장소
import AsyncStorage from '@react-native-async-storage/async-storage';
// React Navigation 훅 (App.js 에서 createNativeStackNavigator 사용 중)
import { useNavigation } from '@react-navigation/native';
// 로그인 API 호출 함수
import { POST } from '../apis/CRUD';
import axios from 'axios';

const baseURL = 'http://192.168.204.19:8080'; // PC의 LAN IP (테스트용)

export default function LoginScreen() {
  // 로그인 폼 상태(userId, password)
  const [loginForm, setLoginForm] = useState({ userId: '', password: '' });
  // 네비게이션 객체
  const navigation = useNavigation();

  // 텍스트 인풋이 변경될 때 폼 상태 업데이트
  const handleChange = (field, value) => {
    setLoginForm(prev => ({ ...prev, [field]: value }));
  };

  const login = () => {
    axios.post(`${baseURL}/auth/login`, loginForm)
      .then(response => {
        // 로그인 성공 시 처리
        const { accessToken, refreshToken } = response.data;
        AsyncStorage.setItem('accessToken', accessToken);
        AsyncStorage.setItem('refreshToken', refreshToken);
        Alert.alert('로그인 성공', '환영합니다!');
        navigation.navigate('index'); // 홈 화면으로 이동
      })
      .catch(error => {
        // 로그인 실패 시 처리
        console.error('로그인 에러:', error);
        Alert.alert('로그인 실패', '아이디 또는 비밀번호를 확인해주세요.');
      });
  }

  useEffect(() => {
    AsyncStorage.clear(); // 앱 시작 시 AsyncStorage 초기화 (테스트용)
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* 제목 */}
      <Text style={styles.title}>로그인</Text>

      {/* 아이디 입력 */}
      <TextInput
        style={styles.input}
        placeholder="아이디"
        value={loginForm.userId}
        onChangeText={text => handleChange('userId', text)}
        autoCapitalize="none" // 첫 글자 대문자 방지
      />

      {/* 비밀번호 입력 */}
      <TextInput
        style={styles.input}
        placeholder="비밀번호"
        value={loginForm.password}
        onChangeText={text => handleChange('password', text)}
        secureTextEntry // 입력 숨김 처리
      />

      {/* 로그인 버튼 */}
      <Pressable style={styles.button} onPress={login}>
        <Text style={styles.buttonText}>로그인</Text>
      </Pressable>
    </SafeAreaView>
  );
}

// 스타일 정의
const styles = StyleSheet.create({
  container: {
    flex: 1, // 전체 화면 차지
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    marginBottom: 16,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  button: {
    height: 48,
    backgroundColor: '#3F7D58',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});