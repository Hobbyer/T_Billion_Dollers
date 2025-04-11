package com.green.farm_animals_shop.shop.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CartItemDTO {

  private Long cartItemId; // 장바구니 상품 ID
  private Long itemCode; // 상품 코드 (장바구니에 담긴 상품)
  private Integer quantity; // 수량 (장바구니에 담긴 상품의 수량)
  private Integer price; // 가격 (장바구니에 담긴 상품의 개당 가격)
  private Integer totalPrice; // 총 가격 (장바구니에 담긴 상품의 총 가격)
  private String itemName; // 상품 이름
  private String itemDescription; // 상품 설명
  private String itemImagePath; // 상품 이미지 경로
}
