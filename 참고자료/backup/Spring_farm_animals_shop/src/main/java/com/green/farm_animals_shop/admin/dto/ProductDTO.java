package com.green.farm_animals_shop.admin.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString
public class ProductDTO {
  private int productNum;
  private String productName;
  private String productContent;
  private int productPrice;
  private String productImg;
  private LocalDateTime productCreatedAt;
  private int productStock;
}
