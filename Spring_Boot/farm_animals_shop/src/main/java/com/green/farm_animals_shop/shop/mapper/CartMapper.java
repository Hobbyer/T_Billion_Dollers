package com.green.farm_animals_shop.shop.mapper;

import com.green.farm_animals_shop.admin.entity.ItemInfoEntity;
import com.green.farm_animals_shop.shop.dto.CartDTO;
import com.green.farm_animals_shop.shop.dto.CartItemDTO;
import com.green.farm_animals_shop.shop.entity.CartEntity;
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
                .build())
                .collect(Collectors.toList()))
        .build();
  }

  // CartDTO를 CartEntity로 변환
  public static CartEntity toEntity(CartDTO cartDTO, Member user, ItemInfoEntity item) {
    return CartEntity.builder()
        .cartId(cartDTO.getCartId())
        .userId(user)
        .quantity(cartDTO.getQuantity())
        .addedAt(cartDTO.getAddedAt())
        .updatedAt(cartDTO.getUpdatedAt())
        .isChecked(cartDTO.getIsChecked())
        .build();
  }
}
