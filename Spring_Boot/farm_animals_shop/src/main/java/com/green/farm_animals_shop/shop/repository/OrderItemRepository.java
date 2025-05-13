package com.green.farm_animals_shop.shop.repository;

import com.green.farm_animals_shop.shop.dto.OrderItemDTO;
import com.green.farm_animals_shop.shop.entity.OrderItemEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface OrderItemRepository extends JpaRepository<OrderItemEntity, Long> {
  @Query(value = """
      SELECT new com.green.farm_animals_shop.shop.dto.OrderItemDTO (
    oi.item.itemCode,
    oi.item.itemName,
    oi.quantity,
    oi.price,
    oi.totalPrice,
    oi.item.imagePath
  )
  FROM OrderItemEntity oi
  WHERE oi.order.orderId = :orderId
  """)
  List<OrderItemDTO> findByOrderIdAsDTO(Long orderId); // 주문 ID로 주문 상품 목록 조회
}
