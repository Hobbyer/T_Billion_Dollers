package com.green.farm_animals_shop.shop.dto;

import com.green.farm_animals_shop.admin.entity.ItemInfoEntity;
import com.green.farm_animals_shop.shop.entity.CartEntity;
import com.green.farm_animals_shop.user.entity.Member;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
public class CartDTO {
  private Long cartId;
  private String userId;
  private List<CartItemDTO> cartItems;
  private Integer totalPrice;
  private Boolean isChecked;
  private Integer quantity;
  private LocalDateTime addedAt;
  private LocalDateTime updatedAt;

}
