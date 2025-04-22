import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { POST } from '../apis/CRUD';  // 경로는 프로젝트 구조에 맞게 수정하세요

export default function LoginScreen() {
  const [loginForm, setLoginForm] = useState({ userId: '', password: '' });
  const router = useRouter();

  const handleChange = (name, value) => {
    setLoginForm(prev => ({ ...prev, [name]: value }));
  };

  const handleLogin = async () => {
    const { userId, password } = loginForm;
    if (!userId || !password) {
      Alert.alert('입력 오류', '아이디와 비밀번호를 모두 입력해주세요.');
      return;
    }
    try {
      const res = await POST('http://localhost:8080/auth/login', loginForm);
      const token = res.data.accessToken; // 백엔드 반환 필드에 맞게 수정
      await AsyncStorage.setItem('accessToken', token);
      router.replace('/');  // 로그인 후 홈 화면으로 이동
    } catch (err) {
      console.error(err);
      Alert.alert('로그인 실패', '아이디 또는 비밀번호를 확인해주세요.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>로그인</Text>
      <TextInput
        style={styles.input}
        placeholder="아이디"
        value={loginForm.userId}
        onChangeText={value => handleChange('userId', value)}
        autoCapitalize='none'
      />
      <TextInput
        style={styles.input}
        placeholder="비밀번호"
        value={loginForm.password}
        onChangeText={value => handleChange('password', value)}
        secureTextEntry
      />
      <Pressable style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>로그인</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#fff'
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
