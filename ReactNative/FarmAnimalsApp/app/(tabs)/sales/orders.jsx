// app/sales/orders.jsx
import { StyleSheet, Text, View, FlatList, SafeAreaView, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../../../redux/orderSlice";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import dayjs from "dayjs";

const OrdersScreen = () => {
  const dispatch = useDispatch();
  const orderList = useSelector((state) => state.orders.list);
  const [loading, setLoading] = useState(true);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    dispatch(fetchOrders()).finally(() => setLoading(false));
  }, [dispatch]);

  if (loading) {
    return (
      <SafeAreaView style={styles.loader}>
        <ActivityIndicator size="large" color="#3F7D58" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F0FDF4" }}>
      <View style={styles.topSection}>
        <Text style={styles.orderCount}>총 주문 수: {orderList.length}건</Text>
      </View>

      <FlatList
        data={orderList}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ paddingBottom: insets.bottom + 80 }}
        renderItem={({ item }) => (
          <View style={styles.orderCard}>
            <View style={styles.orderHeader}>
              <Text style={styles.orderUser}>👤 {item.userId}</Text>
              <Text style={styles.orderPrice}>💰 {item.totalPrice.toLocaleString()}원</Text>
            </View>
            <Text style={styles.orderInfo}>🆔 주문번호: {item.orderId}</Text>
            <Text style={styles.orderInfo}>
              📅 주문일자: {dayjs(item.orderDate).format("YYYY-MM-DD ")}
              <Text style={{ color: "#FACC15", fontWeight: "bold" }}>★</Text>
              <Text style={styles.orderInfo}>
                {dayjs(item.orderDate).format(" ddd ")}
              </Text>
              <Text style={{ color: "#FACC15", fontWeight: "bold" }}>★</Text>
              <Text style={styles.orderInfo}>
                {dayjs(item.orderDate).format(" HH:mm")}
              </Text>
            </Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default OrdersScreen;

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  topSection: {
    padding: 16,
    backgroundColor: "#E8F5E9",
  },
  orderCount: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2E7D32",
  },
  orderCard: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginTop: 12,
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
    borderLeftWidth: 5,
    borderLeftColor: "#66BB6A",
  },
  orderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  orderUser: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1B5E20",
  },
  orderPrice: {
    fontSize: 14,
    color: "#10B981",
    fontWeight: "600",
  },
  orderInfo: {
    fontSize: 14,
    color: "#333",
    marginBottom: 2,
  },
});
