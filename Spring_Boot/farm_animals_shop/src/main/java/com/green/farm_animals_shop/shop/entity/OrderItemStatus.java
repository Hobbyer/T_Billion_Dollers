package com.green.farm_animals_shop.shop.entity;

public enum OrderItemStatus {
  PENDING("Pending"), // 주문 대기
  SHIPPED("Shipped"), // 배송 중
  DELIVERED("Delivered"), // 배송 완료
  RETURNED("Returned"), // 반품
  CANCELLED("Cancelled"); // 주문 취소

  private final String description;

  OrderItemStatus(String description) {
    this.description = description;
  }

  public String getDescription() {
    return description;
  }
}
