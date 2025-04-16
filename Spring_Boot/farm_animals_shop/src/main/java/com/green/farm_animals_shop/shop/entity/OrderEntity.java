package com.green.farm_animals_shop.shop.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.green.farm_animals_shop.user.entity.Member;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "orders")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class OrderEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "order_id")
  private Long orderId; // 주문 ID

  @ManyToOne
  @JoinColumn(name = "user_id", nullable = false)
  private Member user; // 사용자 ID

  @Column(name = "total_price", nullable = false)
  private Integer totalPrice; // 총 주문 금액

  @Column(name = "order_date", nullable = false)
  private LocalDateTime orderDate; // 주문 날짜

  @Enumerated(EnumType.STRING)
  @Column(name = "order_status", nullable = false)
  private OrderStatus orderStatus; // 주문 상태 (주문 완료, 배송 중, 배송 완료 등)

  @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
  @JsonManagedReference
  private List<OrderItemEntity> orderItems; // 주문한 상품들

  @OneToOne(mappedBy = "order", cascade = CascadeType.ALL)
  @JsonManagedReference
  private PaymentEntity payment; // 결제 정보

  @OneToOne(mappedBy = "order", cascade = CascadeType.ALL)
  @JsonManagedReference
  private ShippingEntity shipping; // 배송 정보

}
