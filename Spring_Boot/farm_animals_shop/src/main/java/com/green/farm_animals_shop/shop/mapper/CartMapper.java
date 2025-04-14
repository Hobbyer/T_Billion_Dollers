package com.green.farm_animals_shop.shop.mapper;

import com.green.farm_animals_shop.admin.entity.ItemInfoEntity;
import com.green.farm_animals_shop.shop.dto.CartDTO;
import com.green.farm_animals_shop.shop.dto.CartItemDTO;
import com.green.farm_animals_shop.shop.entity.CartEntity;
import com.green.farm_animals_shop.shop.entity.CartItemEntity;
import com.green.farm_animals_shop.user.entity.Member;

import java.util.stream.Collectors;

public class CartMapper {

  // CartEntity를 CartDTO로 변환
  public static CartDTO toDTO(CartEntity cartentity) {
    return CartDTO.builder()
        .cartId(cartentity.getCartId())
        .userId(cartentity.getUserId() != null ? cartentity.getUserId().getUserId() : null)
        .totalPrice(cartentity.getTotalPrice())
        .isChecked(cartentity.getIsChecked())
        .quantity(cartentity.getQuantity())
        .addedAt(cartentity.getAddedAt())
        .updatedAt(cartentity.getUpdatedAt())
        .cartItems(cartentity.getCartItems().stream()
            .map(cartItem -> CartItemDTO.builder()
                .cartItemId(cartItem.getCartItemId())
                .itemCode(Long.valueOf(cartItem.getItem().getItemCode()))
                .quantity(cartItem.getQuantity())
                .price(cartItem.getPrice())
                .totalPrice(cartItem.getTotalPrice())
                .itemName(cartItem.getItem().getItemName())
                .itemDescription(cartItem.getItem().getDescription())
                .itemImagePath(cartItem.getItem().getImagePath())
                .isChecked(cartItem.getIsChecked())
                .build())
            .collect(Collectors.toList()))
        .build();
  }

  // CartDTO + 사용자 + 아이템 -> CartEntity 변환
  public static CartEntity toEntity(CartDTO cartDTO, Member user, ItemInfoEntity item) {
    return CartEntity.builder()
        .cartId(cartDTO.getCartId())
        .userId(user)
        .totalPrice(cartDTO.getTotalPrice())
        .quantity(cartDTO.getQuantity())
        .addedAt(cartDTO.getAddedAt())
        .updatedAt(cartDTO.getUpdatedAt())
        .isChecked(cartDTO.getIsChecked())
        .build();
  }

  // CartItemDTO -> CartITemEntity 변환
  public static CartItemEntity toCartItemEntity(CartItemDTO dto, CartEntity cart, ItemInfoEntity item) {
    return CartItemEntity.builder()
        .cart(cart)
        .item(item)
        .quantity(dto.getQuantity())
        .totalPrice(dto.getTotalPrice())
        .isChecked(dto.getIsChecked())
        .build();
  }

  // CartItemEntity -> CartItemDTO 변환 (단건용)
  public static CartItemDTO toCartItemDTO(CartItemEntity entity) {
    return CartItemDTO.builder()
        .cartItemId(entity.getCartItemId())
        .itemCode(Long.valueOf(entity.getItem().getItemCode()))
        .quantity(entity.getQuantity())
        .price(entity.getPrice())
        .totalPrice(entity.getTotalPrice())
        .itemName(entity.getItem().getItemName())
        .itemDescription(entity.getItem().getDescription())
        .itemImagePath(entity.getItem().getImagePath())
        .isChecked(entity.getIsChecked())
        .build();
  }
}
