package com.green.farm_animals_shop.shop.entity;

public enum PaymentTransactionType {
  PURCHASE("Purchase"), // 구매
  REFUND("Refund"), // 환불
  EXCHANGE("Exchange"); // 교환

  private final String description;

  PaymentTransactionType(String description){
    this.description = description;
  }

  public String getDescription() {
    return description;
  }
}
