package com.green.farm_animals_shop.shop.entity;

public enum ShippingStatus {
  PENDING("Pending"), // 배송 대기
  SHIPPED("Shipped"), // 배송 중
  DELIVERED("Delivered"), // 배송 완료
  RETURNED("Returned"), // 반품
  CANCELLED("Cancelled"); // 배송 취소

  private final String description;

  ShippingStatus(String description) {
    this.description = description;
  }

  public String getDescription() {
    return description;
  }
}
