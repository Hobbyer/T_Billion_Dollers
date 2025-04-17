package com.green.farm_animals_shop.shop.repository;

import com.green.farm_animals_shop.shop.entity.OrderEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<OrderEntity, Long> {
  List<OrderEntity> findByUser_UserId(String userId); // 사용자 ID로 주문 내역 조회
}
