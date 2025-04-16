package com.green.farm_animals_shop.shop.repository;

import com.green.farm_animals_shop.shop.entity.OrderItemEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderItemRepository extends JpaRepository<OrderItemEntity, Long> {

}
