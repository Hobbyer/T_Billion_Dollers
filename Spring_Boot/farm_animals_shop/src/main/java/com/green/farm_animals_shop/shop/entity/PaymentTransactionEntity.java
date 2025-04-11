package com.green.farm_animals_shop.shop.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

// 결제 정보 테이블
@Entity
@Table(name = "payment_transaction")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class PaymentTransactionEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "payment_transaction_id")
  private Long paymentTransactionId; // 결제 거래 ID

  @ManyToOne
  @JoinColumn(name = "order_id", nullable = false)
  private OrderEntity order; // 주문 ID (주문과 연관)

  @Enumerated(EnumType.STRING)
  @Column(name = "transaction_type", nullable = false)
  private PaymentTransactionType transactionType; // 거래 유형 (결제, 환불 등)

  @Enumerated(EnumType.STRING)
  @Column(name = "transaction_status", nullable = false)
  private PaymentTransactionStatus transactionStatus; // 거래 상태 (성공, 실패 등)

  @Column(name = "payment_price", nullable = false)
  private Integer paymentPrice; // 결제 금액 (주문한 상품의 총 가격)

  @Column(name = "payment_date", nullable = false)
  private LocalDateTime paymentDate; // 결제 날짜
}
