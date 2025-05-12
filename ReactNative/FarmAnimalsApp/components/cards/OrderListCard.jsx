import { StyleSheet } from "react-native";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../../redux/orderSlice";
import InfoCard from "../common/InfoCard";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const OrderListCard = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.list);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  // "created" 상태의 주문만 필터링
  const createdOrders = orders.filter(
    (order) => order.orderStatus === "CREATED"
  );

  // created 상태 주문이 없을 때
  if (createdOrders.length === 0) {
    return (
      <InfoCard
        icon={
          <MaterialCommunityIcons
            name="package-variant"
            size={24}
            color="#ffffff"
          />
        }
        label="주문 수"
        value="주문 건수가 없습니다."
      />
    );
  }

  return (
    <InfoCard
      icon={
        <MaterialCommunityIcons
          name="package-variant"
          size={24}
          color="#ffffff"
        />
      }
      label="주문 수"
      value={`${createdOrders.length} 건`}
    />
  );
};

export default OrderListCard;

const styles = StyleSheet.create({});
