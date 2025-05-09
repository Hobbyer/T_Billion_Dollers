import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Pressable,
  Modal,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { FadeInDown } from "react-native-reanimated";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useFocusEffect, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage"; // AsyncStorage 임포트
import { refreshAccessToken } from "../../../apis/auth";
import TokenRemainButton from "../../../components/common/TokenRemainButton";
import { useAuth } from "../../../contexts/AuthContext";
import LoginScreen from "../../auth/login";

const HomeScreen = () => {
  const [currentTime, setCurrentTime] = useState("");
  const router = useRouter();
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);

  //const { isAuthenticated } = useAuth(); // 로그인 상태 확인
  //const isAuthenticated = null; // 로그인 상태 확인
  const { isAuthenticated, checkLogin } = useAuth();
  console.log(isAuthenticated);


  useFocusEffect(
    useCallback(() => {
      checkLogin(); // ✅ 포커스될 때마다 인증 상태를 다시 확인

      if (!isAuthenticated) return;

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
    }, [isAuthenticated])
  );

  // useEffect(() => {
  //   if(!isAuthenticated) return; 

  //   const timer = setInterval(() => {
  //     const now = new Date();
  //     const dateStr = now.toLocaleDateString("ko-KR", {
  //       year: "numeric",
  //       month: "long",
  //       day: "numeric",
  //       weekday: "long",
  //     });
  //     const timeStr = now.toLocaleTimeString("ko-KR");
  //     setCurrentTime(`${dateStr} ${timeStr}`);
  //   }, 1000);
  //   return () => clearInterval(timer);
  // }, [isAuthenticated]);

 // 로그아웃 처리 함수
 const handleLogout = async () => {
  setLogoutModalVisible(true);
};

const confirmLogout = async () => {
  await AsyncStorage.removeItem('accessToken');
  await AsyncStorage.removeItem('refreshToken');
  setLogoutModalVisible(false);
  router.replace('/auth/login');
};


 if(isAuthenticated === null) return null; 


  return (
    <>
      {isAuthenticated ? (
        <View style={{ flex: 1 }}>
        <LinearGradient colors={["#d0f0c0", "#a8e063"]} style={styles.container}>
          <View style={styles.topBar}>
            <TouchableOpacity onPress={handleLogout}>
              <Ionicons name="power" size={28} color="#2e7d32" />
            </TouchableOpacity>
          </View>
    
          <View style={styles.timeWrapper}>
            <Ionicons name="time" size={20} color="#2e7d32" />
            <Text style={styles.timeText}>{currentTime}</Text>
          </View>
    
          <TokenRemainButton/>
    
          <Animated.View entering={FadeInDown.duration(1000)} style={styles.greetingWrapper}>
            <Text style={styles.greetingText}>👋 관리자님, 반갑습니다!</Text>
          </Animated.View>
    
          <View style={styles.cardsWrapper}>
            <InfoCard icon={<Ionicons name="thermometer" size={24} color="#ffffff" />} label="센서 데이터" value="24℃ / 60%" />
            <InfoCard icon={<MaterialCommunityIcons name="account-group" size={24} color="#ffffff" />} label="회원 수" value="53명" />
            <InfoCard icon={<Ionicons name="notifications" size={24} color="#ffffff" />} label="알림" value="3건" />
            <InfoCard icon={<MaterialCommunityIcons name="package-variant" size={24} color="#ffffff" />} label="주문 수" value="7건" />
          </View>
    
          <View style={styles.footerWrapper}>
            <Text style={styles.footerText}>📢 오늘도 최선을 다하는 FarmDAS ✨</Text>
          </View>
        </LinearGradient>
    
    {logoutModalVisible && (
      <Modal transparent animationType="fade" visible>
        <View style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.5)",
          justifyContent: "center",
          alignItems: "center"
        }}>
          <View style={{
            width: "80%",
            backgroundColor: "#fff",
            borderRadius: 16,
            padding: 24,
            alignItems: "center",
            shadowColor: "#000",
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
          }}>
            <View style={{
              width: 64,
              height: 64,
              borderRadius: 32,
              backgroundColor: "#E0F2F1",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 16,
            }}>
              <Ionicons name="power" size={32} color="#2e7d32" />
            </View>
    
            <Text style={{
              fontSize: 20,
              fontWeight: "bold",
              color: "#2e7d32",
              marginBottom: 8,
            }}>로그아웃 하시겠습니까?</Text>
    
            <Text style={{
              fontSize: 14,
              color: "#555",
              textAlign: "center",
              marginBottom: 20,
            }}>정말로 로그아웃하시려면 확인을 눌러주세요.</Text>
    
            <View style={{ flexDirection: "row", gap: 10 }}>
              <Pressable
                style={{
                  flex: 1,
                  backgroundColor: "#E0E0E0",
                  paddingVertical: 10,
                  borderRadius: 8,
                  alignItems: "center"
                }}
                onPress={() => setLogoutModalVisible(false)}
              >
                <Text style={{ fontWeight: "bold", color: "#333" }}>취소</Text>
              </Pressable>
    
              <Pressable
                style={{
                  flex: 1,
                  backgroundColor: "#2e7d32",
                  paddingVertical: 10,
                  borderRadius: 8,
                  alignItems: "center"
                }}
                onPress={confirmLogout}
              >
                <Text style={{ fontWeight: "bold", color: "white" }}>확인</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    )}
      </View>
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
