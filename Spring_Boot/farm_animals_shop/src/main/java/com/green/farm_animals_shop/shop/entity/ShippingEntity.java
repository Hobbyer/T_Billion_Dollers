package com.green.farm_animals_shop.shop.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

// 배송 정보 테이블
@Entity
@Table(name = "shipping")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class ShippingEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "shipping_id")
  private Long shippingId; // 배송 ID

  @OneToOne
  @JoinColumn(name = "order_id", nullable = false)
  @JsonBackReference
  private OrderEntity order; // 주문 ID (주문과 연관)

  @Column(name = "shipping_address", nullable = false)
  private String shippingAddress; // 배송지 주소

  @Enumerated(EnumType.STRING)
  @Column(name = "shipping_status", nullable = false)
  private ShippingStatus shippingStatus; // 배송 상태 (배송 준비 중, 배송 중, 배송 완료 등)

  @Column(name = "shipping_date")
  private LocalDateTime shippingDate; // 배송 날짜

  @Column(name = "delivery_date")
  private LocalDateTime deliveryDate; // 배송 완료 날짜
}
