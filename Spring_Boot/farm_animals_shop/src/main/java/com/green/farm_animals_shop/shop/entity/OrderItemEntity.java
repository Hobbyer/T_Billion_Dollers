package com.green.farm_animals_shop.shop.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.green.farm_animals_shop.admin.entity.ItemInfoEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

// 주문 아이템 테이블
@Entity
@Table(name = "order_item")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class OrderItemEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "order_item_id")
  private Long orderItemId; // 주문 아이템 ID

  @ManyToOne
  @JoinColumn(name = "order_id", nullable = false)
  @JsonBackReference
  private OrderEntity order; // 주문 ID (주문과 연관)

  @ManyToOne
  @JoinColumn(name = "item_code", nullable = false)
  private ItemInfoEntity item; // 상품 코드 (주문한 상품)

  @Column(name = "quantity", nullable = false)
  private Integer quantity; // 수량 (주문한 상품의 수량)

  @Column(name = "price", nullable = false)
  private Integer price; // 가격 (주문한 상품의 개당 가격)

  @Column(name = "total_price", nullable = false)
  private Integer totalPrice; // 총 가격 (주문한 상품의 총 가격)

  @Enumerated(EnumType.STRING)
  @Column(name = "order_item_status", nullable = false)
  private OrderItemStatus orderItemStatus; // 주문 아이템 상태 (주문 완료, 배송 중, 배송 완료 등)
}
