package com.green.farm_animals_shop.shop.repository;

import com.green.farm_animals_shop.shop.entity.OrderEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<OrderEntity, Long> {

}
