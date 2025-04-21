package com.green.farm_animals_shop.shop.repository;

import com.green.farm_animals_shop.shop.dto.DailyOrderSummaryDTO;
import com.green.farm_animals_shop.shop.entity.OrderEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface OrderRepository extends JpaRepository<OrderEntity, Long> {
  List<OrderEntity> findByUser_UserId(String userId); // 사용자 ID로 주문 내역 조회

  @Query(value = """
      SELECT DATE(order_date) AS orderDate, SUM(total_price) AS totalPriceSum
      FROM orders
      GROUP BY DATE(order_date)
      ORDER BY DATE(order_date) DESC
      LIMIT 7
      """, nativeQuery = true)
  List<Object[]> findDailyOrderSummaryRaw();
}
