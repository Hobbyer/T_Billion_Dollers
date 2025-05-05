package com.green.farm_animals_shop.shop.service;

import com.green.farm_animals_shop.shop.dto.DailyOrderSummaryDTO;
import com.green.farm_animals_shop.shop.dto.OrderDTO;
import com.green.farm_animals_shop.shop.dto.OrderRequestDTO;
import com.green.farm_animals_shop.shop.entity.OrderEntity;

import java.util.List;

public interface OrderService {
  OrderEntity createOrder(OrderRequestDTO dto);

  List<OrderDTO> getOrdersByUserId(String userId); // 사용자 ID로 주문 내역 조회

  List<DailyOrderSummaryDTO> getDailyOrderSummary(); // 최근 7일간의 주문 요약 정보 조회

  List<OrderDTO> getAllOrders(); // 모든 주문 내역 조회
}
