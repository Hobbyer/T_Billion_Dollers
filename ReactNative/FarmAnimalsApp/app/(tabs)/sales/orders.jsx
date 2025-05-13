import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../../../redux/orderSlice";

const orders = () => {
  const dispatch = useDispatch();
  const orderList = useSelector((state) => state.orders.list);
  console.log(orderList);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  return (
    <View>
      {orderList.map((order, i) => {
        return (
          <View key={i}>
            <Text>{order.userId}</Text>
            <Text>{order.orderId}</Text>
            <Text>{order.totalPrice}</Text>
            <Text>{order.orderDate}</Text>
          </View>
        );
      })}
    </View>
  );
};

export default orders;

const styles = StyleSheet.create({
  
});
