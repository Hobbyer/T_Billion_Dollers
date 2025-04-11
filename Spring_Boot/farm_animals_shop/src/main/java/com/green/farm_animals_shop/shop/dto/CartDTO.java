package com.green.farm_animals_shop.shop.dto;

import com.green.farm_animals_shop.admin.entity.ItemInfoEntity;
import com.green.farm_animals_shop.shop.entity.CartEntity;
import com.green.farm_animals_shop.user.entity.Member;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class CartDTO {
  private Long cartId;
  private String userId;
  private Integer itemCode;
  private Integer quantity;
  private LocalDateTime addedAt;
  private LocalDateTime updatedAt;
  private Boolean isChecked;

  public static CartDTO fromEntity(CartEntity entity) {
    return CartDTO.builder()
        .cartId(entity.getCartId())
        .userId(entity.getUserId() != null ? entity.getUserId().getUserId() : null)
        .itemCode(entity.getItemCode() != null ? entity.getItemCode().getItemCode() : null)
        .quantity(entity.getQuantity())
        .addedAt(entity.getAddedAt())
        .updatedAt(entity.getUpdatedAt())
        .isChecked(entity.getIsChecked())
        .build();
  }

  public CartEntity toEntity(Member user, ItemInfoEntity item) {
    return CartEntity.builder()
        .cartId(this.cartId)
        .userId(user)
        .itemCode(item)
        .quantity(this.quantity)
        .addedAt(this.addedAt)
        .updatedAt(this.updatedAt)
        .isChecked(this.isChecked)
        .build();
  }
}
