package com.green.farm_animals_shop.shop.repository;

import com.green.farm_animals_shop.shop.entity.CartEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface CartRepository extends JpaRepository<CartEntity, Long> {

  // 사용자 ID로 장바구니 조회
  @Query(value = "SELECT * FROM cart WHERE user_id = ?", nativeQuery = true)
  CartEntity findByUserId(String userId);
}
