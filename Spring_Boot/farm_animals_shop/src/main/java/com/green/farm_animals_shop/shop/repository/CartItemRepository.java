package com.green.farm_animals_shop.shop.repository;

import com.green.farm_animals_shop.shop.entity.CartItemEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface CartItemRepository extends JpaRepository<CartItemEntity, Long> {
  @Query(value = "SELECT * FROM cart_item WHERE user_id = ? AND item_code = ?", nativeQuery = true)
  CartItemEntity findByUserIdAndItemCode(String userId, Integer itemCode);
}
