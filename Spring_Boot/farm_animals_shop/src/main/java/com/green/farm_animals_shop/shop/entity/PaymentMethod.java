package com.green.farm_animals_shop.shop.entity;

public enum PaymentMethod {
  CREDIT_CARD("Credit Card"), // 신용카드
  DEBIT_CARD("Debit Card"), // 직불카드
  BANK_TRANSFER("Bank Transfer"), // 계좌이체
  PAYPAL("PayPal"), // 페이팔
  OTHER("Other"); // 기타 결제 방법

  private final String description;

  PaymentMethod(String description) {
    this.description = description;
  }

  public String getDescription() {
    return description;
  }

}
