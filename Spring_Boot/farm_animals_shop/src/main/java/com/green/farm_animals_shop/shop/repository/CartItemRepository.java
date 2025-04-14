package com.green.farm_animals_shop.shop.repository;

import com.green.farm_animals_shop.shop.entity.CartItemEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartItemRepository extends JpaRepository<CartItemEntity, Long> {

}
