package com.green.farm_animals_shop.shop.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder

// 주문 요청 DTO
public class OrderRequestDTO {
  private String userId; // 사용자 ID
  private List<OrderItemDTO> orderItems; // 장바구니 기반일 경우 여러개
  private Integer totalPrice;
  private String shippingAddress; // 배송지 주소
  private String paymentMethod; // 결제 방법 (신용카드, 계좌이체 등)
}
