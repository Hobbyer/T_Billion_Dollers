package com.green.farm_animals_shop.shop.service;

import com.green.farm_animals_shop.shop.dto.CartDTO;

public interface CartService {

  CartDTO getCartByUserId(String userId); // 사용자 ID로 장바구니 조회

  void addItemToCart(String userId, Integer itemCode, Integer quantity); // 장바구니에 상품 추가

  void updateCartItem(String userId, Long cartItemId, Integer newQuantity); // 장바구니 상품 수량 수정

  void removeItemFromCart(String userId, Long cartItemId); // 장바구니에서 상품 삭제

  void clearCart(String uesrId); // 장바구니 비우기
}
