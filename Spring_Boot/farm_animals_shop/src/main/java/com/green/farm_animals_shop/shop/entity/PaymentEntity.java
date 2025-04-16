package com.green.farm_animals_shop.shop.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

// 결제 정보 테이블
@Entity
@Table(name = "payment")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class PaymentEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "payment_id")
  private Long paymentId; // 결제 ID

  @OneToOne
  @JoinColumn(name = "order_id", nullable = false)
  @JsonBackReference
  private OrderEntity order; // 주문 ID (주문과 연관)

  @Column(name = "payment_price", nullable = false)
  private Integer paymentPrice; // 결제 금액 (주문한 상품의 총 가격)

  @Enumerated(EnumType.STRING)
  @Column(name = "payment_method", nullable = false)
  private PaymentMethod paymentMethod; // 결제 방법 (신용카드, 계좌이체 등)

  @Enumerated(EnumType.STRING)
  @Column(name = "payment_status", nullable = false)
  private PaymentStatus paymentStatus; // 결제 상태 (결제 완료, 결제 대기 등)

  @Column(name = "payment_date", nullable = false)
  private LocalDateTime paymentDate; // 결제 날짜
}
