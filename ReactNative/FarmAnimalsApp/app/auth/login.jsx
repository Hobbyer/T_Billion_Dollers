// src/screens/LoginScreen.js
import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
  Modal,
  View,
  Image,
} from "react-native";
import { login } from "../../apis/auth"; // 로그인 함수 임포트
import { useRouter } from "expo-router";

export default function LoginScreen() {
  // 로그인 폼 상태 (아이디, 비밀번호)
  const [loginForm, setLoginForm] = useState({ userId: "", password: "" });
  const router = useRouter();
  const [loginSuccessVisible, setLoginSuccessVisible] = useState(false);
  const [loginErrorVisible, setLoginErrorVisible] = useState(false);

  // 텍스트 인풋 값 변경 처리
  const handleChange = (field, value) => {
    setLoginForm((prev) => ({ ...prev, [field]: value }));
  };

  // 로그인 함수
  const handleLogin = async () => {
    try {
      const response = await login(loginForm);
      setLoginSuccessVisible(true);
      //router.replace("/")
    } catch (error) {
      setLoginErrorVisible(true);
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
        onChangeText={(text) => handleChange("userId", text)}
        autoCapitalize="none" // 첫 글자 대문자 방지
      />

      {/* 비밀번호 입력 */}
      <TextInput
        style={styles.input}
        placeholder="비밀번호"
        value={loginForm.password}
        onChangeText={(text) => handleChange("password", text)}
        secureTextEntry // 비밀번호 입력 숨김 처리
      />

      {/* 로그인 버튼 */}
      <Pressable style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>로그인</Text>
      </Pressable>
      {loginSuccessVisible && (
        <Modal transparent animationType="fade" visible={true}>
          <View
            style={{
              flex: 1,
              backgroundColor: "rgba(0,0,0,0.5)",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: "80%",
                backgroundColor: "#fff",
                borderRadius: 16,
                padding: 24,
                alignItems: "center",
                shadowColor: "#000",
                shadowOpacity: 0.25,
                shadowRadius: 4,
                elevation: 5,
              }}
            >
              <View
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: 32,
                  backgroundColor: "#D1FAE5",
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: 16,
                }}
              >
                <Text style={{ fontSize: 32 }}>🐮</Text>
              </View>

              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  color: "#10B981",
                  marginBottom: 8,
                }}
              >
                로그인 성공!
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: "#555",
                  textAlign: "center",
                  marginBottom: 20,
                }}
              >
                환영합니다 🎉
              </Text>

              <Pressable
                style={{
                  width: "100%",
                  backgroundColor: "#10B981",
                  paddingVertical: 10,
                  borderRadius: 8,
                  alignItems: "center",
                }}
                onPress={() => {
                  setLoginSuccessVisible(false);
                  setTimeout(() => {
                    console.log(111111111);
                    
                    router.replace("/");
                  }, 300); // 0.3초 정도 지연시켜 모달이 닫힌 후 이동하도록 함
                }}
              >
                <Text style={{ fontWeight: "bold", color: "white" }}>확인</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      )}

      {loginErrorVisible && (
        <Modal transparent animationType="fade" visible={true}>
          <View
            style={{
              flex: 1,
              backgroundColor: "rgba(0,0,0,0.5)",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: "80%",
                backgroundColor: "#fff",
                borderRadius: 16,
                padding: 24,
                alignItems: "center",
                shadowColor: "#000",
                shadowOpacity: 0.25,
                shadowRadius: 4,
                elevation: 5,
              }}
            >
              <View
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: 32,
                  backgroundColor: "#FEE2E2",
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: 16,
                }}
              >
                <Text style={{ fontSize: 32 }}>❌</Text>
              </View>

              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  color: "#DC2626",
                  marginBottom: 8,
                }}
              >
                로그인 실패
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: "#555",
                  textAlign: "center",
                  marginBottom: 20,
                }}
              >
                아이디 또는 비밀번호를 확인해주세요.
              </Text>

              <Pressable
                style={{
                  width: "100%",
                  backgroundColor: "#DC2626",
                  paddingVertical: 10,
                  borderRadius: 8,
                  alignItems: "center",
                }}
                onPress={() => setLoginErrorVisible(false)}
              >
                <Text style={{ fontWeight: "bold", color: "white" }}>닫기</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // 화면 전체 차지
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 24,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    marginBottom: 16,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  button: {
    height: 48,
    backgroundColor: "#3F7D58",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});
