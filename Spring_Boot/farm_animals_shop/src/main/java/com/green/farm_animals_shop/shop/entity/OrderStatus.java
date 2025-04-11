package com.green.farm_animals_shop.shop.entity;

public enum OrderStatus {
  CREATED("Created"), // 주문 생성
  PAYMENT_COMPLETED("Payment Completed"), // 결제 완료
  SHIPPED("Shipped"), // 배송 중
  DELIVERED("Delivered"), // 배송 완료
  CANCELLED("Cancelled"), // 주문 취소
  RETURNED("Returned");// 반품

  private final String description;

  OrderStatus(String description) {
    this.description = description;
  }

  public String getDescription() {
    return description;
  }
}
