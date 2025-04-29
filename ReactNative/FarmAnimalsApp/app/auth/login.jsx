// src/screens/LoginScreen.js
import React, { useState } from 'react';
import { SafeAreaView, Text, TextInput, Pressable, StyleSheet, Alert } from 'react-native';
import { login } from '../../apis/auth'; // 로그인 함수 임포트
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  // 로그인 폼 상태 (아이디, 비밀번호)
  const [loginForm, setLoginForm] = useState({ userId: '', password: '' });
  const router = useRouter();
  
  // 텍스트 인풋 값 변경 처리
  const handleChange = (field, value) => {
    setLoginForm((prev) => ({ ...prev, [field]: value }));
  };

  // 로그인 함수
  const handleLogin = async () => {
    try {
      const response = await login(loginForm); // login 함수 호출
      // 로그인 성공 후 처리
      Alert.alert('로그인 성공', '환영합니다!');
      router.push('/')// 홈 화면으로 이동
    } catch (error) {
      // 로그인 실패 처리
      Alert.alert('로그인 실패', '아이디 또는 비밀번호를 확인해주세요.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>로그인</Text>

      {/* 아이디 입력 */}
      <TextInput
        style={styles.input}
        placeholder="아이디"
        value={loginForm.userId}
        onChangeText={(text) => handleChange('userId', text)}
        autoCapitalize="none" // 첫 글자 대문자 방지
      />

      {/* 비밀번호 입력 */}
      <TextInput
        style={styles.input}
        placeholder="비밀번호"
        value={loginForm.password}
        onChangeText={(text) => handleChange('password', text)}
        secureTextEntry // 비밀번호 입력 숨김 처리
      />

      {/* 로그인 버튼 */}
      <Pressable style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>로그인</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // 화면 전체 차지
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
