package com.green.farm_animals_shop.shop.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor

public class DailyOrderSummaryDTO {
  private String orderDate; // 주문 날짜
  private Long totalPriceSum; // 총 결제금액 합
}
