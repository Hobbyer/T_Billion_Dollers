package com.green.farm_animals_shop.shop.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder

// 주문 상품 DTO
public class OrderItemDTO {
  private Integer itemCode;
  private String itemName;
  private Integer quantity;
  private Integer price;
  private Integer totalPrice;
}
