package com.green.farm_animals_shop.shop.dto;

import com.green.farm_animals_shop.shop.entity.OrderStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder

// 주문 내역을 담을 DTO
public class OrderDTO {
  private Long orderId; // 주문 ID
  private List<OrderItemDTO> orderItems; // 주문 상품 목록
  private Integer totalPrice; // 총 주문 금액
  private OrderStatus orderStatus;
  private LocalDateTime orderDate; // 주문 날짜
}
