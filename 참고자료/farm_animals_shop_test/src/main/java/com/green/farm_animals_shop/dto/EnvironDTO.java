package com.green.farm_animals_shop.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString
public class EnvironDTO {
  private LocalDateTime timeLine;
  private double temp;
  // 습도를 받아올 변수
  private double humidity;
}
