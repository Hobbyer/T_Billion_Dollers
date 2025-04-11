package com.green.farm_animals_shop.shop.entity;

public enum PaymentStatus {
  PENDING("Pending"), // 결제 대기
  SUCCESS("Success"), // 결제 성공
  FAILED("Failed"), // 결제 실패
  CANCELLED("Cancelled"), // 결제 취소
  REFUNDED("Refunded"); // 결제 환불

  private final String description;

  PaymentStatus(String description) {
    this.description = description;
  }

  public String getDescription() {
    return description;
  }
}
