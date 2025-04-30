// app/sales/members.jsx
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  TextInput,
  Button,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { GET_API } from "../../../apis/testcrud";
import { Pressable } from "react-native";

// const baseUrl = 'http://192.168.204.19:8080';

export default function MembersInfoScreen() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [kw, setKw] = useState("");

  const fetchAll = async () => {
    setLoading(true);
    try {
      const res = await GET_API(`/admin/members`);
      setMembers(res);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const search = async () => {
    setLoading(true);
    try {
      const res = await GET_API(
        `/admin/members/search?keyword=${kw}&page=0&size=5`
      );
      setMembers(res);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.loader}>
        <ActivityIndicator size="large" color="#3F7D58" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#F0FDF4' }}>
      <View style={styles.topSection}>
        <Text style={styles.memberCount}>총 회원 수: {members.length}명</Text>
        <View style={styles.searchBox}>
          <TextInput
            style={styles.searchInput}
            placeholder="이름, ID, 전화번호로 검색"
            value={kw}
            onChangeText={setKw}
          />
          <Pressable style={styles.searchBtn} onPress={search}>
            <Text style={styles.searchBtnText}>검색</Text>
          </Pressable>
        </View>
      </View>

      <FlatList
        data={members}
        keyExtractor={(item, idx) => idx.toString()}
        renderItem={({ item }) => (
          <View style={styles.memberCard}>
            <View style={styles.memberHeader}>
              <Text style={styles.memberName}>{item.name}</Text>
              <Text style={styles.memberRole}>
  {item.authority === 'ROLE_ADMIN' ? '👑 관리자' : '🙋‍♂️ 일반회원'}
</Text>

            </View>
            <Text style={styles.memberInfo}>📌 ID: {item.userId}</Text>
            <Text style={styles.memberInfo}>📞 {item.phoneNumber}</Text>
            <Text style={styles.memberInfo}>📧 {item.email}</Text>
            <Text style={styles.memberInfo}>🏡 {item.address}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topSection: {
    padding: 16,
    backgroundColor: '#E8F5E9',
  },
  memberCount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 8,
  },
  searchBox: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
  },
  searchInput: {
    flex: 1,
    padding: 10,
    fontSize: 14,
  },
  searchBtn: {
    backgroundColor: '#10B981',
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  searchBtnText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  memberCard: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 12,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
    borderLeftWidth: 5,
    borderLeftColor: '#66BB6A',
  },
  memberHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  memberName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1B5E20',
  },
  memberRole: {
    fontSize: 12,
    color: '#10B981',
    fontWeight: '600',
  },
  memberInfo: {
    fontSize: 14,
    color: '#333',
    marginBottom: 2,
  },
});
