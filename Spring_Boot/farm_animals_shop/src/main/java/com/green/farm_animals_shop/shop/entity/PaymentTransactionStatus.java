package com.green.farm_animals_shop.shop.entity;

public enum PaymentTransactionStatus {
  PENDING("Pending"), // 결제 대기
  SUCCESS("Success"), // 결제 성공
  FAILED("Failed"); // 결제 실패

  private final String description;

  PaymentTransactionStatus(String description) {
    this.description = description;
  }

  public String getDescription() {
    return description;
  }
}
