import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { FadeInDown } from "react-native-reanimated";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage"; // AsyncStorage 임포트
import { refreshAccessToken } from "../../../apis/auth";
import TokenRemainButton from "../../../components/common/TokenRemainButton";
import { useAuth } from "../../../contexts/AuthContext";
import LoginScreen from "../../auth/login";

const HomeScreen = () => {
  const [currentTime, setCurrentTime] = useState("");
  const router = useRouter();
  const { isAuthenticated } = useAuth(); // 로그인 상태 확인

  useEffect(() => {
    fetch()
    const timer = setInterval(() => {
      const now = new Date();
      const dateStr = now.toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
        weekday: "long",
      });
      const timeStr = now.toLocaleTimeString("ko-KR");
      setCurrentTime(`${dateStr} ${timeStr}`);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // 로그아웃 처리 함수
  const handleLogout = async () => {
    Alert.alert("로그아웃", "정말 로그아웃 하시겠습니까?", [
      { text: "취소", style: "cancel" },
      {
        text: "확인",
        onPress: async () => {
          // AsyncStorage에서 토큰 제거
          await AsyncStorage.removeItem("accessToken");
          await AsyncStorage.removeItem("refreshToken");

          // 로그인 화면으로 이동
          router.replace("/auth/login");
        },
      },
    ]);
  };


 

  return (
    <>
      {isAuthenticated ? (
        <LinearGradient
          colors={["#d0f0c0", "#a8e063"]}
          style={styles.container}
        >
          <View style={styles.topBar}>
            <TouchableOpacity onPress={handleLogout}>
              <Ionicons name="power" size={28} color="#2e7d32" />
            </TouchableOpacity>
          </View>

          <View style={styles.timeWrapper}>
            <Ionicons name="time" size={20} color="#2e7d32" />
            <Text style={styles.timeText}>{currentTime}</Text>
          </View>

          <TokenRemainButton />

          <Animated.View
            entering={FadeInDown.duration(1000)}
            style={styles.greetingWrapper}
          >
            <Text style={styles.greetingText}>👋 관리자님, 반갑습니다!</Text>
          </Animated.View>

          <View style={styles.cardsWrapper}>
            <InfoCard
              icon={<Ionicons name="thermometer" size={24} color="#ffffff" />}
              label="센서 데이터"
              value="24℃ / 60%"
            />
            <InfoCard
              icon={
                <MaterialCommunityIcons
                  name="account-group"
                  size={24}
                  color="#ffffff"
                />
              }
              label="회원 수"
              value="53명"
            />
            <InfoCard
              icon={<Ionicons name="notifications" size={24} color="#ffffff" />}
              label="알림"
              value="3건"
            />
            <InfoCard
              icon={
                <MaterialCommunityIcons
                  name="package-variant"
                  size={24}
                  color="#ffffff"
                />
              }
              label="주문 수"
              value="7건"
            />
          </View>

          <View style={styles.footerWrapper}>
            <Text style={styles.footerText}>
              📢 오늘도 최선을 다하는 FarmDAS ✨
            </Text>
          </View>
        </LinearGradient>
      ) : (
        <LoginScreen />
      )}
    </>
  );
};

export default HomeScreen;

const InfoCard = ({ icon, label, value }) => (
  <Animated.View
    entering={FadeInDown.delay(200).duration(800)}
    style={styles.card}
  >
    <View style={styles.iconWrapper}>{icon}</View>
    <View>
      <Text style={styles.cardLabel}>{label}</Text>
      <Text style={styles.cardValue}>{value}</Text>
    </View>
  </Animated.View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
    backgroundColor: "#ffffff",
  },
  topBar: {
    position: "absolute",
    top: 50,
    right: 20,
    zIndex: 10,
  },
  timeWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  timeText: {
    marginLeft: 8,
    fontSize: 16,
    color: "#2e7d32",
    fontWeight: "500",
  },
  greetingWrapper: {
    alignItems: "center",
    marginVertical: 20,
  },
  greetingText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1b5e20",
  },
  cardsWrapper: {
    marginTop: 20,
    gap: 16,
  },
  card: {
    backgroundColor: "#66bb6a",
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
    elevation: 4,
  },
  iconWrapper: {
    marginRight: 16,
  },
  cardLabel: {
    fontSize: 16,
    color: "#e8f5e9",
  },
  cardValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffffff",
  },
  footerWrapper: {
    marginTop: 40,
    alignItems: "center",
  },
  footerText: {
    fontSize: 14,
    color: "#2e7d32",
  },
});
